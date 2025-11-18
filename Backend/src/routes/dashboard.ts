import express from "express";
import { verifyToken, AuthRequest } from "../middleware/authmiddleware";
import User from "../models/teachermodell";

const router = express.Router();

//get is used to store data or receive

router.get("/dashboard", verifyToken, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Welcome to your dashboard", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
