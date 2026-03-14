import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSolutions } from "../store/HomepageSlices/HardwareSlice";

const BASE_URL = "http://localhost:5000";

const SoftwareSolutions = () => {
  const dispatch = useDispatch();
  const { solutions, loading } = useSelector(
    (state) => state.hardwareSolutions
  );

  useEffect(() => {
    dispatch(fetchSolutions());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  // ✅ Hide section if no data
  if (!solutions || solutions.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          Hardware Solutions
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution._id}
              className="bg-white rounded-lg shadow hover:shadow-xl transition"
            >
              {/* ✅ Only show image if it exists */}
              {solution.image ? (
                <img
                  src={
                    solution.image.startsWith("http")
                      ? solution.image
                      : `${BASE_URL}${solution.image}`
                  }
                  alt={solution.title}
                  className="h-52 w-full object-cover rounded-t-lg"
                />
              ) : (
                <div className="h-52 w-full bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftwareSolutions;