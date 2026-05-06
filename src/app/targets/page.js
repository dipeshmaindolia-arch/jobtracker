"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function TargetsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", deadline: "" });
  const [submitting, setSubmitting] = useState(false);

  async function loadTargets() {
    const res = await fetch("/api/targets");
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    loadTargets();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.deadline) return;
    setSubmitting(true);
    await fetch("/api/targets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ title: "", description: "", deadline: "" });
    setShowForm(false);
    setSubmitting(false);
    await loadTargets();
  };

  const handleStatusChange = async (id, status) => {
    await fetch(`/api/targets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await loadTargets();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this target?")) return;
    await fetch(`/api/targets/${id}`, { method: "DELETE" });
    await loadTargets();
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

  const { targets, users, currentClerkId } = data;
  const currentUser = users.find((u) => u.clerkId === currentClerkId);

  // Group targets by user
  const myTargets = targets.filter((t) => t.user.clerkId === currentClerkId);
  const partnerTargets = targets.filter((t) => t.user.clerkId !== currentClerkId);

  function getDaysLeft(deadline) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(deadline);
    d.setHours(0, 0, 0, 0);
    const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
    return diff;
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });
  }

  function renderTargetCard(target, isOwner) {
    const daysLeft = getDaysLeft(target.deadline);
    const isPending = target.status === "PENDING";
    const isCompleted = target.status === "COMPLETED";
    const isFailed = target.status === "FAILED";

    let statusClass = "target-pending";
    let statusIcon = "⏳";
    let statusText = `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;

    if (isCompleted) {
      statusClass = "target-completed";
      statusIcon = "✅";
      statusText = "Completed";
    } else if (isFailed) {
      statusClass = "target-failed";
      statusIcon = "❌";
      statusText = "Failed — missed deadline";
    } else if (daysLeft <= 0) {
      statusClass = "target-failed";
      statusIcon = "⚠️";
      statusText = "Overdue!";
    } else if (daysLeft <= 3) {
      statusClass = "target-urgent";
      statusIcon = "🔥";
      statusText = `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left — hurry!`;
    }

    return (
      <div key={target.id} className={`target-card ${statusClass}`}>
        <div className="target-card-header">
          <span className="target-card-icon">{statusIcon}</span>
          <div className="target-card-meta">
            <span className="target-card-owner">{target.user.name}</span>
            <span className="target-card-deadline">Due: {formatDate(target.deadline)}</span>
          </div>
        </div>
        <h3 className="target-card-title">{target.title}</h3>
        {target.description && (
          <p className="target-card-desc">{target.description}</p>
        )}
        <div className="target-card-footer">
          <span className={`target-status-badge ${statusClass}`}>{statusText}</span>
          {isOwner && isPending && (
            <div className="target-card-actions">
              <button
                className="target-btn target-btn-complete"
                onClick={() => handleStatusChange(target.id, "COMPLETED")}
                title="Mark as completed"
              >
                ✅ Done
              </button>
              <button
                className="target-btn target-btn-delete"
                onClick={() => handleDelete(target.id)}
                title="Delete target"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="page-header animate-in">
          <h1 className="page-title">🎯 Targets & Goals</h1>
          <p className="page-description">
            Set project goals with deadlines. If you miss it, everyone sees! Stay accountable 💪
          </p>
        </div>

        {/* Add Target Button */}
        <div className="animate-in animate-in-delay-1" style={{ marginBottom: "1.5rem" }}>
          {!showForm ? (
            <button
              className="toggle-btn toggle-btn-pending"
              onClick={() => setShowForm(true)}
              id="add-target-btn"
            >
              ➕ Add New Target
            </button>
          ) : (
            <form className="glass-card-elevated target-form" onSubmit={handleCreate}>
              <h3 style={{ marginBottom: 16, fontSize: "1.1rem" }}>📝 New Target</h3>
              <div className="form-group">
                <label className="form-label">What&apos;s the target?</label>
                <input
                  type="text"
                  className="search-input"
                  placeholder="e.g. Build Power BI dashboard project"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  id="target-title-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description (optional)</label>
                <input
                  type="text"
                  className="search-input"
                  placeholder="e.g. Sales dashboard with DAX measures"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  id="target-desc-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  className="search-input"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                  id="target-deadline-input"
                />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button type="submit" className="toggle-btn toggle-btn-pending" disabled={submitting}>
                  {submitting ? "Creating..." : "🚀 Create Target"}
                </button>
                <button
                  type="button"
                  className="toggle-btn"
                  style={{ background: "#e2e8f0", color: "#475569" }}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* My targets */}
        <div className="animate-in animate-in-delay-2">
          <div className="section-header">
            <h2 className="section-title">📌 My Targets</h2>
          </div>
          {myTargets.length === 0 ? (
            <div className="glass-card" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
              No targets yet. Set one above! 🎯
            </div>
          ) : (
            <div className="targets-grid">
              {myTargets.map((t) => renderTargetCard(t, true))}
            </div>
          )}
        </div>

        {/* Partner targets */}
        {partnerTargets.length > 0 && (
          <div className="animate-in animate-in-delay-3" style={{ marginTop: "2rem" }}>
            <div className="section-header">
              <h2 className="section-title">👀 Partner&apos;s Targets</h2>
            </div>
            <div className="targets-grid">
              {partnerTargets.map((t) => renderTargetCard(t, false))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
