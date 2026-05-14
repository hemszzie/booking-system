import express from "express";
import cors from "cors";

import expertRoutes from "./routes/expertRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

export default app;