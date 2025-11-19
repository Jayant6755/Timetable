// src/routes/teacherInfo.ts
import express, { Request, Response } from "express";
import  TeacherIn, { TeacherInfo } from "../models/teacherInfomodell";



const router = express.Router();

// GET /api/reviews - Get all teacher info
router.get("/", async (req: Request, res: Response) => {
  try {
    const teacher: TeacherInfo[] = await TeacherIn.find();
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /api/reviews - Create a new teacher
router.post("/", async (req: Request, res: Response) => {
  const { name, subject, classes }: { name: string; subject: string; classes: string } = req.body;

 

  try {
    if(!name || !subject || !classes) {
      return res.status(400).json({ message: "Name, subjects and classes are required" });
    }
      
     const teacher = new TeacherIn({ name, subject, classes });
    // console.log("Saving teachers", teacher);
    const savedteacher = await teacher.save();
    res.status(201).json(savedteacher);
  } catch (err) {
    res.status(201).json({ message: "bad" });
  }
});

// ✅ Correct export
export default router;
