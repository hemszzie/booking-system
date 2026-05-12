import { Link } from "react-router-dom";

const ExpertCard = ({ expert }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-2xl transition">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {expert.name}
        </h2>

        <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
          ⭐ {expert.rating}
        </span>
      </div>

      <p className="text-gray-600 mb-2">
        <strong>Category:</strong>{" "}
        {expert.category}
      </p>

      <p className="text-gray-600 mb-4">
        <strong>Experience:</strong>{" "}
        {expert.experience} years
      </p>

      <Link
        to={`/expert/${expert._id}`}
        className="bg-black text-white px-5 py-3 rounded-lg inline-block hover:bg-gray-800 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default ExpertCard;