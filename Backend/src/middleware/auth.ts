import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export default function auth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
