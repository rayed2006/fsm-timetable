(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$timetable$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/timetable.json.[json].cjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
];
const STORAGE_KEY = "fsm_timetable_prefs_v1";
function HomePage() {
    _s();
    const schedule = __TURBOPACK__imported__module__$5b$project$5d2f$timetable$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].schedule;
    const degreesMeta = __TURBOPACK__imported__module__$5b$project$5d2f$timetable$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].degrees;
    const degreeOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[degreeOptions]": ()=>{
            return Object.keys(degreesMeta).map({
                "HomePage.useMemo[degreeOptions]": (key)=>({
                        code: key,
                        name: degreesMeta[key].name
                    })
            }["HomePage.useMemo[degreeOptions]"]);
        }
    }["HomePage.useMemo[degreeOptions]"], [
        degreesMeta
    ]);
    // States
    const [selectedDegree, setSelectedDegree] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("BBA");
    const [selectedBatch, setSelectedBatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("2026");
    const [selectedSection, setSelectedSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("BBA01B");
    const [selectedDay, setSelectedDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Monday");
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Client-side localStorage hydration (safe against SSR mismatch)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            try {
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
            } finally{
                setIsHydrated(true);
            }
        }
    }["HomePage.useEffect"], [
        degreesMeta
    ]);
    // Persist preferences to localStorage when selections change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            if (!isHydrated) return;
            try {
                const prefs = {
                    degree: selectedDegree,
                    batch: selectedBatch,
                    section: selectedSection,
                    day: selectedDay
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
            } catch (e) {
                console.warn("Failed to save timetable preferences:", e);
            }
        }
    }["HomePage.useEffect"], [
        selectedDegree,
        selectedBatch,
        selectedSection,
        selectedDay,
        isHydrated
    ]);
    // Dynamic Batches
    const availableBatches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[availableBatches]": ()=>{
            if (!selectedDegree || !degreesMeta[selectedDegree]) return [];
            return degreesMeta[selectedDegree].batches;
        }
    }["HomePage.useMemo[availableBatches]"], [
        selectedDegree,
        degreesMeta
    ]);
    // Dynamic Sections
    const availableSections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[availableSections]": ()=>{
            if (!selectedDegree) return [];
            const secSet = new Set();
            schedule.forEach({
                "HomePage.useMemo[availableSections]": (item)=>{
                    if (item.degree_code === selectedDegree) {
                        if (!selectedBatch || item.batch === selectedBatch || item.batch === "All") {
                            secSet.add(item.section_code);
                        }
                    }
                }
            }["HomePage.useMemo[availableSections]"]);
            const list = Array.from(secSet).sort();
            return list.length > 0 ? list : degreesMeta[selectedDegree]?.sections || [];
        }
    }["HomePage.useMemo[availableSections]"], [
        selectedDegree,
        selectedBatch,
        schedule,
        degreesMeta
    ]);
    // Cascading Handlers
    const handleDegreeChange = (degreeCode)=>{
        setSelectedDegree(degreeCode);
        const newBatches = degreesMeta[degreeCode]?.batches || [];
        const defaultBatch = newBatches[0] || "";
        setSelectedBatch(defaultBatch);
        const candidateSections = schedule.filter((s)=>s.degree_code === degreeCode && (s.batch === defaultBatch || defaultBatch === "")).map((s)=>s.section_code);
        const firstSec = candidateSections[0] || degreesMeta[degreeCode]?.sections[0] || "";
        setSelectedSection(firstSec);
    };
    const handleBatchChange = (batch)=>{
        setSelectedBatch(batch);
        const candidateSections = schedule.filter((s)=>s.degree_code === selectedDegree && (s.batch === batch || batch === "")).map((s)=>s.section_code);
        if (candidateSections.length > 0 && !candidateSections.includes(selectedSection)) {
            setSelectedSection(candidateSections[0]);
        }
    };
    // Filtered List
    const filteredSchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[filteredSchedule]": ()=>{
            return schedule.filter({
                "HomePage.useMemo[filteredSchedule]": (item)=>{
                    const matchesDegree = !selectedDegree || item.degree_code === selectedDegree;
                    const matchesBatch = !selectedBatch || item.batch === selectedBatch || item.batch === "All";
                    const matchesSection = !selectedSection || item.section_code === selectedSection || item.section_code === "ALL";
                    const matchesDay = !selectedDay || item.day.toLowerCase() === selectedDay.toLowerCase();
                    return matchesDegree && matchesBatch && matchesSection && matchesDay;
                }
            }["HomePage.useMemo[filteredSchedule]"]).sort({
                "HomePage.useMemo[filteredSchedule]": (a, b)=>a.start_time.localeCompare(b.start_time)
            }["HomePage.useMemo[filteredSchedule]"]);
        }
    }["HomePage.useMemo[filteredSchedule]"], [
        schedule,
        selectedDegree,
        selectedBatch,
        selectedSection,
        selectedDay
    ]);
    // Day counts for tabs
    const weeklyDayCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[weeklyDayCounts]": ()=>{
            const counts = {};
            DAYS.forEach({
                "HomePage.useMemo[weeklyDayCounts]": (d)=>{
                    counts[d] = schedule.filter({
                        "HomePage.useMemo[weeklyDayCounts]": (s)=>s.degree_code === selectedDegree && (!selectedBatch || s.batch === selectedBatch || s.batch === "All") && (!selectedSection || s.section_code === selectedSection || s.section_code === "ALL") && s.day.toLowerCase() === d.toLowerCase()
                    }["HomePage.useMemo[weeklyDayCounts]"]).length;
                }
            }["HomePage.useMemo[weeklyDayCounts]"]);
            return counts;
        }
    }["HomePage.useMemo[weeklyDayCounts]"], [
        schedule,
        selectedDegree,
        selectedBatch,
        selectedSection
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-zinc-50 text-zinc-900 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white border-b border-zinc-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-sm font-bold tracking-tight text-zinc-900",
                                    children: "FAST School of Management"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-zinc-500 font-normal",
                                    children: "Course Timetable • Fall 2026"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-medium text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-sm",
                            children: "Islamabad Campus"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-2xl mx-auto px-4 pt-5 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-white border border-zinc-200 rounded-sm p-4 space-y-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between pb-2 border-b border-zinc-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-zinc-700 uppercase tracking-wider",
                                        children: "Filter Schedule"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-zinc-500",
                                        children: [
                                            filteredSchedule.length,
                                            " ",
                                            filteredSchedule.length === 1 ? "class" : "classes",
                                            " found"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-zinc-600 mb-1",
                                                children: "Degree Program"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: selectedDegree,
                                                onChange: (e)=>handleDegreeChange(e.target.value),
                                                className: "w-full bg-white text-zinc-900 text-sm border border-zinc-300 rounded-sm px-3 py-2 outline-none focus:border-zinc-700 font-normal",
                                                children: degreeOptions.map((deg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: deg.code,
                                                        children: [
                                                            deg.code,
                                                            " — ",
                                                            deg.name
                                                        ]
                                                    }, deg.code, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-medium text-zinc-600 mb-1",
                                                        children: "Batch / Year"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedBatch,
                                                        onChange: (e)=>handleBatchChange(e.target.value),
                                                        className: "w-full bg-white text-zinc-900 text-sm border border-zinc-300 rounded-sm px-3 py-2 outline-none focus:border-zinc-700 font-normal",
                                                        children: availableBatches.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: b,
                                                                children: [
                                                                    "Batch ",
                                                                    b
                                                                ]
                                                            }, b, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 230,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 220,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-medium text-zinc-600 mb-1",
                                                        children: "Section"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedSection,
                                                        onChange: (e)=>setSelectedSection(e.target.value),
                                                        className: "w-full bg-white text-zinc-900 font-semibold text-sm border border-zinc-300 rounded-sm px-3 py-2 outline-none focus:border-zinc-700",
                                                        children: availableSections.map((sec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: sec,
                                                                children: sec
                                                            }, sec, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 238,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-zinc-500 uppercase tracking-wider",
                                        children: "Day"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-zinc-500",
                                        children: [
                                            selectedDay,
                                            " Schedule"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-5 gap-1.5",
                                children: DAYS.map((day)=>{
                                    const isSelected = selectedDay.toLowerCase() === day.toLowerCase();
                                    const count = weeklyDayCounts[day] || 0;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedDay(day),
                                        className: `py-2 px-1.5 text-center rounded-sm border text-xs ${isSelected ? "bg-zinc-800 text-white border-zinc-800 font-semibold" : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50 font-normal"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: day.slice(0, 3)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-[10px] mt-0.5 ${isSelected ? "text-zinc-300" : "text-zinc-400"}`,
                                                children: [
                                                    count,
                                                    " ",
                                                    count === 1 ? "class" : "classes"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 284,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, day, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 274,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "space-y-2.5 pt-1",
                        children: filteredSchedule.length === 0 ? /* Empty State */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white border border-zinc-200 rounded-sm p-8 text-center space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-semibold text-zinc-900",
                                    children: "No classes scheduled"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 298,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-zinc-500 max-w-xs mx-auto",
                                    children: [
                                        "There are no classes scheduled for ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-zinc-800",
                                            children: selectedSection
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 300,
                                            columnNumber: 52
                                        }, this),
                                        " on ",
                                        selectedDay,
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 297,
                            columnNumber: 13
                        }, this) : /* Clean Data Cards with Left/Right Split */ filteredSchedule.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-zinc-200 rounded-sm p-3.5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sm:w-36 flex-shrink-0 flex sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-semibold text-zinc-900 tracking-tight",
                                                children: item.time_slot
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-zinc-500 font-normal",
                                                children: [
                                                    "Room ",
                                                    item.room
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 311,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:block w-px bg-zinc-200 self-stretch flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-sm font-bold text-zinc-900 leading-snug",
                                                        children: item.course_title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-zinc-500 font-normal",
                                                        children: [
                                                            item.course_code,
                                                            " • ",
                                                            item.section_code,
                                                            " • Batch ",
                                                            item.batch
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 325,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-1.5 pt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-medium px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-700 border border-zinc-200",
                                                        children: item.is_lab ? "Lab Session" : "Lecture"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 21
                                                    }, this),
                                                    item.is_merged_slot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-medium px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-600 border border-zinc-200",
                                                        children: "Extended Slot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 23
                                                    }, this),
                                                    item.is_elective && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-medium px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-600 border border-zinc-200",
                                                        children: "Elective"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 335,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 324,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.id + idx, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 306,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "pt-8 pb-4 text-center text-xs text-zinc-400 space-y-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "FAST National University • School of Management"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Official Schedule Database"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_s(HomePage, "W4C2E3axaY35pczmSucT3Be7FG4=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/timetable.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("{\"metadata\":{\"institution\":\"FAST School of Management, Islamabad\",\"semester_session\":\"Fall 2026\",\"supported_degrees\":[\"BBA\",\"BSBA\",\"BSAF\",\"BSFT\"],\"total_classes\":66,\"generated_at\":\"2026-08-22T14:07:35.475352\"},\"degrees\":{\"BBA\":{\"name\":\"Bachelor of Business Administration\",\"code\":\"BBA\",\"batches\":[\"2023\",\"2024\",\"2025\",\"2026\"],\"sections\":[\"BBA01B\",\"BBA01C\",\"BBA03A\",\"BBA03B\",\"BBA03C\",\"BBA05A\",\"BBA05B\",\"BBA07A\",\"BBA07B\"]},\"BSBA\":{\"name\":\"BS (Business Analytics)\",\"code\":\"BSBA\",\"batches\":[\"2024\",\"2025\",\"2026\"],\"sections\":[\"BSBA01A\",\"BSBA01C\",\"BSBA03A\",\"BSBA03C\",\"BSBA05B\",\"BSBA05C\"]},\"BSAF\":{\"name\":\"BS (Accounting & Finance)\",\"code\":\"BSAF\",\"batches\":[\"2023\",\"2024\",\"2025\",\"2026\"],\"sections\":[\"AF01A\",\"AF01C\",\"AF03A\",\"AF05A\",\"AF05C\",\"AF07A\",\"AF07B\"]},\"BSFT\":{\"name\":\"BS (Financial Technology)\",\"code\":\"BSFT\",\"batches\":[\"2023\",\"2024\",\"2025\"],\"sections\":[\"ALL\",\"FT03C\",\"FT05A\",\"FT05B\",\"FT05C\",\"FT07A\",\"FT07B\"]}},\"schedule\":[{\"id\":\"Mon-A-01-0830-BBA01B-SS1016\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-01\",\"time_slot\":\"08:30 - 10:20\",\"start_time\":\"08:30\",\"end_time\":\"10:20\",\"course_code\":\"SS1016\",\"course_title\":\"English I\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"BBA01B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"SS1016 English - I (08:30-10:20) BBA01B\"},{\"id\":\"Mon-A-01-1130-AF01A-SS1016\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-01\",\"time_slot\":\"11:30 - 01:20\",\"start_time\":\"11:30\",\"end_time\":\"01:20\",\"course_code\":\"SS1016\",\"course_title\":\"English I\",\"is_lab\":false,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"AF01A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"SS1016 English - I (11:30-01:20) AF01A\"},{\"id\":\"Mon-A-01-0225-BSBA05C-MG2003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-01\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"MG2003\",\"course_title\":\"Consumer Behaviour\",\"is_lab\":false,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BSBA05C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG2003 Consumer Behaviour BSBA05C\"},{\"id\":\"Mon-A-02-0830-AF07B-MG4011\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-02\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"MG4011\",\"course_title\":\"Entrepreneurship\",\"is_lab\":false,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"AF07B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG4011 Entrepreneurship AF07B\"},{\"id\":\"Mon-A-02-1000-AF07A-MG4011\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-02\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"MG4011\",\"course_title\":\"Entrepreneurship\",\"is_lab\":false,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"AF07A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG4011 Entrepreneurship AF07A\"},{\"id\":\"Mon-A-02-1130-AF01A-AF1003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-02\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"AF1003\",\"course_title\":\"Intro to Financial Accounting\",\"is_lab\":false,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"AF01A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF1003 Intro to Financial Accounting AF01A\"},{\"id\":\"Mon-A-02-0100-BBA01B-AF1003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-02\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"AF1003\",\"course_title\":\"Intro to Financial Accounting\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"BBA01B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF1003 Intro to Financial Accounting BBA01B\"},{\"id\":\"Mon-A-02-0225-BBA07B-AF3003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-02\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"AF3003\",\"course_title\":\"Financial Institutions & Markets\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"BBA07B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF3003 Financial Institutions & Markets BBA07B\"},{\"id\":\"Mon-A-02-0350-BBA07A-AF3003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-02\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"AF3003\",\"course_title\":\"Financial Institutions & Markets\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"BBA07A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF3003 Financial Institutions & Markets BBA07A\"},{\"id\":\"Mon-A-03-0830-AF07A-AF4005\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-03\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"AF4005\",\"course_title\":\"Audit & Assurance\",\"is_lab\":false,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"AF07A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF4005 Audit & Assurance AF07A\"},{\"id\":\"Mon-A-03-1000-AF07B-AF4005\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-03\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"AF4005\",\"course_title\":\"Audit & Assurance\",\"is_lab\":false,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"AF07B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF4005 Audit & Assurance AF07B\"},{\"id\":\"Mon-A-03-1130-BBA07B-MG4003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-03\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"MG4003\",\"course_title\":\"Strategic Management\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"BBA07B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"MG4003 Strategic Management BBA07B\"},{\"id\":\"Mon-A-03-0100-BBA07B-MG4003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-03\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"MG4003\",\"course_title\":\"Strategic Management\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"BBA07B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"MG4003 Strategic Management BBA07B\"},{\"id\":\"Mon-A-03-0225-BBA07A-MG4003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-03\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"MG4003\",\"course_title\":\"Strategic Management\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"BBA07A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG4003 Strategic Management BBA07A\"},{\"id\":\"Mon-A-04-0830-BBA05B-MG2003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-04\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"MG2003\",\"course_title\":\"Consumer Behaviour\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BBA05B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG2003 Consumer Behaviour BBA05B\"},{\"id\":\"Mon-A-04-1000-BBA05B-AF3001\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-04\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"AF3001\",\"course_title\":\"Financial Management\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BBA05B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF 3001 Financial Management BBA05B\"},{\"id\":\"Mon-A-04-1130-FT07A-AF4011\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-04\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"AF4011\",\"course_title\":\"Investment and Portfolio Analytics\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"FT07A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF4011 Investment and Portfolio Analytics FT07A\"},{\"id\":\"Mon-A-04-0100-FT07B-AF4011\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-04\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"AF4011\",\"course_title\":\"Investment and Portfolio Analytics\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"FT07B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF4011 Investment and Portfolio Analytics FT07B\"},{\"id\":\"Mon-A-04-0225-FT05B-MG3003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-04\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"MG3003\",\"course_title\":\"Basic Econometrics\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"FT05B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG3003 Basic Econometrics FT05B\"},{\"id\":\"Mon-A-04-0350-FT05B-MG3003\",\"day\":\"Monday\",\"category\":\"Classes\",\"room\":\"A-04\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"MG3003\",\"course_title\":\"Basic Econometrics\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"FT05B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG3003 Basic Econometrics FT05B\"},{\"id\":\"Mon-KK-I-0830-BSBA01A-CL1001\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"CL1001\",\"course_title\":\"IT in Business Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"BSBA01A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"CL1001 IT in Business - Lab BSBA01A\"},{\"id\":\"Mon-KK-I-1000-BSBA01A-CL1001\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"CL1001\",\"course_title\":\"IT in Business Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"BSBA01A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"CL1001 IT in Business - Lab BSBA01A\"},{\"id\":\"Mon-KK-I-1130-AF03A-LG2009\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"LG2009\",\"course_title\":\"Data Analysis for Business II Lab\",\"is_lab\":true,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"AF03A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"LG2009 Data Analysis for Business - II Lab AF03A\"},{\"id\":\"Mon-KK-I-0100-AF03A-LG2009\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"LG2009\",\"course_title\":\"Data Analysis for Business II Lab\",\"is_lab\":true,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"AF03A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"LG2009 Data Analysis for Business - II Lab AF03A\"},{\"id\":\"Mon-KK-I-0225-BBA05A-FL3001\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"FL3001\",\"course_title\":\"Financial Management Lab\",\"is_lab\":true,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BBA05A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"FL3001 Financial Management Lab BBA05A\"},{\"id\":\"Mon-KK-I-0350-BBA05A-FL3001\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"FL3001\",\"course_title\":\"Financial Management Lab\",\"is_lab\":true,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BBA05A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"FL3001 Financial Management Lab BBA05A\"},{\"id\":\"Mon-KK-II-0830-BSBA03C-LG2009\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-II\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"LG2009\",\"course_title\":\"Data Analysis for Business II Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BSBA03C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"LG2009 Data Analysis for Business - II Lab BSBA03C\"},{\"id\":\"Mon-KK-II-1000-BSBA03C-LG2009\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-II\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"LG2009\",\"course_title\":\"Data Analysis for Business II Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BSBA03C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"LG2009 Data Analysis for Business - II Lab BSBA03C\"},{\"id\":\"Mon-KK-II-1130-AF05C-CL1001\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-II\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"CL1001\",\"course_title\":\"IT in Business Lab\",\"is_lab\":true,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"AF05C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CL1001 IT in Business - Lab AF05C\"},{\"id\":\"Mon-KK-II-0100-AF05C-CL1001\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-II\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"CL1001\",\"course_title\":\"IT in Business Lab\",\"is_lab\":true,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"AF05C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CL1001 IT in Business - Lab AF05C\"},{\"id\":\"Mon-KK-II-0225-FT03C-GENERIC\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-II\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"GENERIC\",\"course_title\":\"2 Introduction to Object Oriented Programming\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"FT03C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"2 Introduction to Object Oriented Programming FT03C\"},{\"id\":\"Mon-KK-II-0350-FT03C-GENERIC\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"KK-II\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"GENERIC\",\"course_title\":\"2 Introduction to Object Oriented Programming\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"FT03C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"2 Introduction to Object Oriented Programming FT03C\"},{\"id\":\"Mon-Khyber_I-0830-BSBA05B-CS2003\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Khyber I\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"CS2003\",\"course_title\":\"Data Structures and Business Applications\",\"is_lab\":false,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BSBA05B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CS2003 Data Structures and Business Applications BSBA05B\"},{\"id\":\"Mon-Khyber_I-1000-AF01C-CL1001\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Khyber I\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"CL1001\",\"course_title\":\"IT in Business Lab\",\"is_lab\":true,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"AF01C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CL1001 IT in Business - Lab AF01C\"},{\"id\":\"Mon-Khyber_I-1130-AF05C-LG3003\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Khyber I\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"LG3003\",\"course_title\":\"Basic Econometrics Lab\",\"is_lab\":true,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"AF05C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"LG3003 Basic Econometrics Lab AF05C\"},{\"id\":\"Mon-Khyber_I-0100-AF05C-LG3003\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Khyber I\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"LG3003\",\"course_title\":\"Basic Econometrics Lab\",\"is_lab\":true,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"AF05C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"LG3003 Basic Econometrics Lab AF05C\"},{\"id\":\"Mon-Khyber_I-0225-BBA03C-LG2009\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Khyber I\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"LG2009\",\"course_title\":\"Data Analysis for Business II Lab\",\"is_lab\":true,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BBA03C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"LG2009 Data Analysis for Business - II Lab BBA03C\"},{\"id\":\"Mon-Khyber_I-0350-BBA03C-LG2009\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Khyber I\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"LG2009\",\"course_title\":\"Data Analysis for Business II Lab\",\"is_lab\":true,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BBA03C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"LG2009 Data Analysis for Business - II Lab BBA03C\"},{\"id\":\"Mon-Cal-I_lab-0830-ALL-SL1016\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Cal-I lab\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"SL1016\",\"course_title\":\"English I Lab FT01D1\",\"is_lab\":true,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"All\",\"semester\":null,\"section_code\":\"ALL\",\"section_letter\":\"ALL\",\"is_elective\":true,\"is_merged_slot\":true,\"raw_text\":\"SL1016 English - I - Lab FT01D1\"},{\"id\":\"Mon-Cal-I_lab-1000-ALL-SL1016\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Cal-I lab\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"SL1016\",\"course_title\":\"English I Lab FT01D1\",\"is_lab\":true,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"All\",\"semester\":null,\"section_code\":\"ALL\",\"section_letter\":\"ALL\",\"is_elective\":true,\"is_merged_slot\":true,\"raw_text\":\"SL1016 English - I - Lab FT01D1\"},{\"id\":\"Mon-Cal-I_lab-0225-ALL-SL1016\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Cal-I lab\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"SL1016\",\"course_title\":\"English I Lab FT01C1\",\"is_lab\":true,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"All\",\"semester\":null,\"section_code\":\"ALL\",\"section_letter\":\"ALL\",\"is_elective\":true,\"is_merged_slot\":false,\"raw_text\":\"SL1016 English - I - Lab FT01C1\"},{\"id\":\"Mon-Cal-I_lab-0350-ALL-SL1016\",\"day\":\"Monday\",\"category\":\"Labs\",\"room\":\"Cal-I lab\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"SL1016\",\"course_title\":\"English I Lab FT01C1\",\"is_lab\":true,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"All\",\"semester\":null,\"section_code\":\"ALL\",\"section_letter\":\"ALL\",\"is_elective\":true,\"is_merged_slot\":false,\"raw_text\":\"SL1016 English - I - Lab FT01C1\"},{\"id\":\"Tue-A-101-0830-BBA03A-AF2003\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-101\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"AF2003\",\"course_title\":\"Management Accounting\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BBA03A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF2003 Management Accounting BBA03A\"},{\"id\":\"Tue-A-101-1000-BBA05A-MG3004\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-101\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"MG3004\",\"course_title\":\"Human Resource Management\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BBA05A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG3004 Human Resource Management BBA05A\"},{\"id\":\"Tue-A-101-1130-AF07A-AF4006\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-101\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"AF4006\",\"course_title\":\"Investment Analysis & Management\",\"is_lab\":false,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"AF07A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"AF4006 Investment Analysis & Management AF07A\"},{\"id\":\"Tue-A-101-0100-BBA03A-MG2001\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-101\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"MG2001\",\"course_title\":\"Organizational Behaviour\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BBA03A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG2001 Organizational Behaviour BBA03A\"},{\"id\":\"Tue-A-101-0225-BBA01C-CS1001\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-101\",\"time_slot\":\"02:25 - 04:15\",\"start_time\":\"02:25\",\"end_time\":\"04:15\",\"course_code\":\"CS1001\",\"course_title\":\"IT in Business\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"BBA01C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CS1001 IT in Business (02:25-04:15) BBA01C\"},{\"id\":\"Tue-A-102-0830-FT05C-CS3017\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-102\",\"time_slot\":\"08:30 - 11:00\",\"start_time\":\"08:30\",\"end_time\":\"11:00\",\"course_code\":\"CS3017\",\"course_title\":\"Enterprise Systems & Applications\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"FT05C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"CS3017 Enterprise Systems & Applications (08:30-11:00) FT05C\"},{\"id\":\"Tue-A-102-1130-BBA03B-MG2003\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-102\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"MG2003\",\"course_title\":\"Consumer Behaviour\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BBA03B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG2003 Consumer Behaviour BBA03B\"},{\"id\":\"Tue-A-102-0100-BBA03A-MG2009\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-102\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"MG2009\",\"course_title\":\"Data Analysis for Business II\",\"is_lab\":false,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BBA03A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"MG2009 Data Analysis for Business II BBA03A\"},{\"id\":\"Tue-A-102-0225-FT07A-CY4053\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-102\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"CY4053\",\"course_title\":\"Cybersecurity for FinTech\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"FT07A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CY4053 Cybersecurity for FinTech FT07A/B\"},{\"id\":\"Tue-A-102-0225-FT07B-CY4053\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-102\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"CY4053\",\"course_title\":\"Cybersecurity for FinTech\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"FT07B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CY4053 Cybersecurity for FinTech FT07A/B\"},{\"id\":\"Tue-A-102-0350-FT07A-CY4053\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-102\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"CY4053\",\"course_title\":\"Cybersecurity for FinTech\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"FT07A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CY4053 Cybersecurity for FinTech FT07A/B\"},{\"id\":\"Tue-A-102-0350-FT07B-CY4053\",\"day\":\"Tuesday\",\"category\":\"Classes\",\"room\":\"A-102\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"CY4053\",\"course_title\":\"Cybersecurity for FinTech\",\"is_lab\":false,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2023\",\"semester\":7,\"section_code\":\"FT07B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CY4053 Cybersecurity for FinTech FT07A/B\"},{\"id\":\"Tue-KK-I-0830-BSBA01C-FL1003\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"FL1003\",\"course_title\":\"Introduction to Financial Accounting Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"BSBA01C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"FL1003 Introduction to Financial Accounting - Lab BSBA01C\"},{\"id\":\"Tue-KK-I-1000-BSBA01C-FL1003\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"FL1003\",\"course_title\":\"Introduction to Financial Accounting Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"BSBA01C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"FL1003 Introduction to Financial Accounting - Lab BSBA01C\"},{\"id\":\"Tue-KK-I-1130-BSBA03A-CL2016\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"CL2016\",\"course_title\":\"Programming for Business Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BSBA03A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"CL2016 Programming for Business - Lab BSBA03A\"},{\"id\":\"Tue-KK-I-0100-BSBA03A-CL2016\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"CL2016\",\"course_title\":\"Programming for Business Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2025\",\"semester\":3,\"section_code\":\"BSBA03A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"CL2016 Programming for Business - Lab BSBA03A\"},{\"id\":\"Tue-KK-I-0225-BBA01B-CL1001\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"CL1001\",\"course_title\":\"IT in Business Lab\",\"is_lab\":true,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"BBA01B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CL1001 IT in Business - Lab BBA01B\"},{\"id\":\"Tue-KK-I-0350-BBA01B-CL1001\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-I\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"CL1001\",\"course_title\":\"IT in Business Lab\",\"is_lab\":true,\"degree_code\":\"BBA\",\"degree_name\":\"Bachelor of Business Administration\",\"batch\":\"2026\",\"semester\":1,\"section_code\":\"BBA01B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CL1001 IT in Business - Lab BBA01B\"},{\"id\":\"Tue-KK-III-0830-BSBA05B-LG3003\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-III\",\"time_slot\":\"08:30 - 09:50\",\"start_time\":\"08:30\",\"end_time\":\"09:50\",\"course_code\":\"LG3003\",\"course_title\":\"Basic Econometrics Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BSBA05B\",\"section_letter\":\"B\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"LG3003 Basic Econometrics Lab BSBA05B\"},{\"id\":\"Tue-KK-III-1000-BSBA05C-LG3003\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-III\",\"time_slot\":\"10:00 - 11:20\",\"start_time\":\"10:00\",\"end_time\":\"11:20\",\"course_code\":\"LG3003\",\"course_title\":\"Basic Econometrics Lab\",\"is_lab\":true,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BSBA05C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"LG3003 Basic Econometrics Lab BSBA05C\"},{\"id\":\"Tue-KK-III-1130-BSBA05C-GENERIC\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-III\",\"time_slot\":\"11:30 - 12:50\",\"start_time\":\"11:30\",\"end_time\":\"12:50\",\"course_code\":\"GENERIC\",\"course_title\":\"003 Data Structures and Business Applications\",\"is_lab\":false,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BSBA05C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"003 Data Structures and Business Applications BSBA05C\"},{\"id\":\"Tue-KK-III-0100-BSBA05C-GENERIC\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-III\",\"time_slot\":\"01:00 - 02:20\",\"start_time\":\"01:00\",\"end_time\":\"02:20\",\"course_code\":\"GENERIC\",\"course_title\":\"003 Data Structures and Business Applications\",\"is_lab\":false,\"degree_code\":\"BSBA\",\"degree_name\":\"BS (Business Analytics)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"BSBA05C\",\"section_letter\":\"C\",\"is_elective\":false,\"is_merged_slot\":true,\"raw_text\":\"003 Data Structures and Business Applications BSBA05C\"},{\"id\":\"Tue-KK-III-0225-AF05A-CL3003\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-III\",\"time_slot\":\"02:25 - 03:45\",\"start_time\":\"02:25\",\"end_time\":\"03:45\",\"course_code\":\"CL3003\",\"course_title\":\"Management Information System Lab\",\"is_lab\":true,\"degree_code\":\"BSAF\",\"degree_name\":\"BS (Accounting & Finance)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"AF05A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"CL3003 Management Information System Lab AF05A\"},{\"id\":\"Tue-KK-III-0350-FT05A-LG3003\",\"day\":\"Tuesday\",\"category\":\"Labs\",\"room\":\"KK-III\",\"time_slot\":\"03:50 - 05:10\",\"start_time\":\"03:50\",\"end_time\":\"05:10\",\"course_code\":\"LG3003\",\"course_title\":\"Basic Econometrics Lab\",\"is_lab\":true,\"degree_code\":\"BSFT\",\"degree_name\":\"BS (Financial Technology)\",\"batch\":\"2024\",\"semester\":5,\"section_code\":\"FT05A\",\"section_letter\":\"A\",\"is_elective\":false,\"is_merged_slot\":false,\"raw_text\":\"LG3003 Basic Econometrics Lab FT05A\"}]}");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1yyxqj-._.js.map