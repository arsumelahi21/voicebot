import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import bookingRoutes from "./routes/booking.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import faqRoutes from "./routes/faq.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));


app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Tasca Voicebot API Running",
  });
});

app.use("/booking", bookingRoutes);
app.use("/menu", menuRoutes);
app.use("/ai", aiRoutes);
app.use("/sessions", sessionRoutes);
app.use("/faq", faqRoutes);

const PORT = process.env.PORT ||4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});