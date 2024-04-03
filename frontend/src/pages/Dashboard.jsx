import React, { useEffect, useState } from "react";
import GroupDetailsModal from "./GroupDetailsModal";
import GroupCard from "./GroupCard";
import "../styles/dashboard.css";
import "../styles/groupCard.css";
import Title from "../components/DashboardTitle";
import Sidebar from "../components/SideBar";
import { getAuthOn } from "../services/authServices";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserGroups } from "../services/userServices";
import { addGroup } from "../services/groupServices";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const unsubscribeAuthOn = getAuthOn(async (user) => {
      if (user) {
        const result = await fetchUserGroups(userId);
        if (result.success) {
          setGroups(result.groups);
        } else {
          console.error(result.error);
        }
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribeAuthOn();
  }, [navigate]);

  const handleCreateGroup = async (groupName, members, description) => {
    const result = await addGroup(userId, groupName, members, description);
    if (result.success) {
      console.log(result.message);
      const groupsResult = await fetchUserGroups(userId);
      if (groupsResult.success) {
        setGroups(groupsResult.groups);
      } else {
        console.error(groupsResult.error);
      }
    } else {
      console.error(result.error);
    }
  };

  return (
    <>
      <Title />
      <Sidebar page={"home"} />
      <div className="flex justify-center flex-wrap gap-7 mr-[70px]">
        <div className="group-card" onClick={() => setIsModalOpen(true)}>
          <div className="plus-icon">+</div>
          <div className="text">Create a split group</div>
        </div>
        {/* Hard coded group for testing: Clicking on a group redirect to group/id page */}
        {/* <GroupCard key={"123xyz"} name={"Test Group"} /> */}
        {/* Render existing groups */}
        {groups.map((group, index) => (
          <GroupCard
            key={index}
            groupName={group.groupName}
            groupId={group.groupId}
            userId={userId}
          />
        ))}
      </div>

      {isModalOpen && (
        <GroupDetailsModal
          onClose={() => setIsModalOpen(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </>
  );
}

export default Dashboard;
