import React from "react";
import LP1 from "../img/LP-1.webp";
import LP2 from "../img/LP-2.webp";
import LP3 from "../img/LP-3.webp";
import { Link } from "react-router-dom";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import NavBar from "../components/NavBar";

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <div className="flex justify-evenly items-center w-full bg-purp-900">
        {/* See citation [1] for LP-1.webp in README file */}
        <img
          src={LP1}
          alt="generic image with smiley face"
          className="w-0 h-0 md:w-96 md:h-96"
        />
        <div className="flex flex-col items-center p-12 md:px-0 md:w-2/5">
          <h2 className="text-5xl text-purp-1">Why SplitEase?</h2>
          <div className="flex flex-col h-full items-center justify-center">
            <p className="flex leading-relaxed text-3xl pt-4 pl-4 text-purp-10">
              We provide an effortless solution to smooth bill splitting.
              Experience transparency, trust, and ease with our intuitive
              platform. Say goodbye to confusion and hello to stress-free
              finances!
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-y-4 p-12 flex-col items-center justify-center h-auto">
        <p className="leading-relaxed text-4xl mb-2 text-purp-10">
          Join SplitEase today and revolutionize your collaborative finance
          management.
        </p>
        <Link
          to="/registration"
          className="relative text-3xl text-purp-1 border-2 border-purp-10 rounded-xl p-3 hover:bg-purp-10 hover:text-purp-950"
        >
          <span>Sign Up</span>
          <CursorArrowRaysIcon className="absolute text-white ml-24 w-12" />
        </Link>
      </div>
      <div className="flex justify-evenly items-center w-full bg-purp-900">
        <div className="flex flex-col items-center p-12 md:px-0 w-full lg:w-1/2">
          <h2 className="text-5xl text-purp-1">Benefits</h2>
          <div className="flex flex-col md:flex-row leading-loose pt-4 px-12 gap-x-16 text-2xl text-purp-10 h-full md:items-center justify-center">
            <ul className="list-disc">
              <li>Makes Splitting Bills Easy</li>
              <li>Keeps Things Fair and Clear</li>
              <li>Helps Everyone Pay on Time</li>
            </ul>
            <ul className="list-disc">
              <li>Fits Everyone’s Needs</li>
              <li>Easy to Use</li>
              <li>Protects Your Information</li>
            </ul>
          </div>
        </div>
        {/* See citation [2] for LP-2.webp in README file */}
        <img src={LP2} alt="man waving" className="w-0 h-0 lg:w-72 lg:h-96" />
        {/* See citation [3] for LP-3.webp in README file */}
        <img src={LP3} alt="woman waving" className="w-0 h-0 lg:w-72 lg:h-96" />
      </div>
    </>
  );
}
