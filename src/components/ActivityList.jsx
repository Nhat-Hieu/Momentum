export default function ActivityList({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="glass-card text-center" style={{ padding: "3rem 1rem", color: "var(--text-muted)" }}>
        <h3>No activities yet</h3>
        <p>Start a new focus session to record your first activity.</p>
      </div>
    );
  }

  // Sort by newest first
  const sorted = [...activities].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="glass-card">
      <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}><i className="ph-fill ph-list-dashes"></i> Recent Activity</h3>
      <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "0.5rem" }}>
        {sorted.map((a) => {
          const cat = a.category || "Work";
          return (
            <div 
              key={a.id} 
              className="flex-between" 
              style={{ 
                padding: "1rem", 
                borderBottom: "1px solid var(--card-border)",
                backgroundColor: "rgba(255,255,255,0.4)",
                borderRadius: "var(--radius-sm)",
                marginBottom: "0.5rem"
              }}
            >
              <div>
                <p style={{ fontWeight: "600", color: "var(--text-main)", marginBottom: "0.2rem" }}>
                  {a.duration} mins <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginLeft: "0.5rem" }}>
                    {new Date(a.date).toLocaleDateString()} {new Date(a.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </p>
                <span className={`badge badge-${cat}`}>{cat}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ 
                  fontSize: "1.2rem", 
                  color: a.type === "deep" ? "var(--primary)" : a.type === "distraction" ? "var(--cat-work)" : "var(--text-muted)"
                }}>
                  {a.type === "deep" ? <i className="ph-fill ph-fire"></i> : a.type === "distraction" ? <i className="ph-fill ph-warning"></i> : <i className="ph-bold ph-check"></i>}
                </span>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "capitalize", marginTop: "0.2rem" }}>
                  {a.type}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}