import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchAchievements } from "../store/HomepageSlices/OurAchievementsSlice";

const BASE_URL = "http://localhost:5000";

const OurAchievements = () => {
  const dispatch = useDispatch();
  const { achievementsList, loading } = useSelector(
    (state) => state.ourAchievementsSection
  );

  // ✅ Fetch from backend on mount
  useEffect(() => {
    dispatch(fetchAchievements());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">Loading...</div>
    );
  }

  if (!achievementsList || achievementsList.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievementsList.map((item, index) => (
            <motion.div
              key={item._id} // ✅ use _id
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow text-center"
            >
              {/* ICON */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#1F6E8C] to-[#6BA368] flex items-center justify-center">
                  {item.image ? (
                    <img
                      // ✅ Full image URL
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `${BASE_URL}${item.image}`
                      }
                      alt={item.title}
                      className="w-7 h-7 object-contain"
                    />
                  ) : (
                    // Default icon if no image
                    <span className="text-white text-xl font-bold">
                      {item.title?.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              {/* VALUE */}
              <h2 className="text-4xl font-bold text-[#1F6E8C]">
                {item.value}
              </h2>

              {/* TITLE */}
              <p className="text-lg font-semibold text-[#6B8E7A]">
                {item.title}
              </p>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mt-2">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;