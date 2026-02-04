import React from "react";
import contactUsImage from "../../images/contact-us.jpg";
import {motion} from "framer-motion"
const HeroSectionContact = () => {
  return (
    <>
      <section className="h-[50vh] w-full py-8 ">
        <motion.div 
         className="relative shadow-xl h-[50vh] mt-8">
          <img
            src={contactUsImage}
            alt="Contact us"
            className="object-cover inset-0 w-full h-full"
          />

          {/* Centered Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
              Get In Touch
            </h1>

            <p className="font-semibold text-md lg:text-2xl py-2 max-w-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Asperiores, optio?
            </p>

            <button className="mt-4 px-6 py-2 border border-gray-800 rounded-full bg-gradient-to-tr from-[#6BA368] to-[#D9A441]">
              Contact Us
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSectionContact;
