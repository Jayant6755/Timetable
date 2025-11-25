// src/routes/teacherInfo.ts
import express, { Request, Response } from "express";
import TeacherIn, { TeacherInfo } from "../models/teacherInfomodell";

const router = express.Router();

// ------------------------------------
// GET → Get all teachers
// ------------------------------------
router.get("/", async (req: Request, res: Response) => {
  try {
    const teachers: TeacherInfo[] = await TeacherIn.find();
   
    res.json(teachers);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await TeacherIn.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ------------------------------------
// POST → Create a new teacher
// Body Example:
// {
//   "name": "John Doe",
//   "subject": "DBMS",
//   "classes": ["CSE-A", "CSE-B"]
// }
// ------------------------------------
router.post("/", async (req: Request, res: Response) => {
  const { name, subjects, classes } = req.body;
  
console.log(req.body);
  try {
   
    // Validate
    if (!name || !subjects || !classes ) {
      return res.status(400).json({
        message: "Name, subject and classes are required"
      });
    }
   

    // Check if teacher with same name & subject exists
    const exists = await TeacherIn.findOne({ name, subjects });
    if (exists) {
      return res.status(409).json({
        message: "Teacher with this subject already exists"
      });
    }

    // Create teacher
    const teacher = new TeacherIn({
      name,
      subject:subjects,
      classes
    });
  console.log("done");
    const savedTeacher = await teacher.save();
   
    res.status(201).json(savedTeacher);
    
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;
