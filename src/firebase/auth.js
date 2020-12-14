import { auth } from './'

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