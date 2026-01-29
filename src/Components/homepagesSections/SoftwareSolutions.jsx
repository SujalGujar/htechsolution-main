import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SoftwareSolutions = () => {
 const solutions = useSelector(
  (state) => state.softwareSolutions.solutions
);

  if (!solutions.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600">No software solutions added yet</h3>
          <p className="text-gray-500 mt-2">Check back later for our latest solutions</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hardware Solutions
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Custom-built hardware solutions designed to solve complex business challenges
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Custom Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 pointer-events-none">
            <div className="flex justify-between px-2">
              <button className="custom-prev-btn w-12 h-12 rounded-full bg-white border border-gray-300 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl pointer-events-auto group">
                <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
              </button>
              <button className="custom-next-btn w-12 h-12 rounded-full bg-white border border-gray-300 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl pointer-events-auto group">
                <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Slider */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".custom-prev-btn",
              nextEl: ".custom-next-btn",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return `<span class="${className} !w-2.5 !h-2.5 !bg-blue-600 !opacity-100 hover:!scale-125 !transition-transform"></span>`;
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={30}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            className="!pb-12 px-2"
          >
            {solutions.map((solution, index) => (
              <SwiperSlide key={index}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-blue-700 text-xs font-semibold rounded-full shadow-sm">
                        Solution #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {solution.title}
                      </h3>
                      <div className="flex-shrink-0 ml-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                      {solution.description}
                    </p>

                    {/* Tags/Categories */}
                    {solution.tags && solution.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {solution.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <button className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95">
                      View Details
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Indicator */}
          <div className="swiper-pagination !relative mt-6"></div>
        </div>

        {/* CTA Section */}
        
      </div>
    </section>
  );
};

export default SoftwareSolutions;