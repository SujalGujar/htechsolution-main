import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "1. Requirement Gathering",
    description:
      "We work closely with clients to understand business goals and requirements.",
    icon: "📝",
  },
  {
    title: "2. Planning & Design",
    description:
      "Our team designs wireframes, architecture, and sprints based on Agile methodology.",
    icon: "📐",
  },
  {
    title: "3. Development",
    description:
      "We implement features in iterative sprints, ensuring continuous delivery.",
    icon: "💻",
  },
  {
    title: "4. Testing & QA",
    description:
      "Quality is our priority. We test each sprint thoroughly to ensure reliability.",
    icon: "✅",
  },
  {
    title: "5. Deployment & Feedback",
    description:
      "We deploy the software and gather feedback for continuous improvement.",
    icon: "🚀",
  },
];

const OurMethodology = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Our Methodology</h2>
        <p className="text-gray-600 mb-12">
          We follow the Agile software development model to deliver high-quality solutions quickly and efficiently.
        </p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Agile Model Illustration */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Agile Development Cycle</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {["Plan", "Design", "Develop", "Test", "Review"].map((phase, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md w-32"
              >
                <div className="text-lg font-bold mb-2">{phase}</div>
                <div className="h-2 w-full bg-blue-300 rounded-full"></div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            Agile is iterative and ensures continuous improvement at every step.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurMethodology;
