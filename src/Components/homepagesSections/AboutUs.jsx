import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import gsap from "gsap";

const AboutUs = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  /* ✅ Get data from Redux */
  const aboutUsList = useSelector(
    (state) => state.aboutUsSection.aboutUsList
  );

  /* If no data added by admin */
  if (!aboutUsList || aboutUsList.length === 0) {
    return null;
  }

  /* ✅ Use latest entry */
  const aboutData = aboutUsList[0];

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div
      className="py-16 md:py-24 px-4 md:px-8"
      style={{ backgroundColor: "#F7F7F2" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* IMAGE */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <img
                src={aboutData.image}
                alt="About Us"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F6E8C]/10 to-transparent" />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#1F6E8C" }}
                >
                  10+
                </div>
                <div className="text-xs text-gray-600">
                  Years Experience
                </div>
              </div>
            </div>
          </motion.div>

          {/* TEXT */}
          <div ref={textRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 inline-block px-4 py-2 rounded-lg"
                style={{ color: "#f7f7f7", backgroundColor: "#1F6E8C" }}
              >
                {aboutData.heading}
              </h2>

              <p
                className="text-lg leading-relaxed mt-4"
                style={{ color: "#2E2E2E" }}
              >
                {aboutData.description}
              </p>
            </motion.div>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {aboutData.features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                >
                  <div
                    className="w-2 h-8 rounded"
                    style={{ backgroundColor: "#1F6E8C" }}
                  />
                  <span className="font-medium text-gray-800">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{
                background: "linear-gradient(to right, #1F6E8C, #6BA368)",
              }}
            >
              Discover Our Solutions
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
