// import React,{Children, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoutes = ({children}) =>{
//     const isAuthenticated = false;
//     const navigate = useNavigate()

//     useEffect(()=>{
//         if(!isAuthenticated){
//             navigate('/login');
//         }
//     },[])

//     return (
//         children
//     )

// }
// export default ProtectedRoutes

// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import React from "react";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // not logged in → go to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // wrong role → go to login
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // ✅ correct role → show the page
  return children;
};

export default ProtectedRoutes;