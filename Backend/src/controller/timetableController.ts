import { Request, Response } from "express";
import { generateFirstTimetable, generateSecondTimetable } from "../utils/timetableUtils";

export const generateFirst = (req: Request, res: Response) => {
  const { subjects } = req.body;

  if (!subjects || subjects.length !== 7) {
    return res.status(400).json({ error: "Please provide exactly 7 subjects." });
  }

  const timetable = generateFirstTimetable(subjects);
    console.log(timetable)
  res.status(200).json({ timetable });
};

export const generateNew = (req: Request, res: Response) => {
  const { firstTimetable, subjects } = req.body;

  if (!firstTimetable || !subjects || subjects.length !== 7) {
    return res.status(400).json({ error: "Invalid request. Provide firstTimetable & 7 subjects." });
  }

  const newTimetable = generateSecondTimetable(firstTimetable, subjects);

  res.status(200).json({ timetable: newTimetable });
};
