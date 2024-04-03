import axios from "axios";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { fetchUserData } from "./userServices";
import app from "../firebase-config";

const db = getFirestore(app);

export const getGroupData = async (groupId) => {
  const res = await axios.post("https://csci4177-final-api.onrender.com/groups/getGroup", {
    groupId: groupId,
  });

  return res.error ? { success: false, error: res.error } : res.data;
};

export const removeGroup = async (groupId) => {
  const res = await axios.post("https://csci4177-final-api.onrender.com/deleteGroup", {
    groupId: groupId,
  });

  return res.error ? { success: false, error: res.error } : res.data;
};

export const addGroup = async (userId, groupName, members, description) => {
  const res = await axios.post("https://csci4177-final-api.onrender.com/addGroup", {
    userId,
    groupName,
    members,
    description,
  });

  return res.error
    ? { success: false, error: res.error }
    : {
        success: true,
        message: `Group created with ID: ${res.data.groupId}`,
      };
};

export const subscribeToGroupMessages = (groupId, callback) => {
  const groupDocRef = doc(db, "Groups", groupId);

  return onSnapshot(groupDocRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      console.error("No such document!");
    }
  });
};

export const sendMessageToGroup = async (groupId, messageContent, senderId) => {
  console.log("Sending message to group:", messageContent);

  const message = {
    senderId: senderId,
    message: messageContent,
  };

  console.log(message);

  await axios.post("https://csci4177-final-api.onrender.com/groups/sendMessage", {
    groupId,
    message,
  });
};

export const subscribeToGroupMembers = (groupId, callback) => {
  try {
    const groupRef = doc(db, "Groups", groupId);
    const unsubscribe = onSnapshot(groupRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const groupData = docSnapshot.data();
        const memberIds = groupData.members;

        const memberPromises = memberIds.map((memberId) =>
          fetchUserData(memberId)
        );

        Promise.all(memberPromises)
          .then((results) => {
            const membersData = results
              .filter((result) => result.success)
              .map((result) => result.userData);
            callback({ success: true, membersData: membersData });
          })
          .catch((error) => {
            console.error(error);
            callback({ success: false, error: error });
          });
      } else {
        console.error("No such group document!");
        callback({ success: false, error: "No such group document!" });
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error(error);
    return () => {};
  }
};

export const removeMemberFromGroup = async (groupId, memberId) => {
  await axios.post("https://csci4177-final-api.onrender.com/groups/removeMember", {
    groupId,
    memberId,
  });

  return res.error ? { success: false, error: res.error } : { success: true };
};

export const addMemberToGroup = async (groupId, friendId) => {
  await axios.post("https://csci4177-final-api.onrender.com/groups/addMember", {
    groupId,
    friendId,
  });

  return res.error ? { success: false, error: res.error } : { success: true };
};
