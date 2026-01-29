import aboutIllustration from "../../images/aboutus2.jpg";
import React from "react";
import { motion } from "framer-motion";
const AboutHero = () => {
  // containerVarianents = {
  //   hidden: {
  //     opacity: 0,
  //   },
  //   visible: {
  //     opacity: 1,
  //     transition: { staggerChildren: 0.15 },
  //   },
  // };

  return (
    <section className="w-full bg-[#F9FAFB] py-16 px-4 md:px-10">
      <motion.div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div>
          <motion.h1 className="text-3xl md:text-5xl font-bold text-slate-800">
            ABOUT US
          </motion.h1>

          <p className="mt-6 text-slate-600 leading-relaxed max-w-md">
            At H-Tech Solutions Pvt. Ltd., we follow a structured and
            transparent approach to deliver high-quality software and IT
            solutions. We begin by understanding client requirements, business
            objectives, and technical needs in detail.
          </p>

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
            Learn More
          </button>
        </motion.div>

        {/* Illustration */}
        <div className="flex py-4 md:py-12 justify-center">
          <img
            src={aboutIllustration}
            alt="About Illustration"
            className="w-full max-w-md"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default AboutHero;
