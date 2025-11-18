import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();


//Login for Admin
router.post("/login/admin", async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email}, process.env.JWT_SECRET as string, {
                expiresIn: "7d",
            });
        return res.status(200).json({message: "Login Successful", token});
        }

        return res.json({message: "Invalid password or email"});
    } catch (error) {
        res.json({message: "Server Error"});
    }
});

export default router;
