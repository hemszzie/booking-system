import express from "express";

import {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.patch("/:id/status", updateBookingStatus);

router.get("/", getBookingsByEmail);

export default router;