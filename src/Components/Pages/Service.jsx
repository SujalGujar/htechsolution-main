import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Service = () => {
  const [activeSellingItem, setActiveSellingItem] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const sellingItems = [
    { name: "CCTV", icon: "📹", detail: "High-definition surveillance cameras with night vision, motion detection, and remote monitoring. We supply dome, bullet, and PTZ cameras from trusted brands, suitable for homes, offices, and commercial establishments." },
    { name: "HDD / SSD", icon: "💾", detail: "Internal and external storage drives including SATA HDDs, NVMe SSDs, and portable drives. Available in capacities from 500 GB to 20 TB for desktops, laptops, NAS servers, and surveillance DVRs." },
    { name: "Desktop PC", icon: "🖥️", detail: "Pre-built and custom-assembled desktop computers for office work, graphic design, gaming, and server use. Each unit includes chassis, PSU, motherboard, RAM, CPU, storage, and OS installation as per requirement." },
    { name: "CPU / Processor", icon: "⚡", detail: "Intel Core i3/i5/i7/i9 and AMD Ryzen processors for desktop and laptop upgrades. We supply OEM and retail-boxed units with compatibility guidance for your motherboard and workload." },
    // { name: "Mouse", icon: "🖱️", detail: "Wired and wireless mice including office-use optical mice, ergonomic vertical mice, and high-DPI gaming mice. Available from Logitech, HP, Dell, and other leading brands." },
    // { name: "Keyboard", icon: "⌨️", detail: "Membrane, mechanical, and wireless keyboards for office, data entry, and gaming use. We carry slim compact keyboards, full-size layouts, and backlit mechanical variants." },
    { name: "Laptop", icon: "💻", detail: "Laptops from brands like HP, Dell, Lenovo, Acer, and ASUS across budget, mid-range, and premium segments. Configurations available for business use, software development, creative work, and general productivity." },
    { name: "Printer", icon: "🖨️", detail: "Inkjet, laser, and all-in-one multifunction printers. We supply models suitable for home printing, office document handling, and high-volume commercial printing — from HP, Canon, Epson, and Brother." },
    { name: "All-in-One PC", icon: "🖥️", detail: "Space-saving AIO computers with integrated display and computing unit. Ideal for reception desks, billing counters, and office workstations. Available in 21.5\" and 23.8\" sizes from HP and Lenovo." },
    { name: "HDMI Cable", icon: "🔌", detail: "HDMI cables and adapters supporting 4K, 8K, and HDR output. We supply standard, high-speed, and ultra-high-speed HDMI cables in lengths from 1.5 m to 10 m for monitors, projectors, and TVs." },
    { name: "Router", icon: "📡", detail: "Wi-Fi routers with 802.11ac (Wi-Fi 5) and 802.11ax (Wi-Fi 6) standards. Suitable for home networks, offices, and mesh setups. Brands include TP-Link, Netgear, and D-Link." },
    // { name: "LAN Cable", icon: "🔗", detail: "Cat5e, Cat6, and Cat6A Ethernet cables sold by the metre or in pre-terminated patch leads. Used for structured cabling in offices, labs, and CCTV networks." },
  ];

  const visibleCount = 4;
  const maxSlide = Math.ceil(sellingItems.length / visibleCount) - 1;

  const goNext = () => setCurrentSlide((p) => Math.min(p + 1, maxSlide));
  const goPrev = () => setCurrentSlide((p) => Math.max(p - 1, 0));

  const visibleItems = sellingItems.slice(
    currentSlide * visibleCount,
    currentSlide * visibleCount + visibleCount
  );

  const [activeSoftware, setActiveSoftware] = useState(null);

  const softwareTypes = [
  {
    icon: "💻",
    label: "Custom Software Development",
    detail:
      "We develop custom software solutions based on your business needs. Our systems are designed to improve efficiency, automate tasks, and support business growth.",
  },
  {
    icon: "🌐",
    label: "Web Application Development",
    detail:
      "We build modern and responsive web applications that work smoothly across all devices. Our solutions are fast, secure, and user-friendly.",
  },
  {
    icon: "📱",
    label: "Mobile Application Development",
    detail:
      "We create mobile apps for Android and iOS that help businesses connect with customers and manage operations on the go.",
  },
  {
    icon: "🏢",
    label: "ERP & Business Management Systems",
    detail:
      "We develop ERP systems to manage business operations like inventory, sales, accounts, and employee data in one place.",
  },
  {
    icon: "📊",
    label: "Management Systems",
    detail:
      "We build systems like school management, financial management, and other custom platforms to handle daily operations efficiently.",
  },
  {
    icon: "☁️",
    label: "Cloud Solutions",
    detail:
      "We provide cloud-based solutions for secure data storage, backup, and remote access to your business systems anytime, anywhere.",
  },
  {
    icon: "🔗",
    label: "Enterprise Solutions",
    detail:
      "We develop large-scale applications for businesses and organizations with secure access, automation, and high performance.",
  },
  {
    icon: "🛠️",
    label: "Support & Maintenance",
    detail:
      "We provide ongoing support, updates, and maintenance to ensure your software runs smoothly without any issues.",
  },
];

  const servicingHeadings = [
    {
      icon: "👁️",
      title: "CCTV Surveillance",
      desc: "Professional installation and configuration of IP cameras, DVR/NVR systems, and remote monitoring solutions for homes and businesses.",
    },
    {
      icon: "🔩",
      title: "Laptop & Hardware Repair",
      desc: "Screen replacement, motherboard diagnostics, keyboard repair, battery replacement, and component-level servicing for all major brands.",
    },
    {
      icon: "🌐",
      title: "Network Setup & Maintenance",
      desc: "Structured cabling, router/switch configuration, LAN deployment, and ongoing network monitoring and troubleshooting.",
    },
    {
      icon: "🧪",
      title: "Lab & Projector Setup",
      desc: "End-to-end computer lab installation, projector mounting and alignment, and classroom/office AV system deployment.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 font-sans">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Our <span className="text-blue-600">Services</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Comprehensive IT solutions crafted to power your business forward.
        </p>
      </motion.div>

      {/* ─── SECTION 1: SELLING ─── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-24"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-2xl shadow-lg">
            <span className="text-3xl">🛒</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Selling</h2>
            <p className="text-gray-500 text-sm mt-0.5">IT hardware &amp; accessories</p>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <AnimatePresence mode="wait">
              {visibleItems.map((item, idx) => (
                <motion.div
                  key={`${currentSlide}-${idx}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() =>
                    setActiveSellingItem(
                      activeSellingItem?.name === item.name ? null : item
                    )
                  }
                  className="cursor-pointer group bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center
                    hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-base">{item.name}</h3>
                  <p className="text-xs text-blue-500 mt-2 font-medium">Click for details →</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Detail Panel */}
          <AnimatePresence>
            {activeSellingItem && (
              <motion.div
                key={activeSellingItem.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
                className="mt-5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-5"
              >
                <span className="text-5xl">{activeSellingItem.icon}</span>
                <div>
                  <h4 className="text-xl font-bold text-blue-700 mb-1">{activeSellingItem.name}</h4>
                  <p className="text-gray-700 leading-relaxed">{activeSellingItem.detail}</p>
                </div>
                <button
                  onClick={() => setActiveSellingItem(null)}
                  className="ml-auto text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              disabled={currentSlide === 0}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600
                disabled:opacity-30 hover:bg-blue-50 hover:border-blue-400 transition-all"
            >
              ‹
            </button>
            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentSlide ? "bg-blue-500 w-6" : "bg-gray-300"
                }`}
              />
            ))}
            <button
              onClick={goNext}
              disabled={currentSlide === maxSlide}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600
                disabled:opacity-30 hover:bg-blue-50 hover:border-blue-400 transition-all"
            >
              ›
            </button>
          </div>
        </div>
      </motion.section>

      {/* ─── SECTION 2: SERVICING ─── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: headings */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-emerald-500 to-green-400 p-3 rounded-2xl shadow-lg">
                <span className="text-3xl">🔧</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Servicing</h2>
                <p className="text-gray-500 text-sm mt-0.5">Installation, repair &amp; maintenance</p>
              </div>
            </div>

            <div className="space-y-5">
              {servicingHeadings.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mt-0.5">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px]"
          >
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
              alt="IT Servicing"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-2xl font-bold">Expert Technicians</p>
              <p className="text-white/80 text-sm mt-1">On-site &amp; remote support available</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SECTION 3: SOFTWARE & IT ─── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-24"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-400 p-3 rounded-2xl shadow-lg">
            <span className="text-3xl">💻</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Software &amp; IT Solutions</h2>
            <p className="text-gray-500 text-sm mt-0.5">Projects we build &amp; deliver</p>
          </div>
        </div>

        <p className="text-gray-600 mb-8 max-w-2xl">
          We develop custom digital products across multiple domains — from web platforms to enterprise-grade management systems.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {softwareTypes.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              onClick={() => setActiveSoftware(activeSoftware?.label === s.label ? null : s)}
              className={`cursor-pointer bg-white border rounded-2xl p-5 flex flex-col items-center text-center
                transition-all duration-300 hover:-translate-y-1 group
                ${activeSoftware?.label === s.label
                  ? "border-purple-500 shadow-lg ring-2 ring-purple-200"
                  : "border-purple-100 hover:border-purple-400 hover:shadow-lg"
                }`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
              <p className="text-sm font-semibold text-gray-800">{s.label}</p>
              <p className="text-xs text-purple-400 mt-1.5 font-medium">
                {activeSoftware?.label === s.label ? "Close ×" : "Details →"}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Software Detail Panel */}
        <AnimatePresence>
          {activeSoftware && (
            <motion.div
              key={activeSoftware.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              className="mt-5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6 flex items-start gap-5"
            >
              <span className="text-5xl">{activeSoftware.icon}</span>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-purple-700 mb-1">{activeSoftware.label}</h4>
                <p className="text-gray-700 leading-relaxed">{activeSoftware.detail}</p>
              </div>
              <button
                onClick={() => setActiveSoftware(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* ─── SECTION 4: DIGITAL MARKETING ─── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-3 rounded-2xl shadow-lg">
            <span className="text-3xl">📈</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Digital Marketing</h2>
            <p className="text-gray-500 text-sm mt-0.5">Online growth &amp; visibility</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SEO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-orange-100 rounded-2xl p-7 hover:shadow-xl transition-shadow group"
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">SEO</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
  We provide professional Search Engine Optimization (SEO) services to improve your website ranking on search engines like Google. Our approach includes keyword research, on-page optimization, technical improvements, and performance tracking to increase organic traffic and generate quality leads for your business.
</p>
          </motion.div>

          {/* Social Media Marketing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-orange-100 rounded-2xl p-7 hover:shadow-xl transition-shadow group"
          >
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Social Media Marketing</h3>
            <p className="text-gray-500 text-sm leading-relaxed"><p className="text-gray-500 text-sm leading-relaxed">
  We provide professional Search Engine Optimization (SEO) services to improve your website ranking on search engines like Google. Our approach includes keyword research, on-page optimization, technical improvements, and performance tracking to increase organic traffic and generate quality leads for your business.
</p> Strategic campaigns, content creation, and community management across Instagram, Facebook, LinkedIn, and other platforms to grow your brand and engage your audience.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Service;