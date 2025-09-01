import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PictureGallery() {
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);   // API data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Fetch pictures from backend API
  useEffect(() => {
    fetch("http://localhost/php/get_pictures.php")
      .then((res) => res.json())
      .then((data) => setPictures(data))
      .catch((err) => console.error("Error fetching pictures:", err));
  }, []);

  // ✅ Pagination calculation
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPictures = pictures.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(pictures.length / itemsPerPage);

  // ✅ Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-8 py-10">
        <h2 className="text-3xl font-bold mb-6">Picture Gallery</h2>

        {/* ✅ Grid of pictures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {currentPictures.length > 0 ? (
            currentPictures.map((pic) => (
              <div
                key={pic.id}
                className="relative group cursor-pointer"
                onClick={() => navigate(`/picture/${pic.id}`)}
                >
                <img
                    src={pic.src}
                    alt={pic.title}
                    className="w-full h-60 object-cover rounded-xl shadow-lg"
                />
                <div className="mt-2">
                    <span className="font-medium">{pic.title}</span>
                </div>
                </div>

            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No pictures available
            </p>
          )}
        </div>

        {/* ✅ Pagination Controls */}
        {pictures.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PictureGallery;
