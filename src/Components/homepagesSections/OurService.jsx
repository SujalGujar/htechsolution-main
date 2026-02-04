import React from "react";
import { motion } from "framer-motion";

import softwareIcon from "../../icons/experiments.png";
import hardwareIcon from "../../icons/tools.png";
import governmentIcon from "../../icons/governmenticon.png";
import supportIcon from "../../icons/help-desk.png";

/* Animations */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const OurService = () => {
  const services = [
    {
      id: 1,
      title: "Software Development Services",
      description:
        "End-to-end software solutions including web, mobile, ERP, e-commerce, and custom business applications designed for scalability and security.",
      icon: softwareIcon,
      gradient: "from-[#6BA368] to-[#1F6E8C]",
    },
    {
      id: 2,
      title: "Hardware & Networking Solutions",
      description:
        "Complete IT infrastructure including CCTV, LAN/WAN, servers, routing, switching, and secure network maintenance.",
      icon: hardwareIcon,
      gradient: "from-[#1F6E8C] to-[#2A8CB0]",
    },
    {
      id: 3,
      title: "Government & Enterprise Solutions",
      description:
        "Secure portals, dashboards, automation systems, and compliance-ready enterprise applications.",
      icon: governmentIcon,
      gradient: "from-[#1F6E8C] to-[#6BA368]",
    },
    {
      id: 4,
      title: "Support & Maintenance Services",
      description:
        "Ongoing monitoring, upgrades, issue resolution, and performance optimization for software and hardware systems.",
      icon: supportIcon,
      gradient: "from-[#2A8CB0] to-[#6BA368]",
    },
  ];

  return (
    <section className="py-20 bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 mb-16"
        >
          <div className="rounded-full border border-[#1F6E8C] p-4">
            <img src={softwareIcon} className="w-10 h-10" alt="Services Icon" />
          </div>

          <h1
            className="
            text-3xl md:text-4xl
            font-bold text-center
            bg-gradient-to-r
            from-[#1F6E8C]
            to-[#6BA368]
            bg-clip-text text-transparent
          "
          >
            Our Services
          </h1>
        </motion.div>

        {/* ===== SERVICES GRID ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            grid grid-cols-1
            lg:grid-cols-2
            gap-x-10 gap-y-6
          "
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={`
                relative group bg-white rounded-xl p-6
                shadow-md hover:shadow-xl
                transition-all duration-300
                overflow-hidden

                ${
                  service.id === 3 || service.id === 4
                    ? "lg:translate-y-10"
                    : ""
                }
              `}
            >
              {/* Hover Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient}
                opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10 flex gap-4">
                <motion.img
                  src={service.icon}
                  alt={service.title}
                  className="w-14 h-14 shrink-0"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />

                <div>
                  <h2 className="text-xl font-semibold text-[#0F4C5C] mb-2">
                    {service.title}
                  </h2>
                  <p className="text-[#6B8E7A] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurService;
