"""
FSM Timetable Scraper & Data Pipeline (Phase 1, 2 & 3)
-------------------------------------------------------
Scrapes, parses, normalizes, and filters timetable data from Google Sheets
for the FAST School of Management (FSM), Islamabad.

Target Degrees:
- Bachelor of Business Administration (BBA)
- BS (Business Analytics) [BSBA / BA]
- BS (Accounting & Finance) [BSAF / AF]
- BS (Financial Technology / Fintech) [BSFT / FT]

Outputs:
- timetable.json
"""

import re
import json
import logging
from collections import defaultdict
from typing import Dict, List, Any, Optional, Tuple
import requests
from bs4 import BeautifulSoup
import pandas as pd

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# Strict batch whitelist
ALLOWED_BATCHES = ["2023", "2024", "2025", "2026"]

# Standard Degree Mappings
DEGREE_MAPPINGS = {
    "BBA": {
        "code": "BBA",
        "name": "Bachelor of Business Administration",
        "prefix_patterns": [r"\bBBA\b"]
    },
    "BSBA": {
        "code": "BSBA",
        "name": "BS (Business Analytics)",
        "prefix_patterns": [r"\bBSBA\b", r"\bBA\b", r"\bBS\(BA\)\b"]
    },
    "BSAF": {
        "code": "BSAF",
        "name": "BS (Accounting & Finance)",
        "prefix_patterns": [r"\bAF\b", r"\bBSAF\b", r"\bBS\(AF\)\b", r"\bBS\(A&F\)\b"]
    },
    "BSFT": {
        "code": "BSFT",
        "name": "BS (Financial Technology)",
        "prefix_patterns": [r"\bFT\b", r"\bBSFT\b", r"\bBS\(FT\)\b", r"\bFintech\b"]
    }
}

# Standard Batch mapping based on semester digits with leading zero (e.g., Fall 2026 timetable)
SEMESTER_TO_BATCH = {
    "01": "2026",
    "02": "2026",
    "03": "2025",
    "04": "2025",
    "05": "2024",
    "06": "2024",
    "07": "2023",
    "08": "2023"
}

DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
DAY_ORDER = {day: idx for idx, day in enumerate(DAYS_OF_WEEK)}

# Default column slot intervals in the Google Sheet
DEFAULT_SLOT_RANGES = [
    (3, 11, "08:30", "09:50"),
    (12, 20, "10:00", "11:20"),
    (21, 29, "11:30", "12:50"),
    (30, 38, "01:00", "02:20"),
    (39, 47, "02:25", "03:45"),
    (48, 56, "03:50", "05:10"),
]

# Consecutive slot transitions for double-block merging (e.g. 3-hour labs)
CONSECUTIVE_SLOT_CHAIN = {
    "08:30": "10:00",
    "10:00": "11:30",
    "11:30": "01:00",
    "01:00": "02:25",
    "02:25": "03:50"
}


def time_str_to_minutes(time_str: str) -> int:
    """
    Converts a time string like '08:30', '10:00', '11:30', '01:00', '02:25'
    to 24-hour minutes from midnight for chronological sorting.
    """
    try:
        parts = time_str.replace(".", ":").strip().split(":")
        hour = int(parts[0])
        minute = int(parts[1]) if len(parts) > 1 else 0

        # Afternoon hour normalization (01:00 -> 13:00, 02:25 -> 14:25, 03:50 -> 15:50)
        if 1 <= hour <= 7:
            hour += 12

        return hour * 60 + minute
    except Exception:
        return 0


