import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Forever is your ultimate destination for timeless fashion, bringing
            you a curated collection of trendy, high-quality clothing designed
            to elevate your style. We believe in creating looks that inspire
            confidence, celebrate individuality, and stay effortlessly chic for
            every occasion.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-123-456-7890</li>
            <li>contact@forever.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-center text-sm">
          Copyright @2024 - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
