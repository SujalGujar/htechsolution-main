import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDeliverables } from "../store/HomepageSlices/ProjectDeliverableSlice";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiClock, FiTrendingUp } from "react-icons/fi";

const BASE_URL = "http://localhost:5000";

const ProjectDeliverablesHome = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.projectDeliverables);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchDeliverables());
  }, [dispatch]);

  // Extract unique categories from deliverables
  const categories = ["all", ...new Set(list?.map(item => item.category || "Uncategorized").filter(Boolean))];

  // Filter deliverables based on selected category
  const filteredList = selectedCategory === "all" 
    ? list 
    : list?.filter(item => item.category === selectedCategory);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredList?.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-[#1F6E8C] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (!list || list.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#1F6E8C] to-[#6BA368] bg-clip-text text-transparent">
              Project Deliverables
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our completed projects and innovative solutions delivered with excellence
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#1F6E8C] to-[#6BA368] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>
        )}

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {currentItems?.map((item, index) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  {item.image ? (
                    <>
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `${BASE_URL}${item.image}`
                        }
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">No Image</span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {item.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full shadow-lg">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#1F6E8C] transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Review/Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.review}
                  </p>

                  {/* Methodology with Icon */}
                  {item.methodology && (
                    <div className="flex items-center gap-2 mb-4">
                      <FiTrendingUp className="text-[#6BA368]" />
                      <span className="text-sm text-gray-500 italic">
                        {item.methodology}
                      </span>
                    </div>
                  )}

                  {/* Stats/Additional Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FiClock />
                      <span>Completed 2024</span>
                    </div>
                    
                    {/* View Details Button */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-1 text-[#1F6E8C] font-medium text-sm group-hover:text-[#6BA368] transition-colors"
                      onClick={() => {
                        // Add your view details logic here
                        console.log("View details for:", item._id);
                      }}
                    >
                      <span>View Details</span>
                      <FiExternalLink className="text-xs" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1F6E8C]/0 to-[#6BA368]/0 group-hover:from-[#1F6E8C]/5 group-hover:to-[#6BA368]/5 pointer-events-none transition-all duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center gap-2 mt-12"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#1F6E8C]"
              }`}
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === index + 1
                    ? "bg-gradient-to-r from-[#1F6E8C] to-[#6BA368] text-white shadow-lg scale-110"
                    : "text-gray-600 hover:bg-gray-100 hover:scale-105"
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#1F6E8C]"
              }`}
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Items Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-6 text-sm text-gray-500"
        >
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredList?.length || 0)} of {filteredList?.length} deliverables
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDeliverablesHome;