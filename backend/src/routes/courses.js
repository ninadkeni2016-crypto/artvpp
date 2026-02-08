import express from "express";
import { Course } from "../models/Course.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.json({ data: courses });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({
      $or: [{ _id: id }, { courseId: id }],
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.json({ data: course });
  } catch (error) {
    return next(error);
  }
});

export default router;
