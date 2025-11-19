import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import teacherRoutes from "./routes/teacher";
import dashboardrouter from "./routes/dashboard";
import admin from "./routes/admin";
import timetableRoutes from "./routes/timetableRoutes";
import teacherInfo from "./routes/teacherInfo";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //body parser use to understand form or api data

const uri = process.env.MONGO_URI!;
mongoose
  .connect(uri)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.use("/", teacherRoutes);
app.use("/", dashboardrouter);
app.use("/", admin);
app.use("/api", timetableRoutes);
app.use("/api/teacherInfo", teacherInfo);



app.listen(process.env.PORT, () => {
  console.log(` Server running on port ${process.env.PORT}`);
});
