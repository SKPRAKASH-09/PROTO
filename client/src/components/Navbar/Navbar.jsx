import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [MobileNav, setMobileNav] = useState(false); // Added useState for MobileNav
  const links = [
    {
      Name: "Home",
      to: "/",
    },
    {
      Name: "All blogs",
      to: "/all-blogs",
    },
    {
      Name: "Profile",
      to: "/profile",
    },
    {
      Name: "Login",
      to: "/login",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Adjust links based on login state
  if (isLoggedIn) {
    links.splice(2, 1); // Remove "Profile" if logged in
  } else {
    links.splice(3, 1); // Remove "Login" if not logged in
  }

  return (
    <nav className="flex items-center justify-between py-4 border-b-2 border-zinc-200">
      {/* Brand Name */}
      <div className="w-2/6 brandName ">
        <Link to="/" className="text-xl font-bold">
          IIT-P
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="w-4/6 flex lg:hidden items-center justify-end">
        {links.map((items, i) => (
          <Link
            key={i} // Corrected key placement
            to={items.to} // Corrected to placement
            className="ms-4 hover:text-blue-500 transition-all duration-300"
          >
            {items.Name}
          </Link>
        ))}
        {!isLoggedIn && (
          <Link
            className="ms-4 bg-black rounded px-4 py-1 text-zinc-100 hover:bg-blue-500 transition-all duration-300"
            to="/SignUP"
          >
            SignUP
          </Link>
        )}
        <button
          className="text-3xl"
          onClick={() => setMobileNav(!MobileNav)} // Toggle MobileNav
        >
          <IoReorderThreeSharp />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 nav-bg h-screen w-full backdrop-blur-md p-8 ${
          MobileNav ? "translate-y-[0%] flex flex-col" : "translate-y-[-100%]"
        } transition-all duration-300`}
      >
        <div>
          <button
            className="text-3xl"
            onClick={() => setMobileNav(!MobileNav)} // Toggle MobileNav
          >
            <RxCross2 />
          </button>
        </div>
        <div className="h-[100%] flex flex-col items-center justify-center">
          {links.map((items, i) => (
            <Link
              key={i} // Corrected key placement
              to={items.to} // Corrected to placement
              className="mb-8 text-4xl hover:text-blue-500 transition-all duration-300"
            >
              {items.Name}
            </Link>
          ))}
          {!isLoggedIn && (
            <Link
              className="mb-4 bg-black rounded px-4 py-1 text-zinc-100 hover:bg-blue-500 transition-all duration-300"
              to="/SignUP"
            >
              SignUP
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;