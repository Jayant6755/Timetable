export interface SubjectCredit {
  subject: string;
  credit: number;
  teacher: string;
}

export interface Period {
  subject: string;
  time: string;
  teacher: string;
}

export interface DaySchedule {
  day: string;
  periods: Period[];
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const periodTimes = [
  "09:30 AM - 10:20 AM",
  "10:20 AM - 11:10 AM",
  "11:10 AM - 12:00 AM",
  "02:00 PM - 02:50 PM",
  "02:50 PM - 03:40 PM"
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

// 💡 Expand subjects based on credits
// Example:
// [{subject:"DBMS", credit:3}] → ["DBMS","DBMS","DBMS"]
const expandSubjectsByCredit = (subject: SubjectCredit[]): string[] => {
  let expanded: string[] = [];
  subject.forEach(({ subject, credit }) => {
    for (let i = 0; i < credit; i++) {
      expanded.push(subject);
    }
  });
 
  return expanded;
};

//first timetable
export const generateFirstTimetable = (
  subject: SubjectCredit[]
): DaySchedule[] => {
  const expandedSubjects = expandSubjectsByCredit(subject);
  
  return days.map((day) => {
    // Saturday only 3 periods
    const periodCount = day === "Saturday" ? 3 : periodTimes.length;

    // Choose subjects based on credits
    const shuffled = shuffleArray(expandedSubjects).slice(0, periodCount);

    const periods: Period[] = shuffled.map((subjectName, index) => {
      const subjectObj = subject.find(s => s.subject === subjectName);
      return {
        subject: subjectName,
        teacher: subjectObj?.teacher || "",
        time: periodTimes[index]!
        
      };
    });
   
    return { day, periods };
  });
};

// ************************************
// SECOND TIMETABLE 
// (keeps highest credit subjects in fixed slots)
// ************************************
export const generateSecondTimetable = (
  timetable1: DaySchedule[],
  subjects: string[]
): DaySchedule[] => {

  // Take first 3 subjects that user wrote
  const rotateSubjects = subjects.slice(0, 2);

  // Collect all occurrences of these subjects in timetable (in order)
  const occurrences: string[] = [];

  timetable1.forEach((day) => {
    day.periods.forEach((p) => {
      if (rotateSubjects.includes(p.subject)) {
        occurrences.push(p.subject);
      }
    });
  });

  // Not enough subjects to rotate
  if (occurrences.length < 2) return timetable1;

  // Rotate globally
  const rotated = [
    occurrences[occurrences.length - 1],
    ...occurrences.slice(0, occurrences.length - 1)
  ];

  // Rebuild timetable by placing rotated values back
  let index = 0;

  return timetable1.map((day) => {
    


    const newPeriods = day.periods.map((p) => {
      if (rotateSubjects.includes(p.subject)) {
        let newSubject = rotated[index] ?? p.subject;
        index++;

       
        return { ...p, subject: newSubject };
      }
      
      return p;
    });

    return {
      day: day.day,
      periods: newPeriods
    };
  });
};
