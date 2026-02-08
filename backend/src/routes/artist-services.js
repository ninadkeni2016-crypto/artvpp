import express from "express";
import { Service } from "../models/Service.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  requireAuth,
  requireRole("artist", "admin"),
  async (req, res, next) => {
    try {
      const { artistId } = req.query || {};
      const filter = {};

      if (req.user.role === "artist") {
        filter.artistId = req.user._id;
      } else if (artistId) {
        filter.artistId = artistId;
      }

      const services = await Service.find(filter).sort({ createdAt: -1 });
      res.json({ data: services });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
