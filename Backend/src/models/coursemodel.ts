import mongoose, { Schema, Document } from "mongoose";

const courseSchema = new mongoose.Schema({
    course: {type: String, require: true},
    code: {type: String , unique: true, require: true}
});

const course = mongoose.model("course", courseSchema);

export default course;

