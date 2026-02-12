// import React from "react";
// import { useForm} from "react-hook-form";
// import {useState} from "react"
// import axios from "axios";
// import { FiSettings } from "react-icons/fi";
// // import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


// const Login = ({ setIsAuth }) => {
//     const [formData,SetFormData] = useState({
//         username:"",
//         password:""
//     })
//     const navigate = useNavigate()
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

// //   const onSubmit = async (e) => {
// // // e.preventDefault();
// //     try {
// //         const url = "/api/auth/login"
// //         const res = await fetch(url,{
// //             method:'POST',
// //             headers:{
// //                 'Content-type':"application/json"
// //             },
// //             body:JSON.stringify(formData)
// //         })
    

// //       if (res.status === 200) {
// //         // localStorage.setItem("adminToken", response.data.token);
// //         // setIsAuth(true);
// //         navigate('/admin-layout')
// //       }
// //     const result = await res.json()
// //     console.log(result)
// //     const {jwtToken,name} = result
// //     localStorage.setItem('token',jwtToken)
// //     localStorage.setItem("logggedInUser",name)
// //     } catch (error) {
// //       alert("Invalid username or password");
// //     }
// //   };
// const onSubmit = async (e) => {
// //   e.preventDefault(); 
// //   console.log(e) // ✅ Also uncomment this!

//   try {
//     const url = "/api/auth/login";
//     const res = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': "application/json"
//       },
//       body: JSON.stringify({
//         username: formData.username,
//         password: String(formData.password)  // ✅ Convert to string
//       })
//     });

//     // ✅ STEP 1: Get data from response FIRST
//     const result = await res.json();
//     console.log("Response:", result);

//     // ✅ STEP 2: Check if successful
//     if (res.status === 200) {
    
//        localStorage.setItem('token', result.token);      
//   localStorage.setItem('loggedInUser', formData.username);  
      
//     //   console.log("✅ Token saved:", result.token);
//         console.log("✅ Token saved:", result.token);
//   console.log("✅ Username saved:", result.username);
      
 
//       navigate('/admin-layout');
//     } else {
//       alert("Invalid username or password");
//     }

//   } catch (error) {
//     console.error("Login error:", error);
//     alert("Invalid username or password");
//   }
// };
//   const handleOnChange=(e) =>{
//     SetFormData({...formData,[e.target.name] : e.target.value});
//   }
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//         <div className="text-center mb-6">
//           <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto">
//             <FiSettings className="text-white text-xl" />
//           </div>
//           <h2 className="text-2xl font-bold mt-3">HTech Admin</h2>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input
//             {...register("username", { required: true })}
//             placeholder="Username"
//             value={formData.username}
//             name="username"
//             onChange={handleOnChange}
//             className="w-full p-3 border rounded-lg"
//           />

//           <input
//             type="password"
//             {...register("password", { required: true })}
//             placeholder="Password"
//             name="password"
//             onChange={handleOnChange}
//             value={formData.password}
//             className="w-full p-3 border rounded-lg"
//           />

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded-lg"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// pages/Login.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../../Utils/axiosIntance";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ✅ axios post request
      // data = { username: "john", password: "1234" }
      const res = await axiosInstance.post("/auth/login", {
        username: data.username,
        password: data.password,
      });

      // ✅ axios puts response data in res.data automatically
      // res.data = { token: "...", role: "admin", name: "John" }
      console.log("Login Response:", res.data);

      const { token, role, name } = res.data;

      // ✅ save in context + localStorage
      login({ token, role, name });

      // ✅ redirect based on role
      if (role === "admin") {
        navigate("/admin-layout");
      } else if (role === "manager") {
        navigate("/manager");
      } else {
        navigate("/customer");
      }

    } catch (error) {
      // ✅ axios error handling
      console.error("Login error:", error);

      // error.response = response from backend
      // error.response.data = { message: "Invalid credentials" }
      // error.response.status = 401, 403, 500 etc

      if (error.response) {
        // ✅ backend returned an error response
        setError("root", {
          message: error.response.data.message || "Invalid credentials"
        });
      } else if (error.request) {
        // ✅ request was made but no response (server down)
        setError("root", {
          message: "Server not responding. Try again!"
        });
      } else {
        // ✅ something else went wrong
        setError("root", {
          message: "Something went wrong!"
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto">
            <FiSettings className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold mt-3">HTech Admin</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Root Error Message */}
        {errors.root && (
          <div className="bg-red-50 border border-red-200 text-red-500 p-3 rounded-lg mb-4 text-center text-sm">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Username */}
          <div>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters"
                }
              })}
              placeholder="Username"
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters"
                }
              })}
              placeholder="Password"
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50 hover:bg-gray-800 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;