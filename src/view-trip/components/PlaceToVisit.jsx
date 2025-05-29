import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

function truncate(text, maxLength = 60) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

export default function PlaceToVisit({ trip }) {
    const [loading, setLoading] = useState({});

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, dayIdx) => (
          <div key={dayIdx} className="mb-10">
            <h2 className="font-bold text-lg mb-4">{item.day}</h2>
            <div className="grid grid-cols-2 gap-8">
              {item.plan.map((place, placeIdx) => (
                <div key={placeIdx} className="flex flex-col">
                  {/* Time slot */}
                  <div className="text-orange-500 font-bold mb-2">
                    {place.time}
                  </div>
                  {/* Card */}
                  <Link
                    to={
                      "https://www.google.com/maps/search/?api=1&query=" +
                      place.placeName
                    }
                    target="_blank"
                  >
                    <HoverCard
                      image={place.placeImageUrl}
                      name={place.placeName}
                      shortDesc={truncate(place.placeDetails, 60)}
                      fullDesc={place.placeDetails}
                      timeToTravel={place.timeToTravel}
                      ticketPricing={place.ticketPricing}
                      loading={loading}
                      setLoading={setLoading}
                      index={placeIdx}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// HoverCard
function HoverCard({
  image,
  name,
  shortDesc,
  fullDesc,
  timeToTravel,
  ticketPricing,
  loading,
  setLoading,
  index,
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);
  const placeholder = "/images/placeholder.jpg";
  const imgSrc = image || placeholder;
  
  // Use the original image if it exists and hasn't errored, otherwise use placeholder
  const backgroundImage = (image && !imageError) ? image : placeholder;

  const handleMouseEnter = (e) => {
    setHovered(true);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleImageLoad = () => {
    setLoading((prev) => ({ ...prev, [index]: false }));
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholder;
    setLoading((prev) => ({ ...prev, [index]: false }));
    setImageError(true);
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-lg shadow p-4 transition-all duration-200 cursor-pointer hover:shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ minHeight: "180px", maxWidth: "350px" }}
    >
      <div className="flex items-center gap-4">
        {loading[index] && (
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
          style={{ display: loading[index] ? "none" : "block" }}
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
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
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