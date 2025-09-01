import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function HomePage() {
  const navigate = useNavigate();

  // Hardcoded slideshow images
  const slideshowImages = [
    "https://images.saatchiart.com/saatchi/2009179/art/10862685/9925097-PEOKZIDV-32.jpg",
    "https://img.artpal.com/327262/21-23-1-9-13-22-24m.jpg",
    "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/grey-landscape-painting-2-green-palace.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // User info for role-based access
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserType(user.userType); // Admin / PictureBuyer / PaintingBuyer
      setUserName(user.name);
    }

    const fetchData = async () => {
      try {
        const picRes = await fetch("http://localhost/php/get_pictures.php");
        const picData = await picRes.json();

        const paintingRes = await fetch("http://localhost/php/get_paintings.php");
        const paintingData = await paintingRes.json();

        setPictures(picData);
        setPaintings(paintingData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load gallery data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slideshowImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideshowImages.length - 1 : prev - 1));
  };

  if (!userType) return <div>Loading user info...</div>;
  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div>
      <Navbar />

      {/* Welcome Message */}
      <div className="text-center mt-6 text-xl font-semibold">
        Welcome, {userName} ({userType})
      </div>

      {/* Slideshow Section */}
      <div className="relative w-full h-96 overflow-hidden mt-6">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slideshowImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i}`}
              className="w-full flex-shrink-0 object-cover rounded-xl"
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          ›
        </button>
      </div>

      {/* Picture Gallery */}
      {(userType === "Admin" || userType === "PictureBuyer") && (
        <div className="px-8 py-10">
          <h2 className="text-3xl font-bold mb-6">Picture Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {pictures.map((pic) => (
              <div key={pic.id} className="relative group">
                <img
                  src={pic.src}
                  alt={pic.title}
                  className="w-full h-60 object-cover rounded-xl shadow-lg"
                />
                <div className="mt-2">
                  <span className="font-medium">{pic.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={() => navigate("/picture-gallery")}
              className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
            >
              Show More →
            </button>
          </div>
        </div>
      )}

      {/* Painting Gallery */}
      {(userType === "Admin" || userType === "PaintingBuyer") && (
        <div className="px-8 py-10">
          <h2 className="text-3xl font-bold mb-6">Painting Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {paintings.map((painting) => (
              <div key={painting.id} className="relative group">
                <img
                  src={painting.src}
                  alt={painting.title}
                  className="w-full h-60 object-cover rounded-xl shadow-lg"
                />
                <div className="mt-2">
                  <span className="font-medium">{painting.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={() => navigate("/painting-gallery")}
              className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
            >
              Show More →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
