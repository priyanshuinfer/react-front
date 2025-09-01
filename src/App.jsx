import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage"; 
import RegisteredUsers from "./pages/RegisteredUsers";
import PictureGallery from "./pages/PictureGallery";
import PictureDetail from "./pages/PictureDetail";

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/Homepage" replace /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        <Route
          path="/createaccount"
          element={<CreateAccount />}
        />

        <Route path="/registered-users" 
        element={<RegisteredUsers />} />

        <Route path="/picture-gallery" 
        element={<PictureGallery />} />


         <Route path="/picture/:id"
          element={<PictureDetail />} />


        <Route
          path="/Homepage"
          element={
            user ? (
              <HomePage user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
