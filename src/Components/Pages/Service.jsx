import React from "react";

const Service = () => {
  const servicesData = [
    {
      sectionTitle: "Selling",
      sectionKey: "selling",
      description: "IT hardware sales and accessories",
      icon: "🛒",
      gradient: "from-blue-500 to-cyan-400",
      services: [
        {
          name: "CCTV",
          icon: "📹",
          detail: "High-definition surveillance systems with night vision, remote monitoring, and motion detection for complete security coverage."
        },
        {
          name: "HDD",
          icon: "💾",
          detail: "High-capacity storage solutions with varying speeds and reliability ratings for different computing needs."
        },
        {
          name: "Desktop",
          icon: "🖥️",
          detail: "Complete desktop systems for office, gaming, and professional applications with customizable configurations."
        },
        {
          name: "CPU",
          icon: "⚡",
          detail: "Latest generation processors from Intel and AMD for optimal performance and energy efficiency."
        },
        {
          name: "Mouse",
          icon: "🖱️",
          detail: "Wired and wireless options including ergonomic designs and precision gaming mice."
        },
        {
          name: "Keyboard",
          icon: "⌨️",
          detail: "Mechanical, membrane, and wireless keyboards for office, gaming, and specialized applications."
        },
        {
          name: "Laptop",
          icon: "💻",
          detail: "Portable computing solutions from leading brands with various specifications for different user requirements."
        },
        {
          name: "Printer",
          icon: "🖨️",
          detail: "Inkjet, laser, and multifunction printers for home, office, and commercial printing needs."
        },
        {
          name: "All-in-One",
          icon: "🖥️",
          detail: "Space-saving integrated computer systems combining monitor and processing unit in one device."
        },
        {
          name: "HDMI",
          icon: "🔌",
          detail: "High-speed cables and connectors for 4K/8K video transmission and audio support."
        },
        {
          name: "Router",
          icon: "📡",
          detail: "Wireless networking equipment with dual-band support, mesh capabilities, and enhanced security features."
        },
        {
          name: "LAN Cable",
          icon: "🔗",
          detail: "Category 5e, 6, and 7 Ethernet cables for reliable wired network connections."
        }
      ]
    },
    {
      sectionTitle: "Servicing",
      sectionKey: "servicing",
      description: "Installation, repair and maintenance services",
      icon: "🔧",
      gradient: "from-emerald-500 to-green-400",
      services: [
        {
          name: "CCTV Surveillance",
          icon: "👁️",
          detail: "Professional installation and configuration of surveillance systems including IP cameras, DVR/NVR setup, and monitoring solutions."
        },
        {
          name: "Laptop Repair",
          icon: "🔩",
          detail: "Comprehensive repair services including screen replacement, motherboard repair, keyboard issues, and battery replacement."
        },
        {
          name: "CCTV Maintenance",
          icon: "🛠️",
          detail: "Regular maintenance, camera cleaning, software updates, and system optimization for continuous security monitoring."
        },
        {
          name: "Network Maintenance",
          icon: "🌐",
          detail: "Proactive network monitoring, troubleshooting, performance optimization, and security patch management."
        },
        {
          name: "Printer",
          icon: "⚙️",
          detail: "Printer setup, maintenance, repair, and consumables replacement for uninterrupted printing operations."
        },
        {
          name: "Projector",
          icon: "📽️",
          detail: "Installation, alignment, lamp replacement, and maintenance of projection systems for presentations and entertainment."
        },
        {
          name: "Lab Setup",
          icon: "🧪",
          detail: "Complete computer lab installation including hardware setup, network configuration, and software deployment."
        }
      ]
    },
    {
      sectionTitle: "Software & IT Solutions",
      sectionKey: "software",
      description: "Custom software and enterprise solutions",
      icon: "💻",
      gradient: "from-purple-500 to-pink-400",
      services: [
        {
          name: "E-Commerce",
          icon: "🛍️",
          detail: "Custom online store development with payment integration, inventory management, and customer relationship features."
        },
        {
          name: "CRM",
          icon: "📊",
          detail: "Customer Relationship Management systems tailored to manage interactions, sales pipelines, and customer data."
        },
        {
          name: "HMS",
          icon: "🏥",
          detail: "Hospital Management Systems for patient records, appointment scheduling, billing, and inventory management."
        },
        {
          name: "Cloud",
          icon: "☁️",
          detail: "Cloud migration, setup, and management services for scalable and secure data storage and applications."
        },
        {
          name: "Web Development",
          icon: "🌐",
          detail: "Responsive website design and development using modern frameworks for optimal user experience."
        },
        {
          name: "Product Development",
          icon: "🚀",
          detail: "End-to-end software product development from concept to deployment with agile methodologies."
        },
        {
          name: "Enterprise Web Software",
          icon: "🏢",
          detail: "Scalable web applications for business processes, workflow automation, and enterprise resource planning."
        },
        {
          name: "UI/UX",
          icon: "🎨",
          detail: "User interface and experience design focusing on usability, accessibility, and engaging interactions."
        }
      ]
    },
    {
      sectionTitle: "Digital Marketing",
      sectionKey: "digital-marketing",
      description: "Online growth and marketing solutions",
      icon: "📈",
      gradient: "from-orange-500 to-amber-400",
      services: [
        {
          name: "SEO",
          icon: "🔍",
          detail: "Search Engine Optimization strategies to improve website visibility and organic search rankings."
        },
        {
          name: "Social Media Marketing",
          icon: "📱",
          detail: "Strategic social media campaigns, content creation, and community management across platforms."
        },
        {
          name: "Paid Ads",
          icon: "💰",
          detail: "PPC campaigns, display advertising, and social media ads with performance tracking and optimization."
        }
      ]
    },
    {
      sectionTitle: "Software Maintenance & Testing",
      sectionKey: "testing",
      description: "Support, testing and maintenance",
      icon: "✅",
      gradient: "from-indigo-500 to-violet-400",
      services: [
        {
          name: "Software Maintenance",
          icon: "🔧",
          detail: "Ongoing support, bug fixes, updates, and performance optimization for existing software systems."
        },
        {
          name: "Testing",
          icon: "🧪",
          detail: "Comprehensive software testing including functional, performance, security, and user acceptance testing."
        }
      ]
    }
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive IT solutions tailored to meet your business needs with excellence
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {servicesData.map((section, index) => (
            <div
              key={section.sectionKey}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Section Header */}
              <div className={`bg-gradient-to-r ${section.gradient} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <span className="text-2xl">{section.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {section.sectionTitle}
                    </h2>
                    <p className="text-white/90 mt-1">{section.description}</p>
                  </div>
                </div>
              </div>

              {/* Services List */}
              <div className="p-6">
                {/* Special layout for Selling section */}
                {section.sectionKey === "selling" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="group/item bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 
                                  hover:shadow-lg transition-all duration-300 
                                  hover:-translate-y-1 cursor-pointer
                                  hover:border-blue-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <span className="text-xl">{service.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-1">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3">
                              {service.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Layout for other sections */
                  <div className="grid grid-cols-1 gap-4">
                    {section.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="group/item relative"
                      >
                        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 
                                    hover:shadow-md transition-all duration-200 
                                    hover:-translate-y-0.5 cursor-pointer
                                    group-hover/item:border-blue-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <span className="text-xl">{service.icon}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-2">
                                {service.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {service.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover/item:w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-300"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              
              <div className="px-6 pb-4">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span>{section.services.length} {section.services.length === 1 ? 'service' : 'services'} available</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        
       
      </div>
    </>
  );
};

export default Service;