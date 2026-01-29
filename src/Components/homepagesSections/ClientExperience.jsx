import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const ClientExperience = () => {
  const experiences = useSelector(
    (state) => state.clientExperience.experiences
  );

  return (
    <section className="py-20 bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* ===== Heading ===== */}
        <h2 className="text-4xl font-bold text-center mb-14">
          Client Experience
        </h2>

        {/* ===== Swiper ===== */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {experiences.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition h-full">
                {/* Icon */}
                <img
                  src={item.icon}
                  alt={item.heading}
                  className="w-14 h-14 mb-4"
                />

                {/* Content */}
                <h3 className="text-xl font-semibold">
                  {item.heading}
                </h3>

                <p className="text-sm text-[#1F6E8C] font-medium mb-3">
                  {item.role}
                </p>

                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientExperience;
