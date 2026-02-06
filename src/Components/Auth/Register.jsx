import React from "react";
import { useForm} from "react-hook-form";
import {useState} from "react"
import axios from "axios";
import { FiSettings } from "react-icons/fi";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Register = ({ setIsAuth }) => {
    const [formData,SetFormData] = useState({
        username:"",
        password:"",
        role:""
    })
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    e.preventdefault;

    try {
        const url = "/api/auth/register"
        const res = await fetch(url,{
            method:'POST',
            headers:{
                'Content-type':"application/json"
            },
            body:JSON.stringify(formData)
        })
    //   const response = await axios.post(
    //     "/api/auth/login",
    //     formData
    //   );

      if (response.status === 200) {
        // localStorage.setItem("adminToken", response.data.token);
        // setIsAuth(true);
        setTimeout(()=>{
           navigate('admin-layout')
        },2000)
       
      }
    const result = await res.json()
    console.log(result)
    
    
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  const handleOnChange=(e) =>{
    SetFormData({...formData,[e.target.name] : [e.target.value]});
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
           <input
            type="text"
            {...register("role", { required: true })}
            placeholder="role"
            name="role"
            onChange={handleOnChange}
            value={formData.role}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Login
          </button>
          {/* <span>Already Have an Account</span> */}
          {/* <Link to="/admin-panel" >Login</Link> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
