// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import React from "react";
// import Layout from "./Components/Layout";

// import Home from "./Components/Pages/Home";
// import About from "./Components/Pages/About";
// // import OurSoftwareAbout from "./Components/aboutusSection/OurSoftwareAbout";
// // import OurSoftwareAbout from "./Components/aboutusSection/OurSoftwareAbout";
// // import OurHardwareAbout from "./Components/aboutusSection/OurHardwareAbout";
// import Service from "./Components/Pages/Service";
// import Gallery from "./Components/Pages/Gallery";
// import Contact from "./Components/Pages/Contact";
// // import AdminPanel from "./Components/AdminPanel";
// import { useEffect,useState } from "react";
// import Lenis from "@studio-freight/lenis";
// import SoftwareSolutions from "./Components/Footerlinks/SoftwareSolution";
// import HardwareSolutions from "./Components/Footerlinks/HardWareSolution"
// import WhyHtech from "./Components/Footerlinks/WhyHtech";
// import CustomerStories from "./Components/Footerlinks/CustomerStories";
// import AdminPanelMain from "./Components/Adminpanel/AdminPanelMain";
// import Login from "./Components/Auth/Login";
// import Register from "./Components/Auth/Register"

// import ProtectedRoutes from "./Components/ProtectedRoutes"
// function App() {
//   const [user,setUser] = useState(null);
//   const [error,setError] = useState("");
  
//   useEffect(() =>{

//   })

//   useEffect(() => {
//     const lenis = new Lenis({
//       smooth: true,
//       smoothWheel: true,
//       wheelMultiplier: 0.8,
//       touchMultiplier: 1.5,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);
//   // const router = createBrowserRouter([
//   //   {
//   //     path: "/",
//   //     element: <Layout />,
//   //     children: [
//   //       { index: true, element: <Home /> },

//   //       {
//   //         path: "aboutus",
//   //         element: <About />,
//   //         // children: [
//   //         //   { index: true, element: null },
//   //         //   { path: "/aboutus/software", element: <OurSoftwareAbout /> },
//   //         //   { path: "/aboutus/hardware", element: <OurHardwareAbout /> },
//   //         // ],
//   //       },

//   //       { path: "service", element: <Service /> },
//   //       { path: "gallery", element: <Gallery /> },
//   //       { path: "contact", element: <Contact /> },
//   //       { path: "admin-panel", element: <Login /> },
//   //       {path:"admin-layout",element:<AdminPanelMain/>},
//   //       {path:'register',element:<Register/>},
//   //       { path: "why-h-tech", element: <WhyHtech /> },
//   //       { path: "hardware-solutions", element: <HardwareSolutions /> },
//   //       { path: "software-solutions", element: <SoftwareSolutions /> },
//   //       { path: "customer-stories", element: <CustomerStories /> },
//   //     ],
      
//   //   },
//   //   {
//   //   path: "admin-layout",
//   //   element: <AdminPanelMain />,
//   // },
//   // ]);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "aboutus", element: <About /> },
//       { path: "service", element: <Service /> },
//       { path: "gallery", element: <Gallery /> },
//       { path: "contact", element: <Contact /> },
//       { path: "login", element: <ProtectedRoutes>
//       <Login />
//     </ProtectedRoutes>},  
//       { path: "register", element: <Register /> },
//       {
//     path: "/admin-layout",
//     element: <ProtectedRoutes><AdminPanelMain/></ProtectedRoutes>,  // ✅ Admin panel WITHOUT header/footer
//   },
      
//     ],
//   },
  
  
// ]);
//   return <RouterProvider router={router} />;
// }

// export default App;


// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import React, { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";

// // ✅ import AuthProvider
// import { AuthProvider } from "./Components/context/AuthContext";
// import ProtectedRoutes from "./Components/ProtectedRoutes";

// // layouts and pages
// import Layout from "./Components/Layout";
// import Home from "./Components/Pages/Home";
// import About from "./Components/Pages/About";
// import Service from "./Components/Pages/Service";
// import Gallery from "./Components/Pages/Gallery";
// import Contact from "./Components/Pages/Contact";
// import Login from "./Components/Auth/Login";
// import Register from "./Components/Auth/Register";
// import AdminPanelMain from "./Components/Adminpanel/AdminPanelMain";

// // footer links
// import SoftwareSolutions from "./Components/Footerlinks/SoftwareSolution";
// import HardwareSolutions from "./Components/Footerlinks/HardWareSolution";
// import WhyHtech from "./Components/Footerlinks/WhyHtech";
// import CustomerStories from "./Components/Footerlinks/CustomerStories";


