import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { value: "Work", label: "Work", icon: "ph-briefcase", color: "var(--cat-work)" },
  { value: "Study", label: "Study", icon: "ph-books", color: "var(--cat-study)" },
  { value: "Wellness", label: "Wellness", icon: "ph-heart", color: "var(--cat-wellness)" },
  { value: "Reading", label: "Reading", icon: "ph-book-open", color: "var(--cat-reading)" }
];

export default function ActivityForm({ onAdd }) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [category, setCategory] = useState("Work");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const intervalRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const start = () => {
    setRunning(true);
    setDropdownOpen(false);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);

    let minutes = Math.floor(seconds / 60);
    if (seconds > 0 && minutes === 0) minutes = seconds;

    let type = "normal";
    if (minutes < 20) type = "distraction";
    else if (minutes >= 60) type = "deep";

    onAdd({
      id: Date.now(),
      type,
      duration: minutes,
      category,
      date: new Date().toISOString(),
    });

    setSeconds(0);
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const selectedCat = CATEGORIES.find(c => c.value === category);

  return (
    <div className="glass-card">
      <h3 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <i className="ph-fill ph-timer"></i> Focus Session
      </h3>
      
      {!running && (
        <div style={{ marginBottom: "1.5rem" }} ref={dropdownRef}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-muted)", fontWeight: "500" }}>Category</label>
          <div style={{ position: "relative" }}>
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                width: "100%", padding: "0.8rem 1rem", borderRadius: "8px", 
                border: "1px solid var(--card-border)", background: "rgba(255,255,255,0.8)", 
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                color: "var(--text-main)"
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "500" }}>
                <i className={`ph-fill ${selectedCat.icon}`} style={{ color: selectedCat.color, fontSize: "1.2rem" }}></i> 
                {selectedCat.label}
              </span>
              <i className={`ph-bold ph-caret-${dropdownOpen ? 'up' : 'down'}`} style={{ color: "var(--text-muted)" }}></i>
            </div>
            
            {dropdownOpen && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0, marginTop: "0.5rem",
                background: "var(--card-bg)", backdropFilter: "blur(12px)", 
                border: "1px solid var(--card-border)", borderRadius: "8px", 
                boxShadow: "var(--card-shadow)", zIndex: 10, overflow: "hidden"
              }}>
                {CATEGORIES.map(c => (
                  <div 
                    key={c.value}
                    onClick={() => { setCategory(c.value); setDropdownOpen(false); }}
                    style={{
                      padding: "0.8rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem",
                      cursor: "pointer", transition: "background 0.2s", fontWeight: "500",
                      background: category === c.value ? "rgba(0,0,0,0.05)" : "transparent"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = category === c.value ? "rgba(0,0,0,0.05)" : "transparent"}
                  >
                    <i className={`ph-fill ${c.icon}`} style={{ color: c.color, fontSize: "1.2rem" }}></i>
                    {c.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="text-center" style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ 
          fontSize: "3.5rem", 
          color: running ? "var(--primary)" : "var(--text-main)", 
          transition: "color 0.3s",
          margin: "1rem 0"
        }}>
          {formatTime(seconds)}
        </h1>
        {running && <p style={{ color: "var(--accent)", fontWeight: "500", animation: "pulse 1.5s infinite" }}>Focus mode active...</p>}
      </div>

      <div className="flex-between" style={{ justifyContent: "center" }}>
        {!running ? (
          <button className="btn" style={{ width: "100%" }} onClick={start}><i className="ph-bold ph-play"></i> Start Focus</button>
        ) : (
          <button className="btn btn-danger" style={{ width: "100%" }} onClick={stop}><i className="ph-bold ph-stop"></i> End Session</button>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}