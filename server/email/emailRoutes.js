import express from "express";
import rateLimit from "express-rate-limit";
import { handleContact } from "./emailController.js";

const router = express.Router();

// Rate limiter: 1 request per 10 min
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1,
  message: { success: false, message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get("/contact", contactLimiter, handleContact);

export default router;
