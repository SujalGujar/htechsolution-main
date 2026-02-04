import React from "react";
import { FaHeadset, FaUserCog, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
const ServicesProvided = () => {
  const services = [
    {
      id: 1,
      icon: FaHeadset,
      Heading: "Quick Support",
      description: "We respond within 24 hours",
    },
    {
      id: 2,
      icon: FaUserCog,
      Heading: "Expert Support",
      description: "Technical experts ready to assist",
    },
    {
      id: 3,
      icon: FaShieldAlt,
      Heading: "Secure Communication",
      description: "Your data is protected",
    },
  ];

  return (
    <>
      <section className="py-8 px-4 md:px-8">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          <motion.div className="flex flex-col items-center  px-4">
            {services.map((service, idx) => {
              return (
                <>
                  <motion.div className=" rounded-xl shadow-xl px-4 py-2">
                    <motion.div className="w-12 h-12 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <service.icon className="text-3xl text-green-600" />
                      </motion.div>
                    </motion.div>

                    <motion.h2 className="text-2xl md:text-3xl lg:text-4xl py-2">
                      {service.Heading}
                    </motion.h2>
                    <motion.p>{service.description}</motion.p>
                  </motion.div>
                </>
              );
            })}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default ServicesProvided;
