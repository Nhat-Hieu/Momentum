export const calculateScore = (activities) => {
  let score = 50;

  activities.forEach((a) => {
    if (a.type === "deep") score += 10;
    if (a.type === "distraction") score -= 8;
  });

  return Math.max(0, Math.min(100, score));
};