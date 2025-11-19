import express from "express";
import User from "../models/teacherInfomodell";

const router = express.Router();

router.get("/teacher", async (req,res)=>{
    try {

         const { User: name, course} = req.query as { User?: string; course?: string };

        const teacher = await User.findOne();
        if(teacher) return res.json({message: "Teacher already existed"});

       

        const newteacher = new User({name,course});
        await newteacher.save();
        return res.json({message: "Teacher Added", newteacher});
    } catch (error) {
        res.json({message: "Server Error"});
    }
});

export default router;