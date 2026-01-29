import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector, useDispatch } from "react-redux";
// import { deleteProject } from "../redux/projectSlice"; // adjust path

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.list);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track) return;

    const totalScrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(track, {
      x: -(totalScrollWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 15%",
        end: () => `+=${totalScrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => ScrollTrigger.killAll();
  }, [projects]);

  return (
    <section ref={sectionRef} className="overflow-hidden py-24">
      <h1
        style={{ color: "#1F6E8C" }}
        className="text-3xl md:text-4xl font-bold mb-16 text-center"
      >
        Our Software Projects
      </h1>

      <div ref={trackRef} className="flex gap-10 px-8 w-max">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.03 }}
            className="min-w-[320px] md:min-w-[420px] bg-white border border-gray-200 rounded-lg p-6 shadow-lg relative"
          >
            <div
              className="h-1 rounded-t-lg mb-4"
              style={{ background: project.gradient || "#1F6E8C" }}
            />

            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>

            <ul className="space-y-2 mb-4">
              {project.features?.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: project.gradient || "#1F6E8C" }}
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Delete Button for admin */}
            {/* <button
              onClick={() => dispatch(deleteProject(project.id))}
              className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
            >
              Delete
            </button> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
