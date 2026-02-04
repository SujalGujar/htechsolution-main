import React, { useState } from "react";

const ProductGetSerialNum = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serialNo: "",
    productName: "",
    warranty: "",
    purchaseDate: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Product Warranty Form
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Serial No */}
        <div>
          <label className="block text-sm font-medium mb-1">S. No</label>
          <input
            type="text"
            name="serialNo"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.serialNo}
            onChange={handleChange}
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="productName"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.productName}
            onChange={handleChange}
          />
        </div>

        {/* Warranty */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Warranty (Years / Months)
          </label>
          <input
            type="text"
            name="warranty"
            placeholder="e.g. 1 Year"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.warranty}
            onChange={handleChange}
          />
        </div>

        {/* Purchase Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Purchase Date</label>
          <input
            type="date"
            name="purchaseDate"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.purchaseDate}
            onChange={handleChange}
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductGetSerialNum;