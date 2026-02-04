import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections } from "../store/AboutUsPageSlices/VisionMisionSlice";

const OurMission = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.sections);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-gray-600">Loading mission...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-red-600">Error loading mission: {error}</p>
        </div>
      </section>
    );
  }

  // Get all sections (or filter by title if needed)
  const sections = Array.isArray(list) ? list : [];

  if (sections.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-gray-600 italic">Mission content coming soon...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        {sections.map((section) => (
          <div key={section.id} className="mb-12 last:mb-0">
            <h2 className="text-3xl font-bold mb-4">
              {section.title || "Section Title"}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {section.content}
            </p>
            {section.image && (
              <div className="mt-6">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="max-w-md h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurMission;