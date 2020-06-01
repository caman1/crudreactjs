import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyC18DAnEDR7HZgkH711O-I059naLXeNsKM",
    authDomain: "proyecto-prueba-a1124.firebaseapp.com",
    databaseURL: "https://proyecto-prueba-a1124.firebaseio.com",
    projectId: "proyecto-prueba-a1124",
    storageBucket: "proyecto-prueba-a1124.appspot.com",
    messagingSenderId: "176943965308",
    appId: "1:176943965308:web:966c73d69e1526ac6b95f9",
    measurementId: "G-NPZ5WZ2RP4"
  };

  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export default firebase