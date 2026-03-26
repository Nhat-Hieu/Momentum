export default function Insight({ activities }) {
  if (!activities || activities.length < 3) {
    return (
      <div className="glass-card text-center" style={{ padding: "2rem 1rem" }}>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--text-main)" }}>🧠 Intelligence</h3>
        <p style={{ fontSize: "0.9rem" }}>Collecting behavior data. Complete a few more sessions to unlock insights.</p>
      </div>
    );
  }

  const avg = activities.reduce((s, a) => s + a.duration, 0) / activities.length;
  const deep = activities.filter((a) => a.type === "deep").length;
  const distract = activities.filter((a) => a.type === "distraction").length;

  let insight = [];

  if (avg > 60) insight.push({ icon: <i className="ph-fill ph-fire"></i>, text: "Strong deep work ability", color: "var(--accent)" });
  else if (avg > 30) insight.push({ icon: <i className="ph-fill ph-scales"></i>, text: "Balanced focus duration", color: "var(--primary)" });
  
  if (distract > deep) insight.push({ icon: <i className="ph-fill ph-warning"></i>, text: "Distraction dominates", color: "var(--cat-work)" });
  else if (deep > distract) insight.push({ icon: <i className="ph-fill ph-rocket"></i>, text: "You're entering flow state", color: "var(--secondary)" });

  return (
    <div className="glass-card">
      <h3 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}><i className="ph-fill ph-lightbulb"></i> Intelligence</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {insight.map((i, idx) => (
          <div key={idx} style={{ 
            display: "flex", alignItems: "center", gap: "1rem", 
            padding: "1rem", backgroundColor: "rgba(255,255,255,0.5)", 
            borderRadius: "var(--radius-sm)"
          }}>
            <span style={{ fontSize: "1.5rem", color: i.color, display: "flex" }}>{i.icon}</span>
            <span style={{ fontWeight: "500", color: i.color }}>{i.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}