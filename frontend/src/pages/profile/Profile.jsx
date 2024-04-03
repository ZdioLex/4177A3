import ProfilePicture from "../../components/profile/picture-container";
import MediumContainer from "../../components/profile/medium-container";
import LargeContainer from "../../components/profile/large-container";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { fetchProfileDetails } from "../../services/userServices";
import { useState, useEffect } from "react";
import Title from "../../components/DashboardTitle";

export default function Profile() {
  const { userId, friendId } = useParams();
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    if (friendId) {
      console.log("IF");
      fetchProfileDetails(friendId).then((data) => {
        if (data.success) {
          setProfileDetails(data.profileData);
        } else {
          console.error("Failed to fetch profile details:", data.error);
        }
      });
    } else {
      console.log("ELSE");
      fetchProfileDetails(userId).then((data) => {
        if (data.success) {
          setProfileDetails(data.profileData);
        } else {
          console.error("Failed to fetch profile details:", data.error);
        }
      });
    }
  }, []);

  return (
    <main className="flex flex-col h-full pb-4">
      <Title />
      <SideBar page={"profile"} />
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="flex items-center justify-center lg:justify-start mb-4 px-12 lg:pl-40 text-xl text-purp-1 md:text-3xl">
          My Profile
        </h1>
        {!friendId ? (
          <Link
            rounded-xl
            p-3
            className="flex mb-4 md:mr-12 self-center lg:mr-40 items-center gap-2 justify-center rounded-lg border-2 border-purp-10 px-2 py-1 text-purp-1 hover:bg-purp-10 hover:text-purp-950"
            to={`/${userId}/profile/edit`}
          >
            <PencilSquareIcon className="w-7" />
            <p>Edit</p>
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col items-center md:items-stretch justify-center h-full px-12 lg:px-40 gap-2 lg:gap-12 md:flex-row">
        <ProfilePicture />
        <MediumContainer profileDetails={profileDetails} />
      </div>
      <div className="flex justify-center h-full px-12 lg:px-40 mt-2 lg:mt-10 flex-row">
        <LargeContainer profileDetails={profileDetails} />
      </div>
    </main>
  );
}
