import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/DashboardTitle";
import Sidebar from "../components/SideBar";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { getGroupData, removeGroup } from "../services/groupServices";
import "../styles/dashboard.css";

export default function GroupPage() {
  const navigate = useNavigate();
  const { userId, groupId } = useParams();
  const [groupName, setGroupName] = useState();
  useEffect(() => {
    const fetchName = async () => {
      const result = await getGroupData(groupId);
      if (result.success) {
        setGroupName(result.groupData.groupName);
      } else {
        console.error(result.error);
      }
    };

    fetchName();
  }, [groupId]);

  const handleRemoveGroup = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (isConfirmed) {
      const result = await removeGroup(groupId);
      if (result.success) {
        navigate(`/${userId}`);
      } else {
        console.error(result.error);
      }
    }
  };

  return (
    <>
      {/* This is the page that opens when you click on an existing group. Will contain expenses and other group specific things */}
      <Title />
      <Sidebar page={"group"} />
      <div className="mother-div pr-[70px]">
        {/* Hard coded */}
        <div className="group-name">{groupName}</div>
        <div className="flex flex-wrap w-full gap-3 justify-center pb-5">
          <div
            className="card"
            onClick={() => navigate(`/${userId}/${groupId}/chat`)}
          >
            <div className="icon text-white">
              <IoChatboxEllipsesOutline />
            </div>
            <div className="text text-white">Chat</div>
          </div>

          <div
            className="card"
            onClick={() => navigate(`/${userId}/${groupId}/expenses`)}
          >
            <div className="icon text-white">
              <AiOutlineDollarCircle />
            </div>
            <div className="text text-white">Expenses</div>
          </div>

          <div
            className="card"
            onClick={() => navigate(`/${userId}/${groupId}/members`)}
          >
            <div className="icon text-white">
              <LiaUserFriendsSolid />
            </div>
            <div className="text text-white">Members</div>
          </div>
        </div>
        <button className="delete-btn" onClick={handleRemoveGroup}>
          Delete group
        </button>
      </div>
    </>
  );
}
