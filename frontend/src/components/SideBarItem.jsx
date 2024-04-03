import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const SidebarItem = ({ LinkIcon, label, to, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault(); // Prevent default link action
      onClick(); // Execute the provided onClick function
      console.log("sdasdsadsds");
    }
  };
  return (
    <NavLink
      to={to}
      activeClassName="active"
      onClick={handleClick}
      className={clsx("text-white font-medium block mb-6 ", {
        "px-4 py-2": label,
        "flex items-center justify-center pt-12": !label,
      })}
    >
      <div
        className={clsx(
          "flex items-center rounded-md hover:text-black hover:bg-purp-10 p-2",
          {
            "pr-2 gap-2": label,
            "justify-center": !label,
            "justify-center gap-2": label === "Logout",
          }
        )}
      >
        <LinkIcon className="w-7" />
        <p>{label}</p>
      </div>
    </NavLink>
  );
};

export default SidebarItem;
