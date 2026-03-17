import React from "react";
import { motion } from "framer-motion";
import { FaHeadset, FaUserCog, FaShieldAlt } from "react-icons/fa";
import contactUsImage from "../../images/contact-us.jpg";
import serviceImage from "../../images/servicesimage.jpg";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import WarrantyCheckSection from "./Warrentychecksection"; // ← adjust path if needed

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_ra7yuxf",
        "template_auxa1qu",
        formRef.current,
        "mKT9MRTWXg1bnih7o"
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setMessageSent(true);
          formRef.current.reset();
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  const services = [
    {
      id: 1,
      icon: FaHeadset,
      Heading: "Quick Support",
      description:
        "We respond within 24 hours. Our dedicated team is available round the clock to address your concerns promptly.",
      gradient: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)",
    },
    {
      id: 2,
      icon: FaUserCog,
      Heading: "Expert Support",
      description:
        "Technical experts ready to assist. Get solutions from certified professionals with years of experience.",
      gradient: "linear-gradient(135deg, #6BA368 0%, #D9A441 100%)",
    },
    {
      id: 3,
      icon: FaShieldAlt,
      Heading: "Secure Communication",
      description:
        "Your data is protected with enterprise-grade encryption. We prioritize your privacy and security.",
      gradient: "linear-gradient(135deg, #D9A441 0%, #F7F7F2 100%)",
    },
  ];

  const contacts = [
    {
      id: 1,
      icon: FaMapMarkerAlt,
      heading: "Visit Us",
      features: [
        "1st floor Mahakali Electronics",
        "Rameshwar Char Rasta",
        "Meghaninagar, Ahmedabad - 380016",
      ],
      gradient: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)",
    },
    {
      id: 2,
      icon: FaPhoneAlt,
      heading: "Call Us",
      features: ["+91 7984649969", "+91 8460525318"],
      gradient: "linear-gradient(135deg, #D9A441 0%, #F7F7F2 100%)",
    },
    {
      id: 3,
      icon: FaEnvelope,
      heading: "Email Us",
      features: ["htechsolution98@gmail.com"],
      gradient: "linear-gradient(135deg, #6BA368 0%, #D9A441 100%)",
    },
    {
      id: 4,
      icon: FaClock,
      heading: "Business Hours",
      features: [
        "Mon-Fri: 10:00 AM - 7:00 PM",
        "Saturday: 10:00 AM - 7:00 PM",
        "Sunday: Closed",
      ],
      gradient: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [openVisit, setOpenVisit] = useState(false);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="contact-hero-root relative w-full h-[520px] md:h-[62vh] lg:h-[74vh] overflow-hidden">

        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        >
          <img
            src={contactUsImage}
            alt="Contact us"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[#0d1f2d]/65" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(31,110,140,0.45) 0%, transparent 55%, rgba(0,0,0,0.4) 100%)" }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="absolute top-10 right-16 w-16 h-16 rounded-2xl border-2 border-white/15 float-slow pointer-events-none" />
        <div className="absolute bottom-16 left-12 w-9 h-9 rounded-full border border-[#2AA8D0]/40 float-slower pointer-events-none" />
        <div className="absolute top-1/3 left-[7%] w-1 h-20 rounded-full pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(42,168,208,0.5), transparent)" }}
        />
        <div className="absolute top-1/3 right-[7%] w-1 h-20 rounded-full pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)" }}
        />

        <svg className="absolute bottom-0 left-0 w-full pointer-events-none" height="60" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0 40 Q360 0 720 30 Q1080 60 1440 20" stroke="rgba(31,110,140,0.4)" strokeWidth="1.5" fill="none" className="contact-line-draw" />
        </svg>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-5 text-white/90"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2AA8D0] animate-pulse" />
            We're Here to Help
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 leading-[1.05]"
            style={{ textShadow: "0 4px 32px rgba(0,0,0,0.4)" }}
          >
            Get In{" "}
            <span className="relative inline-block">
              <span style={{ color: "#2AA8D0" }}>Touch</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
                className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full origin-left"
                style={{ background: "linear-gradient(90deg, #1F6E8C, #2AA8D0)" }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base lg:text-lg mb-8 max-w-xl text-white/75 leading-relaxed"
          >
            Connect with our expert team for personalized solutions and
            support tailored to your business needs.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 12px 36px rgba(31,110,140,0.5)" }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-3 rounded-full font-semibold text-white text-sm shadow-xl transition-all duration-300 flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #1F6E8C, #2AA8D0)" }}
              onClick={() => {
                const form = document.getElementById("contactForm");
                form?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.18)" }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-3 rounded-full font-semibold text-white text-sm border border-white/25 bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="absolute bottom-8 flex flex-wrap gap-4 justify-center px-4"
          >
            {[
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "24/7 Support" },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Quick Response" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "Expert Team" },
            ].map((chip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium"
              >
                <svg className="w-3.5 h-3.5 text-[#2AA8D0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={chip.icon} />
                </svg>
                {chip.label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .contact-hero-root { font-family: 'Poppins', sans-serif; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50%       { transform: translateY(-12px) rotate(12deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .float-slow   { animation: float-slow 5s ease-in-out infinite; }
        .float-slower { animation: float-slower 7s ease-in-out infinite; }

        .contact-line-draw {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: draw-line 1.2s ease-out 1s forwards;
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* ── Services Section ── */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Support?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive support solutions designed to meet your
              unique requirements and exceed your expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="h-2 w-full" style={{ background: service.gradient }} />
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-6">
                        <motion.div
                          className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl"
                          style={{ background: service.gradient }}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="text-2xl text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{service.Heading}</h3>
                          <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                          <span>Learn More</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={serviceImage}
                  alt="Professional Support Team"
                  className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1F6E8C]/10 to-[#D9A441]/10" />
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #6BA368 0%, #D9A441 100%)" }}>
                      <FaHeadset className="text-xl text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">24/7 Support Available</h4>
                      <p className="text-sm text-gray-600">Get instant assistance anytime</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20 blur-3xl"
                style={{ background: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)" }} />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-20 blur-3xl"
                style={{ background: "linear-gradient(135deg, #D9A441 0%, #F7F7F2 100%)" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact Cards Section ── */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Connect With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the most convenient way to reach us</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="h-1.5 w-full" style={{ background: contact.gradient }} />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: contact.gradient }}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="text-xl text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-gray-800">{contact.heading}</h3>
                    </div>
                    <div className="space-y-2">
                      {contact.features.map((feature, i) => (
                        <p key={i} className="text-sm text-gray-600 leading-relaxed">{feature}</p>
                      ))}
                    </div>
                    <button
                      className="mt-4 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors flex items-center gap-1"
                      onClick={() => {
                        if (contact.heading === "Call Us") {
                          window.location.href = `tel:${contact.features[0].replace(/\s/g, '')}`;
                        } else if (contact.heading === "Email Us") {
                          window.location.href = `mailto:${contact.features[0]}`;
                        }
                      }}
                    >
                      <span>
                        {contact.heading === "Visit Us" ? "Get Directions" :
                          contact.heading === "Call Us" ? "Call Now" :
                          contact.heading === "Email Us" ? "Send Email" : "View Hours"}
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                    style={{ background: contact.gradient }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WARRANTY CHECK SECTION ── */}
      <WarrantyCheckSection />

      {/* ── Contact Form Section ── */}
      <section id="contactForm" className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT – FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">We'll get back to you within 24 hours</p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="user_name" placeholder="John Doe" required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input type="email" name="user_email" placeholder="john@example.com" required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="text" name="user_phone" placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" name="user_company" placeholder="Your Company"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type</label>
                  <select name="inquiry_type"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Sales</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea name="message" rows="4" placeholder="Tell us more about your inquiry..." required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300 transform hover:scale-[1.02]">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <><span>✈</span> Send Message</>
                  )}
                </button>

                {messageSent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <p className="text-green-600 text-sm flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* RIGHT – Map & Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[300px] lg:h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.9185833060187!2d72.64895387509306!3d23.063446279145083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8775f1cddfbb%3A0x346dc1db87f0683f!2sPUSHPAK%20CORNER!5e0!3m2!1sen!2sin!4v1768029658627!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl shadow-xl p-8">
                <h3 className="font-bold text-xl text-gray-800 mb-3">Visit Our Office</h3>
                <p className="text-gray-600 mb-4">
                  Stop by our office to discuss software solutions in person. We'd love to meet you!
                </p>
                <button
                  onClick={() => setOpenVisit(true)}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  <span>Schedule a Visit</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Schedule Visit Modal ── */}
      {openVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
          >
            <button
              onClick={() => setOpenVisit(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule a Visit</h2>
            <p className="text-gray-600 mb-6">Fill in your details and we'll confirm your visit</p>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              setOpenVisit(false);
              alert("Visit scheduled! We'll contact you shortly.");
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" placeholder="John Doe" required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" placeholder="john@example.com" required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" placeholder="+91 98765 43210" required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input type="date"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <input type="time"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Visit</label>
                <textarea rows="3" placeholder="Meeting, Demo, Discussion..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] mt-2">
                Confirm Visit
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Contact;