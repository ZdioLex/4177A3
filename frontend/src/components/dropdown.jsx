import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { HOME_NAV_LINKS } from "../lib/constants";

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setView] = useState("Menu");

  const setText = (filter) => {
    setView(filter);
    setIsOpen(false);
  };

  return (
    <div className="absolute">
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "flex h-10 items-center justify-center rounded-md px-3 text-md text-purp-1 border-2 border-purp-10 rounded-md hover:bg-purp-10 hover:text-purp-950",
            {
              "bg-gray-200 text-purp-950": isOpen,
            }
          )}
        >
          <span className="text-lg">{currentView}</span>
          <ChevronDownIcon className="h-5 ml-2" />
        </button>

        {/* DROPDOWN DIV */}
        <div
          className={clsx("bg-gray-700 rounded-md mt-0.5 px-0.5 z-50", {
            hidden: !isOpen,
          })}
        >
          {HOME_NAV_LINKS.map((filter) => (
            <Link
              key={filter.name}
              to={filter.href} // Assuming you want to keep it in the same path with query parameters
              className="flex justify-center items-center text-purp-900 hover:bg-purp-10 hover:font-semibold hover:text-purp-950 my-0.5 w-full bg-purp-1 h-10 rounded-md text-center"
              onClick={() => setText(filter.name)}
            >
              <span className="text-md">{filter.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
