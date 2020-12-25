import firebase from 'firebase/';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import firebaseConfig from '../configs/firebase-config';

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const  auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

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
    
    // readData = () => {
    //     const dbRefPosts = db.ref().child('posts');
    //     const title = dbRefPosts.child('title');
    //     title.on('child_added', snap => this.setState({ title: snap.val() }));
    //     const imgUrl = dbRefPosts.child('imgUrl');
    //     imgUrl.on('child_added', snap => this.setState({ imgUrl: snap.val() }));
    //     const description = dbRefPosts.child('description');
    //     description.on('child_added', snap => this.setState({ description: snap.val() }));
    // }

