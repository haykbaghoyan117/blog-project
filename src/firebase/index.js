import firebase from 'firebase/';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import firebaseConfig from '../configs/firebase-config';

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const  auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
}
export const signUpWithEmailAndPassword = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
}
export const signOut = () => auth.signOut();
export const deleteUser = () => {
    auth.currentUser.delete();
}
export const writeUserData = (userId, name, email, imageUrl) => {
    db.ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}
export const userId = () => auth.currentUser.uid;
// return db.ref('/users/' + userId).once('value').then((snapshot) => {
//  const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });

export const readData = () => {
    const name = db.ref('name');
    name.on('value', (elem) => {
        this.setState({name: elem.val()})
    })
}
