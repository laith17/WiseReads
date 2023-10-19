//  // Import the functions you need from the SDKs you need
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
//  import { getAuth , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

//  // TODO: Add SDKs for Firebase products that you want to use
//  // https://firebase.google.com/docs/web/setup#available-libraries

//  // Your web app's Firebase configuration
//  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//  const firebaseConfig = {
//    apiKey: "AIzaSyAWMfXEXYmlfhR3VH5HHdHR4i6SaQ7Ye0c",
//    authDomain: "wisereads-2c9b1.firebaseapp.com", 
//    projectId: "wisereads-2c9b1",
//    storageBucket: "wisereads-2c9b1.appspot.com",
//    messagingSenderId: "154401321323",
//    appId: "1:154401321323:web:a840fa979ad311d64c5c2e",
//    measurementId: "G-C50KEQPTM9"
//  };

//  // Initialize Firebase
//  const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);
//  const auth = getAuth();

// var email = document.getElementById("email");
//     var username = document.getElementById("emailSignIn");
//     var password = document.getElementById("passwordSignIn");

//     function login(e) {
//         e.preventDefault();
//         var obj = {
//             email:email.value,
//             password:password.value
//         };
//         signInWithEmailAndPassword(auth , obj.email , obj.password)
//         .then(function(success){
//             console.log(user.uid)
//             alert("Loggined Successfully")
//         })
//         .catch(function(err){
//             alert("log in error " + err)
//         })
//         console.log(obj);
//     }