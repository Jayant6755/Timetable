
import course from "../models/coursemodel";
import express from "express";

const router = express.Router();

router.get("/course",  async (req, res) => {
  try {

     const { course: courseName, code } = req.query as { course?: string; code?: string };
     
    const Course = await course.findOne();
    if (Course) return res.json({ message: "Course Already Existed" });

   

    const newCourse = new course({ course: courseName, code });
    await newCourse.save();
    return res.status(201).json({message: "New course added", newCourse});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;