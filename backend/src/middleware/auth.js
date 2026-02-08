import jwt from "jsonwebtoken";
import { User, toPublicUser } from "../models/User.js";

const jwtSecret = process.env.JWT_SECRET || "dev-secret";

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ error: "Invalid auth token" });
    }

    req.user = { ...toPublicUser(user), _id: user._id };
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid auth token" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Missing auth token" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    return next();
  };
}

export function isOwnerOrAdmin(ownerId, user) {
  if (!user) {
    return false;
  }

  if (user.role === "admin") {
    return true;
  }

  return ownerId.toString() === user._id.toString();
}
