import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import app from "../firebase-config";

const auth = getAuth(app);
const db = getFirestore(app);

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return { success: true, user: user };
  } catch (error) {
    console.error("Error signing in user:", error);
    return { success: false, error: error };
  }
};

export const registerNewUser = async (email, password, fname, lname) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create a new group and get its ID
    const groupRef = doc(collection(db, "Groups"));
    await setDoc(groupRef, {
      groupName: `${fname}'s Personal Space`,
      description: "Personal expenses group",
      createdBy: user.uid,
      members: [user.uid],
      messages: [
        {
          sender: "SplitEase",
          message: "Welcome to the group chat!",
          time: "",
        },
      ],
    });

    const groupId = groupRef.id;

    // Set user data
    await setDoc(doc(db, "Users", user.uid), {
      email: email,
      username: `${fname} ${lname}`,
      groups: [groupId],
      lastLogin: serverTimestamp(),
      joinDate: serverTimestamp(),
    });

    // Set profile data
    await setDoc(doc(db, "Profiles", user.uid), {
      userId: user.uid,
      profilePicture: "",
      fullName: `${fname} ${lname}`,
      birthday: "",
      gender: "",
      address: "",
      phoneNumber: "",
      email: email,
      bio: "",
    });

    // Set user's friends data
    await setDoc(doc(db, "Friends", user.uid), {
      friendIds: [],
    });

    // Set a mock expense
    const expenseRef = doc(collection(db, "Expenses"));
    await setDoc(expenseRef, {
      groupId: groupId, // Use the group ID instead of user ID
      description: "Example Personal Expense",
      amount: 100,
      dueDate: new Date("2024-12-31").toISOString(),
      splitEqually: false,
      settlement: false,
      paymentMethod: "",
    });

    // Set user's participation in the expense
    await setDoc(
      doc(collection(db, `Expenses/${expenseRef.id}/Participants`)),
      {
        userId: user.uid,
        name: `${fname} ${lname}`,
        amountOwed: 100,
        sharePercentage: 100,
      }
    );

    const notificationRef = doc(collection(db, "Notifications"));
    await setDoc(notificationRef, {
      userId: user.uid,
      groupId: groupId,
      groupName: `${fname}'s Personal Space`,
      content: "A new expense is created",
      timestamp: serverTimestamp(),
    });

    return { success: true, user: user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: error };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getAuthOn = (callback) => {
  return onAuthStateChanged(auth, (user) => callback(user));
};
