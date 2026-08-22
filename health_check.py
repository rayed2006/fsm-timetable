"""
FSM Timetable Endpoint & Data Health Check Script (health_check.py)
------------------------------------------------------------------
Validates:
1. Live Google Sheets gviz HTML endpoint accessibility and HTTP 200 response.
2. Local timetable.json file existence and structural validity.

Outputs clean status reports and exits with code 0 on success or code 1 on failure.
"""

import os
import sys
import json
import time
import requests

ENDPOINT_URL = (
    "https://docs.google.com/spreadsheets/d/19roMO-8_ofZyntfELYCqmhZeTDO69y2kcolxljAAtTI/gviz/tq?tqx=out:html&gid=750453350"
)
LOCAL_JSON_PATH = "timetable.json"


def check_remote_endpoint(url: str) -> bool:
    print(f"[*] Checking remote endpoint: {url}")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }

    start_time = time.time()
    try:
        response = requests.get(url, headers=headers, timeout=15)
        elapsed_ms = int((time.time() - start_time) * 1000)

        if response.status_code == 200:
            content_length = len(response.text)
            if "<table" in response.text.lower():
                print(f"    [200 OK] Live Google Sheet endpoint reachable ({elapsed_ms}ms, {content_length} bytes, <table> verified)")
                return True
            else:
                print(f"    [FAIL] HTTP 200 received but response lacks <table> content ({content_length} bytes)")
                return False
        else:
            print(f"    [FAIL] HTTP {response.status_code} received from remote endpoint")
            return False
    except requests.exceptions.RequestException as e:
        print(f"    [FAIL] Request failed: {e}")
        return False


def check_local_timetable_json(file_path: str) -> bool:
    print(f"[*] Checking local dataset: {file_path}")
    if not os.path.exists(file_path):
        print(f"    [FAIL] '{file_path}' does not exist on disk.")
        return False

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Validate core keys
        required_keys = ["metadata", "degrees", "schedule"]
        missing_keys = [k for k in required_keys if k not in data]
        if missing_keys:
            print(f"    [FAIL] Missing root keys in JSON: {missing_keys}")
            return False

        schedule = data.get("schedule", [])
        degrees = data.get("degrees", {})

        if not isinstance(schedule, list) or len(schedule) == 0:
            print("    [FAIL] 'schedule' key is empty or not a list.")
            return False

        if not isinstance(degrees, dict) or len(degrees) == 0:
            print("    [FAIL] 'degrees' key is empty or not a dictionary.")
            return False

        file_size_kb = os.path.getsize(file_path) / 1024
        print(
            f"    [200 OK] Local timetable.json verified ({len(schedule)} classes, {len(degrees)} degrees, {file_size_kb:.1f} KB)"
        )
        return True
    except json.JSONDecodeError as e:
        print(f"    [FAIL] Invalid JSON format in '{file_path}': {e}")
        return False
    except Exception as e:
        print(f"    [FAIL] Error reading '{file_path}': {e}")
        return False


def run_health_check():
    print("=" * 70)
    print("           FSM TIMETABLE SYSTEM & ENDPOINT HEALTH CHECK")
    print("=" * 70)

    endpoint_ok = check_remote_endpoint(ENDPOINT_URL)
    local_ok = check_local_timetable_json(LOCAL_JSON_PATH)

    print("-" * 70)
    if endpoint_ok and local_ok:
        print(">>> HEALTH CHECK PASSED: [200 OK] ALL SYSTEMS OPERATIONAL <<<")
        print("=" * 70)
        sys.exit(0)
    else:
        print(">>> HEALTH CHECK FAILED: ONE OR MORE CHECKS FAILED <<<")
        print("=" * 70)
        sys.exit(1)


if __name__ == "__main__":
    run_health_check()
