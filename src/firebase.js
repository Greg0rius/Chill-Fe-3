import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Sign Up
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Add bookmark
export const addBookmark = async (userId, movie) => {
  try {
    console.log("Adding bookmark for user:", userId); // Log user ID
    const bookmarkRef = doc(db, "users", userId, "bookmarks", movie.id.toString());
    await setDoc(bookmarkRef, movie);
    console.log("Bookmark added successfully!");
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
};

// Remove bookmark
export const removeBookmark = async (userId, movieId) => {
  try {
    console.log("Removing bookmark for user:", userId); // Log user ID
    const bookmarkRef = doc(db, "users", userId, "bookmarks", movieId.toString());
    await deleteDoc(bookmarkRef);
    console.log("Bookmark removed successfully!");
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
};

// Get bookmarks
export const getBookmarks = async (userId) => {
  try {
    const bookmarksCollectionRef = collection(db, "users", userId, "bookmarks");
    const querySnapshot = await getDocs(bookmarksCollectionRef);
    const bookmarks = querySnapshot.docs.map(doc => doc.data());
    return bookmarks;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
};


export { db, auth };
