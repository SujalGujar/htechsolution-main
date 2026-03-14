import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliverables } from "../store/HomepageSlices/ProjectDeliverableSlice";

const BASE_URL = "http://localhost:5000";

const ProjectDeliverablesHome = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.projectDeliverables);

  useEffect(() => {
    dispatch(fetchDeliverables());
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-center py-12 text-gray-400">
        Loading deliverables...
      </p>
    );
  }

  // ✅ Hide section if no data
  if (!list || list.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "#1F6E8C" }}
        >
          Project Deliverables
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              {/* ✅ Only show image if it exists */}
              {item.image ? (
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `${BASE_URL}${item.image}`
                  }
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <h3 className="font-bold text-lg mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">{item.review}</p>
              <p className="text-gray-400 text-sm italic text-center mt-1">
                {item.methodology}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectDeliverablesHome;