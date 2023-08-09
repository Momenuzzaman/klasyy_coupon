import React from "react";
import Contact from "../Components/Contact/Contact";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Coupon = () => {
  return (
    <div>
      <Contact />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Coupon;
