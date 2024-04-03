import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex justify-between items-center py-4 px-8 bg-DarkSlateBlue-800 text-white">
      <div className="flex">
        <h1 className="text-7xl mt-2 mb-4 text-purp-1">Split</h1>
        <h1 className="text-7xl mt-6 mb-2 text-purp-1">Ease</h1>
      </div>

      <div className="flex items-center">
        <NavLink
          to="/contactus"
          className="ml-4 text-xl font-semibold mt-2 mb-2 text-purp-1 hover:text-gray-400"
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/faq"
          className="ml-4 text-xl font-semibold mt-2 mb-2 text-purp-1 hover:text-gray-400"
        >
          FAQs
        </NavLink>
        {/* Add more links here if needed */}
      </div>
    </div>
  );
}

export default NavBar;
