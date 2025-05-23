import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[41px] text-center">
        <span className="text-[#314689]">Embark a new journey with your travel companion</span>
        <br />
        Travel smart - Discover more
      </h1>

      <p className="text-xl text-gray-500 text-center">
        Let our intelligent travel assistant plan, suggest, and guide you to unforgettable destinations - tailored just for you
      </p>

      <Link to={"/create-trip"}>
        <Button className="cursor-pointer"> Get Started</Button>
      </Link>
    </div>
  );
}
