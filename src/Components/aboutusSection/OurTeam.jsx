import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeam } from "../store/AboutUsPageSlices/TeamAdminSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const OurTeam = () => {
  const dispatch = useDispatch();

  
  const members = useSelector((state) => state.ourTeam?.members || []);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>
          <p className="text-gray-600 mt-2">
            The people who make everything possible
          </p>
        </div>

        {members.length === 0 ? (
          <p className="text-center text-gray-500">
            No team members found.
          </p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {members.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden h-full">
                  {/* Image */}
                  <div className="h-64 overflow-hidden">
                    <img
                      src={`http://localhost:5000${member.image}`}
                      alt={member.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {member.title}
                    </h3>

                    <p className="text-sm text-green-600 font-medium mt-1">
                      {member.color}
                    </p>

                    <p className="text-gray-600 text-sm mt-4">
                      {member.content}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default OurTeam;
