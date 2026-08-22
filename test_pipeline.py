"""
Test script to generate representative HTML matching the FSM restricted spreadsheet
and execute the full scraping pipeline to produce timetable.json.
"""

from scraper import FSMTimetableScraper, export_to_json
import json

# Representative HTML mimicking Google Sheets /htmlview structure with merged cells (colspan/rowspan)
SAMPLE_FSM_HTML = """
<!DOCTYPE html>
<html>
<head><title>FAST School of Management Timetable</title></head>
<body>
<table class="waffle" cellspacing="0" cellpadding="0">
  <tbody>
    <!-- Title Rows -->
    <tr>
      <td colspan="9" style="font-weight:bold; font-size:16pt; text-align:center;">FAST School of Management</td>
    </tr>
    <tr>
      <td colspan="9" style="font-weight:bold; text-align:center;">Classes' Schedule for Semester: Fall-2026</td>
    </tr>
    <!-- Header Row with Time Slots -->
    <tr style="font-weight:bold; background-color:#e0e0e0;">
      <td>Day</td>
      <td>Category</td>
      <td>Room</td>
      <td>08:30-09:50</td>
      <td>10:00-11:20</td>
      <td>11:30-12:50</td>
      <td>01:00-02:20</td>
      <td>02:25-03:45</td>
      <td>03:50-05:10</td>
    </tr>
    <!-- MONDAY - CLASSES -->
    <tr>
      <td rowspan="8" style="font-weight:bold; text-align:center;">Monday</td>
      <td rowspan="4">Classes</td>
      <td>A-01</td>
      <td colspan="2">SS1016 English - I (08:30-10:20) BBA01B</td>
      <td colspan="2">SS1016 English - I (11:30-01:20) AF01A</td>
      <td>MG2003 Consumer Behaviour BSBA05C</td>
      <td></td>
    </tr>
    <tr>
      <td>A-02</td>
      <td>MG4011 Entrepreneurship AF07B</td>
      <td>MG4011 Entrepreneurship AF07A</td>
      <td>AF1003 Intro to Financial Accounting AF01A</td>
      <td>AF1003 Intro to Financial Accounting BBA01B</td>
      <td>AF3003 Financial Institutions & Markets BBA07B</td>
      <td>AF3003 Financial Institutions & Markets BBA07A</td>
    </tr>
    <tr>
      <td>A-03</td>
      <td>AF4005 Audit & Assurance AF07A</td>
      <td>AF4005 Audit & Assurance AF07B</td>
      <td colspan="2">MG4003 Strategic Management BBA07B</td>
      <td>MG4003 Strategic Management BBA07A</td>
      <td></td>
    </tr>
    <tr>
      <td>A-04</td>
      <td>MG2003 Consumer Behaviour BBA05B</td>
      <td>AF 3001 Financial Management BBA05B</td>
      <td>AF4011 Investment and Portfolio Analytics FT07A</td>
      <td>AF4011 Investment and Portfolio Analytics FT07B</td>
      <td>MG3003 Basic Econometrics FT05B</td>
      <td>MG3003 Basic Econometrics FT05B</td>
    </tr>
    <!-- MONDAY - LABS -->
    <tr>
      <td rowspan="4">Labs</td>
      <td>KK-I</td>
      <td colspan="2">CL1001 IT in Business - Lab BSBA01A</td>
      <td colspan="2">LG2009 Data Analysis for Business - II Lab AF03A</td>
      <td>FL3001 Financial Management Lab BBA05A</td>
      <td>FL3001 Financial Management Lab BBA05A</td>
    </tr>
    <tr>
      <td>KK-II</td>
      <td>LG2009 Data Analysis for Business - II Lab BSBA03C</td>
      <td>LG2009 Data Analysis for Business - II Lab BSBA03C</td>
      <td>CL1001 IT in Business - Lab AF05C</td>
      <td>CL1001 IT in Business - Lab AF05C</td>
      <td colspan="2">2 Introduction to Object Oriented Programming FT03C</td>
    </tr>
    <tr>
      <td>Khyber I</td>
      <td>CS2003 Data Structures and Business Applications BSBA05B</td>
      <td>CL1001 IT in Business - Lab AF01C</td>
      <td>LG3003 Basic Econometrics Lab AF05C</td>
      <td>LG3003 Basic Econometrics Lab AF05C</td>
      <td colspan="2">LG2009 Data Analysis for Business - II Lab BBA03C</td>
    </tr>
    <tr>
      <td>Cal-I lab</td>
      <td colspan="2">SL1016 English - I - Lab FT01D1</td>
      <td colspan="2">SL1016 English - I - Lab BSBA01C1</td>
      <td>SL1016 English - I - Lab FT01C1</td>
      <td>SL1016 English - I - Lab FT01C1</td>
    </tr>
    <!-- TUESDAY - CLASSES -->
    <tr>
      <td rowspan="4" style="font-weight:bold; text-align:center;">Tuesday</td>
      <td rowspan="2">Classes</td>
      <td>A-101</td>
      <td>AF2003 Management Accounting BBA03A</td>
      <td>MG3004 Human Resource Management BBA05A</td>
      <td>AF4006 Investment Analysis & Management AF07A</td>
      <td>MG2001 Organizational Behaviour BBA03A</td>
      <td>CS1001 IT in Business (02:25-04:15) BBA01C</td>
      <td></td>
    </tr>
    <tr>
      <td>A-102</td>
      <td colspan="2">CS3017 Enterprise Systems & Applications (08:30-11:00) FT05C</td>
      <td>MG2003 Consumer Behaviour BBA03B</td>
      <td>MG2009 Data Analysis for Business II BBA03A</td>
      <td>CY4053 Cybersecurity for FinTech FT07A/B</td>
      <td>CY4053 Cybersecurity for FinTech FT07A/B</td>
    </tr>
    <!-- TUESDAY - LABS -->
    <tr>
      <td rowspan="2">Labs</td>
      <td>KK-I</td>
      <td colspan="2">FL1003 Introduction to Financial Accounting - Lab BSBA01C</td>
      <td colspan="2">CL2016 Programming for Business - Lab BSBA03A</td>
      <td>CL1001 IT in Business - Lab BBA01B</td>
      <td>CL1001 IT in Business - Lab BBA01B</td>
    </tr>
    <tr>
      <td>KK-III</td>
      <td>LG3003 Basic Econometrics Lab BSBA05B</td>
      <td>LG3003 Basic Econometrics Lab BSBA05C</td>
      <td colspan="2">003 Data Structures and Business Applications BSBA05C</td>
      <td>CL3003 Management Information System Lab AF05A</td>
      <td>LG3003 Basic Econometrics Lab FT05A</td>
    </tr>
  </tbody>
</table>
</body>
</html>
"""

def run_test():
    scraper = FSMTimetableScraper()
    print("Testing parser with sample FSM Google Sheet HTML...")
    data = scraper.process_timetable(SAMPLE_FSM_HTML)
    export_to_json(data, "timetable.json")
    
    print("\n--- Scraper Run Summary ---")
    print(f"Total Unique Filtered Classes: {data['metadata']['total_classes']}")
    print(f"Supported Degrees: {list(data['degrees'].keys())}")
    for deg_code, info in data['degrees'].items():
        print(f"  - {deg_code} ({info['name']}): {len(info['sections'])} sections, Batches: {info['batches']}")
    
    print("\nSample Output Entry Structure:")
    if data["schedule"]:
        print(json.dumps(data["schedule"][0], indent=2))

if __name__ == "__main__":
    run_test()
