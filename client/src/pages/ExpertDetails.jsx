import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import socket from "../socket/socket";

const ExpertDetails = () => {
  const { id } = useParams();

  const [expert, setExpert] = useState(null);

  const [loading, setLoading] = useState(false);

  const [bookedSlots, setBookedSlots] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    notes: "",
  });

  const fetchExpert = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/experts/${id}`
      );

      setExpert(data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpert();
  }, []);

  // Real-time slot updates
  useEffect(() => {
    socket.on("slotBooked", (data) => {
      if (data.expertId === id) {
        setBookedSlots((prev) => [
          ...prev,
          `${data.date}-${data.timeSlot}`,
        ]);
      }
    });

    return () => {
      socket.off("slotBooked");
    };
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", {
        expertId: id,
        ...formData,
      });

      toast.success("Booking Confirmed!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        timeSlot: "",
        notes: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Booking Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-2xl">
        Loading...
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="p-10 text-2xl">
        Expert not found
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="p-8 max-w-6xl mx-auto">
        {/* Expert Info */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-10">
          <h1 className="text-4xl font-bold mb-4">
            {expert.name}
          </h1>

          <p className="mb-2">
            Category: {expert.category}
          </p>

          <p className="mb-2">
            Experience: {expert.experience} years
          </p>

          <p className="mb-2">
            Rating: ⭐ {expert.rating}
          </p>

          <p className="text-gray-600">
            {expert.bio}
          </p>
        </div>

        {/* Available Slots */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-10">
          <h2 className="text-3xl font-bold mb-6">
            Available Slots
          </h2>

          {expert.availableSlots.map(
            (slotGroup, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-4">
                  {slotGroup.date}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {slotGroup.slots.map((slot) => {
                    const isBooked =
                      bookedSlots.includes(
                        `${slotGroup.date}-${slot}`
                      );

                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            date: slotGroup.date,
                            timeSlot: slot,
                          })
                        }
                        className={`px-4 py-2 rounded-lg border ${
                          isBooked
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-black text-white"
                        }`}
                      >
                        {isBooked
                          ? "Booked"
                          : slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>

        {/* Booking Form */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6">
            Book Session
          </h2>

          <form
            onSubmit={handleBooking}
            className="grid gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              value={formData.date}
              placeholder="Selected Date"
              readOnly
              className="border p-3 rounded-lg bg-gray-100"
            />

            <input
              type="text"
              value={formData.timeSlot}
              placeholder="Selected Slot"
              readOnly
              className="border p-3 rounded-lg bg-gray-100"
            />

            <textarea
              placeholder="Notes"
              rows="4"
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
              className="border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="bg-black text-white py-3 rounded-lg"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetails;