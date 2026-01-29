import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpertise } from "../store/AboutUsPageSlices/OurExpertiseSlice";

const OurExpertise = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.expertise);

  useEffect(() => {
    dispatch(fetchExpertise());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!list.length) {
    return (
      <p className="text-center text-gray-500">
        No expertise added yet
      </p>
    );
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Expertise
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {list.map(item => (
          <div
            key={item.id}
            className="bg-white p-5 rounded shadow"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-40 w-full object-cover rounded mb-4"
              />
            )}

            <h3 className="text-lg font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurExpertise;
