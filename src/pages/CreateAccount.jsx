import React, { useState, useEffect } from "react";
import { useNavigate, Link  } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreateAccount() {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [productType, setProductType] = useState("");
  const [userType, setUserType] = useState("");

  // Validation + message states
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Error messages for fields
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length !== 10) {
      newErrors.password = "Password must be exactly 10 characters";
    }
    if (!address.trim()) newErrors.address = "Address is required";
    if (!productType) newErrors.productType = "Select a product type";
    if (!userType) newErrors.userType = "Select a user type";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  // Run validation when fields change
  useEffect(() => {
    validateForm();
  }, [name, email, password, address, productType, userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      password: password,
      address: address.trim(),
      productType: productType,
      userType: userType,
    };

    try {
      const response = await fetch("http://localhost/php/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message || "Account created successfully!");
        setIsSuccess(true);

        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setAddress("");
        setProductType("");
        setUserType("");

        // Redirect after success
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.error || "Unknown error");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network or server error");
      setIsSuccess(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {/* Server message */}
        {message && (
          <div
            className={`mb-4 text-center text-sm font-medium ${
              isSuccess ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* Product Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Type
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
            >
              <option value="">-- Select a Product Type --</option>
              <option value="Picture">Picture</option>
              <option value="Painting">Painting</option>
            </select>
            {errors.productType && (
              <p className="text-red-500 text-xs mt-1">{errors.productType}</p>
            )}
          </div>

          {/* User Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Type
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
            >
              <option value="">-- Select a User Type --</option>
              <option value="Admin">Admin</option>
              <option value="Painting Buyer">Painting Buyer</option>
              <option value="Photograph Buyer">Photograph Buyer</option>
            </select>
            {errors.userType && (
              <p className="text-red-500 text-xs mt-1">{errors.userType}</p>
            )}
          </div>

          {/* Submit */}
                  {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full bg-black text-white rounded-md px-3 py-2 text-sm 
                    hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>

        {/* Login option */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-semibold hover:underline font-medium"
          >
            Login
          </Link>
        </p>

        </form>
      </div>
    </div>
  );
}