class FSMTimetableScraper:
    def __init__(self, sheet_html_url: Optional[str] = None):
        self.url = sheet_html_url or "https://docs.google.com/spreadsheets/d/19roMO-8_ofZyntfELYCqmhZeTDO69y2kcolxljAAtTI/htmlview?gid=750453350"

    def normalize_url(self, raw_url: str) -> str:
        """Converts /htmlview, /edit, /pubhtml into Google gviz HTML table endpoint."""
        match = re.search(r"/spreadsheets/d/([a-zA-Z0-9-_]+)", raw_url)
        if not match:
            return raw_url
        sheet_id = match.group(1)

        gid_match = re.search(r"[?&#]gid=(\d+)", raw_url)
        gid = gid_match.group(1) if gid_match else "750453350"

        return f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:html&gid={gid}"

    def fetch_html(self, url: Optional[str] = None, local_file: Optional[str] = None) -> str:
        """Fetch raw HTML over network or read from local file."""
        if local_file:
            logger.info(f"Reading HTML from local file: {local_file}")
            with open(local_file, "r", encoding="utf-8") as f:
                return f.read()

        target_url = self.normalize_url(url or self.url)
        logger.info(f"Fetching timetable from URL: {target_url}")

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        }
        response = requests.get(target_url, headers=headers, timeout=20)
        response.raise_for_status()
        return response.text

    @staticmethod
    def resolve_degree(prefix: str) -> Optional[Dict[str, str]]:
        prefix_upper = prefix.upper()
        if prefix_upper == "BBA":
            return DEGREE_MAPPINGS["BBA"]
        elif prefix_upper in ["BSBA", "BA"]:
            return DEGREE_MAPPINGS["BSBA"]
        elif prefix_upper in ["AF", "BSAF", "A&F"]:
            return DEGREE_MAPPINGS["BSAF"]
        elif prefix_upper in ["FT", "BSFT", "FINTECH"]:
            return DEGREE_MAPPINGS["BSFT"]
        return None

    @staticmethod
    def normalize_section_token(raw_sec_letter: str) -> Tuple[str, Optional[str]]:
        """
        Normalizes lab sub-group letters (e.g. 'A1', 'B2', 'C1') into:
        - Parent section letter: 'A', 'B', 'C'
        - Sub-group number: '1', '2', '1'
        """
        clean = raw_sec_letter.strip().upper()
        digit_match = re.search(r"(\d+)$", clean)
        if digit_match:
            subgroup_num = digit_match.group(1)
            parent_letter = clean[: -len(subgroup_num)]
            return parent_letter, subgroup_num
        return clean, None

    @staticmethod
    def parse_section_string(raw_section_str: str) -> List[Dict[str, Any]]:
        """
        Strictly parses regular section tokens (e.g. 'BBA01A', 'AF07A/B', 'BSBA03C', 'FT01B').
        EXPLICITLY FILTERS OUT repeater sections missing the leading zero (e.g. AF3A, FT3A, BBA3A).
        """
        results = []
        if not raw_section_str:
            return results

        # Strip all 4-digit course code tokens
        text_without_courses = re.sub(r"\b[A-Za-z]{2,4}\s*\d{4}(?=[^0-9]|$)", " ", raw_section_str)

        # Match only valid standard section codes with mandatory leading zero (01 through 08)
        pattern = re.compile(
            r"\b(BBA|BSBA|AF|FT|BA)\s*(0[1-8])\s*([A-Za-z](?:[1-9])?)(?:\s*/\s*([A-Za-z0-9]+))?\b",
            re.IGNORECASE
        )

        for m in pattern.finditer(text_without_courses):
            raw_prefix = m.group(1).upper()
            sem_digit = m.group(2)
            raw_sec1 = m.group(3).upper()
            raw_sec2 = m.group(4).upper() if m.group(4) else None

            degree_info = FSMTimetableScraper.resolve_degree(raw_prefix)
            if not degree_info:
                continue

            batch_year = SEMESTER_TO_BATCH.get(sem_digit)
            if batch_year not in ALLOWED_BATCHES:
                continue

            sec_prefix = degree_info["code"] if degree_info["code"] != "BSAF" else "AF"
            if sec_prefix == "BSFT":
                sec_prefix = "FT"
            elif sec_prefix == "BSBA":
                sec_prefix = "BSBA"

            parent_letter1, subgroup1 = FSMTimetableScraper.normalize_section_token(raw_sec1)
            if not parent_letter1:
                parent_letter1 = raw_sec1

            clean_sec_code = f"{sec_prefix}{sem_digit}{parent_letter1}"

            results.append({
                "degree_code": degree_info["code"],
                "degree_name": degree_info["name"],
                "semester": int(sem_digit),
                "batch": batch_year,
                "section_code": clean_sec_code,
                "section_letter": parent_letter1,
                "subgroup": subgroup1,
                "raw_section": f"{raw_prefix}{sem_digit}{raw_sec1}",
                "is_elective": "E" in parent_letter1 or "ELECTIVE" in raw_section_str.upper()
            })

            # Handle second part of composite slash if present (e.g. AF07A/B or BBA01A/BBA05A)
            if raw_sec2:
                sub_match = re.match(
                    r"^(?:(BBA|BSBA|AF|FT|BA)\s*(0[1-8]))?\s*([A-Za-z](?:[1-9])?)$",
                    raw_sec2,
                    re.IGNORECASE
                )
                if sub_match:
                    sub_prefix = sub_match.group(1).upper() if sub_match.group(1) else raw_prefix
                    sub_deg = FSMTimetableScraper.resolve_degree(sub_prefix)
                    if sub_deg:
                        sub_sem = sub_match.group(2) if sub_match.group(2) else sem_digit
                        sub_raw_sec = sub_match.group(3).upper()
                        sub_batch = SEMESTER_TO_BATCH.get(sub_sem)
                        if sub_batch in ALLOWED_BATCHES:
                            sub_clean_prefix = sub_deg["code"] if sub_deg["code"] != "BSAF" else "AF"
                            if sub_clean_prefix == "BSFT":
                                sub_clean_prefix = "FT"
                            elif sub_clean_prefix == "BSBA":
                                sub_clean_prefix = "BSBA"

                            sub_parent_letter, sub_subgroup = FSMTimetableScraper.normalize_section_token(sub_raw_sec)
                            if not sub_parent_letter:
                                sub_parent_letter = sub_raw_sec

                            sub_sec_code = f"{sub_clean_prefix}{sub_sem}{sub_parent_letter}"

                            results.append({
                                "degree_code": sub_deg["code"],
                                "degree_name": sub_deg["name"],
                                "semester": int(sub_sem),
                                "batch": sub_batch,
                                "section_code": sub_sec_code,
                                "section_letter": sub_parent_letter,
                                "subgroup": sub_subgroup,
                                "raw_section": f"{sub_prefix}{sub_sem}{sub_raw_sec}",
                                "is_elective": "E" in sub_parent_letter or "ELECTIVE" in raw_section_str.upper()
                            })

        return results

    @staticmethod
    def parse_cell_content(cell_text: str, section_hint_text: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """Parses course title, course code, section token, timing override from cell text."""
        if not cell_text or cell_text.strip().lower() in ["", "free slot", "free", "nil", "break", "jumma prayer", "seminar"]:
            return None

        clean_text = " ".join(cell_text.split())

        # Check for inline timing override like (08:30-10:20) or (11:30-01:20) or (08:30-11:00)
        timing_override = None
        timing_match = re.search(r"\((\d{1,2}[:.]\d{2})\s*[-–to]\s*(\d{1,2}[:.]\d{2})\)", clean_text)
        if not timing_match:
            timing_match = re.search(r"\b(\d{1,2}[:.]\d{2})\s*[-–to]\s*(\d{1,2}[:.]\d{2})\b", clean_text)

        if timing_match:
            st = timing_match.group(1).replace(".", ":")
            et = timing_match.group(2).replace(".", ":")
            timing_override = {
                "start_time": f"{int(st.split(':')[0]):02d}:{st.split(':')[1]}",
                "end_time": f"{int(et.split(':')[0]):02d}:{et.split(':')[1]}"
            }

        # Extract Course Code (e.g. SS1016, MG4011, AF3001, CL1001, LG2009, CS2016, CY4053, BA3002, AF3003, CS3017, CS1001)
        course_code_match = re.search(r"\b([A-Za-z]{2,4}\s*\d{4})(?=[^0-9]|$)", clean_text)
        course_code = course_code_match.group(1).replace(" ", "") if course_code_match else None

        # Combine text for section extraction if section hint is provided
        search_for_sections = clean_text + (" " + section_hint_text if section_hint_text else "")
        sections_parsed = FSMTimetableScraper.parse_section_string(search_for_sections)

        # Infer clean course title
        course_title = clean_text
        if course_code_match:
            course_title = course_title.replace(course_code_match.group(0), "")
        if timing_match:
            course_title = course_title.replace(timing_match.group(0), "")
        for sec in sections_parsed:
            course_title = re.sub(rf"\b{re.escape(sec['raw_section'])}\b", "", course_title, flags=re.IGNORECASE)
            course_title = re.sub(rf"\b{re.escape(sec['section_code'])}\b", "", course_title, flags=re.IGNORECASE)
            course_title = re.sub(rf"\b{re.escape(sec['section_letter'])}\b", "", course_title, flags=re.IGNORECASE)

        course_title = re.sub(r"[\(\)\[\]\-]+", " ", course_title).strip()
        course_title = " ".join(course_title.split())

        if not course_code or course_code.upper() in ["GENERIC", "NIL"]:
            return None

        if not course_title or course_title.strip() == "" or any(course_title.upper() == s["section_code"].upper() for s in sections_parsed):
            return None

        is_lab = bool(re.search(r"\b(Lab|Practical)\b", clean_text, re.IGNORECASE) or 
                     (course_code and course_code.startswith(("CL", "SL", "FL", "LG", "003", "012"))))

        return {
            "raw_text": clean_text,
            "course_code": course_code,
            "course_title": course_title,
            "is_lab": is_lab,
            "timing_override": timing_override,
            "parsed_sections": sections_parsed
        }

    @staticmethod
    def normalize_room_name(room: str) -> str:
        if not room:
            return "TBA"
        clean = room.strip()
        clean = re.sub(r"\bA\s*[-–]?\s*(\d+)\b", r"A-\1", clean, flags=re.IGNORECASE)
        clean = re.sub(r"\bC\s*[-–]?\s*(\d+)\b", r"C-\1", clean, flags=re.IGNORECASE)
        clean = re.sub(r"\bAudi\b", "Auditorium", clean, flags=re.IGNORECASE)
        clean = re.sub(r"[-–]{2,}", "-", clean)
        return clean

    @staticmethod
    def merge_consecutive_slots(entries: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Merges consecutive double-slot sessions into a single extended session.
        """
        groups = defaultdict(list)
        for e in entries:
            key = (e["day"], e["room"], e["section_code"], e["course_code"], e.get("subgroup"), e["course_title"])
            groups[key].append(e)

        merged_all = []
        for key, items in groups.items():
            items.sort(key=lambda x: x.get("start_minutes", 0))
            i = 0
            while i < len(items):
                curr = dict(items[i])
                if i + 1 < len(items):
                    nxt = items[i + 1]
                    st1 = curr["start_time"]
                    st2 = nxt["start_time"]
                    if CONSECUTIVE_SLOT_CHAIN.get(st1) == st2:
                        curr["end_time"] = nxt["end_time"]
                        curr["end_minutes"] = nxt.get("end_minutes", 0)
                        curr["time_slot"] = f"{curr['start_time']} - {nxt['end_time']}"
                        curr["is_merged_slot"] = True
                        i += 1

                merged_all.append(curr)
                i += 1

        return merged_all

    def process_timetable(self, html_content: str) -> Dict[str, Any]:
        """Parses full week timetable with strict column alignment and slot merging."""
        soup = BeautifulSoup(html_content, "html.parser")
        table = soup.find("table")
        if not table:
            raise ValueError("No <table> element found in Google Sheet HTML output.")

        rows = table.find_all("tr")
        if not rows or len(rows) < 4:
            raise ValueError(f"Table contains insufficient rows ({len(rows)}).")

        current_day = "Monday"
        current_category = "Classes"
        schedule_entries = []

        for r_idx, tr in enumerate(rows):
            cells = [td.get_text(strip=True) for td in tr.find_all(["td", "th"])]
            if not any(cells):
                continue

            col0 = cells[0] if len(cells) > 0 else ""
            col1 = cells[1] if len(cells) > 1 else ""
            col2 = cells[2] if len(cells) > 2 else ""

            # Check day transition
            for d in DAYS_OF_WEEK:
                if d.lower() in col0.lower() or d.lower() in col1.lower():
                    current_day = d
                    break

            # Check category
            if "lab" in col1.lower() or "labs" in col0.lower():
                current_category = "Labs"
            elif "class" in col1.lower() or "classes" in col0.lower():
                current_category = "Classes"

            # Determine room name
            room_candidates = [col2, col1, col0]
            room_name = ""
            for cand in room_candidates:
                if not cand:
                    continue
                if cand in DAYS_OF_WEEK or cand in ["Classes", "Labs", "Room", "51"]:
                    continue
                if re.search(r"\b(A-?\s*\d+|KK-?[I|V|X]+|Khyber|Mehran|Cal-[I|V|X]+|Audi|Auditorium|C-?\s*\d+)\b", cand, re.IGNORECASE):
                    room_name = cand
                    break

            if not room_name and col2 and col2 not in DAYS_OF_WEEK and col2 not in ["Classes", "Labs", "Room"]:
                room_name = col2

            if not room_name:
                continue

            room_name = self.normalize_room_name(room_name)

            # Process each slot block
            for s_start, s_end, default_st, default_et in DEFAULT_SLOT_RANGES:
                if len(cells) <= s_start:
                    continue

                slot_cells = cells[s_start : min(s_end + 1, len(cells))]
                non_empty = [c for c in slot_cells if c]
                if not non_empty:
                    continue

                full_slot_text = " ".join(non_empty)
                if full_slot_text.lower() in ["free", "free slot", "nil", "break", "jumma prayer", "seminar"]:
                    continue

                parsed = self.parse_cell_content(full_slot_text)
                
                # If course exists in this slot but section was placed in the right-side merged cells
                if not parsed or not parsed["parsed_sections"]:
                    # Find following non-empty cells in the row to find the matching section
                    next_cells = [c for c in cells[s_start : min(s_start + 18, len(cells))] if c]
                    next_sec_text = " ".join(next_cells)
                    sub_parsed = self.parse_cell_content(full_slot_text, section_hint_text=next_sec_text)
                    if sub_parsed and sub_parsed["parsed_sections"]:
                        parsed = sub_parsed
                    else:
                        for item_text in non_empty:
                            sub_parsed = self.parse_cell_content(item_text, section_hint_text=next_sec_text)
                            if sub_parsed and sub_parsed["parsed_sections"]:
                                parsed = sub_parsed
                                break

                if not parsed or not parsed["parsed_sections"]:
                    continue

                if not parsed["course_title"] or len(parsed["course_title"].strip()) < 3:
                    continue

                st = parsed["timing_override"]["start_time"] if parsed["timing_override"] else default_st
                et = parsed["timing_override"]["end_time"] if parsed["timing_override"] else default_et

                target_sections = [
                    sec for sec in parsed["parsed_sections"]
                    if sec["degree_code"] in DEGREE_MAPPINGS and sec["batch"] in ALLOWED_BATCHES
                ]

                for sec in target_sections:
                    final_title = parsed["course_title"]
                    if sec.get("subgroup") and "group" not in final_title.lower():
                        final_title = f"{final_title} (Group {sec['subgroup']})"

                    entry_id_sec = sec['section_code'].replace(" ", "_")
                    entry = {
                        "id": f"{current_day[:3]}-{room_name}-{st.replace(':', '')}-{entry_id_sec}-{parsed['course_code']}{'-G'+sec['subgroup'] if sec.get('subgroup') else ''}".replace(" ", "_"),
                        "day": current_day,
                        "category": current_category,
                        "room": room_name,
                        "time_slot": f"{st} - {et}",
                        "start_time": st,
                        "end_time": et,
                        "start_minutes": time_str_to_minutes(st),
                        "end_minutes": time_str_to_minutes(et),
                        "course_code": parsed["course_code"],
                        "course_title": final_title,
                        "is_lab": parsed["is_lab"],
                        "degree_code": sec["degree_code"],
                        "degree_name": sec["degree_name"],
                        "batch": sec["batch"],
                        "semester": sec["semester"],
                        "section_code": sec["section_code"],
                        "section_letter": sec["section_letter"],
                        "subgroup": sec.get("subgroup"),
                        "is_elective": sec["is_elective"],
                        "is_merged_slot": parsed["timing_override"] is not None,
                        "raw_text": full_slot_text
                    }
                    schedule_entries.append(entry)

        # Merge consecutive double-slot lab / lecture blocks
        merged_entries = self.merge_consecutive_slots(schedule_entries)
        unique_entries = self.deduplicate_entries(merged_entries)

        # Sort chronologically by Day and start_minutes
        unique_entries.sort(key=lambda e: (DAY_ORDER.get(e["day"], 99), e.get("start_minutes", 0), e["room"]))

        result = {
            "metadata": {
                "institution": "FAST School of Management, Islamabad",
                "semester_session": "Fall 2026",
                "supported_degrees": list(DEGREE_MAPPINGS.keys()),
                "allowed_batches": ALLOWED_BATCHES,
                "total_classes": len(unique_entries),
                "generated_at": pd.Timestamp.now().isoformat()
            },
            "degrees": {
                deg_k: {
                    "name": deg_v["name"],
                    "code": deg_v["code"],
                    "batches": sorted([b for b in set(e["batch"] for e in unique_entries if e["degree_code"] == deg_k) if b in ALLOWED_BATCHES]),
                    "sections": sorted(list(set(e["section_code"] for e in unique_entries if e["degree_code"] == deg_k)))
                }
                for deg_k, deg_v in DEGREE_MAPPINGS.items()
            },
            "schedule": unique_entries
        }

        return result

    @staticmethod
    def deduplicate_entries(entries: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        seen = set()
        deduped = []
        for e in entries:
            key = (e["day"], e["room"], e["start_time"], e["end_time"], e["section_code"], e["course_code"], e.get("subgroup"))
            if key not in seen:
                seen.add(key)
                deduped.append(e)
        return deduped


def export_to_json(data: Dict[str, Any], output_path: str = "timetable.json"):
    """Writes clean structured data to JSON file."""
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    logger.info(f"Successfully generated clean timetable JSON at '{output_path}' with {len(data.get('schedule', []))} classes.")


if __name__ == "__main__":
    logger.info("Starting live FSM Timetable Scraping Pipeline...")
    scraper = FSMTimetableScraper()
    try:
        html = scraper.fetch_html()
        data = scraper.process_timetable(html)
        if "schedule" in data and len(data["schedule"]) > 0:
            export_to_json(data, "timetable.json")
            logger.info(f"Pipeline completed successfully. Generated {len(data['schedule'])} clean classes.")
        else:
            logger.warning("Scraper returned empty schedule data.")
    except Exception as e:
        logger.error(f"Scraping error encountered: {e}")
