import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  subscribeToGroupMessages,
  sendMessageToGroup,
} from "../services/groupServices";
import { fetchUserData } from "../services/userServices";
import SideBar from "../components/SideBar";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { userId, groupId } = useParams();
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [groupName, setGroupName] = useState("");

  const getUserName = async () => {
    const result = await fetchUserData(userId);
    if (result.success) {
      console.log("Username fetched successfully:", result.userData.username);
      setUserName(result.userData.username);
    } else {
      console.error("Failed to fetch username:", result.error);
    }
  };

  getUserName();

  useEffect(() => {
    const unsubscribe = subscribeToGroupMessages(groupId, (groupData) => {
      setMessages(groupData.messages);
      setGroupName(groupData.groupName);
    });

    return () => unsubscribe();
  }, [groupId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message) {
      await sendMessageToGroup(groupId, message, userId);
      setMessage("");
    }
  };

  return (
    <div className="chat-box pl-4 pr-[86px]">
      <SideBar />
      <h1 className="text-white text-6xl mb-6">GroupChat</h1>
      <button
        onClick={() => navigate(`/${userId}/${groupId}`)}
        className="bg-blue-200 hover:bg-blue-400 text-black px-4 py-2 rounded mb-6"
      >
        Back to Group
      </button>
      <h2 className="text-white text-4xl mb-4">{groupName}</h2>
      <div>
        {messages.map((msg, index) => (
          <p
            key={index}
            className="message-box p-3 mb-2 bg-gray-100 rounded-md "
          >
            <strong>{msg.sender}:</strong> <br />
            {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="mx-auto my-4 flex justify-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-80 p-2 border border-gray-300 rounded-md mr-2 "
        />
        <button
          type="submit"
          className="h-11 bg-blue-200 hover:bg-blue-400 text-black px-4 py-2 rounded mr-6"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
