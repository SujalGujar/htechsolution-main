import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const OurServices = () => {
  const services = useSelector((state) => state.ourServices.services);

  return (
    <section className="py-20 bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-xl shadow"
            >
              <img
                src={service.icon}
                alt={service.title}
                className="w-14 h-14 mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
