import React from "react";
import { useForm} from "react-hook-form";
import {useState} from "react"
import axios from "axios";
import { FiSettings } from "react-icons/fi";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = ({ setIsAuth }) => {
    const [formData,SetFormData] = useState({
        username:"",
        password:""
    })
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

//   const onSubmit = async (e) => {
// // e.preventDefault();
//     try {
//         const url = "/api/auth/login"
//         const res = await fetch(url,{
//             method:'POST',
//             headers:{
//                 'Content-type':"application/json"
//             },
//             body:JSON.stringify(formData)
//         })
    

//       if (res.status === 200) {
//         // localStorage.setItem("adminToken", response.data.token);
//         // setIsAuth(true);
//         navigate('/admin-layout')
//       }
//     const result = await res.json()
//     console.log(result)
//     const {jwtToken,name} = result
//     localStorage.setItem('token',jwtToken)
//     localStorage.setItem("logggedInUser",name)
//     } catch (error) {
//       alert("Invalid username or password");
//     }
//   };
const onSubmit = async (e) => {
//   e.preventDefault(); 
//   console.log(e) // ✅ Also uncomment this!

  try {
    const url = "/api/auth/login";
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        username: formData.username,
        password: String(formData.password)  // ✅ Convert to string
      })
    });

    // ✅ STEP 1: Get data from response FIRST
    const result = await res.json();
    console.log("Response:", result);

    // ✅ STEP 2: Check if successful
    if (res.status === 200) {
    
       localStorage.setItem('token', result.token);      
  localStorage.setItem('loggedInUser', formData.username);  
      
    //   console.log("✅ Token saved:", result.token);
        console.log("✅ Token saved:", result.token);
  console.log("✅ Username saved:", result.username);
      
 
      navigate('/admin-layout');
    } else {
      alert("Invalid username or password");
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Invalid username or password");
  }
};
  const handleOnChange=(e) =>{
    SetFormData({...formData,[e.target.name] : e.target.value});
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto">
            <FiSettings className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold mt-3">HTech Admin</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("username", { required: true })}
            placeholder="Username"
            value={formData.username}
            name="username"
            onChange={handleOnChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
            value={formData.password}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
