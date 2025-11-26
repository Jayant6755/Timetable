
import mongoose from "mongoose";
import Teacher from "./teachermodel";

const PeriodSchema = new mongoose.Schema({
  subject: { type: String , required: true },
  time: { type: String , required: true },
  teacher: { type: String , required: false }
});

const DaySchema = new mongoose.Schema({
  day: String,
  periods: [PeriodSchema],
  
});

const TimetableSchema = new mongoose.Schema({
  batchId: { type:String , required: true },
  timetable: [DaySchema],
});

export default mongoose.model("Timetable", TimetableSchema);
