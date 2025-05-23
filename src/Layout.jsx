import React from "react";
import Header from "./components/custom/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

export default function Layout() {
  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
    </>
  );
}
