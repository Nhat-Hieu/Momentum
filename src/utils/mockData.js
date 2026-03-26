export const generateMockData = (days = 30) => {
  const data = [];
  const categories = ["Work", "Study", "Wellness", "Reading"];
  const types = ["deep", "normal", "distraction"];
  
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    // 2-4 sessions per day
    const sessionsToday = Math.floor(Math.random() * 3) + 2;
    
    for (let j = 0; j < sessionsToday; j++) {
      const sessionDate = new Date(now);
      sessionDate.setDate(now.getDate() - i);
      // Random hour between 8 and 20
      sessionDate.setHours(8 + Math.floor(Math.random() * 12));
      sessionDate.setMinutes(Math.floor(Math.random() * 60));
      
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      // Duration based on category
      let duration = 0;
      if (category === "Work" || category === "Study") {
        duration = Math.floor(Math.random() * 90) + 15; // 15 to 105 mins
      } else {
        duration = Math.floor(Math.random() * 45) + 10; // 10 to 55 mins
      }
      
      let type = "normal";
      if (duration > 60) type = "deep";
      else if (duration < 20) type = "distraction";
      
      data.push({
        id: Date.now() + Math.random(),
        type,
        duration,
        category,
        date: sessionDate.toISOString(),
      });
    }
  }
  
  // Sort chronically
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
};
