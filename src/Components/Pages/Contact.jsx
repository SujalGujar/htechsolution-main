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
import { useState ,useRef} from "react";
import emailjs from "@emailjs/browser";


// import contactUs from "../contactusSections/contactUs";

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
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed",
      ],
      gradient: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)",
    },
  ];
  const questions = [
    {
      id: 1,
      question: "What are your support hours?",
      answer:
        "Our support team is available Monday through Friday, 9 AM to 6 PM PST. For urgent technical issues, we offer 24/7 emergency support for enterprise clients.",
      gradient: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)",
    },
    {
      id: 2,
      question: "Do you offer on-site consultations?",
      answer:
        "Yes! We provide on-site consultations for enterprise clients. Contact our sales team to schedule a visit and discuss your specific hardware and software needs.",
      gradient: "linear-gradient(135deg, #6BA368 0%, #D9A441 100%)",
    },
    {
      id: 3,
      question: "What products do you offer?",
      answer:
        "We specialize in both software solutions (enterprise applications, cloud services) and hardware products (servers, networking equipment, custom workstations).",
      gradient: "linear-gradient(135deg, #D9A441 0%, #F7F7F2 100%)",
    },
    {
      id: 4,
      question: "How long does it take to get a response?",

      answer:
        "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line directly.",
      gradient: "linear-gradient(135deg, #855d14ff 0%, #bebe29ff 100%)",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [click, SetClick] = useState(null);
  const handleOpenAns = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const [openVisit, setOpenVisit] = useState(false);
  const[openForm,setOpenForm]=useState(false);

  

  return (
    <>
   
      <section className="relative w-full h-[60vh] overflow-hidden">
        <div className="relative h-full w-full">
          <img
            src={contactUsImage}
            alt="Contact us"
            className="object-cover w-full h-full brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
            <motion.h1

              className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl font-medium mb-8 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Connect with our expert team for personalized solutions and
              support tailored to your needs.
            </motion.p>

            <motion.button
              className="px-8 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => {
    const form = document.getElementById("contactForm");
    form?.scrollIntoView({ behavior: "smooth" });
  }}
            >
              Contact Us Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Support?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive support solutions designed to meet your
              unique requirements and exceed your expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE – Services Cards */}
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
                    {/* Gradient Top Border */}
                    <div
                      className="h-2 w-full"
                      style={{ background: service.gradient }}
                    />

                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-6">
                        {/* Icon Container with Gradient */}
                        <motion.div
                          className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl"
                          style={{ background: service.gradient }}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="text-2xl text-white" />
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                            {service.Heading}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                          <span>Learn More</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
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
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1F6E8C]/10 to-[#D9A441]/10" />

                {/* Floating Card */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #6BA368 0%, #D9A441 100%)",
                      }}
                    >
                      <FaHeadset className="text-xl text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        24/7 Support Available
                      </h4>
                      <p className="text-sm text-gray-600">
                        Get instant assistance anytime
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20 blur-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #1F6E8C 0%, #6BA368 100%)",
                }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-20 blur-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #D9A441 0%, #F7F7F2 100%)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          {contacts.map((contact, index) => {
            const Icon = contact.icon; // This will now work
            return (
              <div
                key={index} // Always add a key when mapping
                className="flex items-center flex-col rounded-xl shadow-xl bg-white/90 backdrop-blur p-6"
              >
                <motion.div
                  className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 to-teal-400"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: contact.gradient }}
                >
                  <Icon className="text-2xl text-white" />
                </motion.div>
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold py-2 mb-2">
                  {contact.heading}
                </h3>
                <ul className="space-y-4 mt-4">
                  {contact.features.map((feature, i) => (
                    <li key={i} className="relative pl-6 text-sm text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
       
    <section id="contactform" className="py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT – FORM */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="John Doe"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="john@example.com"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="user_phone"
                  placeholder="+1 (555) 123-4567"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="user_company"
                  placeholder="Your Company"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Inquiry Type
              </label>
              <select
                name="inquiry_type"
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              >
                <option>General Inquiry</option>
                <option>Support</option>
                <option>Sales</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Tell us more about your inquiry..."
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "✈ Send Message"}
            </button>

            {messageSent && (
              <p className="text-green-600 mt-3">
                Message sent successfully! We'll get back to you soon.
              </p>
            )}
          </form>
        </div>

        {/* RIGHT – Map & Office Info */}
        <div className="flex flex-col h-full space-y-6">
          <div className="flex-1 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.9185833060187!2d72.64895387509306!3d23.063446279145083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8775f1cddfbb%3A0x346dc1db87f0683f!2sPUSHPAK%20CORNER!5e0!3m2!1sen!2sin!4v1768029658627!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">Visit Our Office</h3>
            <p className="text-sm text-gray-600">
              Stop by our office to discuss software solutions in person.
            </p>
            <button
              onClick={() => alert("Schedule Visit Modal Coming Soon")}
              className="text-blue-600 mt-3 inline-block font-medium hover:underline"
            >
              Schedule a Visit →
            </button>
          </div>
        </div>
      </div>
    </section>
      {openVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">

            {/* Close Button */}
            <button
              onClick={() => setOpenVisit(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Schedule a Visit</h2>

            <form className="space-y-4">

              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full mt-1 rounded-lg border px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full mt-1 rounded-lg border px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  className="w-full mt-1 rounded-lg border px-4 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Preferred Time</label>
                  <input
                    type="time"
                    className="w-full mt-1 rounded-lg border px-4 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Purpose of Visit</label>
                <textarea
                  rows="3"
                  placeholder="Meeting, Demo, Discussion..."
                  className="w-full mt-1 rounded-lg border px-4 py-2"
                />
              </div>

              <button
                type="submit"
                onClick={() => setOpenVisit(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                Confirm Visit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* <section className="p-12 px-4 md:px-6">
        <motion.div className="flex flex-col items-center justify-center py-4">
          <motion.h2 className="text-2xl md:text-3xl lg:text-4xl font-bold py-2">
            Frequently Asked Questions
          </motion.h2>

          {questions.map((q, index) => (
            <motion.div
              key={index}
              style={{ background: q.gradient }}
              className="w-full max-w-3xl rounded-xl shadow-xl hover:shadow-2xl mb-4 transition-shadow duration-300 flex flex-col py-4 px-4 lg:px-6"
            >
              <motion.h1 className="text-xl lg:text-2xl font-bold py-2">
                {q.question}
              </motion.h1>

              {openIndex === index && (
                <motion.p
                  openIndex={openIndex}
                  className="font-semibold text-md py-2 px-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {q.answer}
                </motion.p>
              )}

              <motion.button
                onClick={() => handleToggle(index)}
                className="py-2 px-4 text-left font-semibold"
              >
                {openIndex === index ? "Hide Answer" : "Show Answer"}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section> */}
    </>
  );
};

export default Contact;
