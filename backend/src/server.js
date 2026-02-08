import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import serviceRoutes from "./routes/services.js";
import serviceRequestRoutes from "./routes/service-requests.js";
import courseRoutes from "./routes/courses.js";
import enrollRoutes from "./routes/enroll.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payments.js";
import artistServicesRoutes from "./routes/artist-services.js";
import adminRoutes from "./routes/admin.js";
import { notFound, errorHandler } from "./middleware/error-handler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || "";

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/services", serviceRoutes);
app.use("/service-requests", serviceRequestRoutes);
app.use("/courses", courseRoutes);
app.use("/enroll", enrollRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);
app.use("/artist/services", artistServicesRoutes);
app.use("/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed", error);
    }
  } else {
    console.warn("MONGODB_URI not set; running without DB");
  }

  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

startServer();
