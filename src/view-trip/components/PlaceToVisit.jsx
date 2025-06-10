import React from "react";
import PlaceCardItem from "./PlaceCardItem";


export default function PlaceToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div>
        {(trip.tripData?.itinerary || []).map((item, dayIdx) => (
          <div key={dayIdx} className="mb-10">
            <h2 className="font-bold text-lg mb-4">Day {item.day}</h2>
            <div className="grid grid-cols-2 gap-8">
              {(item.plan || []).map((place, placeIdx) => (
                <PlaceCardItem item={place} index={placeIdx}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}