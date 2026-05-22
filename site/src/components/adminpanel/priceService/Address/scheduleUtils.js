export const scheduleToRows = (schedule = {}) =>
  Object.entries(schedule).map(([day, hours]) => ({ day, hours }));

export const rowsToSchedule = (rows) => {
  const schedule = {};
  rows.forEach(({ day, hours }) => {
    const trimmedDay = (day || "").trim();
    if (trimmedDay) {
      schedule[trimmedDay] = (hours || "").trim();
    }
  });
  return schedule;
};
