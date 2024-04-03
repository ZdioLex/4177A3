import React, { useState, useEffect } from "react";
import Title from "../components/DashboardTitle";
import { getGroupData } from "../services/groupServices";
import MembersList from "./MembersList";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function MembersPage() {
  const navigate = useNavigate();
  const { groupId, userId } = useParams();
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
  return (
    <>
      <Title />
      <Sidebar />
      <button
        onClick={() => navigate(`/${userId}/${groupId}`)}
        className="bg-blue-200 hover:bg-blue-400 text-black px-4 py-2 rounded mb-6 w-40 ml-5"
      >
        Back to Group
      </button>
      <div className="box pr-[70px]">
        <div className="flex justify-center text-white text-4xl mt-4 mb-2 ml-5">
          {groupName}
        </div>
        <MembersList groupId={groupId} userId={userId} />
      </div>
    </>
  );
}
