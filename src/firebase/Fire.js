import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCCVW7cPKvdEu6HneVzZ5x7COskURXpC2s",
  authDomain: "projectending-6ccb3.firebaseapp.com",
  databaseURL: "https://projectending-6ccb3.firebaseio.com",
  projectId: "projectending-6ccb3",
  storageBucket: "projectending-6ccb3.appspot.com",
  messagingSenderId: "615153267440"
};
firebase.initializeApp(config);
export const ref = firebase.database().ref()
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const provider2 = new firebase.auth.GoogleAuthProvider();
export default firebase;