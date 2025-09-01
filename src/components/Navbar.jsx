import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBars, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../assets/style.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userType = user?.userType || "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4" style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="text-gray-700 text-xl md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <FaBars />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-2xl font-bold">Artoreal</span>
          </div>
        </div>

        <ul className="flex items-center gap-6">
          <li className="menu-item cursor-pointer" onClick={() => navigate("/Homepage")}>HomePage</li>
          <li className="menu-item cursor-pointer" onClick={() => navigate("/digital")}>Digital Arts</li>
          <li className="menu-item cursor-pointer" onClick={() => navigate("/painting")}>Paintings</li>
          <li className="menu-item cursor-pointer" onClick={() => navigate("/prints")}>Art Prints</li>
        </ul>

        <div className="flex items-center gap-4 text-lg">
          <FaSearch className="cursor-pointer" aria-label="Search" />
          <FaHeart className="cursor-pointer" aria-label="Favorites" />
          <FaShoppingCart className="cursor-pointer" aria-label="Cart" />
          <FaUser className="cursor-pointer" aria-label="Profile" />
          {userType === "Admin" && (
            <FaUsers
              className="cursor-pointer"
              title="View Registered Users"
              aria-label="Registered Users"
              onClick={() => navigate("/registered-users")}
            />
          )}
          <FaSignOutAlt
            className="cursor-pointer"
            title="Logout"
            aria-label="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col md:hidden z-10">
          <li className="p-4 border-b hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/Homepage"); closeMobileMenu(); }}>
            HomePage
          </li>
          <li className="p-4 border-b hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/digital"); closeMobileMenu(); }}>
            Digital Arts
          </li>
          <li className="p-4 border-b hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/painting"); closeMobileMenu(); }}>
            Paintings
          </li>
          <li className="p-4 border-b hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/prints"); closeMobileMenu(); }}>
            Art Prints
          </li>
          {userType === "Admin" && (
            <li
              className="p-4 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => { navigate("/registered-users"); closeMobileMenu(); }}
            >
              Registered Users
            </li>
          )}
          <li className="p-4 hover:bg-gray-100 cursor-pointer" onClick={() => { handleLogout(); closeMobileMenu(); }}>
            Logout
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;