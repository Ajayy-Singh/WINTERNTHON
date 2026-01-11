import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import writingRoutes from "./routes/writingRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("WIN12 TypeScript Backend Running 🚀");
});



app.use("/api/auth", authRoutes);
app.use("/api/writings", writingRoutes);

export default app;
