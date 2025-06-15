import { db, auth } from "./firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Create a new user after Google authentication
export const createUserAfterGoogleAuth = async (userData) => {
  try {
    const userRef = doc(db, "users", userData.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        role: "user",
        createdAt: serverTimestamp(),
        uid: userData.uid,
        hasPassword: false,
      });
      return { ...userData, hasPassword: false };
    }
    return userDoc.data();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// Update user password
export const updateUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

// Delete user (admin only)
export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Check if user is admin
export const isAdmin = async (userId) => {
  try {
    const user = await getUserById(userId);
    return user?.role === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
