"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function SqlPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  async function loadData() {
    const res = await fetch("/api/sql");
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleToggle = async () => {
    setToggling(true);
    await fetch("/api/sql/toggle", { method: "POST" });
    await loadData();
    setToggling(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <div className="loading-spinner"><div className="spinner"></div></div>
        </main>
      </>
    );
  }

  const { users, entriesByUser, currentClerkId } = data;
  const currentUser = users.find((u) => u.clerkId === currentClerkId);
  const partner = users.find((u) => u.clerkId !== currentClerkId);

  // Generate last 30 days
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  const todayStr = today.toISOString().split("T")[0];

  // Calculate streaks
  function calcStreak(userId) {
    const dates = entriesByUser[userId] || [];
    let streak = 0;
    let checkDate = new Date(today);

    // If today not done, start from yesterday
    if (!dates.includes(todayStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const ds = checkDate.toISOString().split("T")[0];
      if (dates.includes(ds)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
      if (streak > 365) break;
    }
    return streak;
  }

  const myDoneToday = currentUser && (entriesByUser[currentUser.id] || []).includes(todayStr);

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="page-header animate-in">
          <h1 className="page-title">🗄️ Daily SQL Tracker</h1>
          <p className="page-description">Solve 10 SQL questions every day. Stay consistent, build your streak!</p>
        </div>

        {/* Today's Toggle */}
        <div className="glass-card-elevated animate-in animate-in-delay-1 sql-toggle-section">
          <p className="sql-today-label">
            Today — {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <button
            className={`toggle-btn ${myDoneToday ? "toggle-btn-done" : "toggle-btn-pending"}`}
            onClick={handleToggle}
            disabled={toggling}
            id="sql-toggle-btn"
          >
            {toggling ? "..." : myDoneToday ? "✅ Completed! (click to undo)" : "📝 Mark as Done"}
          </button>
          <p className="sql-question-goal">Goal: 10 SQL questions per day</p>
        </div>

        {/* Calendars */}
        <div className="comparison-grid animate-in animate-in-delay-2">
          {[currentUser, partner].filter(Boolean).map((user) => {
            const isCurrentUser = user.clerkId === currentClerkId;
            const userDates = entriesByUser[user.id] || [];
            const streak = calcStreak(user.id);

            return (
              <div key={user.id} className="glass-card-elevated user-column">
                <div className="user-header">
                  <div className="user-avatar">
                    {user.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <div className="user-name">
                      {user.name}
                      {isCurrentUser && (
                        <span className="user-badge badge-you" style={{ marginLeft: 8 }}>You</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Streak */}
                <div className="streak-display" style={{ marginBottom: 16 }}>
                  <span className="streak-fire">🔥</span>
                  <span className="streak-count">{streak}</span>
                  <span className="streak-label">day streak</span>
                </div>

                {/* Calendar grid */}
                <div className="sql-calendar">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="calendar-day-header">{d}</div>
                  ))}

                  {/* Empty cells for alignment */}
                  {Array.from({ length: days[0].getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-day empty"></div>
                  ))}

                  {days.map((day) => {
                    const dateStr = day.toISOString().split("T")[0];
                    const isDone = userDates.includes(dateStr);
                    const isToday = dateStr === todayStr;
                    const isFuture = day > today;

                    let className = "calendar-day";
                    if (isFuture) className += " future";
                    else if (isToday) className += isDone ? " done" : " today";
                    else if (isDone) className += " done";
                    else className += " missed";

                    return (
                      <div
                        key={dateStr}
                        className={className}
                        onClick={isToday && isCurrentUser ? handleToggle : undefined}
                        title={`${dateStr}${isDone ? " ✅" : ""}`}
                      >
                        <span className="calendar-day-date">{day.getDate()}</span>
                        {!isFuture && (
                          <span className="calendar-day-icon">
                            {isDone ? "✅" : isToday ? "📝" : "·"}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
