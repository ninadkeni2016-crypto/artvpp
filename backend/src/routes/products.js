import express from "express";
import { Product } from "../models/Product.js";
import {
  requireAuth,
  requireRole,
  isOwnerOrAdmin,
} from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { category, type, artistId } = req.query || {};
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    if (artistId) {
      filter.artistId = artistId;
    }

    const products = await Product.find(filter)
      .populate("artistId", "name email role profileImage")
      .sort({ createdAt: -1 });
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      $or: [{ _id: id }, { productId: id }],
    }).populate("artistId", "name email role profileImage");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json({ data: product });
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/",
  requireAuth,
  requireRole("artist", "admin"),
  async (req, res, next) => {
    try {
      const { title, category, price, images, description, stock, type } =
        req.body || {};

      if (!title || !category || price === undefined || !type) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const product = await Product.create({
        title,
        category,
        price,
        images: Array.isArray(images) ? images : [],
        description: description || "",
        stock: stock ?? 0,
        type,
        artistId: req.user._id,
      });

      return res.status(201).json({ data: product });
    } catch (error) {
      return next(error);
    }
  },
);

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      $or: [{ _id: id }, { productId: id }],
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!isOwnerOrAdmin(product.artistId, req.user)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updates = (({
      title,
      category,
      price,
      images,
      description,
      stock,
      type,
    }) => ({ title, category, price, images, description, stock, type }))(
      req.body || {},
    );

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        product[key] = key === "images" && !Array.isArray(value) ? [] : value;
      }
    });

    await product.save();
    return res.json({ data: product });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      $or: [{ _id: id }, { productId: id }],
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!isOwnerOrAdmin(product.artistId, req.user)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await product.deleteOne();
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

export default router;
