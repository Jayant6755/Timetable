import mongoose, { Schema, Document } from "mongoose";

const teacherSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String , unique: true, require: true}
});

const Teacher = mongoose.model("teacher", teacherSchema);

export default Teacher;

