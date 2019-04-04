import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDEowZ7DmGBHbZgxLaKL5vd-geJVu7hcn8",
  authDomain: "waterresource-112d9.firebaseapp.com",
  databaseURL: "https://waterresource-112d9.firebaseio.com",
  projectId: "waterresource-112d9",
  storageBucket: "waterresource-112d9.appspot.com",
  messagingSenderId: "517742537472"
};
firebase.initializeApp(config);
export const ref = firebase.database().ref()
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const provider2 = new firebase.auth.GoogleAuthProvider();
export default firebase;