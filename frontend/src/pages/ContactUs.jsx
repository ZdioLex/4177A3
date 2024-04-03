import React from "react";
import NavBar from "../components/NavBar";
import CUP4 from "../img/CUP-4.webp";
import CUP5 from "../img/CUP-5.webp";

function ContactUs() {
  return (
    <>
      <NavBar />
      <div className="container-fluid bg-purp-900">
        <div className="row justify-content-around align-items-center">
          <div className="col-sm">
            {/* See citation [6] for CUP-4.webp in README file */}
            <img
              src={CUP4}
              alt="generic image with smiley face"
              className="img-fluid"
            />
          </div>
          <div className="col-sm">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-purp-1">Contact Us</h2>
              <p className="text-purp-1">Have questions? Reach out to us!</p>
            </div>

            <form>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control bg-purp-1 outline-none border hover:outline-purp-200 focus:outline-purp-1"
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control bg-purp-1 outline-none border hover:outline-purp-200 focus:outline-purp-1"
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group mb-3">
                <textarea
                  className="form-control bg-purp-1 outline-none border hover:outline-purp-200 focus:outline-purp-1"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-xl text-purp-1 border-2 border-purp-10 rounded-xl p-2 hover:bg-purp-10 hover:text-purp-950"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="col-sm">
            {/* See citation [5] for CUP-5.webp in README file */}
            <img
              src={CUP5}
              alt="generic image with smiley face"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
