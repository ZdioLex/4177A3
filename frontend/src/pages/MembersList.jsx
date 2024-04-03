import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
// import "../styles/membersPage.css";
import { useNavigate } from "react-router-dom";
import {
  getGroupData,
  subscribeToGroupMembers,
  removeMemberFromGroup,
  addMemberToGroup,
} from "../services/groupServices";
import { fetchUserFriends, fetchUserData } from "../services/userServices";

function MembersList({ groupId, userId }) {
  const navigate = useNavigate();
  const [groupMembers, setGroupMembers] = useState([]);
  const [isGroupCreator, setIsGroupCreator] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchGroupAndFriendsData = async () => {
      const getGroupDoc = await getGroupData(groupId);
      if (getGroupDoc.success) {
        setIsGroupCreator(getGroupDoc.groupData.createdBy === userId);
        subscribeToGroupMembers(groupId, (results) => {
          if (results) {
            console.log(results);
            setGroupMembers(results.membersData);
          }
        });

        const { success, friendsData } = await fetchUserFriends(userId);
        if (success) {
          setFriends(
            friendsData.filter(
              (friend) => !getGroupDoc.groupData.members.includes(friend.id)
            )
          );
        }
      }
    };

    fetchGroupAndFriendsData();
  }, [groupId, userId, friends]);

  const handleRemove = async (memberId) => {
    if (memberId === userId) {
      alert("The group creator cannot be removed.");
      return;
    }

    if (isGroupCreator) {
      const result = await removeMemberFromGroup(groupId, memberId);
      if (result.success) {
        setGroupMembers((currentMembers) =>
          currentMembers.filter((member) => member.id !== memberId)
        );
        const memberData = await fetchUserData(memberId);
        if (memberData.success) {
          setFriends((currentFriends) => [
            ...currentFriends,
            memberData.userData,
          ]);
        }
      } else {
        alert(result.error);
      }
    }
  };

  const handleAdd = async (friendId) => {
    if (isGroupCreator) {
      const result = await addMemberToGroup(groupId, friendId);
      if (result.success) {
        setFriends((currentFriends) =>
          currentFriends.filter((friend) => friend.id !== friendId)
        );

        const friendData = await fetchUserData(friendId);
        if (friendData.success) {
          if (!groupMembers.find((member) => member.id === friendId)) {
            setGroupMembers([...currentMembers, friendData.userData]);
          }
        }
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-white text-3xl mt-4 mb-2 ml-5">Group members:</h2>
      <div className="flex flex-wrap justify-center gap-4 p-5">
        {groupMembers.map((member, index) => (
          <div key={index} className="p-2">
            <MemberCard
              name={member.username}
              id={member.id}
              isMember={true}
              onRemove={(id) => handleRemove(id)}
              showActions={isGroupCreator}
            />
          </div>
        ))}
      </div>

      {isGroupCreator && (
        <div className="mt-8">
          <h2 className="text-white text-3xl mt-4 mb-2 ml-5">Add a friend:</h2>
          <div className="flex flex-wrap justify-center gap-4 p-5">
            {friends.map((friend, index) => (
              <div key={index} className="p-2 ">
                <MemberCard
                  name={friend.username}
                  id={friend.id}
                  isMember={false}
                  onAdd={(id) => handleAdd(id)}
                  showActions={isGroupCreator}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MembersList;
