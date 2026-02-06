// import React, { useState } from "react";
// import {
//   FiLogOut, FiHome, FiUser, FiFileText, FiMail,
//   FiSettings, FiUsers, FiBriefcase, FiAward, FiStar,
//   FiMessageSquare, FiTrendingUp, FiGrid, FiTarget
// } from "react-icons/fi";
// // import React, { useState } from "react";
// import AboutUsHome from "./Homepage/AboutUsHome";
// import HardwareMain from "./Homepage/HardwareMain";
// import SoftwareAdmin from "./Homepage/SoftwareAdmin";
// import HeroSectionAdmin from "./Homepage/HeroSectionAdmin";
// import ServicesAdmin from "./Homepage/ServicesAdmin";
// import LeadersAdmin from "./Homepage/LeadersAdmin";
// import AboutMainAdmin from "./Aboutus/AboutMainAdmin";
// import MissionVisionAdmin from "./Aboutus/MissionVisionAdmin";
// import TeamAdmin from "./Aboutus/TeamAdmin";
// import BlogHeroAdmin from "./Blog/BlogHeroAdmin";
// import BlogsAdmin from "./Blog/BlogsAdmin";
// import ContactHeroAdmin from "./Contact/ContactHeroAdmin";
// import SupportAdmin from "./Contact/SupportAdmin";
// import ContactTypesAdmin from "./Contact/ContactTypesAdmin";
// import ProductGetSerialNum from "./UsersRole/ProductGetSerialNum";
// import CreateUser from "./UsersRole/CreateUser";
// import UpdateUser from "./UsersRole/UpdateUser";
// import ProjectDeliverableForm from "./Homepage/ProjectDeliverableForm";
// import OurPartnerForm from "./Homepage/OurPartnerForm";
// import OurAchievementsForm from "./Homepage/OurAchievementsForm";

// import ServiceForm from  "../Adminpanel/Aboutus/ServiceForm";
// import ClientExperienceForm from "./Homepage/ClientExperienceForm";
// import TrendingTopicForm from "./Homepage/TrendingTopicForm";
// import WhatWeAreForm from "./Aboutus/WhatWeAreForm";
// import ExpertiseForm from "./Aboutus/ExpertiseForm";

// import axios from "axios"
// import {useEffect} from "react"
// import { useForm } from "react-hook-form";

// const AdminPanelMain = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   // const [error, setError] = useState("");
//   const [active, setActive] = useState("hero-home");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const[isAuth,setIsAuth] = useState(false)
//   const {
//   register,
//   handleSubmit,
//   formState: { errors },
// } = useForm();



 
 

  
//   const componentCategories = {
//     "Homepage": [
//       { key: "hero-home", label: "Hero Section", icon: <FiHome /> },
//       { key: "about-home", label: "About Home", icon: <FiUser /> },
//       { key: "hardware", label: "Hardware", icon: <FiSettings /> },
//       { key: "software", label: "Software", icon: <FiSettings /> },
//       { key: "project-deliverables", label: "Project Deliverables", icon: <FiBriefcase /> },
//       { key: "trending-topics", label: "Trending Topics", icon: <FiTrendingUp /> },
//       { key: "achievements", label: "Achievements", icon: <FiAward /> },
//       { key: "partners", label: "Partners", icon: <FiUsers /> },
//       { key: "clientExperience", label: "Client Experience", icon: <FiStar /> }
//     ],
//     "About Us": [
//       // { key: "about-main", label: "About Main", icon: <FiUser /> },
//       { key: "mission", label: "Mission & Vision", icon: <FiTarget /> },
//       { key: "whatWeAre", label: "What We Are", icon: <FiGrid /> },
//       { key: "ourExpertise", label: "Our Expertise", icon: <FiStar /> },
//       { key: "team", label: "Team", icon: <FiUsers /> },
//       { key: "OurServices", label: "Services", icon: <FiBriefcase /> }
//     ],
//     "Blog": [
//       { key: "blog-hero", label: "Blog Hero", icon: <FiHome /> },
//       { key: "blogs", label: "Blog Posts", icon: <FiFileText /> }
//     ],
    
    
//     "User Management": [
//       { key: "customerForm", label: "Customer Form", icon: <FiUser /> },
//       { key: "create-form", label: "Create User", icon: <FiUser /> },
//       { key: "update-form", label: "Update User", icon: <FiUser /> }
//     ]
//   };
//   useEffect(() => {
//   const token = localStorage.getItem("adminToken");
//   if (token) {
//     setIsAuth(true);
//   }
// }, []);


