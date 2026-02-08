import express from "express";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { Service } from "../models/Service.js";
import { Course } from "../models/Course.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Middleware: Require Admin for all routes
router.use(requireAuth, requireRole("admin"));

// GET /api/admin/stats - Dashboard Overview
router.get("/stats", async (req, res) => {
    try {
        const [
            totalUsers,
            totalArtists,
            totalCreators,
            totalOrders,
            totalProducts,
            totalServices,
            totalCourses,
        ] = await Promise.all([
            User.countDocuments({ role: "user" }),
            User.countDocuments({ role: "artist" }),
            User.countDocuments({ role: "creator" }),
            Order.countDocuments(),
            Product.countDocuments(),
            Service.countDocuments(),
            Course.countDocuments(),
        ]);

        // Calculate Total Revenue (Simple sum of all paid orders)
        const paidOrders = await Order.find({ paymentStatus: "paid" });
        const totalRevenue = paidOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        res.json({
            users: totalUsers,
            artists: totalArtists,
            creators: totalCreators,
            orders: totalOrders,
            products: totalProducts,
            services: totalServices,
            courses: totalCourses,
            revenue: totalRevenue,
        });
    } catch (error) {
        console.error("Admin Stats Error:", error);
        res.status(500).json({ error: "Failed to fetch admin stats" });
    }
});

// GET /api/admin/users - List all users (with filtering)
router.get("/users", async (req, res) => {
    try {
        const { role } = req.query;
        const filter = role ? { role } : {};

        const users = await User.find(filter)
            .select("-passwordHash")
            .sort({ createdAt: -1 });

        res.json({ data: users });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// PUT /api/admin/users/:id/role - Change User Role
router.put("/users/:id/role", async (req, res) => {
    try {
        const { role } = req.body;
        if (!["user", "artist", "creator", "admin"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-passwordHash");

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ data: user });
    } catch (error) {
        res.status(500).json({ error: "Failed to update role" });
    }
});

// PUT /api/admin/users/:id/approve - Approve Artist/Creator
router.put("/users/:id/approve", async (req, res) => {
    try {
        const { isApproved } = req.body; // true or false

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                isApproved: isApproved,
                approvalDate: isApproved ? new Date() : null
            },
            { new: true }
        ).select("-passwordHash");

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ data: user });
    } catch (error) {
        res.status(500).json({ error: "Failed to update approval status" });
    }
});

// GET /api/admin/orders - Get All Orders
router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        res.json({ data: orders });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

export default router;
