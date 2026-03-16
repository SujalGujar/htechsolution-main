import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../store/Blogs/BlogHeroSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BASE_URL = "http://localhost:5000";

const HeroSectionGallery = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogHero);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">Loading...</div>
    );
  }

  if (!blogs || blogs.length === 0) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      // ✅ Only loop if more than 1 item
      loop={blogs.length > 1}
      pagination={{ clickable: true }}
      navigation
      className="py-8 px-4"
    >
      {blogs.map((blog) => (
        <SwiperSlide key={blog._id}> {/* ✅ use _id */}
          <div
            className="relative h-[60vh] bg-cover bg-center rounded-xl"
            style={{
              // ✅ Full image URL
              backgroundImage: `url(${
                blog.image?.startsWith("http")
                  ? blog.image
                  : `${BASE_URL}${blog.image}`
              })`,
            }}
          >
            <div className="absolute inset-0 bg-black/50 rounded-xl" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <h1 className="text-4xl font-bold">{blog.title}</h1>
                <p className="mt-4 text-lg">{blog.content}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSectionGallery;