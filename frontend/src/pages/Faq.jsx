import React from "react";
import NavBar from "../components/NavBar";
import newBoy from "../img/newBoy.webp";

function Faq() {
  return (
    <>
      <NavBar />
      <div className="container-fluid bg-purp-900">
        <div className="row justify-content-around py-5">
          <div className="col-sm">
            {/* See citation [4] for newBoy.webp in README file */}
            <img src={newBoy} alt="Boy on phone" className="img-fluid" />
          </div>
          <div className="col-lg text-purp-1">
            <h1 className="display-5 font-semibold">F.A.Q</h1>
            <div className="mb-1">
              <h2 className="text-2xl font-semibold text-purp-10">
                Can I use Split Ease for business expenses?
              </h2>
              <p className="">
                Yes, Split Ease can be used for both personal and business
                expenses. Its features make it easy to track and manage expenses
                for small businesses or work-related projects.
              </p>
            </div>
            <hr />
            <div className="my-1">
              <h2 className="text-2xl font-semibold text-purp-10">
                How do I invite friends to use Split Ease?
              </h2>
              <p className="">
                You can invite friends to use Split Ease by sharing an invite
                link through the app. Go to the 'Invite Friends' section, and
                you can send invites via email. After they join the app, you can
                add them to your friends list.
              </p>
            </div>
            <hr />
            <div className="my-1">
              <h2 className="text-2xl font-semibold text-purp-10">
                Can I split expenses in different currencies?
              </h2>
              <p className="">
                Yes, Split Ease supports multiple currencies, allowing you to
                split expenses in the currency of your choice. The app can also
                convert expenses into your primary currency at the current
                exchange rate.
              </p>
            </div>
            <hr />
            <div className="my-1">
              <h2 className="text-2xl font-semibold text-purp-10">
                Can I split expenses in different currencies?
              </h2>
              <p className="">
                Yes, Split Ease supports multiple currencies, allowing you to
                split expenses in the currency of your choice. The app can also
                convert expenses into your primary currency at the current
                exchange rate.
              </p>
            </div>
            <hr />
            <div className="my-1">
              <h2 className="text-2xl font-semibold text-purp-10">
                How can I contact support if I have an issue?
              </h2>
              <p className="">
                For any issues or questions not covered in our FAQ, you can
                contact our support team by emailing{" "}
                <a href="mailto:support@splitease.com">support@splitease.com</a>{" "}
                or through the 'Contact Us' section in the app. Our team is here
                to help you with any concerns you may have.
              </p>
            </div>
            <hr />
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </>
  );
}

export default Faq;
