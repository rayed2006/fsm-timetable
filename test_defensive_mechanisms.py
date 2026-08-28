"""
Automated Test Suite for Defensive Mechanisms in scraper.py
-----------------------------------------------------------
Tests:
1. Circuit Breaker: Verifies that export_to_json raises ValueError on 0 classes
   and prevents overwriting timetable.json.
2. Dynamic Anchoring: Verifies that tables with row/column shifts or dynamic headers
   are accurately detected without relying on hardcoded indices.
3. Fuzzy Matching & Logging: Verifies difflib-based course code error corrections
   and that unparseable cells are logged to unparsed.log.
"""

import os
import tempfile
import json
from scraper import FSMTimetableScraper, export_to_json


def test_circuit_breaker_empty_schedule():
    """Verify that export_to_json raises ValueError on empty schedule and leaves file intact."""
    with tempfile.TemporaryDirectory() as tmpdir:
        test_json_path = os.path.join(tmpdir, "timetable.json")
        initial_data = {"metadata": {"test": "original"}, "schedule": [{"id": "test-1"}]}
        with open(test_json_path, "w", encoding="utf-8") as f:
            json.dump(initial_data, f)

        # Attempt to export empty data
        empty_data = {"metadata": {"total_classes": 0}, "schedule": []}
        try:
            export_to_json(empty_data, test_json_path)
            assert False, "Circuit breaker failed to raise ValueError for 0 classes!"
        except ValueError as e:
            assert "Circuit breaker triggered" in str(e)

        # Verify original file content was not overwritten
        with open(test_json_path, "r", encoding="utf-8") as f:
            loaded = json.load(f)
        assert loaded == initial_data
        print("[PASS] Circuit Breaker: Correctly blocked overwrite and raised ValueError.")


def test_dynamic_anchoring():
    """Verify that dynamic scanning discovers time slots and starting day rows despite row shifts."""
    shifted_html = """
    <table>
      <tr><td>FAST School Notice Banner</td></tr>
      <tr><td>Unrelated Info Row</td></tr>
      <tr><td>Day</td><td>Cat</td><td>Room</td><td>08:30-09:50</td><td>10:00-11:20</td></tr>
      <tr><td>Monday</td><td>Classes</td><td>A-01</td><td>MG4011 Entrepreneurship AF07A</td><td>AF1003 Financial Accounting BBA01A</td></tr>
    </table>
    """
    scraper = FSMTimetableScraper()
    data = scraper.process_timetable(shifted_html)
    schedule = data.get("schedule", [])
    assert len(schedule) >= 2, f"Expected >= 2 classes with dynamic anchoring, got {len(schedule)}"
    assert schedule[0]["day"] == "Monday"
    assert schedule[0]["room"] == "A-01"
    print("[PASS] Dynamic Anchoring: Successfully parsed timetable with row/column shifts.")


def test_fuzzy_matching_course_codes():
    """Verify that difflib-based fuzzy matching correctly fixes course code typos."""
    test_cases = [
        ("MGG4011 Entrepreneurship AF07A", "MG4011"),
        ("AFF1003 Intro to Financial Accounting BBA01A", "AF1003"),
        ("CS20122 Intro to OOP FT03A", "CS2012"),
        ("S1016 English - I BBA01B", "SS1016"),
        ("MG 4011 Entrepreneurship AF07A", "MG4011"),
        ("AF-3001 Financial Management BBA05B", "AF3001")
    ]
    for raw_text, expected_code in test_cases:
        parsed = FSMTimetableScraper.parse_cell_content(raw_text)
        assert parsed is not None, f"Failed to parse '{raw_text}'"
        assert parsed["course_code"] == expected_code, f"Expected {expected_code} for '{raw_text}', got {parsed['course_code']}"
    print("[PASS] Fuzzy Matching: difflib successfully corrected typos in course codes.")


def test_unparsed_logging():
    """Verify that unparseable cells are appended to unparsed.log with coordinates."""
    with tempfile.TemporaryDirectory() as tmpdir:
        log_path = os.path.join(tmpdir, "unparsed.log")
        sample_html = """
        <table>
          <tr><td>Day</td><td>Category</td><td>Room</td><td>08:30-09:50</td></tr>
          <tr><td>Monday</td><td>Classes</td><td>A-01</td><td>Completely Unparseable Garbage 9999</td></tr>
        </table>
        """
        scraper = FSMTimetableScraper()
        data = scraper.process_timetable(sample_html, unparsed_log_path=log_path)
        
        assert os.path.exists(log_path), "unparsed.log was not created"
        with open(log_path, "r", encoding="utf-8") as f:
            content = f.read()
        assert "Completely Unparseable Garbage 9999" in content
        assert "Row" in content and "Col" in content
