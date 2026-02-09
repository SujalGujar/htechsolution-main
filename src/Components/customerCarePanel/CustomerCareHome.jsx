import React, { useState } from "react";
import axios from "axios";

const CustomerCareHome = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    mobileNum: "",
    proName: "",
    proCatogory: "",
    proSrNo: "",
    proModNum: "",
    brandName: "",
    purDate: "",
    invoiceNum: "",
    warrStartDate: "",
    warrEndDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      const API = "/api/auth/register";
      const res = axios.post(API,formData);
      console.log("Customer registered successfully:", res.data);
    }catch(error){
        console.error("Error registering customer:", error);
    }
    
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Care Registration</h2>

      <form onSubmit={handleSubmit}>
        {/* Customer Info */}
        <input name="customerName" placeholder="Customer Name"
          value={formData.customerName} onChange={handleChange} required />

        <input name="email" type="email" placeholder="Email"
          value={formData.email} onChange={handleChange} required />

        <input name="mobileNum" placeholder="Mobile Number"
          value={formData.mobileNum} onChange={handleChange} required />

        {/* Product Info */}
        <input name="proName" placeholder="Product Name"
          value={formData.proName} onChange={handleChange} required />

        <input name="proCatogory" placeholder="Product Category"
          value={formData.proCatogory} onChange={handleChange} required />

        <input name="proSrNo" placeholder="Product Serial Number"
          value={formData.proSrNo} onChange={handleChange} required />

        <input name="proModNum" placeholder="Product Model Number"
          value={formData.proModNum} onChange={handleChange} required />

        <input name="brandName" placeholder="Brand Name"
          value={formData.brandName} onChange={handleChange} required />

        {/* Purchase & Warranty */}
        <label>Purchase Date</label>
        <input type="date" name="purDate"
          value={formData.purDate} onChange={handleChange} required />

        <input name="invoiceNum" placeholder="Invoice Number"
          value={formData.invoiceNum} onChange={handleChange} required />

        <label>Warranty Start Date</label>
        <input type="date" name="warrStartDate"
          value={formData.warrStartDate} onChange={handleChange} required />

        <label>Warranty End Date</label>
        <input type="date" name="warrEndDate"
          value={formData.warrEndDate} onChange={handleChange} required />

        <button type="submit">Register Customer</button>
      </form>
    </div>
  );
};

export default CustomerCareHome;
