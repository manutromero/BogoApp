import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAt8fvbu24v2a-xBXOpgaQyKRFla7ITpN4",
  authDomain: "bogoapp-59711.firebaseapp.com",
  databaseURL: "https://bogoapp-59711.firebaseio.com",
  projectId: "bogoapp-59711",
  storageBucket: "bogoapp-59711.appspot.com",
  messagingSenderId: "995744583448",
  appID: "1:995744583448:web:7b0b11d1a17535dfab186d",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };