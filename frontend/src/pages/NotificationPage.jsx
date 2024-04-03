import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Sidebar from "../components/SideBar";
import "../styles/notification.css";
import Title from "../components/DashboardTitle";

const messages = [
  {
    groupName: "Group A",
    content: "There is a new bill was added.",
    groupId: "1",
  },
  { groupName: "Group B", content: "There is a bill settled", groupId: "2" },
  {
    groupName: "Group C",
    content: "There is  bill was deleted.",
    groupId: "3",
  },
  {
    groupName: "Group C",
    content: "There is  bill was deleted.",
    groupId: "3",
  },
  {
    groupName: "Group C",
    content: "There is  bill was deleted.",
    groupId: "3",
  },
  {
    groupName: "Group C",
    content: "There is  bill was deleted.",
    groupId: "3",
  },
  {
    groupName: "Group C",
    content: "There is  bill was deleted.",
    groupId: "3",
  },
];
export default function NotificationPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Title />
        <div className="pt-24 p-8 notification-container">
          <div className="flex flex-col justify-around items-start space-y-4">
            {messages.map((message, index) => (
              <NavLink
                to={`/group/${message.groupId}`}
                key={index}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full cursor-pointer"
              >
                <h3 className="font-bold text-lg">{message.groupName}</h3>
                <p className="text-gray-700 text-base">{message.content}</p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