def test_unparsed_bypass_conditions():
    """Verify that should_bypass_unparsed_log filters expected noise and preserves genuine errors."""
    # 1. Standalone Batch Codes -> Must Bypass
    assert FSMTimetableScraper.should_bypass_unparsed_log("BBA01C") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("FT03A") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("FT03C/FT05A") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("AF07A/B") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("BBA01A/BBA05A") is True

    # 2. External Departments & Events -> Must Bypass
    assert FSMTimetableScraper.should_bypass_unparsed_log("CS") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("cs") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("EE") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("MS") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("Seminar of batch 2023 & 2024") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("Seminar in Auditorium") is True

    # 3. Repeater / Remedial Classes -> Must Bypass
    assert FSMTimetableScraper.should_bypass_unparsed_log("FL1002 Financial Accounting Lab FT3A") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("AF 1001 Fundamentals of Accounting AF3A") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("AF1002 Finacial Accounting AF3B") is True
    assert FSMTimetableScraper.should_bypass_unparsed_log("MT1002 Business Math I (repeat course for all degrees) BBA3A") is True

    # 4. Genuine Unparsed Entries -> Must NOT Bypass (should be logged)
    assert FSMTimetableScraper.should_bypass_unparsed_log("FT01D U-Sirat Nabi FT01D") is False
    assert FSMTimetableScraper.should_bypass_unparsed_log("Islamic Banking and Finance AF07A/B") is False
    assert FSMTimetableScraper.should_bypass_unparsed_log("SS 1018U-Holy Quran (11:30-12:25) in Room C-310") is False

    print("[PASS] Logging Bypass: All 3 bypass conditions successfully verified.")


def test_normalize_cell_text():
    """Verify that normalize_cell_text pre-processes known edge cases before regex parsing."""
    # 1. U-Sirat Nabi normalization
    norm1 = FSMTimetableScraper.normalize_cell_text("FT01D U-Sirat Nabi FT01D")
    assert "SS1000" in norm1 and "U-Sirat Nabi" in norm1 and "FT01D" in norm1
    parsed1 = FSMTimetableScraper.parse_cell_content("FT01D U-Sirat Nabi FT01D")
    assert parsed1 is not None
    assert parsed1["course_code"] == "SS1000"
    assert parsed1["parsed_sections"][0]["section_code"] == "FT01D"

    # 2. Islamic Banking normalization
    norm2 = FSMTimetableScraper.normalize_cell_text("Islamic Banking and Finance AF07A/B")
    assert "AF9999" in norm2
    parsed2 = FSMTimetableScraper.parse_cell_content("Islamic Banking and Finance AF07A/B")
    assert parsed2 is not None
    assert parsed2["course_code"] == "AF9999"
    assert len(parsed2["parsed_sections"]) == 2

    # 3. Holy Quran normalization
    norm3 = FSMTimetableScraper.normalize_cell_text("SS1022/SS1021 U-Holy Quran-I&II (11:30-01:20) AF03A")
    assert "SS1022" in norm3 and "Holy Quran" in norm3 and "AF03A" in norm3
    parsed3 = FSMTimetableScraper.parse_cell_content("SS1022/SS1021 U-Holy Quran-I&II (11:30-01:20) AF03A")
    assert parsed3 is not None
    assert parsed3["course_code"] == "SS1022"
    assert parsed3["timing_override"] is not None
    assert parsed3["parsed_sections"][0]["section_code"] == "AF03A"

    print("[PASS] Normalization: normalize_cell_text successfully fixed all edge cases.")


if __name__ == "__main__":
    print("Running defensive mechanism tests...")
    test_circuit_breaker_empty_schedule()
    test_dynamic_anchoring()
    test_fuzzy_matching_course_codes()
    test_unparsed_logging()
    test_unparsed_bypass_conditions()
    test_normalize_cell_text()
    print("\nALL DEFENSIVE MECHANISM TESTS PASSED!")
