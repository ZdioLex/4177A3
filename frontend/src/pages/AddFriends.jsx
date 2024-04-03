import React, { useState, useEffect } from "react";
import Title from "../components/DashboardTitle";
import SideBar from "../components/SideBar";
import AddFriendsDetailsModal from "./AddFriendsDetailsModal";
import FriendCard from "./FriendsCards";
import { fetchUserFriends } from "../services/userServices";
import { useParams } from "react-router-dom";
import { addFriendByEmail } from "../services/friendsServices";

import "../styles/dashboard.css";
import "../styles/groupCard.css";

function AddFriends() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const getUserFriends = async () => {
      const result = await fetchUserFriends(userId);
      if (result.success) {
        setFriends(result.friendsData);
      } else {
        alert(result.error);
        console.error("Failed to fetch friends:", result.error);
      }
    };
    getUserFriends();
  }, [userId]);

  const handleCreateFriend = async (friendEmail) => {
    const result = await addFriendByEmail(friendEmail, userId);
    if (result.success) {
      setFriends((prev) => [...prev, result.friends]);
      setIsModalOpen(false);
    } else {
      alert(result.error);
    }
  };

  return (
    <>
      <Title />
      <SideBar page={"friends"} />
      <div className="flex justify-center flex-wrap pr-[100px] gap-7">
        <div className="group-card" onClick={() => setIsModalOpen(true)}>
          <div className="plus-icon">+</div>
          <div className="text">Add a Friend</div>
        </div>
        {/* Render existing groups of friends */}
        {friends.map((friendData, index) => (
          <FriendCard
            key={index}
            userId={userId}
            friendId={friendData.id}
            friendName={friendData.username}
          />
        ))}
      </div>

      {isModalOpen && (
        <AddFriendsDetailsModal
          onClose={() => setIsModalOpen(false)}
          onCreateFriend={handleCreateFriend}
        />
      )}
    </>
  );
}

export default AddFriends;
