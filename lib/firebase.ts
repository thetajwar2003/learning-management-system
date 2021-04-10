import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBp0MOj2uiV9ny4NN97Oe-Hxhh8lW8LlDQ",
  authDomain: "learning-management-systyem.firebaseapp.com",
  projectId: "learning-management-systyem",
  storageBucket: "learning-management-systyem.appspot.com",
  messagingSenderId: "1065474659728",
  appId: "1:1065474659728:web:9411270ba5db25fce58f15",
  measurementId: "G-C0331MSV61",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

/**
 * gets a users/{uid} document with username
 * @param {string} uid
 */

export async function getUserWithUID(uid, classification) {
  const usersRef = firestore.collection(`${classification}`);
  const query = usersRef.where("id", "==", uid).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export async function getClassFromTeacherID(teacherID) {
  const classRef = firestore.collection("classes");
  const query = classRef
    .where("teacher", "==", teacherID)
    .limit(8)
    .orderBy("period", "asc");
  const classDocs = (await query.get()).docs;
  return classDocs;
}

export function updateClass(doc) {
  const data = doc.data();
  const id = doc.id;
  return {
    ...data,
    id,
  };
}
