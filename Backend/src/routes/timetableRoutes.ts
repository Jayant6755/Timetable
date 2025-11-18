import { Router } from "express";
import { generateFirst, generateNew } from "../controller/timetableController";
import { generateFirstTimetable, generateSecondTimetable } from "../utils/timetableUtils";

const router = Router();

router.post("/generate-first", generateFirst);
router.post("/generate-new", generateNew);

router.get("/generatefirst", (req, res) => {
  const result = generateFirstTimetable([]);
  res.json(result);
});
router.get("/generatenew", (req, res) => {
  const result = generateSecondTimetable([], []);
  res.json(result);
});

export default router;