// import CustomerCarePanel from "./Components/customerCarePanel/CustomerCarePanel";
// import CustomerPanelMain from "./Components/customerPanel/CustomerPanelMain";
// const router = createBrowserRouter([

//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "aboutus", element: <About /> },
//       { path: "service", element: <Service /> },
//       { path: "gallery", element: <Gallery /> },
//       { path: "contact", element: <Contact /> },
//       { path: "why-h-tech", element: <WhyHtech /> },
//       { path: "hardware-solutions", element: <HardwareSolutions /> },
//       { path: "software-solutions", element: <SoftwareSolutions /> },
//       { path: "customer-stories", element: <CustomerStories /> },

//       // ✅ login and register are PUBLIC - no protection needed
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//     ],
//   },

 

//   // ✅ admin only
//   {
//     path: "/admin-layout",
//     element: (
//       <ProtectedRoutes allowedRoles={["admin"]}>
//         <AdminPanelMain />
//       </ProtectedRoutes>
//     ),
//   },

//   // ✅ manager only (uncomment when ready)
//   {
//     path: "/manager",
//     element: (
//       <ProtectedRoutes allowedRoles={["manager"]}>
//         <CustomerCarePanel />
//       </ProtectedRoutes>
//     ),
//   },

//   // ✅ customer only (uncomment when ready)
//   {
//     path: "/user",
//     element: (
//       <ProtectedRoutes allowedRoles={["user"]}>
//         <CustomerPanelMain />
//       </ProtectedRoutes>
//     ),
//   },
// ]);

// function App() {
//   // ✅ lenis smooth scroll
//   useEffect(() => {
//     const lenis = new Lenis({
//       smooth: true,
//       smoothWheel: true,
//       wheelMultiplier: 0.8,
//       touchMultiplier: 1.5,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   return (
//     // ✅ AuthProvider wraps everything
//     // now useAuth() works in every component!
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   );
// }

// export default App;


// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import { AuthProvider } from "./Components/context/AuthContext";
import ProtectedRoutes from "./Components/ProtectedRoutes";

import Layout from "./Components/Layout";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Service from "./Components/Pages/Service";
import Gallery from "./Components/Pages/Gallery";
import Contact from "./Components/Pages/Contact";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AdminPanelMain from "./Components/Adminpanel/AdminPanelMain";
import SoftwareSolutions from "./Components/Footerlinks/SoftwareSolution";
import HardwareSolutions from "./Components/Footerlinks/HardWareSolution";
import WhyHtech from "./Components/Footerlinks/WhyHtech";
import CustomerStories from "./Components/Footerlinks/CustomerStories";
// import CustomerCarePanel from "./Components/customerCarePanel/CustomerCarePanel";
// import CustomerPanelMain from "./Components/UserPanel/UserPanelMain";
import UserPanelMain from "./Components/UserPanel/UserPanelMain";
import UserPanelComplains from "./Components/UserPanel/UserPanelCompains";
import UserPanelHome from "./Components/UserPanel/UserPanelHome";
import CustomerCarePanel from "./Components/customerCarePanel/CustomerCarePanel";


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
    return () => lenis.destroy();
  }, []);

  // ✅ Router defined here so AuthProvider context is available
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "aboutus", element: <About /> },
        { path: "service", element: <Service /> },
        { path: "gallery", element: <Gallery /> },
        { path: "contact", element: <Contact /> },
        { path: "why-h-tech", element: <WhyHtech /> },
        { path: "hardware-solutions", element: <HardwareSolutions /> },
        { path: "software-solutions", element: <SoftwareSolutions /> },
        { path: "customer-stories", element: <CustomerStories /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },

    {
      path: "/admin-layout",
      element: (
        <ProtectedRoutes allowedRoles={["admin"]}>
          <AdminPanelMain />
        </ProtectedRoutes>
      ),
    },

    {
      path: "/manager",
      element: (
        <ProtectedRoutes allowedRoles={["manager"]}>
          <CustomerCarePanel />
        </ProtectedRoutes>
      ),
    },

    // ✅ Make sure this path exactly matches what Login navigates to
    {
      path: "/user",
      element: (
        <ProtectedRoutes allowedRoles={["user"]}>
          <UserPanelMain />
        </ProtectedRoutes>
      ),
       children: [
    { path: "home", element: <UserPanelHome /> },
    { path: "complains", element: <UserPanelComplains /> },]
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

