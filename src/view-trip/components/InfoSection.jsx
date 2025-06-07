import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";

export default function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const data = {
    textQuery: trip?.userSelection?.location?.label,
  };
  //check data
  console.log(data);

  const GetPlacePhoto = async () => {
    try {
      console.log("Request data:", data);
      const resp = await GetPlaceDetails(data);
      console.log(resp.data);

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
        console.warn("No photos found for the selected place.");
        setPhotoUrl(null);
      }
    } catch (error) {
      console.error("Failed to fetch place details:", error);
      if (error.response) {
        console.error("API error response:", error.response.data);
      }
      setPhotoUrl(null);
    }
  };

  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "/images/placeholder.jpg"}
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {trip?.userSelection?.location?.label}
        </h2>

        <div className="flex gap-2">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-medium">
            📅 {trip?.userSelection?.noOfDays} Day
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-medium">
            💰 {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-medium">
            🧑‍🤝‍🧑 No. of Traveler: {trip?.userSelection?.travelers} People
          </h2>
        </div>
      </div>

      <div></div>
    </div>
  );
}
