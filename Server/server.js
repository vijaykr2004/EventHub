import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import protect from "./middleware/authMiddleware.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/events",eventRoutes)
app.use("/api/registrations", registrationRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
  res.send("Event Management API Running...");
});
app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);