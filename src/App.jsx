import { useState, useEffect, useRef } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import Dashboard from "./components/Dashboard";
import LifeScore from "./components/LifeScore";
import Insight from "./components/Insight";
import useLocalStorage from "./hooks/useLocalStorage";
import { generateMockData } from "./utils/mockData";
import { exportData, importData } from "./utils/exportUtils";

export default function App() {
  const [activities, setActivities] = useLocalStorage("sessions_v2", null);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("dark_mode", false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Generate mock data if first time
    if (!activities || activities.length === 0) {
      setActivities(generateMockData(30));
    }
  }, [activities, setActivities]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const add = (a) => setActivities((prev) => [...(prev || []), a]);
  
  const handleExport = () => exportData(activities);
  const handleImport = (e) => importData(e, setActivities);

  const sessions = activities || [];

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="glass-card header-card">
          <div className="flex-between" style={{ alignItems: "flex-start" }}>
            <div>
              <h1 style={{ letterSpacing: "-0.5px", marginBottom: "0.2rem" }}><i className="ph-fill ph-meteor" style={{color: "var(--accent)"}}></i> Momentum</h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>My Productivity Digital Twin</p>
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{ padding: "0.5rem", borderRadius: "50%", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.2rem", boxShadow: "var(--card-shadow)" }}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <i className="ph-fill ph-sun"></i> : <i className="ph-fill ph-moon"></i>}
            </button>
          </div>
          
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
            <button className="btn btn-secondary" onClick={handleExport} style={{ flex: 1, fontSize: "0.9rem", padding: "0.6rem" }}>
              <i className="ph-bold ph-download-simple"></i> Export
            </button>
            <button className="btn btn-secondary" onClick={() => fileInputRef.current.click()} style={{ flex: 1, fontSize: "0.9rem", padding: "0.6rem" }}>
              <i className="ph-bold ph-upload-simple"></i> Import
            </button>
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              style={{ display: "none" }} 
              onChange={handleImport}
            />
          </div>
        </div>
        <LifeScore activities={sessions} />
        <ActivityForm onAdd={add} />
        <Insight activities={sessions} />
      </div>
      
      <div className="main-content">
        <Dashboard activities={sessions} />
        <ActivityList activities={sessions} />
      </div>
    </div>
  );
}