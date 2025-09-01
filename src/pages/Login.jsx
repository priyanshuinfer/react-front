import React, { useState, useRef, useId, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);

  const emailId = useId();
  const passwordId = useId();

  const navigate = useNavigate();

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!email.trim() || !password.trim()) {
    setError("Email and password are required");
    return;
  }

  try {
    // Send POST request to PHP backend
    const response = await fetch("http://localhost/php/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const data = await response.json();

    if (data.success) {
      // Store user info in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("userType", data.user.userType);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (onLogin) onLogin(data.user);

      navigate("/Homepage");
    } else {
      setError(data.error || "Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    setError("Network or server error");
  }
};

    

    

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-white p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 w-full max-w-sm"
          noValidate
          autoComplete="off"
        >
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-8">
            Sign in to your account
          </h1>

          {/* Error Message */}
          {error && (
            <div
              id={emailId}
              className="mb-4 text-red-500 text-sm text-center"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor={emailId} className="sr-only">
              Email
            </label>
            <input
              id={emailId}
              type="email"
              placeholder="Your Email"
              value={email}
              ref={emailRef}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor={passwordId} className="sr-only">
              Password
            </label>
            <input
              id={passwordId}
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="h-10 px-4 w-full bg-black shadow-md transition duration-500 rounded-md text-white font-medium hover:shadow-slate-800"
          >
            Sign in
          </button>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/createaccount")}
              className="text-black hover:underline focus:outline-none font-medium"
            >
              Create one
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
