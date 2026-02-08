import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, toPublicUser } from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "dev-secret";
const allowedRoles = ["user", "artist"];

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, jwtSecret, {
    expiresIn: "7d",
  });
}

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, phone, password, role, profileImage } = req.body || {};

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    if (role === "admin") {
      return res.status(403).json({ error: "Admin role requires approval" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      role: allowedRoles.includes(role) ? role : "user",
      profileImage: profileImage || "",
      passwordHash,
    });

    const token = signToken(user);
    return res.status(201).json({ token, user: toPublicUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);
    return res.json({ token, user: toPublicUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.get("/profile", requireAuth, (req, res) => {
  res.json({ user: toPublicUser(req.user) });
});

router.put("/profile", requireAuth, async (req, res, next) => {
  try {
    const user = req.user;
    const { name, phone, profileImage, bio } = req.body || {};

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (profileImage) user.profileImage = profileImage;
    if (bio) user.bio = bio; // Add bio if supported by schema, otherwise it will be ignored by mongoose strict mode if not in schema

    await user.save();
    return res.json({ user: toPublicUser(user), message: "Profile updated successfully" });
  } catch (error) {
    return next(error);
  }
});

// Update Addresses
router.put("/profile/address", requireAuth, async (req, res, next) => {
  try {
    const user = req.user;
    const { addresses } = req.body;

    if (addresses && Array.isArray(addresses)) {
      user.addresses = addresses;
      await user.save();
      return res.json({ user: toPublicUser(user), message: "Addresses updated successfully" });
    }

    return res.status(400).json({ error: "Invalid address data" });
  } catch (error) {
    return next(error);
  }
});

// DEV ONLY: Promote to Admin
router.post("/promote-admin", requireAuth, async (req, res, next) => {
  try {
    const user = req.user;
    user.role = "admin";
    await user.save();
    return res.json({ user: toPublicUser(user), message: "User promoted to admin" });
  } catch (error) {
    return next(error);
  }
});

export default router;
