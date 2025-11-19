import  express  from "express";
import bcrypt from "bcrypt";
import Teacher from "../models/teachermodel";
import  Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sign } from "crypto";  

dotenv.config();
const router = express.Router();


//SignUp
router.post("/signup/teacher", async (req, res)=>{
   
    try {
        const {email,password} = req.body;

        const existing = await Teacher.findOne({email});
        if(existing) return res.json({message: "Mail already existing"});
        

        const hashed = await bcrypt.hash(password,10);
        const newUser =  new Teacher ({email,password: hashed});
        await newUser.save();
        

        res.json({message: "SignUp Successful"});

    } catch (error) {
        res.json({message: "Server error"});
    }
});

//Login 
router.post("/login/teacher", async (req, res)=>{
    
    try {
        const {email, password} = req.body;

    const check = await Teacher.findOne({email});
    if(!check) return res.json({message: "User not Found"});
    
    const comp = await bcrypt.compare(password, check.password as string);
    if(!comp) return res.json({message: "Invalid Password"});
    
    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET is not defined");
    }

    const token = Jwt.sign({id : check._id}, process.env.JWT_SECRET , {expiresIn: "1hr"});

    res.json({message: "Login Successful",token});

   
    } catch (error) {
        res.json({message: "Server Error"});
    }
}); 

export default router;
