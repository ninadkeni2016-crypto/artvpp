import express from "express";
import { Course } from "../models/Course.js";
import { Enrollment } from "../models/Enrollment.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { courseId } = req.body || {};
    if (!courseId) {
      return res.status(400).json({ error: "courseId is required" });
    }

    const course = await Course.findOne({
      $or: [{ _id: courseId }, { courseId }],
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const enrollment = await Enrollment.create({
      courseId: course.courseId,
      userId: req.user._id,
    });

    return res.status(201).json({ data: enrollment });
  } catch (error) {
    return next(error);
  }
});

export default router;
