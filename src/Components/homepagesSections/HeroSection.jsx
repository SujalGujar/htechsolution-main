// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import gsap from "gsap";
// import { useSelector } from "react-redux";

// import backgroundImg from "../../images/4516.jpg";

// const HeroSection = () => {
//   const heroList = useSelector(
//     (state) => state.heroSection.heroList
//   );

//   const [activeCard, setActiveCard] = useState(0);
//   const textRefs = useRef([]);

 
//   const cards =
//     heroList.length > 0
//       ? heroList.map((item, index) => ({
//           id: index,
//           title: item.heading,
//           description: item.description,
//           buttonText: "Get Started",
//           image: item.image,
//           textOnLeft: index % 2 === 0,
//         }))
//       : [];

//   useEffect(() => {
//     if (!cards.length) return;

//     if (textRefs.current[activeCard]) {
//       gsap.fromTo(
//         textRefs.current[activeCard].children,
//         { y: 40, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.9,
//           ease: "power3.out",
//           stagger: 0.2,
//         }
//       );
//     }

//     const interval = setInterval(() => {
//       setActiveCard((prev) => (prev + 1) % cards.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [activeCard, cards.length]);

//   if (!cards.length) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
//         Hero content not added yet
//       </div>
//     );
//   }

//   return (
//     <section className="relative min-h-screen md:min-h-[80vh] flex items-center overflow-hidden">
//       {/* Background */}
//       <img
//         src={backgroundImg}
//         alt="Background"
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black/60" />

//       {/* Navigation Dots */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-3">
//         {cards.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setActiveCard(index)}
//             className={`w-3 h-3 rounded-full ${
//               activeCard === index
//                 ? "bg-white scale-125"
//                 : "bg-white/40"
//             }`}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4">
//         <AnimatePresence mode="wait">
//           {cards.map(
//             (card) =>
//               activeCard === card.id && (
//                 <motion.div
//                   key={card.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex flex-col lg:flex-row items-center gap-10"
//                 >
//                   {/* Text */}
//                   <div
//                     ref={(el) =>
//                       (textRefs.current[card.id] = el)
//                     }
//                     className="lg:w-1/2 text-white"
//                   >
//                     <h1 className="text-4xl font-bold mb-4">
//                       {card.title}
//                     </h1>
//                     <p className="text-lg mb-6">
//                       {card.description}
//                     </p>
//                     <button className="bg-[#1F6E8C] px-6 py-3 rounded">
//                       {card.buttonText}
//                     </button>
//                   </div>

//                   {/* Image */}
//                   <motion.div
//                     initial={{ opacity: 0, x: 80 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="lg:w-1/2"
//                   >
//                     <img
//                       src={card.image}
//                       alt={card.title}
//                       className="rounded-xl shadow-lg h-[60vh] w-full object-cover"
//                     />
//                   </motion.div>
//                 </motion.div>
//               )
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroSections } from "../../Components/store/HomepageSlices/HeroSectionSlice";

import backgroundImg from "../../images/4516.jpg";

const BASE_URL = "http://localhost:5000";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { heroList, loading } = useSelector((state) => state.heroSection);
  const [activeCard, setActiveCard] = useState(0);

  // ✅ FIX 1: Removed textRefs and GSAP entirely
  // Framer Motion handles all animations now
  // GSAP + AnimatePresence on same nodes = insertBefore crash

  useEffect(() => {
    dispatch(fetchHeroSections());
  }, [dispatch]);

  const cards =
    heroList.length > 0
      ? heroList.map((item, index) => ({
          id: index,
          title: item.heading || item.title,
          description: item.description,
          buttonText: "Get Started",
          image: item.image?.startsWith("http")
            ? item.image
            : `${BASE_URL}${item.image}`,
        }))
      : [];

  // ✅ FIX 2: Auto slide interval in separate useEffect
  // No longer mixed with GSAP animation
  useEffect(() => {
    if (!cards.length) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [cards.length]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        <div style={{
          width: 36, height: 36,
          border: "3px solid rgba(31,110,140,0.3)",
          borderTopColor: "#1F6E8C",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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
            className={`w-3 h-3 rounded-full transition-all ${
              activeCard === index ? "bg-white scale-125" : "bg-white/40"
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
                  // ✅ FIX 3: Framer Motion handles enter/exit animations
                  // No GSAP needed - this replaces textRefs animation
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col lg:flex-row items-center gap-10"
                >
                  {/* Text */}
                  <div className="lg:w-1/2 text-white">
                    {/* ✅ FIX 4: Each child animates independently */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                      className="text-4xl font-bold mb-4"
                    >
                      {card.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-lg mb-6"
                    >
                      {card.description}
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#1F6E8C] px-6 py-3 rounded text-white font-semibold"
                    >
                      {card.buttonText}
                    </motion.button>
                  </div>

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="lg:w-1/2"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="rounded-xl shadow-lg h-[60vh] w-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
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