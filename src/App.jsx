import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Layout from "./Components/Layout";

import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
// import OurSoftwareAbout from "./Components/aboutusSection/OurSoftwareAbout";
// import OurSoftwareAbout from "./Components/aboutusSection/OurSoftwareAbout";
// import OurHardwareAbout from "./Components/aboutusSection/OurHardwareAbout";
import Service from "./Components/Pages/Service";
import Gallery from "./Components/Pages/Gallery";
import Contact from "./Components/Pages/Contact";
// import AdminPanel from "./Components/AdminPanel";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import SoftwareSolutions from "./Components/Footerlinks/SoftwareSolution";
import HardwareSolutions from "./Components/Footerlinks/HardWareSolution"
import WhyHtech from "./Components/Footerlinks/WhyHtech";
import CustomerStories from "./Components/Footerlinks/CustomerStories";
import AdminPanelMain from "./Components/Adminpanel/AdminPanelMain";
function App() {
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },

        {
          path: "aboutus",
          element: <About />,
          // children: [
          //   { index: true, element: null },
          //   { path: "/aboutus/software", element: <OurSoftwareAbout /> },
          //   { path: "/aboutus/hardware", element: <OurHardwareAbout /> },
          // ],
        },

        { path: "service", element: <Service /> },
        { path: "gallery", element: <Gallery /> },
        { path: "contact", element: <Contact /> },
        { path: "admin-panel", element: <AdminPanelMain /> },
        { path: "why-h-tech", element: <WhyHtech /> },
        { path: "hardware-solutions", element: <HardwareSolutions /> },
        { path: "software-solutions", element: <SoftwareSolutions /> },
        { path: "customer-stories", element: <CustomerStories /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
