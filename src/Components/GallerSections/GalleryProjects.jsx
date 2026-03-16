import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections } from "../store/Blogs/BlogsSlice";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:5000";

const GalleryProjects = () => {
  const dispatch = useDispatch();
  const { gallerySections, loading } = useSelector(
    (state) => state.blogGallery
  );

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">Loading...</div>
    );
  }

  if (!gallerySections || gallerySections.length === 0) return null;

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900">Our Projects</h2>
          <div className="w-16 h-1 bg-black mx-auto mt-3 rounded" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallerySections.map((item, index) => (
            <motion.div
              key={item._id} // ✅ use _id
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* ✅ Show IMAGE or VIDEO based on mediaType */}
              {item.mediaType === "image" && item.image && (
                <div className="h-52 overflow-hidden">
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${BASE_URL}${item.image}`
                    }
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* ✅ Video player */}
              {item.mediaType === "video" && item.video && (
                <div className="h-52 bg-black overflow-hidden">
                  <video
                    src={
                      item.video.startsWith("http")
                        ? item.video
                        : `${BASE_URL}${item.video}`
                    }
                    controls
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                </div>
              )}

              {/* No media placeholder */}
              {item.mediaType === "none" && (
                <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-4xl opacity-30">📄</span>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {item.content}
                </p>

                {/* Media badge */}
                {item.mediaType !== "none" && (
                  <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    item.mediaType === "video"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {item.mediaType === "video" ? "▶ Video" : "🖼 Image"}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryProjects;