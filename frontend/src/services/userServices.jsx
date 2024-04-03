import axios from "axios";

export const fetchUserData = async (userId) => {
  const res = await axios.post("https://csci4177-final-api.onrender.com/users/getUser", {
    userId: userId,
  });

  return res.error ? { success: false, error: res.error } : res.data;
};

export const fetchUserFriends = async (userId) => {
  const res = await axios.post("https://csci4177-final-api.onrender.com/users/getFriends", {
    userId: userId,
  });

  return res.error ? { success: false, error: res.error } : res.data;
};

export const fetchUserGroups = async (userId) => {
  const res = await axios.post("https://csci4177-final-api.onrender.com/users/getUserGroups", {
    userId: userId,
  });

  return res.error ? { success: false, error: res.error } : res.data;
};

export const fetchProfileDetails = async (userId) => {
  const res = await axios.post(
    "https://csci4177-final-api.onrender.com/users/getProfileDetails",
    {
      userId: userId,
    }
  );

  return res.error ? { success: false, error: res.error } : res.data;
};

export const setProfileDetails = async (userId, profileData) => {
  const mappedProfileData = {
    fullName: profileData.Name,
    birthday: profileData.Birthday,
    gender: profileData.Gender,
    email: profileData.Email,
    address: profileData.Address,
    phoneNumber: profileData["Phone Number"],
    bio: profileData.bio,
  };

  const res = await axios.post(
    "https://csci4177-final-api.onrender.com/users/setProfileDetails",
    {
      userId: userId,
      profileData: mappedProfileData,
    }
  );

  return res.error ? { success: false, error: res.error } : res.data;
};
