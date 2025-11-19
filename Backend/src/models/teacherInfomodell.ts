import mongoose,{Document, Schema} from "mongoose";

export interface TeacherInfo extends Document{
   name: string;
   subject: string;
   classes: string;
}

const teacherInfoSchema = new Schema<TeacherInfo>({
   name: {type: String, required: true},
   subject: {type: String, require: true},
   classes: {type:String, require: true}   
});

const TeacherIn = mongoose.model<TeacherInfo>("TeacherIn", teacherInfoSchema); 

export default TeacherIn;