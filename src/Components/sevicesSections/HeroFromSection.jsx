import React from "react";
import serviceImage from "../../images/close-up-hands-working-project.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  const servicesData = [
    {
      title: "Software Development",
      image: serviceImage,
      points: [
        "Custom web application development",
        "Scalable backend solutions",
        "Modern UI with React & Tailwind",
      ],
    },
  ];

  return (
    <section
      style={{
        marginTop: "30px",
        background: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)",
      }}
      className="py-16 px-4 md:px-12"
    >
      {servicesData.map((service, index) => (
        <motion.div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* TEXT SECTION */}
          <div className="flex flex-col justify-center px-4 md:px-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {service.title}
            </h2>

            {service.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 mb-2">
                <span className="w-2 h-2 mt-2 bg-white rounded-full"></span>
                <p className="text-white font-medium">{point}</p>
              </div>
            ))}
          </div>

          {/* IMAGE SECTION */}
          <div className="flex justify-center">
            <img
              src={service.image}
              alt={service.title}
              className="w-96 h-96 shadow-2xl object-cover rounded-xl shadow-lg"
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default HeroSection;
