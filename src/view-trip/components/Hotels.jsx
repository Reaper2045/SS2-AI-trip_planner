import React, { useState } from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

export default function Hotels({ trip }) {


  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotels Recommendation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {trip?.tripData?.hotels?.map((item, index) => (
          <HotelCardItem item={item} index={index}/>
        ))}
      </div>
    </div>
  );
}
