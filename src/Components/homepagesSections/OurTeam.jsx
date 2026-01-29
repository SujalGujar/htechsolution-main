import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, Linkedin, Mail, Phone } from "lucide-react";

const OurTeam = () => {
  const members = useSelector((state) => state.team?.members || []);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  // Calculate visible items based on screen size
  const getVisibleItems = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  };

  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < Math.ceil(members.length / visibleItems) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Calculate transform for slide animation
  const slideTransform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-200">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-4">
          <span className="text-2xl text-white">👥</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Meet Our <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">Team</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Dedicated professionals committed to delivering exceptional IT solutions
        </p>
      </div>

      {/* Empty State */}
      {members.length === 0 ? (
        <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <span className="text-3xl">👤</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Team Members Yet</h3>
          <p className="text-gray-500">Add team members to showcase your amazing team</p>
        </div>
      ) : (
        <div 
          className="relative"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          {/* Navigation Arrows */}
          {members.length > visibleItems && (
            <>
              <button
                onClick={scrollLeft}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                          w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center
                          transition-all duration-300 transform hover:scale-110
                          ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-2xl'}
                          ${showArrows ? 'opacity-100' : 'opacity-0'}`}
              >
                <ChevronLeft className="w-6 h-6 text-cyan-600" />
              </button>

              <button
                onClick={scrollRight}
                disabled={currentIndex === Math.ceil(members.length / visibleItems) - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                          w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center
                          transition-all duration-300 transform hover:scale-110
                          ${currentIndex === Math.ceil(members.length / visibleItems) - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-2xl'}
                          ${showArrows ? 'opacity-100' : 'opacity-0'}`}
              >
                <ChevronRight className="w-6 h-6 text-cyan-600" />
              </button>
            </>
          )}

          {/* Slider Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={sliderRef}
              className="flex transition-all duration-500 ease-out"
              style={{ transform: slideTransform }}
            >
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff`}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Social Links */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" 
                             className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} 
                             className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                        {member.phone && (
                          <a href={`tel:${member.phone}`} 
                             className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                            <Phone className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Info Container */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-cyan-600 font-semibold mb-2">
                        {member.position}
                      </p>
                      {member.department && (
                        <span className="inline-block px-3 py-1 text-sm bg-cyan-50 text-cyan-700 rounded-full mb-3">
                          {member.department}
                        </span>
                      )}
                      {member.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {member.description}
                        </p>
                      )}
                    </div>

                    {/* Experience Badge */}
                    {member.experience && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {member.experience}+ yrs
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {members.length > visibleItems && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(members.length / visibleItems) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-cyan-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Member Count */}
          <div className="text-center mt-6">
            <p className="text-gray-500">
              Showing {Math.min(members.length, (currentIndex + 1) * visibleItems)} of {members.length} team members
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      
    </div>
  );
};

export default OurTeam;