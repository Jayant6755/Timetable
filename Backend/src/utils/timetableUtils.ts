export interface Period {
  subject: string;
  time: string;
}

export interface DaySchedule {
  day: string;
  periods: Period[];
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const periodTimes = [
  "09:30 AM - 10:20 AM",
  "10:20 AM - 11:10 AM",
  "11:10 AM - 12:00 AM",
  "02:00 PM - 02:50 PM",
  "02:50 PM - 03:40 PM",
];

// Shuffle helper
const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
};

// First Timetable
export const generateFirstTimetable = (subjects: string[]): DaySchedule[] => {
  return days.map((day) => {
    const sat = day === "Saturday" ? 3 : periodTimes.length;

    const shuffled = shuffleArray(subjects).slice(0, sat);
    
    const periods = shuffled
      .map((subject, i) => ({
        subject,
        time: periodTimes[i]!,
      }))
      .filter((p) => p.time !== undefined);
      
      
    return { day, periods };
  });
};
// Second Timetable
export const generateSecondTimetable = (
  timetable1: DaySchedule[],
  subjects: string[]
): DaySchedule[] => {

 

  const fixedSubjects = subjects.slice(3, 7); // fixed subjects = last four
  const variableSubjects = subjects.slice(0, 3); // first three can change

  return timetable1.map((daySchedule) => {
    const limit = daySchedule.periods.length;

    const fixedPeriods = daySchedule.periods
      .filter((p) => fixedSubjects.includes(p.subject))
      .slice(0, limit)
      .map((p) => ({ ...p }));

    const remainingTimes = periodTimes
    .slice(0, limit)
    .filter(
      (time) => !fixedPeriods.some((fp) => fp.time === time)
    );

    const shuffledVars = shuffleArray(variableSubjects).slice(0, remainingTimes.length);

    const variablePeriods = remainingTimes
      .map((time, i) => ({
        subject: shuffledVars[i]!,
        time,
      }))
      .filter((p) => p.subject !== undefined);

    return {
      day: daySchedule.day,
      periods: [...fixedPeriods, ...variablePeriods].sort(
        (a, b) => periodTimes.indexOf(a.time) - periodTimes.indexOf(b.time)
      ),
    };
  });
};
