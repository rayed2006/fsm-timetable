<div align="center">

# 🕒 FAST Timetable (FSM Timetable)

*A modern, high-performance scheduling and timetable web application built for students at **FAST-NUCES Islamabad**.*

[![Status](https://img.shields.io/badge/Status-Live%20%26%20Deployed-success?style=for-the-badge&logo=vercel)](https://fsm-timetable.vercel.app)
[![Next.js](https://img.shields.io/badge/Framework-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Python](https://img.shields.io/badge/Pipeline-Python-yellow?style=for-the-badge&logo=python)](https://www.python.org)

</div>

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| ⚡ **Interactive UI** | Clean, fast layout tailored for students to effortlessly track courses, slots, and timings. |
| 🤖 **Automated Pipeline** | Powered by an integrated Python scraper (`scraper.py`) and GitHub Actions for seamless schedule updates. |
| 📊 **Vercel Analytics** | Real-time traffic monitoring, visitor insights, and page view performance tracking. |
| 📱 **Fully Responsive** | Optimized for both desktop and mobile viewing with gorgeous dark/light mode aesthetics. |
| 🔒 **Transparent Policy** | Built-in Terms & Privacy guidelines directly accessible from the footer. |

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS, TypeScript
* **Automation & Data:** Python, GitHub Actions (`.github/workflows/scrape.yml`)
* **Hosting & Deployment:** Vercel (`fsm-timetable.vercel.app`)
* **Analytics:** Vercel Analytics (`@vercel/analytics`)

---

## 📂 Project Structure

```text
FSM TIMETABLE/
├── 📂 .github/workflows/     # Automated GitHub Action workflow for scraping
├── 📂 app/                   # Next.js App Router (pages, layout, styles)
│   ├── 📄 globals.css        # Global Tailwind styling & theme config
│   ├── 📄 layout.tsx         # Root layout with Vercel Analytics integration
│   └── 📄 page.tsx           # Main application interface & scheduling UI
├── 📂 public/                # Static assets, logos, and custom icons
├── 📄 scraper.py             # Python script for schedule extraction & parsing
├── 📄 timetable.json         # Processed schedule data source
├── 📄 package.json           # Node.js dependencies and project scripts
└── 📄 README.md              # Project documentation
