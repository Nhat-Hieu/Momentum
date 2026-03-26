export const transformToChartData = (activities) => {
  const map = {};

  activities.forEach((a) => {
    if (!map[a.type]) map[a.type] = 0;
    map[a.type] += a.duration;
  });

  return Object.keys(map).map((key) => ({
    name: key,
    value: map[key],
  }));
};