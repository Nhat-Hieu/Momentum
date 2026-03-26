import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector
} from "recharts";

const COLORS = {
  Work: "var(--cat-work)",
  Study: "var(--cat-study)",
  Wellness: "var(--cat-wellness)",
  Reading: "var(--cat-reading)"
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-8} textAnchor="middle" fill={fill} style={{ fontWeight: 600, fontSize: "1.05rem" }}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={16} textAnchor="middle" fill="var(--text-muted)" style={{ fontSize: "0.85rem" }}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function Dashboard({ activities }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  if (!activities || activities.length === 0) return null;

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  const data = activities.map((a) => ({
    time: new Date(a.date).toLocaleDateString() + ' ' + new Date(a.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    duration: a.duration,
  }));

  const pieDataMap = activities.reduce((acc, a) => {
    const cat = a.category || "Work";
    acc[cat] = (acc[cat] || 0) + a.duration;
    return acc;
  }, {});
  
  const pieData = Object.keys(pieDataMap).map(key => ({
    name: key,
    value: pieDataMap[key]
  }));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
      <div className="glass-card">
        <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}><i className="ph-fill ph-chart-line-up"></i> Timeline (Last 20)</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data.slice(-20)}>
              <XAxis dataKey="time" hide />
              <YAxis />
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "var(--card-shadow)", backgroundColor: "var(--card-bg)" }}
                itemStyle={{ color: "var(--text-main)" }}
              />
              <Line 
                type="monotone" 
                dataKey="duration" 
                stroke="var(--primary)" 
                strokeWidth={3} 
                dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2 }} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {pieData.length > 0 && (
        <div className="glass-card">
          <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}><i className="ph-fill ph-chart-pie-slice"></i> Category Distribution</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  style={{ outline: "none", cursor: "pointer" }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.Work} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-between" style={{ marginTop: "1rem", padding: "0 1rem" }}>
            {pieData.map((entry) => (
              <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: COLORS[entry.name] || COLORS.Work }}></span>
                <span style={{ fontSize: "0.95rem", color: "var(--text-main)", fontWeight: "500" }}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}