import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../store/Blogs/BlogHeroSlice";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSectionGallery = () => {
  const dispatch = useDispatch();
  const { blogs = [] } = useSelector((state) => state.blogHero || {});

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 3000 }}
      loop
      pagination={{ clickable: true }}
      navigation
      className="py-8 px-4"
    >
      {blogs.map((blog) => (
        <SwiperSlide key={blog.id}>
          <div
            className="relative h-[60vh] bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: `url(http://localhost:5000${blog.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50 rounded-xl"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl">
                <h1 className="text-4xl font-bold">{blog.title}</h1>
                <p className="mt-4">{blog.content}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSectionGallery;
