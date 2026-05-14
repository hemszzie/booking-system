import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes,
    } = req.body;

    if (
      !expertId ||
      !name ||
      !email ||
      !phone ||
      !date ||
      !timeSlot
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const booking = await Booking.create({
      expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes,
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This slot is already booked",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = status;

    await booking.save();

    res.json({
      message: "Booking updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBookingsByEmail = async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const bookings = await Booking.find({ email }).populate(
      "expertId"
    );

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};