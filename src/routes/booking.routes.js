import express from "express";

import {
  checkAvailability,
  createBooking,
  getBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/check", checkAvailability);

router.post("/", createBooking);

router.get("/", getBookings);

export default router;