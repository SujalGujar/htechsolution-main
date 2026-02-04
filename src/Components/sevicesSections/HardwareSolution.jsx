import React from "react";
import { motion } from "framer-motion";

// Hardware icons
import { 
  Cctv, Settings2, Wrench, ShieldCheck, Monitor, Lock,
  Globe2, Smartphone, Building2, Code2, TerminalSquare, BrainCircuit
} from "lucide-react";

const HardwareSolution = () => {
  const hardwareSolutions = [
    {
      icon: <Cctv className="w-6 h-6" />,
      name: "CCTV Installation",
      desc: "Professional camera setup & positioning"
    },
    {
      icon: <Settings2 className="w-6 h-6" />,
      name: "CCTV Configuration",
      desc: "System optimization & settings"
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      name: "CCTV Repair & Service",
      desc: "Troubleshooting & maintenance"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      name: "CCTV Maintenance",
      desc: "Regular check-ups & updates"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      name: "CCTV Monitoring",
      desc: "24/7 surveillance services"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      name: "CCTV Access Control",
      desc: "Secure access management"
    }
  ];

  const softwareSolutions = [
    {
      icon: <Globe2 className="w-6 h-6" />,
      name: "Web App Development",
      desc: "Custom web solutions"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      name: "Mobile App Development",
      desc: "iOS & Android apps"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      name: "Enterprise Software",
      desc: "ERP/CRM systems"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      name: "API Development",
      desc: "Integration services"
    },
    {
      icon: <TerminalSquare className="w-6 h-6" />,
      name: "Custom Software",
      desc: "Tailored solutions"
    },
    {
      icon: <BrainCircuit className="w-6 h-6" />,
      name: "AI & ML Solutions",
      desc: "Intelligent systems"
    }
  ];

  return (
    <section className="relative min-h-screen py-12 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50" />
      
      
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#6BA368]/10 to-[#1F6E8C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-tr from-[#D9A441]/10 to-[#F7F7F2]/10 rounded-full blur-3xl" />

      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1F6E8C 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-start gap-4">
            <div className="w-3 h-32 bg-gradient-to-b from-[#1F6E8C] to-[#6BA368] mt-2 rounded-full" />
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#1F6E8C] to-transparent" />
                <span className="text-sm font-medium text-[#1F6E8C] tracking-wider">OUR EXPERTISE</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Integrated Solutions
                <span className="block text-[#6BA368]">That Drive Results</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl">
                Bridging hardware reliability with software innovation for comprehensive business solutions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Solutions Grid - Asymmetrical Layout */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Hardware Column - Offset Design */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#1F6E8C] to-[#6BA368] rounded-2xl -rotate-12 opacity-10" />
            
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100">
              {/* Column Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-[#1F6E8C] to-[#6BA368] rounded-xl">
                  <Cctv className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Hardware Infrastructure</h2>
                  <p className="text-gray-600">Physical security & monitoring systems</p>
                </div>
              </div>

              {/* Hardware Solutions Grid */}
              <div className="grid gap-4">
                {hardwareSolutions.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ 
                      x: 8,
                      transition: { duration: 0.2 }
                    }}
                    className="group"
                  >
                    <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-[#1F6E8C]/30 hover:shadow-md transition-all duration-300">
                      <div className="mr-4 p-2 bg-gray-50 rounded-lg group-hover:bg-gradient-to-br group-hover:from-[#1F6E8C]/10 group-hover:to-[#6BA368]/10">
                        <div className="text-[#1F6E8C] group-hover:text-[#1F6E8C]">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#1F6E8C] to-[#6BA368]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Software Column - Different Design Pattern */}
          <motion.div 
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="relative"
>
  {/* Decorative Element */}
  <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-bl from-[#D9A441] to-[#6BA368] rounded-2xl rotate-12 opacity-10" />
  
  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100">
    {/* Column Header */}
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-gradient-to-bl from-[#D9A441] to-[#6BA368] rounded-xl">
        <TerminalSquare className="w-8 h-8 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Digital Solutions</h2>
        <p className="text-gray-600">Custom software & intelligent systems</p>
      </div>
    </div>

    {/* Software Solutions - Same Grid as Hardware */}
    <div className="grid gap-4">
      {softwareSolutions.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ 
            x: 8,
            transition: { duration: 0.2 }
          }}
          className="group"
        >
          <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-[#D9A441]/30 hover:shadow-md transition-all duration-300">
            <div className="mr-4 p-2 bg-gray-50 rounded-lg group-hover:bg-gradient-to-bl group-hover:from-[#D9A441]/10 group-hover:to-[#6BA368]/10">
              <div className="text-[#D9A441] group-hover:text-[#D9A441]">
                {item.icon}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 rounded-full bg-gradient-to-bl from-[#D9A441] to-[#6BA368]" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>
        </div>

        {/* Connecting Bridge */}
        {/* <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hidden lg:block relative h-px mx-8 my-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6BA368] to-transparent" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1F6E8C] via-[#6BA368] to-[#D9A441] rounded-full flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Footer CTA - Unique Shape */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        > */}
          {/* <div className="relative max-w-2xl mx-auto"> */}
            {/* Speech Bubble Shape */}
            {/* <div className="relative bg-gradient-to-r from-[#1F6E8C] to-[#6BA368] rounded-3xl p-8 shadow-2xl"> */}
              {/* <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#1F6E8C]" />
              </div> */}
              
              {/* <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Both Hardware & Software?
                </h3>
                <p className="text-gray-200 mb-6">
                  We provide integrated solutions that work seamlessly together.
                </p>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(107, 163, 104, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  Discuss Your Complete Solution
                </motion.button>
              </div> */}
            {/* </div> */}
          {/* </div> */}
        {/* </motion.div> */}
      </div>
    </section>
  );
};

export default HardwareSolution;