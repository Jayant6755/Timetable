import express from "express";
import Timetable from "../models/Timetablemodel";
import TeacherInfo  from "../models/teacherInfomodell";
import { time } from "console";


const router = express.Router();


router.post("/", async (req, res) => {
     try {
       
    const { batchId, timetable } = req.body;
    
    
    const result = await Timetable.create({
      batchId,
      timetable
    });
    

   
    

    res.status(200).json({ message: "Timetable saved", result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getTimetable/:batchId", async (req, res) => {
   
  try {
    const { batchId } = req.params;

    const timetable = await Timetable.findOne({ batchId });

    res.status(200).json({ timetable });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }

});

export default router;

