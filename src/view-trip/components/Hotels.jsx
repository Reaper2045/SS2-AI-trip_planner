import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Hotels({ trip }) {
  const [loading, setLoading] = useState({});

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotels Recommendation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {trip?.tripData?.hotels?.map((item, index) => (
          <Link to={"https://www.google.com/maps/search/?api=1&query="+item.hotelName + ", " + item.hotelAddress} target="_blank">
            <div
              key={index}
              className="border rounded-xl p-4 hover:shadow-lg transition-all"
            >
              <div className="relative w-full h-[200px]">
                {loading[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                )}
                <img
                  src={item.hotelImageUrl || "/images/placeholder.jpg"}
                  alt={item.hotelName}
                  className="w-full h-full object-cover rounded-lg"
                  onLoad={() =>
                    setLoading((prev) => ({ ...prev, [index]: false }))
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.jpg";
                    setLoading((prev) => ({ ...prev, [index]: false }));
                  }}
                  style={{ display: loading[index] ? "none" : "block" }}
                />
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-lg">{item.hotelName}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  📍 {item.hotelAddress}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-medium">{item.price}</p>
                  <p className="text-yellow-500">⭐ {item.rating}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
