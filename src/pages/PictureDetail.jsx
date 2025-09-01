import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function PictureDetails() {
  const { id } = useParams();
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/php/get_picture_detail.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setPicture(data))
      .catch((err) => console.error("Error fetching details:", err));
  }, [id]);

  if (!picture) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">
        <img
          src={picture.src}
          alt={picture.title}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
        <h2 className="text-3xl font-bold mt-6">{picture.title}</h2>
        <p className="text-gray-600 mt-2">{picture.description}</p>
        <p className="text-xl font-semibold mt-4">₹ {picture.price}</p>
      </div>
    </div>
  );
}

export default PictureDetails;
