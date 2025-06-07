import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";

export default function HotelCardItem({ item, index }) {
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    setPhotoUrl(null);
    setLoading(true);
    item && GetPlacePhoto();
  }, [item]);

  const data = {
    textQuery: item?.hotelName,
  };
  //check data
  console.log(data);

  const GetPlacePhoto = async () => {
    try {
      // console.log("Request data:", data);
      const resp = await GetPlaceDetails(data);
      // console.log(resp.data);

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
        console.warn("No photos found for " + item.hotelName + ".");
        setPhotoUrl(null);
      }
    } catch (error) {
      console.error("Failed to fetch place details for " + item.hotelName + ":", error);
      if (error.response) {
        console.error("API error response:", error.response.data);
      }
      setPhotoUrl(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        item.hotelName +
        ", " +
        item.hotelAddress
      }
      target="_blank"
    >
      <div
        key={index}
        className="border rounded-xl p-4 hover:shadow-lg transition-all"
      >
        <div className="relative w-full h-[200px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
          <img
            src={photoUrl || item.hotelImageUrl || "/images/placeholder.jpg"}
            alt={item.hotelName}
            className="w-full h-full object-cover rounded-lg"
            onLoad={() => setLoading(false)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder.jpg";
              setLoading(false);
            }}
            style={{ display: (loading && !photoUrl) ? "none" : "block" }}
          />
        </div>
        <div className="mt-3">
          <h3 className="font-bold text-lg">{item.hotelName}</h3>
          <p className="text-gray-500 text-sm mt-1">📍 {item.hotelAddress}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">{item.price}</p>
            <p className="text-yellow-500">⭐ {item.rating}</p>
          </div>
          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
        </div>
      </div>
    </Link>
  );
}
