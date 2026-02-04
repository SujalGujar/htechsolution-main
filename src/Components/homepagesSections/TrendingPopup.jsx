import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending } from "../store/HomepageSlices/TrendingTopicSlice";

const TrendingPopup = () => {
  const dispatch = useDispatch();
  const { list: topics } = useSelector((state) => state.trending);

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  const now = Date.now();
  const active = topics.filter((t) => {
    const start = t.startTime ? new Date(t.startTime).getTime() : 0;
    const end = t.endTime ? new Date(t.endTime).getTime() : Infinity;
    return now >= start && now <= end;
  });

  useEffect(() => {
    if (!active.length) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % active.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [active.length]);

  if (!show || !active.length) return null;

  const t = active[index];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        
        {/* Main Advertisement Container */}
        <div className="relative w-[90%] h-[90%] bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Close Button */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white text-xl hover:bg-black"
          >
            ×
          </button>

          <div className="grid grid-cols-1  h-full">

            {/* Left: Image */}
            <div className="h-full bg-gray-100 flex items-center justify-center">
              {t.image ? (
                <img
                  src={`http://localhost:5000${t.image}`}
                  alt={t.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400">No Image</div>
              )}
            </div>

            {/* Right: Content */}
            <div className="p-8 flex flex-col justify-center">
              <p className="text-sm uppercase text-blue-600 font-semibold mb-2">
                Trending Now
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.title}
              </h2>

              <p className="text-gray-600 text-lg mb-6">
                {t.content}
              </p>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700">
                  Shop Now
                </button>
                <button
                  onClick={() => setShow(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-lg"
                >
                  Close
                </button>
              </div>

              {/* Slide Indicator */}
              <p className="mt-6 text-sm text-gray-400">
                {index + 1} / {active.length}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingPopup;
