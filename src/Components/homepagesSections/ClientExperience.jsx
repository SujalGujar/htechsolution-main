import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExperiences } from "../store/HomepageSlices/ClientExperienceSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const BASE_URL = "http://localhost:5000";

// ✅ Star display component
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-xl ${
            star <= rating ? "text-yellow-400" : "text-gray-200"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ClientExperience = () => {
  const dispatch = useDispatch();
  const { experiences, loading } = useSelector(
    (state) => state.clientExperience
  );

  // ✅ Fetch from backend on mount
  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">Loading...</div>
    );
  }

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-14">
          Client Experience
        </h2>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          // ✅ Only loop if enough items
          loop={experiences.length > 3}
          breakpoints={{
            640:  { slidesPerView: 1 },
            768:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {experiences.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition h-full flex flex-col">

                {/* Client Image + Info */}
                <div className="flex items-center gap-3 mb-4">
                  {item.image ? (
                    <img
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `${BASE_URL}${item.image}`
                      }
                      alt={item.heading}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#1F6E8C]"
                    />
                  ) : (
                    // ✅ Fallback avatar using initials
                    <div className="w-14 h-14 rounded-full bg-[#1F6E8C] flex items-center justify-center text-white font-bold text-xl">
                      {item.heading?.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold">{item.heading}</h3>
                    <p className="text-sm text-[#1F6E8C] font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* ✅ Star Rating */}
                <StarRating rating={item.rating || 5} />

                {/* Description */}
                <p className="text-gray-600 leading-relaxed flex-1 mb-4">
                  "{item.description}"
                </p>

                {/* ✅ Project / Service Used */}
                {item.projectService && (
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Service Used: </span>
                    <span className="text-xs font-semibold text-[#1F6E8C]">
                      {item.projectService}
                    </span>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientExperience;