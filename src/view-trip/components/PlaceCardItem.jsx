import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";

export default function PlaceCardItem({ item, index }) {
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    setPhotoUrl(null);
    setLoading(true);
    item && GetPlacePhoto();
  }, [item]);

  const data = {
    textQuery: item?.placeName,
  };
  //check data
  console.log(data);

  const GetPlacePhoto = async () => {
    try {
      const resp = await GetPlaceDetails(data);
      if (
        resp.data.places &&
        resp.data.places.length > 0 &&
        resp.data.places[0].photos &&
        resp.data.places[0].photos.length > 0
      ) {
        const PhotoURL = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[0].name
        );
        setPhotoUrl(PhotoURL);
      } else {
        console.warn("No photos found for " + item.placeName + ".");
        setPhotoUrl(null);
      }
    } catch (error) {
      console.error(
        "Failed to fetch place details for " + item.placeName + ":",
        error
      );
      if (error.response) {
        console.error("API error response:", error.response.data);
      }
      setPhotoUrl(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div key={index} className="flex flex-col">
      {/* Time slot */}
      <div className="text-orange-500 font-bold mb-2">{item.time}</div>
      {/* Card */}
      <Link
        to={"https://www.google.com/maps/search/?api=1&query=" + item.placeName}
        target="_blank"
      >
        <HoverCard
          image={photoUrl}
          name={item.placeName}
          shortDesc={truncate(item.placeDetails, 60)}
          fullDesc={item.placeDetails}
          timeToTravel={item.timeToTravel}
          ticketPricing={item.ticketPricing}
          loading={loading}
          setLoading={setLoading}
        />
      </Link>
    </div>
  );
}

function truncate(text, maxLength = 60) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

//hover card
function HoverCard({
  image,
  name,
  shortDesc,
  fullDesc,
  timeToTravel,
  ticketPricing,
  loading,
  setLoading,
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);
  const placeholder = "/images/placeholder.jpg";
  const imgSrc = image && !imageError ? image : placeholder;

  const handleImageLoad = () => setLoading(false);
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholder;
    setLoading(false);
    setImageError(true);
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-lg shadow p-4 transition-all duration-200 cursor-pointer hover:shadow-lg"
      onMouseEnter={(e) => setHovered(true)}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: "180px", maxWidth: "350px" }}
    >
      <div className="flex items-center gap-4">
        {loading && (
          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        <img
          src={imgSrc}
          alt={name}
          className="w-24 h-24 object-cover rounded"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: loading ? "none" : "block" }}
        />
        <div>
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <p className="text-gray-600 text-sm">{shortDesc}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <span className="flex items-center gap-1 text-gray-700 font-bold text-sm">
          <span role="img" aria-label="clock">
            ⏰
          </span>
          {timeToTravel || "N/A"}
        </span>
        <span className="flex items-center gap-1 text-gray-700 font-bold text-sm">
          <span role="img" aria-label="ticket">
            🎫
          </span>
          {ticketPricing}
        </span>
      </div>
      {hovered && (
        <div
          className="fixed z-50 rounded-lg shadow-lg p-4 flex flex-col justify-center items-start transition-all duration-25"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 20,
            minWidth: 250,
            maxWidth: 350,
            pointerEvents: "none",
            backgroundImage: `url('${imgSrc}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.95,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
          <div className="relative z-10 text-white">
            <h3 className="font-bold text-lg mb-2">{name}</h3>
            <p className="text-gray-100 text-sm">{fullDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
