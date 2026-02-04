import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const WhatWeAre = () => {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/sections/type/whatWeAre"
        );

        setSections(res.data);
        if (res.data.length > 0) {
          setActiveId(res.data[0].id);
        }
      } catch (err) {
        console.error("Failed to load What We Are", err);
      }
    };

    fetchSections();
  }, []);

  if (!sections.length) {
    return (
      <div className="text-center p-20 text-gray-500">
        No content yet.
      </div>
    );
  }

  return (
    <section className="p-10 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        {sections.map((section) => {
          const isOpen = activeId === section.id;

          return (
            <motion.div
              key={section.id}
              layout
              className="bg-white rounded-xl shadow-lg p-6"
            >
              {/* HEADER */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setActiveId(isOpen ? null : section.id)
                }
              >
                <h3 className="text-xl font-bold">
                  {section.title}
                </h3>

                <span className="text-xl">
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>

              {/* CONTENT */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-gray-700">
                      {section.content}
                    </p>

                    {section.image && (
                      <img
                        src={`http://localhost:5000${section.image}`}
                        alt={section.title}
                        className="mt-4 rounded-xl"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatWeAre;
