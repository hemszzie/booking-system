import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import ExpertCard from "../components/ExpertCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Home = () => {
  const [experts, setExperts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const fetchExperts = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/experts?page=${currentPage}&search=${search}&category=${category}`
      );

      setExperts(data.experts);

      setTotalPages(data.totalPages);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [currentPage, search, category]);

  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">
          Find Experts
        </h1>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search expert..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border p-3 rounded-lg w-full"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border p-3 rounded-lg w-full md:w-64"
          >
            <option value="">All Categories</option>

            <option value="Fitness">
              Fitness
            </option>

            <option value="Career">
              Career
            </option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Expert Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {experts.length === 0 ? (
  <div className="text-xl text-gray-500">
    No experts found
  </div>
) : (
  experts.map((expert) => (
    <ExpertCard
      key={expert._id}
      expert={expert}
    />
  ))
)}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;