"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar";

const CATEGORIES = ["All", "Logical", "Mathematical", "Arrangement"];

export default function PuzzlesPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [toggling, setToggling] = useState(null);

  async function loadPuzzles() {
    const res = await fetch("/api/puzzles");
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    loadPuzzles();
  }, []);

  const handleToggle = async (puzzleId) => {
    if (!data) return;
    const currentUser = data.users.find((u) => u.clerkId === data.currentClerkId);
    if (!currentUser) return;

    // Optimistic update — flip state instantly
    setData((prev) => ({
      ...prev,
      puzzles: prev.puzzles.map((p) => {
        if (p.id !== puzzleId) return p;
        const alreadyDone = p.completions.includes(currentUser.id);
        return {
          ...p,
          completions: alreadyDone
            ? p.completions.filter((id) => id !== currentUser.id)
            : [...p.completions, currentUser.id],
        };
      }),
    }));

    // Fire API in background (no await blocking UI)
    fetch("/api/puzzles/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ puzzleId }),
    });
  };

  const filteredPuzzles = useMemo(() => {
    if (!data) return [];
    return data.puzzles.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [data, search, category]);

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

  const { users, currentClerkId } = data;
  const currentUser = users.find((u) => u.clerkId === currentClerkId);
  const partner = users.find((u) => u.clerkId !== currentClerkId);

  const myCompleted = data.puzzles.filter((p) => p.completions.includes(currentUser?.id)).length;
  const pct = Math.round((myCompleted / 100) * 100);
  const progressClass = pct < 25 ? "progress-low" : pct < 50 ? "progress-mid" : pct < 100 ? "progress-high" : "progress-full";

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="page-header animate-in">
          <h1 className="page-title">🧩 GFG Puzzle Tracker</h1>
          <p className="page-description">100 puzzles to master. Track your progress and see how your partner is doing.</p>
        </div>

        {/* Overall progress */}
        <div className="glass-card-elevated animate-in animate-in-delay-1" style={{ marginBottom: "1.5rem" }}>
          <div className="progress-container">
            <div className="progress-label">
              <span className="progress-label-text">Your Progress</span>
              <span className="progress-label-value">{myCompleted}/100 ({pct}%)</span>
            </div>
            <div className="progress-track">
              <div className={`progress-fill ${progressClass}`} style={{ width: `${pct}%` }}></div>
            </div>
          </div>
          {partner && (
            <div className="progress-container" style={{ marginTop: 16 }}>
              <div className="progress-label">
                <span className="progress-label-text">{partner.name}&apos;s Progress</span>
                <span className="progress-label-value">
                  {data.puzzles.filter((p) => p.completions.includes(partner.id)).length}/100
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill progress-high"
                  style={{
                    width: `${Math.round(
                      (data.puzzles.filter((p) => p.completions.includes(partner.id)).length / 100) * 100
                    )}%`,
                    background: "var(--gradient-cool)",
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="puzzle-controls animate-in animate-in-delay-2">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search puzzles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="puzzle-search"
          />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Puzzle list */}
        <div className="glass-card-elevated animate-in animate-in-delay-3">
          <div className="puzzle-header">
            <span>#</span>
            <span>Puzzle</span>
            <span>Category</span>
            <span style={{ textAlign: "center" }}>You</span>
            {partner && <span style={{ textAlign: "center" }}>{partner.name?.charAt(0)}</span>}
          </div>
          <div className="puzzle-grid">
            {filteredPuzzles.map((puzzle) => {
              const myDone = currentUser && puzzle.completions.includes(currentUser.id);
              const partnerDone = partner && puzzle.completions.includes(partner.id);

              return (
                <div key={puzzle.id} className={`puzzle-row ${myDone ? "completed" : ""}`}>
                  <span className="puzzle-number">{puzzle.id}</span>
                  <span className="puzzle-title">
                    {puzzle.link ? (
                      <a href={puzzle.link} target="_blank" rel="noopener noreferrer">
                        {puzzle.title}
                      </a>
                    ) : (
                      puzzle.title
                    )}
                  </span>
                  <span className="puzzle-category">{puzzle.category}</span>
                  <div className="puzzle-check">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={myDone || false}
                        disabled={toggling === puzzle.id}
                        onChange={() => handleToggle(puzzle.id)}
                        id={`puzzle-check-${puzzle.id}`}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  {partner && (
                    <span className="partner-status">{partnerDone ? "✅" : "⬜"}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
