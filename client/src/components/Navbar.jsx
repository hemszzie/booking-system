import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-white px-8 py-5 flex justify-between items-center shadow-lg">
      <Link to="/">
        <h1 className="text-3xl font-bold">
          Expert Booking
        </h1>
      </Link>

      <Link
        to="/bookings"
        className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        My Bookings
      </Link>
    </div>
  );
};

export default Navbar;