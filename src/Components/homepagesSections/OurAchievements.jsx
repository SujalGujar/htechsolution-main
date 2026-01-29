import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const OurAchievements = () => {
  
  const achievements = useSelector(
    (state) =>
      state.ourAchievementsSection?.achievementsList || []
  );

  return (
    <section className="py-20 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow text-center"
            >
              {/* ICON */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#1F6E8C] to-[#6BA368] flex items-center justify-center">
                  <img
                    src={item.iconBase64}
                    alt=""
                    className="w-7 h-7"
                  />
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

          {achievements.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No achievements added yet
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;
