import { Image } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <div className="flex gap-2">
          <img className="h-13" src="/logo_new.svg" />
          <span className="font-bold text-4xl text-[#314689]">Trippy</span>
        </div>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}
