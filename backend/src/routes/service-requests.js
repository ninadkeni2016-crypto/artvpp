import express from "express";
import { Service } from "../models/Service.js";
import { ServiceRequest } from "../models/ServiceRequest.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { serviceId, notes } = req.body || {};
    if (!serviceId) {
      return res.status(400).json({ error: "serviceId is required" });
    }

    const service = await Service.findOne({
      $or: [{ _id: serviceId }, { serviceId }],
    });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const request = await ServiceRequest.create({
      serviceId: service.serviceId,
      artistId: service.artistId,
      userId: req.user._id,
      notes: notes || "",
    });

    res.status(201).json({ data: request });
  } catch (error) {
    next(error);
  }
});

export default router;