//   const componentMap = {
//     "hero-home": <HeroSectionAdmin />,
//     "about-home": <AboutUsHome />,
//     "hardware": <HardwareMain />,
//     "software": <SoftwareAdmin />,
//     "project-deliverables": <ProjectDeliverableForm />,
//     "trending-topics": <TrendingTopicForm />,
//     "achievements": <OurAchievementsForm />,
//     "partners": <OurPartnerForm />,
//     "clientExperience": <ClientExperienceForm />,
//     "about-main": <AboutMainAdmin />,
//     "mission": <MissionVisionAdmin />,
//     "whatWeAre": <WhatWeAreForm />,
//     "ourExpertise":<ExpertiseForm/>,
//     "team": <TeamAdmin />,
//     "OurServices": <ServiceForm />,
//     "blog-hero": <BlogHeroAdmin />,
//     "blogs": <BlogsAdmin />,
   
//     "customerForm": <ProductGetSerialNum />,
//     "create-form": <CreateUser />,
//     "update-form": <UpdateUser />,
//   };

//   const handleLogin =async (data) => {
//     // e.preventDefault();
//     // if (username === "htech" && password === "12345") {
//     //   localStorage.setItem("isAdminAuth", "true");
//     //   window.location.reload();
//     // } else {
//     //   setError("Invalid username or password");
//     // }
//   console.log(data)
//     try{
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",data
//       )
//       if(response.status == 200){
        
//         localStorage.setItem("adminToken", response.data.token);
// setIsAuth(true);

//         // setIsAuth(true)
//         //  localStorage.setItem("isAdminAuth", "true");
// // window.location.reload();
//       }


//     }catch(error){
//       console.log(error);

//     }

//   };

//   const logout = () => {
//   localStorage.removeItem("adminToken");
//   setIsAuth(false);
// };


//   if (!isAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiSettings className="text-white text-2xl" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800">HTech Admin</h1>
//             <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
//           </div>

//           <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//              <input
//   type="text"
//   {...register("username", { required: true })}
//   className="w-full px-4 py-3 border rounded-lg"
//   placeholder="Enter username"
// />

//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//   type="password"
//   {...register("password", { required: true })}
//   className="w-full px-4 py-3 border rounded-lg"
//   placeholder="Enter password"
// />

