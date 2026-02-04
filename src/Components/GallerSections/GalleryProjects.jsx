import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections } from "../store/Blogs/BlogsSlice";
import { motion } from "framer-motion";

const GalleryProjects = () => {
  const dispatch = useDispatch();

  const { gallerySections = [], loading } = useSelector(
  (state) => state.blogGallery
);


  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Our Projects
      </h1>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {gallerySections.map((item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow rounded-lg p-4"
    >
      {item.image && (
        <img
          src={`http://localhost:5000${item.image}`}
          alt={item.title}
          className="w-full h-48 object-cover rounded"
        />
      )}
      <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
      <p className="text-sm mt-2">{item.content}</p>
    </motion.div>
  ))}
</div>

    </section>
  );
};

export default GalleryProjects;
