import { useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

const MyBookings = () => {
  const [email, setEmail] = useState("");

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/bookings?email=${email}`
      );

      setBookings(data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Pending")
      return "bg-yellow-400";

    if (status === "Confirmed")
      return "bg-blue-500";

    if (status === "Completed")
      return "bg-green-500";

    return "bg-gray-400";
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          My Bookings
        </h1>

        {/* Search */}
        <div className="flex gap-4 mb-10">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border p-3 rounded-lg flex-1"
          />

          <button
            onClick={fetchBookings}
            className="bg-black text-white px-6 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-xl">
            Loading...
          </div>
        )}

        {/* Empty */}
        {!loading && bookings.length === 0 && (
          <div className="text-gray-500 text-lg">
            No bookings found
          </div>
        )}

        {/* Booking Cards */}
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >
              <h2 className="text-2xl font-bold mb-3">
                {booking.expertId?.name}
              </h2>

              <p className="mb-2">
                Date: {booking.date}
              </p>

              <p className="mb-2">
                Time: {booking.timeSlot}
              </p>

              <p className="mb-2">
                Phone: {booking.phone}
              </p>

              <p className="mb-4">
                Notes: {booking.notes}
              </p>

              <span
                className={`px-4 py-2 rounded-lg text-white ${getStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;