//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-lg font-medium hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
//             >
//               Sign In
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   if(isAuth){return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 rounded-lg hover:bg-gray-100"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
//                 Admin Dashboard
//               </h1>
//               <p className="text-sm text-gray-500">Manage your website content</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="text-right">
//               <p className="font-medium text-gray-800">HTech Admin</p>
//               <p className="text-sm text-gray-500">Administrator</p>
//             </div>
//             <button
//               onClick={logout}
//               className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm"
//             >
//               <FiLogOut />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r transition-all duration-300 overflow-hidden`}>
//           {sidebarOpen && (
//             <div className="h-full py-6 px-4">
//               <nav className="space-y-1">
//                 {Object.entries(componentCategories).map(([category, items]) => (
//                   <div key={category} className="mb-6">
//                     <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
//                       {category}
//                     </h3>
//                     <div className="space-y-1">
//                       {items.map((item) => (
//                         <button
//                           key={item.key}
//                           onClick={() => setActive(item.key)}
//                           className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
//                             active === item.key
//                               ? 'bg-gradient-to-r from-black to-gray-800 text-white shadow-md'
//                               : 'text-gray-700 hover:bg-gray-100'
//                           }`}
//                         >
//                           <span className="text-lg">{item.icon}</span>
//                           <span className="font-medium">{item.label}</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </nav>
//             </div>
//           )}
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {/* Breadcrumb */}
//           <div className="mb-6">
//             <nav className="flex" aria-label="Breadcrumb">
//               <ol className="inline-flex items-center space-x-1 md:space-x-3">
//                 <li className="inline-flex items-center">
//                   <span className="text-gray-500">Dashboard</span>
//                 </li>
//                 <li>
//                   <div className="flex items-center">
//                     <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-gray-700 ml-1">
//                       {Object.values(componentCategories)
//                         .flat()
//                         .find(item => item.key === active)?.label || "Section"}
//                     </span>
//                   </div>
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           {/* Content Area */}
//           <div className="bg-white rounded-2xl shadow-sm border p-6">
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 {Object.values(componentCategories)
//                   .flat()
//                   .find(item => item.key === active)?.label}
//               </h2>
//               <p className="text-gray-500">Edit and manage this section's content</p>
//             </div>

//             <div className="border-t pt-6">
//               {componentMap[active]}
//             </div>
//           </div>

//           {/* Stats/Quick Info */}
          
//         </main>
//       </div>
//     </div>
//   );}
// };

// export default AdminPanelMain;

 import React, { useState } from "react";
import {
  FiLogOut, FiHome, FiUser, FiFileText, FiMail,
  FiSettings, FiUsers, FiBriefcase, FiAward, FiStar,
  FiMessageSquare, FiTrendingUp, FiGrid, FiTarget
} from "react-icons/fi";
// import React, { useState } from "react";
import AboutUsHome from "./Homepage/AboutUsHome";
import HardwareMain from "./Homepage/HardwareMain";
import SoftwareAdmin from "./Homepage/SoftwareAdmin";
import HeroSectionAdmin from "./Homepage/HeroSectionAdmin";
import ServicesAdmin from "./Homepage/ServicesAdmin";
import LeadersAdmin from "./Homepage/LeadersAdmin";
import AboutMainAdmin from "./Aboutus/AboutMainAdmin";
import MissionVisionAdmin from "./Aboutus/MissionVisionAdmin";
import TeamAdmin from "./Aboutus/TeamAdmin";
import BlogHeroAdmin from "./Blog/BlogHeroAdmin";
import BlogsAdmin from "./Blog/BlogsAdmin";
import ContactHeroAdmin from "./Contact/ContactHeroAdmin";
import SupportAdmin from "./Contact/SupportAdmin";
import ContactTypesAdmin from "./Contact/ContactTypesAdmin";
import ProductGetSerialNum from "./UsersRole/ProductGetSerialNum";
import CreateUser from "./UsersRole/CreateUser";
import UpdateUser from "./UsersRole/UpdateUser";
import ProjectDeliverableForm from "./Homepage/ProjectDeliverableForm";
import OurPartnerForm from "./Homepage/OurPartnerForm";
import OurAchievementsForm from "./Homepage/OurAchievementsForm";

import ServiceForm from  "../Adminpanel/Aboutus/ServiceForm";
import ClientExperienceForm from "./Homepage/ClientExperienceForm";
import TrendingTopicForm from "./Homepage/TrendingTopicForm";
import WhatWeAreForm from "./Aboutus/WhatWeAreForm";
import ExpertiseForm from "./Aboutus/ExpertiseForm";

import axios from "axios"
import {useEffect} from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const AdminPanelMain = () => {
  console.log("🎉 AdminPanelMain RENDERED!");
  const [isAuth, setIsAuth] = useState(false);
  const [active, setActive] = useState("hero-home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    setIsAuth(localStorage.getItem("loggedInUser"))
  }, []);

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem("loggedInUser");
    setTimeout(()=>{
      navigate('/')
    })
  };

  // if (!isAuth) {
  //   return <Login setIsAuth={setIsAuth} />;
  // }

   const componentCategories = {
    "Homepage": [
      { key: "hero-home", label: "Hero Section", icon: <FiHome /> },
      { key: "about-home", label: "About Home", icon: <FiUser /> },
      { key: "hardware", label: "Hardware", icon: <FiSettings /> },
      { key: "software", label: "Software", icon: <FiSettings /> },
      { key: "project-deliverables", label: "Project Deliverables", icon: <FiBriefcase /> },
      { key: "trending-topics", label: "Trending Topics", icon: <FiTrendingUp /> },
      { key: "achievements", label: "Achievements", icon: <FiAward /> },
      { key: "partners", label: "Partners", icon: <FiUsers /> },
      { key: "clientExperience", label: "Client Experience", icon: <FiStar /> }
    ],
    "About Us": [
      // { key: "about-main", label: "About Main", icon: <FiUser /> },
      { key: "mission", label: "Mission & Vision", icon: <FiTarget /> },
      { key: "whatWeAre", label: "What We Are", icon: <FiGrid /> },
      { key: "ourExpertise", label: "Our Expertise", icon: <FiStar /> },
      { key: "team", label: "Team", icon: <FiUsers /> },
      { key: "OurServices", label: "Services", icon: <FiBriefcase /> }
    ],
    "Blog": [
      { key: "blog-hero", label: "Blog Hero", icon: <FiHome /> },
      { key: "blogs", label: "Blog Posts", icon: <FiFileText /> }
    ],
    
    
    "User Management": [
      { key: "customerForm", label: "Customer Form", icon: <FiUser /> },
      { key: "create-form", label: "Create User", icon: <FiUser /> },
      { key: "update-form", label: "Update User", icon: <FiUser /> }
    ]
  };

    const componentMap = {
    "hero-home": <HeroSectionAdmin />,
    "about-home": <AboutUsHome />,
    "hardware": <HardwareMain />,
    "software": <SoftwareAdmin />,
    "project-deliverables": <ProjectDeliverableForm />,
    "trending-topics": <TrendingTopicForm />,
    "achievements": <OurAchievementsForm />,
    "partners": <OurPartnerForm />,
    "clientExperience": <ClientExperienceForm />,
    "about-main": <AboutMainAdmin />,
    "mission": <MissionVisionAdmin />,
    "whatWeAre": <WhatWeAreForm />,
    "ourExpertise":<ExpertiseForm/>,
    "team": <TeamAdmin />,
    "OurServices": <ServiceForm />,
    "blog-hero": <BlogHeroAdmin />,
    "blogs": <BlogsAdmin />,
   
    "customerForm": <ProductGetSerialNum />,
    "create-form": <CreateUser />,
    "update-form": <UpdateUser />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          <FiLogOut /> Logout
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r">
          {Object.values(componentCategories)
            .flat()
            .map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {item.label}
              </button>
            ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
          {componentMap[active]}
        </main>
      </div>
    </div>
  );
};

export default AdminPanelMain;
