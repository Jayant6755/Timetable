import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {

    if(!process.env.JWT_SECRET){
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = Jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
