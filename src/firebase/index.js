import firebase from 'firebase/';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import firebaseConfig from '../configs/firebase-config';

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const  auth = firebase.auth();
export const firestore = firebase.firestore();