"use client";

import React, { useState, useEffect, useMemo } from "react";
import timetableData from "@/timetable.json";

interface ScheduleItem {
  id: string;
  day: string;
  category: string;
  room: string;
  time_slot: string;
  start_time: string;
  end_time: string;
  start_minutes?: number;
  end_minutes?: number;
  course_code: string;
  course_title: string;
  is_lab: boolean;
  degree_code: string;
  degree_name: string;
  batch: string;
  semester: number | null;
  section_code: string;
  section_letter: string;
  is_elective: boolean;
  is_merged_slot: boolean;
  raw_text: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const STORAGE_KEY = "fsm_timetable_prefs_v1";
const THEME_STORAGE_KEY = "fsm_timetable_theme_v1";

/**
 * Converts time strings like '08:30', '10:00', '11:30', '01:00', '02:25'
 * to chronological minutes from midnight (12-hour afternoon hours 1..7 -> 13..19).
 */
function getMinutesFromTime(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.replace(".", ":").trim().split(":");
  let hour = parseInt(parts[0], 10);
  const minute = parts.length > 1 ? parseInt(parts[1], 10) : 0;

  if (isNaN(hour)) return 0;
  if (hour >= 1 && hour <= 7) {
    hour += 12;
  }

  return hour * 60 + (isNaN(minute) ? 0 : minute);
}

export default function HomePage() {
  const schedule = timetableData.schedule as ScheduleItem[];
  const degreesMeta = timetableData.degrees as Record<
    string,
    { name: string; code: string; batches: string[]; sections: string[] }
  >;

  const degreeOptions = useMemo(() => {
    return Object.keys(degreesMeta).map((key) => ({
      code: key,
      name: degreesMeta[key].name,
    }));
  }, [degreesMeta]);

  // States
  const [selectedDegree, setSelectedDegree] = useState<string>("BBA");
  const [selectedBatch, setSelectedBatch] = useState<string>("2026");
  const [selectedSection, setSelectedSection] = useState<string>("BBA01B");
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Client-side localStorage hydration
  useEffect(() => {
    try {
      // 1. Load Theme Preference
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else if (savedTheme === "light") {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      } else {
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
          setIsDarkMode(true);
          document.documentElement.classList.add("dark");
        }
      }

      // 2. Load Timetable Selections
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.degree && degreesMeta[parsed.degree]) {
          setSelectedDegree(parsed.degree);
          if (parsed.batch) setSelectedBatch(parsed.batch);
          if (parsed.section) setSelectedSection(parsed.section);
          if (parsed.day && DAYS.includes(parsed.day)) setSelectedDay(parsed.day);
        }
      }
    } catch (e) {
      console.warn("Failed to load saved timetable preferences:", e);
    } finally {
      setIsHydrated(true);
    }
  }, [degreesMeta]);

  // Persist selections to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const prefs = {
        degree: selectedDegree,
        batch: selectedBatch,
        section: selectedSection,
        day: selectedDay,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.warn("Failed to save timetable preferences:", e);
    }
  }, [selectedDegree, selectedBatch, selectedSection, selectedDay, isHydrated]);

  // Toggle Theme Handler
  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    try {
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem(THEME_STORAGE_KEY, "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem(THEME_STORAGE_KEY, "light");
      }
    } catch (e) {
      console.warn("Failed to save theme preference:", e);
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Dynamic Batches
  const availableBatches = useMemo(() => {
    if (!selectedDegree || !degreesMeta[selectedDegree]) return [];
    return degreesMeta[selectedDegree].batches;
  }, [selectedDegree, degreesMeta]);

  // Dynamic Sections
  const availableSections = useMemo(() => {
    if (!selectedDegree) return [];
    const secSet = new Set<string>();

    schedule.forEach((item) => {
      if (item.degree_code === selectedDegree) {
        if (!selectedBatch || item.batch === selectedBatch || item.batch === "All") {
          secSet.add(item.section_code);
        }
      }
    });

    const list = Array.from(secSet).sort();
    return list.length > 0 ? list : (degreesMeta[selectedDegree]?.sections || []);
  }, [selectedDegree, selectedBatch, schedule, degreesMeta]);

  // Cascading Handlers
  const handleDegreeChange = (degreeCode: string) => {
    setSelectedDegree(degreeCode);
    const newBatches = degreesMeta[degreeCode]?.batches || [];
    const defaultBatch = newBatches[0] || "";
    setSelectedBatch(defaultBatch);

    const candidateSections = schedule
      .filter((s) => s.degree_code === degreeCode && (s.batch === defaultBatch || defaultBatch === ""))
      .map((s) => s.section_code);

    const firstSec = candidateSections[0] || degreesMeta[degreeCode]?.sections[0] || "";
    setSelectedSection(firstSec);
  };

  const handleBatchChange = (batch: string) => {
    setSelectedBatch(batch);
    const candidateSections = schedule
      .filter((s) => s.degree_code === selectedDegree && (s.batch === batch || batch === ""))
      .map((s) => s.section_code);

    if (candidateSections.length > 0 && !candidateSections.includes(selectedSection)) {
      setSelectedSection(candidateSections[0]);
    }
  };

  // Filtered List sorted chronologically
  const filteredSchedule = useMemo(() => {
    return schedule
      .filter((item) => {
        if (!item.course_title || item.course_title.trim() === "" || item.course_title === item.section_code) {
          return false;
        }
        if (item.course_code === "GENERIC") {
          return false;
        }

        const matchesDegree = !selectedDegree || item.degree_code === selectedDegree;
        const matchesBatch = !selectedBatch || item.batch === selectedBatch || item.batch === "All";
        const matchesSection = !selectedSection || item.section_code === selectedSection || item.section_code === "ALL";
        const matchesDay = !selectedDay || item.day.toLowerCase() === selectedDay.toLowerCase();

        return matchesDegree && matchesBatch && matchesSection && matchesDay;
      })
      .sort((a, b) => {
        const timeA = a.start_minutes ?? getMinutesFromTime(a.start_time);
        const timeB = b.start_minutes ?? getMinutesFromTime(b.start_time);
        if (timeA !== timeB) {
          return timeA - timeB;
        }
        return a.room.localeCompare(b.room);
      });
  }, [schedule, selectedDegree, selectedBatch, selectedSection, selectedDay]);

  // Day counts for tabs
  const weeklyDayCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    DAYS.forEach((d) => {
      counts[d] = schedule.filter(
        (s) =>
          s.course_code !== "GENERIC" &&
          s.course_title &&
          s.course_title !== s.section_code &&
          s.degree_code === selectedDegree &&
          (!selectedBatch || s.batch === selectedBatch || s.batch === "All") &&
          (!selectedSection || s.section_code === selectedSection || s.section_code === "ALL") &&
          s.day.toLowerCase() === d.toLowerCase()
      ).length;
    });
    return counts;
  }, [schedule, selectedDegree, selectedBatch, selectedSection]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 pb-20 transition-none">
      {/* Clean Academic Header */}
      <header className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              FAST School of Management
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
              Course Timetable • Fall 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="text-xs font-mono font-medium px-2.5 py-1 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {isDarkMode ? "LIGHT MODE" : "DARK MODE"}
            </button>
            <div className="hidden sm:block text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-sm">
              Islamabad Campus
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 pt-5 space-y-4">
        {/* Filter Card */}
        <section className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm p-4 space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Filter Schedule
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {filteredSchedule.length} {filteredSchedule.length === 1 ? "class" : "classes"} found
            </span>
          </div>

          <div className="space-y-3">
            {/* Degree Select */}
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                Degree Program
              </label>
              <select
                value={selectedDegree}
                onChange={(e) => handleDegreeChange(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm border border-zinc-300 dark:border-zinc-700 rounded-sm px-3 py-2 outline-none focus:border-zinc-700 dark:focus:border-zinc-400 font-normal"
              >
                {degreeOptions.map((deg) => (
                  <option key={deg.code} value={deg.code} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                    {deg.code} — {deg.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch & Section 2-Column Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Batch Select */}
              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                  Batch / Year
                </label>
                <select
                  value={selectedBatch}
                  onChange={(e) => handleBatchChange(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm border border-zinc-300 dark:border-zinc-700 rounded-sm px-3 py-2 outline-none focus:border-zinc-700 dark:focus:border-zinc-400 font-normal"
                >
                  {availableBatches.map((b) => (
                    <option key={b} value={b} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                      Batch {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section Select */}
              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                  Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-semibold text-sm border border-zinc-300 dark:border-zinc-700 rounded-sm px-3 py-2 outline-none focus:border-zinc-700 dark:focus:border-zinc-400"
                >
                  {availableSections.map((sec) => (
                    <option key={sec} value={sec} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                      {sec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Day Selector */}
        <section className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Day
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {selectedDay} Schedule
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {DAYS.map((day) => {
              const isSelected = selectedDay.toLowerCase() === day.toLowerCase();
              const count = weeklyDayCounts[day] || 0;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`py-2 px-1.5 text-center rounded-sm border text-xs cursor-pointer ${
                    isSelected
                      ? "bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-950 border-zinc-800 dark:border-zinc-200 font-semibold"
                      : "bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-normal"
                  }`}
                >
                  <div>{day.slice(0, 3)}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-400 dark:text-zinc-500"}`}>
                    {count} {count === 1 ? "class" : "classes"}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Timeline Results */}
        <section className="space-y-2.5 pt-1">
          {filteredSchedule.length === 0 ? (
            /* Empty State */
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm p-8 text-center space-y-1.5">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No classes scheduled</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                There are no classes scheduled for <span className="font-medium text-zinc-800 dark:text-zinc-200">{selectedSection}</span> on {selectedDay}.
              </p>
            </div>
          ) : (
            /* Clean Data Cards with Left/Right Split */
            filteredSchedule.map((item, idx) => (
              <div
                key={item.id + idx}
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm p-3.5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
              >
                {/* Left: Timing & Room */}
                <div className="sm:w-36 flex-shrink-0 flex sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-1">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {item.time_slot}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                    Room {item.room}
                  </div>
                </div>

                {/* Subtle Divider (for larger screens) */}
                <div className="hidden sm:block w-px bg-zinc-200 dark:bg-zinc-800 self-stretch flex-shrink-0" />

                {/* Right: Course Details & Badges */}
                <div className="flex-1 space-y-1.5">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      {item.course_title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                      {item.course_code} • {item.section_code} • Batch {item.batch}
                    </p>
                  </div>

                  {/* Clean Text Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                      {item.is_lab ? "Lab Session" : "Lecture"}
                    </span>

                    {item.is_merged_slot && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                        Extended Slot
                      </span>
                    )}

                    {item.is_elective && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                        Elective
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Attribution & Terms Footer */}
        <footer className="pt-8 pb-6 text-center text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 space-y-2 mt-8">
          <p className="font-medium text-zinc-700 dark:text-zinc-300">
            Made by <span className="font-semibold text-zinc-900 dark:text-zinc-100">Rayed Rizwan</span> (AI-C)
          </p>
          <div className="flex items-center justify-center gap-3 text-zinc-500 dark:text-zinc-400 flex-wrap">
            <a
              href="mailto:i250048@isb.nu.edu.pk"
              className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 underline-offset-2 hover:underline"
            >
              <span>📧</span>
              <span>i250048@isb.nu.edu.pk</span>
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href="https://github.com/rayed2006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 underline-offset-2 hover:underline"
            >
              <svg className="w-4 h-4 inline-block fill-current align-text-bottom mr-1" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>rayed2006</span>
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline-offset-2 hover:underline cursor-pointer"
            >
              [ Terms & Privacy ]
            </button>
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600 pt-0.5">
            FAST National University • School of Management
          </p>
        </footer>
      </main>

      {/* Minimalist Terms & Privacy Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-100"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm max-w-lg w-full p-5 space-y-4 shadow-none text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                Terms & Privacy Policy
              </h2>
            </div>

            {/* Modal Body */}
            <div className="space-y-3.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              <div className="space-y-1">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs font-mono">
                  Terms of Use
                </h3>
                <p>
                  You use this website at your own risk. We provide the timetable &apos;as is&apos; without any guarantees. Schedule data is synced from official FAST School of Management sources. You agree not to redistribute the service or build competing scrapers against it. We reserve the right to change terms without notice.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs font-mono">
                  Privacy Policy
                </h3>
                <p>
                  We use Vercel Analytics to gather anonymous usage statistics (page views, device type, etc.). No personally identifiable information (PII) is collected. Local storage is used strictly to remember your selected degree, batch, and section preferences.
                </p>
              </div>
            </div>

            {/* Modal Footer Action */}
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm transition-none cursor-pointer text-center"
              >
                [ CLOSE ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
