"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      await fetch("/api/user/sync", { method: "POST" });
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </main>
      </>
    );
  }

  const { stats: userStats, currentClerkId } = stats;
  const currentUser = userStats.find((u) => u.clerkId === currentClerkId);
  const partner = userStats.find((u) => u.clerkId !== currentClerkId);

  const currentTotal = (currentUser?.puzzleCount || 0) + (currentUser?.streak || 0);
  const partnerTotal = (partner?.puzzleCount || 0) + (partner?.streak || 0);
  const currentAhead = currentTotal > partnerTotal;
  const partnerAhead = partnerTotal > currentTotal;
  const tied = currentTotal === partnerTotal;

  return (
    <>
      <Navbar />
      <main className="main-content">
        {/* Hero */}
        <div className="hero animate-in">
          <h1 className="hero-title">Keshav & Dipesh</h1>
          <p className="hero-subtitle">
            On the track to get a <strong>Data Analytics</strong> job 📊💼
          </p>
          <span className="hero-tagline">
            🎯 Solve puzzles • Practice SQL daily • Stay consistent together
          </span>
        </div>

        {/* Who's ahead */}
        {partner && (
          <div className={`ahead-banner animate-in animate-in-delay-1 ${tied ? "ahead-banner-tie" : ""}`}>
            {tied ? (
              <>🤝 You&apos;re tied! Keep pushing!</>
            ) : currentAhead ? (
              <>👑 {currentUser?.name} is in the lead!</>
            ) : (
              <>🔥 {partner?.name} is ahead — catch up!</>
            )}
          </div>
        )}

        {/* Stats Overview */}
        <div className="stats-grid animate-in animate-in-delay-2">
          <div className="glass-card stat-card">
            <div className="stat-icon stat-icon-purple">🧩</div>
            <div className="stat-info">
              <h3>{currentUser?.puzzleCount || 0}/100</h3>
              <p>Your Puzzles Solved</p>
            </div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-icon stat-icon-cyan">🗄️</div>
            <div className="stat-info">
              <h3>{currentUser?.todayDone ? "✅ Done" : "❌ Pending"}</h3>
              <p>Today&apos;s SQL (10 Qs)</p>
            </div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-icon stat-icon-amber">🔥</div>
            <div className="stat-info">
              <h3>{currentUser?.streak || 0} days</h3>
              <p>Your SQL Streak</p>
            </div>
          </div>
          {partner && (
            <div className="glass-card stat-card">
              <div className="stat-icon stat-icon-emerald">👤</div>
              <div className="stat-info">
                <h3>{partner.puzzleCount}/100</h3>
                <p>{partner.name}&apos;s Puzzles</p>
              </div>
            </div>
          )}
        </div>

        {/* Side-by-side comparison */}
        {partner && (
          <div className="comparison-grid animate-in animate-in-delay-3">
            {[currentUser, partner].map((user, idx) => {
              const isCurrentUser = user?.clerkId === currentClerkId;
              const isLeading =
                (isCurrentUser && currentAhead) || (!isCurrentUser && partnerAhead);
              const pct = Math.round(((user?.puzzleCount || 0) / 100) * 100);
              const progressClass =
                pct < 25 ? "progress-low" : pct < 50 ? "progress-mid" : pct < 100 ? "progress-high" : "progress-full";

              return (
                <div key={idx} className="glass-card-elevated user-column">
                  <div className="user-header">
                    <div className={`user-avatar ${isLeading ? "leading" : ""}`}>
                      {user?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <div className="user-name">
                        {user?.name || "Unknown"}
                        {isCurrentUser && (
                          <span className="user-badge badge-you" style={{ marginLeft: 8 }}>You</span>
                        )}
                        {isLeading && (
                          <span className="user-badge badge-leading" style={{ marginLeft: 8 }}>👑 Leading</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="progress-container" style={{ marginBottom: 16 }}>
                    <div className="progress-label">
                      <span className="progress-label-text">Puzzle Progress</span>
                      <span className="progress-label-value">{user?.puzzleCount || 0}/100</span>
                    </div>
                    <div className="progress-track">
                      <div className={`progress-fill ${progressClass}`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>

                  <div className={`today-status ${user?.todayDone ? "today-done" : "today-pending"}`}>
                    {user?.todayDone ? "✅" : "❌"} Today&apos;s SQL:{" "}
                    {user?.todayDone ? "Completed" : "Not Done"}
                  </div>

                  <div className="streak-display" style={{ marginTop: 12 }}>
                    <span className="streak-fire">🔥</span>
                    <span className="streak-count">{user?.streak || 0}</span>
                    <span className="streak-label">day streak</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
