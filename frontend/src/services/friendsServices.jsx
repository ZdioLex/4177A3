import { getFirestore, collection, addDoc, doc, getDocs , getDoc,updateDoc, arrayUnion,arrayRemove,deleteDoc, query, where, onSnapshot  } from "firebase/firestore";
import app from '../firebase-config';
const db = getFirestore(app);

export const addFriendByEmail = async (userEmail, userId) => {
    try{

        const currentUserRef = doc(db, 'Users', userId);
        const usersRef = collection(db, 'Users');
        const currentUserDoc= await getDoc(currentUserRef);

        if (currentUserDoc.exists() && currentUserDoc.data().email === userEmail) {
            return { success: false, error: "Cannot add yourself as a friend" };
        }
        const q = query(usersRef, where("email", "==", userEmail));
        const queryResult = await getDocs(q);


    
        if (!queryResult.empty) {
            const friend = queryResult.docs[0].data();
            const userFriendRef = doc(db, 'Friends', userId);
            const userFriendDoc= await getDoc(userFriendRef);
            if (userFriendDoc.exists() && userFriendDoc.data().friendIds.includes(friend.id)) {
                return { success: false, error: "This user is already a friend" };
            }
            await updateDoc(userFriendRef, {
                friendIds: arrayUnion(friend.id)
            });
            const FriendRef = doc(db, 'Friends', friend.id);
            await updateDoc(FriendRef, {
                friendIds: arrayUnion(userId)
            });
            return { success: true, friends: friend }; 
        } else {
            return { success: false, error: "User not found" };
        }

    }catch(error){
        console.error(error)
        return { success: false, error: error };
    }
};