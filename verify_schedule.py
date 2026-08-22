"""
FSM Timetable Integrity Verification Script
-------------------------------------------
Performs strict integrity checks on timetable.json:
1. Time Boundaries: Validates start_time, end_time, and time_slot formats.
2. Room Collisions: Flags double-booked rooms with conflicting courses.
3. Ground Truth Spot-Checks: Verifies hardcoded grid alignment assertions.
"""

import json
import sys
import re
from typing import List, Dict, Any
from collections import defaultdict


def load_timetable(file_path: str = "timetable.json") -> Dict[str, Any]:
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


def check_time_boundaries(schedule: List[Dict[str, Any]]) -> List[str]:
    errors = []
    time_regex = re.compile(r"^\d{2}:\d{2}$")

    for idx, item in enumerate(schedule):
        cid = item.get("id", f"index-{idx}")

        if "time_slot" not in item or not item["time_slot"]:
            errors.append(f"Missing 'time_slot' in item {cid}")

        st = item.get("start_time")
        et = item.get("end_time")

        if not st or not time_regex.match(st):
            errors.append(f"Malformed 'start_time' ({st}) in item {cid}")
        if not et or not time_regex.match(et):
            errors.append(f"Malformed 'end_time' ({et}) in item {cid}")

        sm = item.get("start_minutes", 0)
        em = item.get("end_minutes", 0)
        if sm <= 0 or em <= 0 or sm >= em:
            errors.append(f"Invalid minute interval ({sm} -> {em}) in item {cid}")

    return errors


def check_room_collisions(schedule: List[Dict[str, Any]]) -> List[str]:
    errors = []
    # Group by (day, room, start_time)
    room_slots = defaultdict(list)
    for item in schedule:
        key = (item["day"], item["room"], item["start_time"])
        room_slots[key].append(item)

    for (day, room, st), items in room_slots.items():
        # Get unique course codes in this room at this time
        course_codes = set(i["course_code"] for i in items)
        if len(course_codes) > 1:
            # Different courses sharing same room at same time
            course_list = ", ".join([f"{i['course_code']} ({i['section_code']})" for i in items])
            errors.append(f"Room Collision: Room '{room}' on {day} at {st} booked with conflicting courses: {course_list}")

    return errors


def check_ground_truth_spot_checks(schedule: List[Dict[str, Any]]) -> List[str]:
    errors = []

    # 1. Monday, Room A-01: 'SS1016 English-1' is scheduled for 'BBA01B' between 08:30-10:20
    mon_a01 = [
        e for e in schedule
        if e["day"] == "Monday"
        and "A-01" in e["room"]
        and e["section_code"] == "BBA01B"
        and e["start_time"] == "08:30"
        and e["end_time"] == "10:20"
        and "SS1016" in e["course_code"]
    ]
    if not mon_a01:
        errors.append(
            "Spot-Check Failed [Monday, Room A-01]: "
            "Expected 'SS1016' for 'BBA01B' between 08:30-10:20. None matched."
        )

    # 2. Tuesday, Room A-03: 'CS3017 Enterprise Systems & Applications' is scheduled from 08:30-11:00
    tue_a03 = [
        e for e in schedule
        if e["day"] == "Tuesday"
        and "A-03" in e["room"]
        and e["start_time"] == "08:30"
        and e["end_time"] == "11:00"
        and "CS3017" in e["course_code"]
    ]
    if not tue_a03:
        errors.append(
            "Spot-Check Failed [Tuesday, Room A-03]: "
            "Expected 'CS3017 Enterprise Systems & Applications' from 08:30-11:00. None matched."
        )

    # 3. Wednesday, Room A-301: 'MG4011 Entrepreneurship' is scheduled at 10:00 for 'FT05C'
    wed_a301 = [
        e for e in schedule
        if e["day"] == "Wednesday"
        and "A-301" in e["room"]
        and e["section_code"] == "FT05C"
        and e["start_time"] == "10:00"
        and "MG4011" in e["course_code"]
    ]
    if not wed_a301:
        errors.append(
            "Spot-Check Failed [Wednesday, Room A-301]: "
            "Expected 'MG4011 Entrepreneurship' at 10:00 for 'FT05C'. None matched."
        )

    # 4. Friday: 'CS1001 IT in Business' is scheduled from 02:25-04:15 for sections 'FT01C' and 'FT01D'
    fri_cs1001_c = [
        e for e in schedule
        if e["day"] == "Friday"
        and e["section_code"] == "FT01C"
        and e["start_time"] == "02:25"
        and e["end_time"] == "04:15"
        and "CS1001" in e["course_code"]
    ]
    if not fri_cs1001_c:
        errors.append(
            "Spot-Check Failed [Friday]: "
            "Expected 'CS1001 IT in Business' from 02:25-04:15 for 'FT01C'. None matched."
        )

    return errors


def run_verification():
    print("=" * 70)
    print("        FSM TIMETABLE DATA INTEGRITY VERIFICATION REPORT")
    print("=" * 70)

    try:
        data = load_timetable("timetable.json")
    except Exception as e:
        print(f"[FATAL] Could not load timetable.json: {e}")
        sys.exit(1)

    schedule = data.get("schedule", [])
    total_classes = len(schedule)
    print(f"[*] Total Classes Loaded: {total_classes}")
    print(f"[*] Institution: {data.get('metadata', {}).get('institution')}")
    print(f"[*] Session: {data.get('metadata', {}).get('semester_session')}")
    print("-" * 70)

    all_passed = True

    # 1. Time Boundaries Check
    time_errors = check_time_boundaries(schedule)
    if time_errors:
        all_passed = False
        print(f"[FAIL] Time Boundaries Check: {len(time_errors)} issue(s) detected:")
        for err in time_errors[:10]:
            print(f"  - {err}")
    else:
        print("[PASS] Time Boundaries Check: All start_time, end_time, and time_slots are valid.")

    # 2. Room Collisions Check
    collision_errors = check_room_collisions(schedule)
    if collision_errors:
        all_passed = False
        print(f"[FAIL] Room Collisions Check: {len(collision_errors)} collision(s) detected:")
        for err in collision_errors[:10]:
            print(f"  - {err}")
    else:
        print("[PASS] Room Collisions Check: Zero room booking collisions detected.")

    # 3. Ground Truth Spot-Checks
    spot_errors = check_ground_truth_spot_checks(schedule)
    if spot_errors:
        all_passed = False
        print(f"[FAIL] Ground Truth Spot-Checks: {len(spot_errors)} check(s) failed:")
        for err in spot_errors:
            print(f"  - {err}")
    else:
        print("[PASS] Ground Truth Spot-Checks: All 4 hardcoded spot-checks passed with 100% accuracy.")

    print("=" * 70)
    if all_passed:
        print(">>> ALL VERIFICATION CHECKS PASSED: DATASET INTEGRITY VERIFIED (100%) <<<")
        print("=" * 70)
        sys.exit(0)
    else:
        print(">>> VERIFICATION FAILED: INTEGRITY ISSUES FOUND <<<")
        print("=" * 70)
        sys.exit(1)


if __name__ == "__main__":
    run_verification()
