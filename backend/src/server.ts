import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
//import projectRoutes from "./routes/projectRoutes";
//import speakingTaskOneRoutes from "./routes/SpeakingTaskOneRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig));
app.use(express.json());

app.use("/api/auth", authRoutes);
//app.use("/api/projects", projectRoutes);

// Nueva ruta para Speaking Task 1
//app.use("/api/speaking/task-one", speakingTaskOneRoutes);
app.get("/", (req, res) => {
  res.send("✅ Better Essay API funcionando correctamente en Render 🚀");
});

export default app;
