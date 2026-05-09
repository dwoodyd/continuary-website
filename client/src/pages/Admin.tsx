import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";

type Status = "new" | "reviewed" | "accepted" | "declined";

const STATUS_COLORS: Record<Status, string> = {
  new: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  reviewed: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  accepted: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  declined: "bg-red-500/20 text-red-300 border border-red-500/30",
};

const STATUS_LABELS: Record<Status, string> = {
  new: "New",
  reviewed: "Reviewed",
  accepted: "Accepted",
  declined: "Declined",
};

export default function Admin() {
  const { user, loading } = useAuth();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [editingNotes, setEditingNotes] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const { data: applications, isLoading: appsLoading } = trpc.applications.list.useQuery(
    undefined,
    { enabled: user?.role === "admin" }
  );
  const { data: slotCounts } = trpc.applications.slotCounts.useQuery();

  const updateStatus = trpc.applications.updateStatus.useMutation({
    onSuccess: () => utils.applications.list.invalidate(),
  });
  const updateNotes = trpc.applications.updateNotes.useMutation({
    onSuccess: () => {
      utils.applications.list.invalidate();
      setEditingNotes(null);
    },
  });

  // Auth guard
  if (loading) {
    return (
      <div
        style={{ minHeight: "100vh", background: "oklch(0.16 0.04 255)" }}
        className="flex items-center justify-center"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{ minHeight: "100vh", background: "oklch(0.16 0.04 255)" }}
        className="flex flex-col items-center justify-center gap-4"
      >
        <p style={{ color: "oklch(0.65 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}>
          You need to sign in to access this page.
        </p>
        <a
          href={getLoginUrl()}
          style={{
            background: "oklch(0.78 0.16 65)",
            color: "oklch(0.16 0.04 255)",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Sign in
        </a>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div
        style={{ minHeight: "100vh", background: "oklch(0.16 0.04 255)" }}
        className="flex flex-col items-center justify-center gap-4"
      >
        <p style={{ color: "oklch(0.65 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}>
          You don't have permission to view this page.
        </p>
        <a
          href="/"
          style={{
            color: "oklch(0.78 0.16 65)",
            fontFamily: "'DM Sans', sans-serif",
            textDecoration: "underline",
          }}
        >
          Back to home
        </a>
      </div>
    );
  }

  const filtered =
    filterStatus === "all"
      ? (applications ?? [])
      : (applications ?? []).filter((a) => a.status === filterStatus);

  const selected = selectedId != null ? (applications ?? []).find((a) => a.id === selectedId) : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "oklch(0.16 0.04 255)",
        fontFamily: "'DM Sans', sans-serif",
        color: "oklch(0.96 0.02 80)",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid oklch(0.28 0.04 255)",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-center gap-3">
          <a href="/" style={{ color: "oklch(0.78 0.16 65)", textDecoration: "none", fontSize: "0.875rem" }}>
            ← Back to site
          </a>
          <span style={{ color: "oklch(0.4 0.04 255)" }}>|</span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "oklch(0.96 0.02 80)",
            }}
          >
            Continuary CRM
          </h1>
        </div>
        <span style={{ fontSize: "0.8125rem", color: "oklch(0.55 0.04 255)" }}>
          Signed in as {user.name ?? user.email}
        </span>
      </header>

      {/* Slot counter bar */}
      <div
        style={{
          background: "oklch(0.19 0.04 255)",
          borderBottom: "1px solid oklch(0.28 0.04 255)",
          padding: "1rem 2rem",
          display: "flex",
          gap: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Total applications", value: slotCounts?.total ?? 0 },
          { label: "Accepted", value: slotCounts?.accepted ?? 0 },
          { label: "Slots remaining", value: slotCounts?.remaining ?? 100 },
          { label: "New (unreviewed)", value: (applications ?? []).filter((a) => a.status === "new").length },
        ].map(({ label, value }) => (
          <div key={label}>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.78 0.16 65)",
                lineHeight: 1,
              }}
            >
              {value}
            </div>
            <div style={{ fontSize: "0.75rem", color: "oklch(0.55 0.04 255)", marginTop: "0.25rem" }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex" style={{ height: "calc(100vh - 130px)", overflow: "hidden" }}>
        {/* Left panel: list */}
        <div
          style={{
            width: "380px",
            minWidth: "280px",
            borderRight: "1px solid oklch(0.28 0.04 255)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              gap: "0.25rem",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid oklch(0.28 0.04 255)",
              flexWrap: "wrap",
            }}
          >
            {(["all", "new", "reviewed", "accepted", "declined"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background:
                    filterStatus === s
                      ? "oklch(0.78 0.16 65)"
                      : "transparent",
                  color:
                    filterStatus === s
                      ? "oklch(0.16 0.04 255)"
                      : "oklch(0.65 0.02 80)",
                  borderColor:
                    filterStatus === s
                      ? "oklch(0.78 0.16 65)"
                      : "oklch(0.35 0.04 255)",
                }}
              >
                {s === "all" ? "All" : STATUS_LABELS[s]}
              </button>
            ))}
          </div>

          {/* Application list */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {appsLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-amber-400" />
              </div>
            ) : filtered.length === 0 ? (
              <div
                style={{
                  padding: "2rem 1rem",
                  textAlign: "center",
                  color: "oklch(0.45 0.04 255)",
                  fontSize: "0.875rem",
                }}
              >
                No applications{filterStatus !== "all" ? ` with status "${filterStatus}"` : ""}.
              </div>
            ) : (
              filtered.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedId(app.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "1rem",
                    borderBottom: "1px solid oklch(0.24 0.04 255)",
                    background:
                      selectedId === app.id
                        ? "oklch(0.22 0.04 255)"
                        : "transparent",
                    cursor: "pointer",
                    transition: "background 0.1s",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.9375rem",
                          color: "oklch(0.96 0.02 80)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {app.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8125rem",
                          color: "oklch(0.55 0.04 255)",
                          marginTop: "0.125rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {app.email}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "oklch(0.45 0.04 255)",
                          marginTop: "0.25rem",
                        }}
                      >
                        {new Date(app.submittedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[app.status as Status]}`}
                      style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                    >
                      {STATUS_LABELS[app.status as Status]}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right panel: detail */}
        <div style={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
          {!selected ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "oklch(0.45 0.04 255)",
                gap: "0.5rem",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p style={{ fontSize: "0.9375rem" }}>Select an application to review</p>
            </div>
          ) : (
            <div style={{ maxWidth: "640px" }}>
              {/* Name + email */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "oklch(0.96 0.02 80)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {selected.name}
                </h2>
                <a
                  href={`mailto:${selected.email}`}
                  style={{
                    color: "oklch(0.78 0.16 65)",
                    fontSize: "0.9375rem",
                    textDecoration: "none",
                  }}
                >
                  {selected.email}
                </a>
                <div style={{ fontSize: "0.8125rem", color: "oklch(0.45 0.04 255)", marginTop: "0.375rem" }}>
                  Submitted{" "}
                  {new Date(selected.submittedAt).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* Status selector */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "oklch(0.55 0.04 255)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Status
                </label>
                <div className="flex gap-2 flex-wrap">
                  {(["new", "reviewed", "accepted", "declined"] as Status[]).map((s) => (
                    <button
                      key={s}
                      onClick={() =>
                        updateStatus.mutate({ id: selected.id, status: s })
                      }
                      disabled={updateStatus.isPending}
                      style={{
                        padding: "0.375rem 1rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        border: "1px solid",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        opacity: updateStatus.isPending ? 0.5 : 1,
                        background:
                          selected.status === s
                            ? s === "accepted"
                              ? "oklch(0.55 0.18 155)"
                              : s === "declined"
                              ? "oklch(0.45 0.18 25)"
                              : s === "reviewed"
                              ? "oklch(0.55 0.18 65)"
                              : "oklch(0.45 0.12 255)"
                            : "transparent",
                        color:
                          selected.status === s
                            ? "oklch(0.96 0.02 80)"
                            : "oklch(0.55 0.04 255)",
                        borderColor:
                          selected.status === s
                            ? "transparent"
                            : "oklch(0.35 0.04 255)",
                      }}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Relationship answer */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "oklch(0.55 0.04 255)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Their relationship with consistency
                </label>
                <div
                  style={{
                    background: "oklch(0.19 0.04 255)",
                    border: "1px solid oklch(0.28 0.04 255)",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    color: "oklch(0.85 0.02 80)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selected.relationship}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "oklch(0.55 0.04 255)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Private notes
                </label>
                {editingNotes !== null ? (
                  <div>
                    <textarea
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      rows={5}
                      style={{
                        width: "100%",
                        background: "oklch(0.19 0.04 255)",
                        border: "1px solid oklch(0.45 0.12 255)",
                        borderRadius: "0.5rem",
                        padding: "0.75rem",
                        fontSize: "0.9375rem",
                        color: "oklch(0.96 0.02 80)",
                        resize: "vertical",
                        outline: "none",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateNotes.mutate({ id: selected.id, notes: editingNotes })
                        }
                        disabled={updateNotes.isPending}
                        style={{
                          background: "oklch(0.78 0.16 65)",
                          color: "oklch(0.16 0.04 255)",
                          padding: "0.5rem 1.25rem",
                          borderRadius: "0.375rem",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          border: "none",
                          cursor: "pointer",
                          opacity: updateNotes.isPending ? 0.6 : 1,
                        }}
                      >
                        {updateNotes.isPending ? "Saving…" : "Save notes"}
                      </button>
                      <button
                        onClick={() => setEditingNotes(null)}
                        style={{
                          background: "transparent",
                          color: "oklch(0.55 0.04 255)",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.375rem",
                          fontWeight: 500,
                          fontSize: "0.875rem",
                          border: "1px solid oklch(0.35 0.04 255)",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setEditingNotes(selected.notes ?? "")}
                    style={{
                      background: "oklch(0.19 0.04 255)",
                      border: "1px solid oklch(0.28 0.04 255)",
                      borderRadius: "0.5rem",
                      padding: "1rem",
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                      color: selected.notes ? "oklch(0.85 0.02 80)" : "oklch(0.45 0.04 255)",
                      cursor: "text",
                      minHeight: "5rem",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {selected.notes || "Click to add notes…"}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
