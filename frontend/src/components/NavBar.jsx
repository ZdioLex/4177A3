import React from "react";
import { NavLink } from "react-router-dom";
import { HOME_NAV_LINKS } from "../lib/constants";
import { Dropdown } from "./dropdown";

function NavBar() {
  return (
    <div className="flex justify-between items-center py-4 px-8">
      <NavLink className="flex group" to="/">
        <h1 className="text-7xl mt-2 mb-4 text-purp-1 group-hover:text-purp-25">
          Split
        </h1>
        <h1 className="text-7xl mt-6 mb-2 text-purp-1 group-hover:text-purp-25">
          Ease
        </h1>
      </NavLink>

      <div className="h-10 w-28">
        <Dropdown />
      </div>
    </div>
  );
}

export default NavBar;
