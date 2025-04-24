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
        some description about the website here
      </p>

      <Link to={"/create-trip"}>
        <Button> Get Started</Button>
      </Link>
    </div>
  );
}
