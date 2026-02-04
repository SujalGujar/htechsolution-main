import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliverables } from "../store/HomepageSlices/ProjectDeliverableSlice";

const ProjectDeliverableHome = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.projectDeliverables);

  useEffect(() => {
    dispatch(fetchDeliverables());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center py-12">Loading deliverables...</p>;
  }

  if (!list.length) {
    return <p className="text-center py-12 text-gray-500">No project deliverables found.</p>;
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            {item.image ? (
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <h3 className="font-bold text-lg mb-2 text-center">{item.title}</h3>
            <p className="text-gray-600 text-center">{item.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectDeliverableHome;
