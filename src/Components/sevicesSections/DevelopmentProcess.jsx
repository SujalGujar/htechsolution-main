import React from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaDraftingCompass,
  FaCode,
  FaBug,
  FaRocket,
  FaCogs,
} from "react-icons/fa";

const DevelopmentProcess = () => {
  const process = [
    {
      id: 1,
      heading: "Requirement Analysis",
      description:
        "We understand your business goals, technical needs, and challenges to define a clear project scope.",
      icon: <FaClipboardList size={28} />,
    },
    {
      id: 2,
      heading: "System Design",
      description:
        "We design scalable architecture, workflows, and UI based on project requirements.",
      icon: <FaDraftingCompass size={28} />,
    },
    {
      id: 3,
      heading: "Development",
      description:
        "Our engineers build reliable software and hardware solutions using best practices.",
      icon: <FaCode size={28} />,
    },
    {
      id: 4,
      heading: "Testing & Validation",
      description:
        "We test thoroughly to ensure performance, security, and reliability.",
      icon: <FaBug size={28} />,
    },
    {
      id: 5,
      heading: "Deployment",
      description: "We deploy the solution smoothly with minimal downtime.",
      icon: <FaRocket size={28} />,
    },
    {
      id: 6,
      heading: "Maintenance & Support",
      description:
        "We provide continuous monitoring, updates, and technical support.",
      icon: <FaCogs size={28} />,
    },
  ];

  return (
    <section className="py-12 px-4 lg:px-8">
      {/* Heading */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold">
          Our{" "}
          <span className="bg-gradient-to-r from-[#1F6E8C] to-[#6BA368] bg-clip-text text-transparent">
            Development
          </span>{" "}
          Process
        </h1>
      </div>

      {/* Divider */}
      <div
        style={{
          background: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)",
        }}
        className="w-full h-1 rounded-xl mb-10"
      />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 overflow-x-auto gap-8">
        {process.map((step) => (
          <motion.div
            key={step.id}
            whileHover={{ y: -5 }}
            className="rounded-xl shadow-lg p-6 bg-white"
          >
            <div className="text-teal-600 mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.heading}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DevelopmentProcess;
