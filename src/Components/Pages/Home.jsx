import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import HeroSection from "../homepagesSections/HeroSection";
import AboutUs from "../homepagesSections/AboutUs";
import SoftwareSolutions from "../homepagesSections/SoftwareSolutions";
import ProjectSection from "../homepagesSections/ProjectSection";
import OurService from "../homepagesSections/OurService";
import OurTeam from "../homepagesSections/OurTeam";
import OurAchievements from "../homepagesSections/OurAchievements";
import ProjectDeliverablesHome from "../homepagesSections/ProjectDeliverablesHome";
import ClientExperience from "../homepagesSections/ClientExperience";
// import { useNavigate } from "react-router-dom";
import TrendingPopup from "../homepagesSections/TrendingPopup";
const Home = () => {
  

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="snap-y snap-mandatory">
      
      <HeroSection />
      <TrendingPopup />
      <AboutUs />
      <SoftwareSolutions />
      <ProjectSection />
      <ProjectDeliverablesHome/>
      
      {/* <OurService /> */}
      <OurTeam />
      <OurAchievements />
      <ClientExperience/>
    </main>
  );
};

export default Home;
