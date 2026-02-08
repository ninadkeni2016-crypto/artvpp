import express from "express";
import { Service } from "../models/Service.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { category } = req.query || {};
    const filter = category ? { category } : {};
    const services = await Service.find(filter).sort({ createdAt: -1 });
    res.json({ data: services });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  requireAuth,
  requireRole("artist", "admin"),
  async (req, res, next) => {
    try {
      const { title, category, startingPrice, deliveryTime, workflow } =
        req.body || {};

      if (!title || !category || startingPrice === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const service = await Service.create({
        title,
        category,
        startingPrice,
        deliveryTime: deliveryTime || "",
        workflow: workflow || "",
        artistId: req.user._id,
      });

      res.status(201).json({ data: service });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  requireAuth,
  requireRole("artist", "admin"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const service = await Service.findOne({
        $or: [{ _id: id }, { serviceId: id }],
      });

      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }

      if (
        req.user.role !== "admin" &&
        service.artistId.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const updates = (({
        title,
        category,
        startingPrice,
        deliveryTime,
        workflow,
      }) => ({ title, category, startingPrice, deliveryTime, workflow }))(
        req.body || {},
      );

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          service[key] = value;
        }
      });

      await service.save();
      res.json({ data: service });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("artist", "admin"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const service = await Service.findOne({
        $or: [{ _id: id }, { serviceId: id }],
      });

      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }

      if (
        req.user.role !== "admin" &&
        service.artistId.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ error: "Forbidden" });
      }

      await service.deleteOne();
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
