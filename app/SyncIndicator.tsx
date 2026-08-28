"use client";

import React, { useState, useEffect } from "react";

interface SyncIndicatorProps {
  timestamp?: string;
  showDot?: boolean;
  className?: string;
  prefix?: string;
}

export default function SyncIndicator({
  timestamp,
  showDot = false,
  className = "",
  prefix = "Last synced: ",
}: SyncIndicatorProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !timestamp) {
    return (
      <span className={className}>
        {showDot && (
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 inline-block mr-1" />
        )}
        <span>{prefix}updating...</span>
      </span>
    );
  }

  let formatted = "updating...";
  try {
    const dateObj = new Date(timestamp);
    if (!isNaN(dateObj.getTime())) {
      formatted = dateObj.toLocaleString("en-US", {
        timeZone: "Asia/Karachi",
        dateStyle: "medium",
        timeStyle: "short",
      });
    }
  } catch {
    formatted = timestamp;
  }

  return (
    <span className={className}>
      {showDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
      )}
      <span>
        {prefix}
        {formatted}
      </span>
    </span>
  );
}
