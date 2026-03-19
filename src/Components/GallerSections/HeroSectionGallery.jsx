import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../store/Blogs/BlogHeroSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const BASE_URL = "https://htechsolution-main.onrender.com";

const getImageUrl = (image) =>
  image?.startsWith("http") ? image : `${BASE_URL}${image}`;

/* ── Slide content animates in on each slide ─────────────────────── */
const SlideContent = ({ blog, index }) => (
  <div className="absolute inset-0 flex flex-col justify-end z-10 px-8 md:px-16 lg:px-24 pb-14 md:pb-20">

    {/* Tag pill */}
    <div className="mb-4">
      <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white/90">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2AA8D0] animate-pulse" />
        {blog.category || "Featured"}
      </span>
    </div>

    {/* Slide number */}
    <div className="flex items-center gap-3 mb-3">
      <span className="text-white/30 text-[11px] font-mono tracking-widest">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="h-px w-8 bg-white/20" />
    </div>

    {/* Heading */}
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.07] max-w-3xl mb-4"
      style={{ fontFamily: "'Poppins', sans-serif", textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}>
      {blog.title}
    </h1>

    {/* Content excerpt */}
    {blog.content && (
      <p className="text-white/65 text-sm md:text-base max-w-xl leading-relaxed line-clamp-2 mb-6">
        {blog.content}
      </p>
    )}

    {/* CTA */}
    {/* <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(31,110,140,0.55)" }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold shadow-xl"
        style={{ background: "linear-gradient(135deg, #1F6E8C, #2AA8D0)" }}
      >
        Read Article
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.button>

      {blog.date && (
        <span className="text-white/45 text-xs font-medium tracking-wide">
          {new Date(blog.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
        </span>
      )}
    </div> */}
  </div>
);

const HeroSectionGallery = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogHero);

  useEffect(() => { dispatch(fetchBlogs()); }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full h-[70vh] bg-gray-100 animate-pulse rounded-2xl mx-4 my-6"
        style={{ background: "linear-gradient(135deg, #e8f0f5, #d5e8ef)" }}>
        <div className="h-full flex items-end p-10">
          <div className="space-y-3 w-full max-w-xl">
            <div className="h-4 bg-white/60 rounded-full w-24" />
            <div className="h-10 bg-white/60 rounded-xl w-3/4" />
            <div className="h-4 bg-white/40 rounded-full w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        .blog-hero-swiper {
          font-family: 'Poppins', sans-serif;
          width: 100%;
          position: relative;
        }

        /* ── Custom pagination dots ── */
        .blog-hero-swiper .swiper-pagination {
          bottom: 20px !important;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          z-index: 20;
        }
        .blog-hero-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          border-radius: 99px;
          background: rgba(255,255,255,0.35);
          opacity: 1;
          transition: all 0.35s ease;
          margin: 0 !important;
        }
        .blog-hero-swiper .swiper-pagination-bullet-active {
          width: 24px;
          background: #2AA8D0;
        }

        /* ── Custom nav arrows ── */
        .blog-hero-swiper .swiper-button-next,
        .blog-hero-swiper .swiper-button-prev {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: background 0.25s, transform 0.25s;
          top: 50%;
          transform: translateY(-50%);
        }
        .blog-hero-swiper .swiper-button-next:hover,
        .blog-hero-swiper .swiper-button-prev:hover {
          background: rgba(31,110,140,0.7);
          transform: translateY(-50%) scale(1.08);
        }
        .blog-hero-swiper .swiper-button-next::after,
        .blog-hero-swiper .swiper-button-prev::after {
          font-size: 13px;
          font-weight: 800;
          color: white;
        }
        .blog-hero-swiper .swiper-button-prev { left: 20px; }
        .blog-hero-swiper .swiper-button-next { right: 20px; }

        /* ── Progress bar ── */
        .blog-hero-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #1F6E8C, #2AA8D0);
          z-index: 20;
          border-radius: 0 2px 2px 0;
          transition: width 0.1s linear;
        }
      `}</style>

      <div className="blog-hero-swiper px-4 md:px-6 py-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={blogs.length > 1}
          pagination={{ clickable: true }}
          navigation
          speed={900}
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ height: "clamp(380px, 68vh, 680px)" }}
        >
          {blogs.map((blog, index) => (
            <SwiperSlide key={blog._id}>
              <div className="relative w-full h-full">

                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url(${getImageUrl(blog.image)})` }}
                />

                {/* Multi-layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f14]/90 via-[#080f14]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f2d]/50 via-transparent to-transparent" />

                {/* Subtle grain texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px",
                  }}
                />

                {/* Teal accent vertical line */}
                <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full"
                  style={{ background: "linear-gradient(to bottom, transparent, #1F6E8C, #2AA8D0, transparent)" }} />

                {/* Slide content */}
                <SlideContent blog={blog} index={index} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HeroSectionGallery;
