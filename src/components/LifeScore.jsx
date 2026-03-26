import { calculateScore } from "../utils/calculateScore";

const getRank = (score) => {
  if (score < 40) return { name: "Novice", color: "#FF6B6B" };
  if (score < 70) return { name: "Pro", color: "#4A90E2" };
  if (score < 90) return { name: "Expert", color: "#50E3C2" };
  return { name: "Master", color: "#F5A623", isMaster: true };
};

export default function LifeScore({ activities }) {
  const score = calculateScore(activities);
  const rank = getRank(score);

  return (
    <div className="glass-card text-center">
      <h3 style={{ marginBottom: "0.5rem", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
        <i className="ph-fill ph-trophy"></i> Life Score
      </h3>
      <h1 style={{ fontSize: "3rem", margin: "1rem 0", color: rank.color }}>
        {score}
      </h1>
      <div 
        className="badge flex-between" 
        style={{ 
          backgroundColor: rank.color + "22", 
          color: rank.color, 
          marginBottom: "1rem", 
          margin: "0 auto", 
          padding: "0.5rem 1rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem"
        }}
      >
        {rank.name} {rank.isMaster && <i className="ph-fill ph-crown" style={{ fontSize: "1.1rem" }}></i>}
      </div>
      <div>
        <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.3rem" }}>
          <span>Next Rank</span>
          <span>{score}/100</span>
        </div>
        <progress value={score} max="100"></progress>
      </div>
    </div>
  );
}