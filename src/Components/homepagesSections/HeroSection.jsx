import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useSelector } from "react-redux";

import backgroundImg from "../../images/4516.jpg";

const HeroSection = () => {
  const heroList = useSelector(
    (state) => state.heroSection.heroList
  );

  const [activeCard, setActiveCard] = useState(0);
  const textRefs = useRef([]);

 
  const cards =
    heroList.length > 0
      ? heroList.map((item, index) => ({
          id: index,
          title: item.heading,
          description: item.description,
          buttonText: "Get Started",
          image: item.image,
          textOnLeft: index % 2 === 0,
        }))
      : [];

  useEffect(() => {
    if (!cards.length) return;

    if (textRefs.current[activeCard]) {
      gsap.fromTo(
        textRefs.current[activeCard].children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    }

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeCard, cards.length]);

  if (!cards.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Hero content not added yet
      </div>
    );
  }

  return (
    <section className="relative min-h-screen md:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <img
        src={backgroundImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCard(index)}
            className={`w-3 h-3 rounded-full ${
              activeCard === index
                ? "bg-white scale-125"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {cards.map(
            (card) =>
              activeCard === card.id && (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col lg:flex-row items-center gap-10"
                >
                  {/* Text */}
                  <div
                    ref={(el) =>
                      (textRefs.current[card.id] = el)
                    }
                    className="lg:w-1/2 text-white"
                  >
                    <h1 className="text-4xl font-bold mb-4">
                      {card.title}
                    </h1>
                    <p className="text-lg mb-6">
                      {card.description}
                    </p>
                    <button className="bg-[#1F6E8C] px-6 py-3 rounded">
                      {card.buttonText}
                    </button>
                  </div>

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:w-1/2"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="rounded-xl shadow-lg h-[60vh] w-full object-cover"
                    />
                  </motion.div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;