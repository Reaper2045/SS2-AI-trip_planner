import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";

export default function UserTripCardItem({ trip, index }) {
  const { id, userSelection, createdAt } = trip;
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };

  useEffect(() => {
    setPhotoUrl(null);
    setLoading(true);
    if (userSelection?.location?.label) {
      GetPlacePhoto(userSelection.location.label);
    } else {
      setLoading(false);
    }

  }, [userSelection?.location?.label]);

  const GetPlacePhoto = async (locationLabel) => {
    try {
      const resp = await GetPlaceDetails({ textQuery: locationLabel });
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
        setPhotoUrl(null);
      }
    } catch (error) {
      setPhotoUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/view-trip/${id}`} className="block hover:shadow-lg transition-shadow duration-200">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] w-full">
        <div className="relative w-full h-48">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
          <img
            src={photoUrl || "/images/placeholder.jpg"}
            alt={userSelection?.location?.label || "Trip destination"}
            className="w-full h-48 object-cover rounded-t-lg"
            onLoad={() => setLoading(false)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder.jpg";
              setLoading(false);
            }}
            style={{ display: loading && !photoUrl ? "none" : "block" }}
          />
        </div>
        <div className="p-4 h-[calc(400px-12rem)] flex flex-col">
          <h3 className="font-semibold text-lg mb-1 truncate" title={userSelection?.location?.label || 'Trip Destination'}>
            {userSelection?.location?.label || 'Trip Destination'}
          </h3>
          <div className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Days:</span> {userSelection?.noOfDays || '-'}
            {" | "}
            <span className="font-medium">Travelers:</span> {userSelection?.travelers || '-'}
          </div>
          <div className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Budget:</span> {userSelection?.budget || '-'}
          </div>
          <div className="text-gray-400 text-xs mt-auto">
            {formatDate(createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}