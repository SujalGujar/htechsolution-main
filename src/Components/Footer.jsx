// // import React from "react";
// // import { motion } from "framer-motion";
// // import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
// // import logo from "../icons/logo.png";
// // import { Link, useLocation } from "react-router-dom";

// // const Footer = () => {
// //   const { pathname } = useLocation();

// //   const navLinks = [
// //     { name: "Home", path: "/" },
// //     { name: "About", path: "/aboutus" },
// //     { name: "Service", path: "/service" },
// //     { name: "Gallery", path: "/gallery" },
// //     { name: "Contact", path: "/contact" },
// //   ];

// //   const resources = [
// //     { name: "Why H-Tech?", path: "/why-h-tech" },
// //     { name: "Customer Stories", path: "/customer-stories" },
// //     { name: "Hardware Solutions", path: "/hardware-solutions" },
// //     { name: "Software Solutions", path: "/software-solutions" },
// //   ];

// //   return (
// //     <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8 px-6 md:px-12">
// //       <div className="max-w-7xl mx-auto">
// //         <motion.div
// //           initial={{ opacity: 0, y: 30 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //           viewport={{ once: true }}
// //           className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16"
// //         >
// //           {/* Brand */}
// //           <div className="lg:col-span-4">
// //             <div className="flex items-center gap-3 mb-6">
// //               <img src={logo} alt="H-Tech Solutions" className="w-16 h-16" />
// //               <div>
// //                 <h2 className="text-2xl font-bold text-white">
// //                   HTech Solutions
// //                 </h2>
                
// //               </div>
// //             </div>

// //             <p className="text-gray-400 mb-6">
// //               Delivering cutting-edge software & hardware solutions tailored for
// //               modern digital growth.
// //             </p>

// //             <div className="space-y-3 text-sm">
// //               <div className="flex items-center gap-2">
// //                 <Mail className="w-4 h-4 text-orange-400" />
// //                 contact@htechsolutions.com
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <Phone className="w-4 h-4 text-orange-400" />
// //                 +1 (555) 123-4567
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <MapPin className="w-4 h-4 text-orange-400" />
// //                 San Francisco, CA
// //               </div>
// //             </div>
// //           </div>

// //           {/* Links */}
// //           <div className="lg:col-span-5 grid grid-cols-2 gap-8">
// //             <div>
// //               <h4 className="text-white font-semibold mb-4">Quick Links</h4>
// //               <ul className="space-y-3">
// //                 {navLinks.map((link) => (
// //                   <li key={link.path}>
// //                     <Link
// //                       to={link.path}
// //                       className={`flex items-center gap-2 transition ${
// //                         pathname === link.path
// //                           ? "text-orange-400"
// //                           : "hover:text-orange-400 hover:translate-x-1"
// //                       }`}
// //                     >
// //                       <ArrowRight className="w-3 h-3" />
// //                       {link.name}
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             <div>
// //               <h4 className="text-white font-semibold mb-4">Resources</h4>
// //               <ul className="space-y-3">
// //                 {resources.map((item) => (
// //                   <li key={item.path}>
// //                     <Link
// //                       to={item.path}
// //                       className="flex items-center gap-2 transition hover:text-orange-400 hover:translate-x-1"
// //                     >
// //                       <ArrowRight className="w-3 h-3" />
// //                       {item.name}
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>

// //           {/* Newsletter */}
// //           <div className="lg:col-span-3">
// //             <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
// //               <h4 className="text-white font-semibold mb-2">
// //                 Stay Updated
// //               </h4>
// //               <p className="text-sm text-gray-400 mb-4">
// //                 Subscribe to our newsletter.
// //               </p>

// //               <div className="relative">
// //                 <input
// //                   type="email"
// //                   placeholder="Your email"
// //                   className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm"
// //                 />
// //                 <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-lg">
// //                   <ArrowRight className="w-4 h-4 text-white" />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* Bottom */}
// //         <div className="border-t border-gray-800 pt-6 text-sm text-gray-500 flex justify-between">
// //           <span>
// //             © {new Date().getFullYear()} H-Tech Solutions
// //           </span>
// //           <span>Privacy • Terms • Cookies</span>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;

// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
// import logo from "../icons/logo.png";
// import { Link, useLocation } from "react-router-dom";

// const Footer = () => {
//   const { pathname } = useLocation();

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/aboutus" },
//     { name: "Service", path: "/service" },
//     { name: "Gallery", path: "/gallery" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8 px-6 md:px-12">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16"
//         >
//           {/* Brand */}
//           <div className="lg:col-span-4">
//             <div className="flex items-center gap-3 mb-6">
//               <img src={logo} alt="H-Tech Solutions" className="w-16 h-16" />
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   HTech Solutions
//                 </h2>
//               </div>
//             </div>

//             <p className="text-gray-400 mb-6">
//               Delivering cutting-edge software & hardware solutions tailored for
//               modern digital growth.
//             </p>

//             <div className="space-y-3 text-sm">
//               <div className="flex items-center gap-2">
//                 <Mail className="w-4 h-4 text-orange-400" />
//                 contact@htechsolutions.com
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone className="w-4 h-4 text-orange-400" />
//                 +1 (555) 123-4567
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-4 h-4 text-orange-400" />
//                 San Francisco, CA
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="lg:col-span-4">
//             <h4 className="text-white font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-3">
//               {navLinks.map((link) => (
//                 <li key={link.path}>
//                   <Link
//                     to={link.path}
//                     className={`flex items-center gap-2 transition ${
//                       pathname === link.path
//                         ? "text-orange-400"
//                         : "hover:text-orange-400 hover:translate-x-1"
//                     }`}
//                   >
//                     <ArrowRight className="w-3 h-3" />
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="lg:col-span-4">
//             <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
//               <h4 className="text-white font-semibold mb-2">
//                 Stay Updated
//               </h4>
//               <p className="text-sm text-gray-400 mb-4">
//                 Subscribe to our newsletter.
//               </p>

//               <div className="relative">
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-orange-500 transition"
//                 />
//                 <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 p-2 rounded-lg transition-colors">
//                   <ArrowRight className="w-4 h-4 text-white" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Bottom - Simplified with only copyright */}
//         <div className="border-t border-gray-800 pt-6 text-sm text-gray-500 text-center">
//           <span>
//             © {new Date().getFullYear()} HTech Solutions. All rights reserved.
//           </span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import logo from "../icons/logo.png";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/aboutus" },
    { name: "Service", path: "/service" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mb-16"
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="H-Tech Solutions" className="w-16 h-16" />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  HTech Solutions
                </h2>
              </div>
            </div>

            <p className="text-gray-400 mb-6">
              Delivering cutting-edge software & hardware solutions tailored for
              modern digital growth.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                contact@htechsolutions.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Quick Links & Newsletter Combined */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`flex items-center gap-2 transition ${
                          pathname === link.path
                            ? "text-orange-400"
                            : "hover:text-orange-400 hover:translate-x-1"
                        }`}
                      >
                        <ArrowRight className="w-3 h-3" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h4 className="text-white font-semibold mb-2">
                    Stay Updated
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Subscribe to our newsletter.
                  </p>

                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-orange-500 transition"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 p-2 rounded-lg transition-colors">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom - Simplified with only copyright */}
        <div className="border-t border-gray-800 pt-6 text-sm text-gray-500 text-center">
          <span>
            © {new Date().getFullYear()} HTech Solutions. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;