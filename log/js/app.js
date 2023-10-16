// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWMfXEXYmlfhR3VH5HHdHR4i6SaQ7Ye0c",
    authDomain: "wisereads-2c9b1.firebaseapp.com", 
    projectId: "wisereads-2c9b1",
    storageBucket: "wisereads-2c9b1.appspot.com",
    messagingSenderId: "154401321323",
    appId: "1:154401321323:web:a840fa979ad311d64c5c2e",
    measurementId: "G-C50KEQPTM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


var fName = document.getElementById("fName");
var lName = document.getElementById("lName");
var email = document.getElementById("email");
var password = document.getElementById("password");
let message = document.getElementById("message"); // for the welocme msg

window.signup = async function (e) {
    e.preventDefault();

    if (/\s/.test(fName.value)) {
        alert("First Name cannot contain spaces");
        return;
    }
    if (/\s/.test(lName.value)) {
      alert("Last Name cannot contain spaces");
      return;
  }

    // Validation for password
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(password.value)) {
        alert("Password must be at least 8 characters long and include at least one number, uppercase letter, and special character");
        return;
    }

   
    // Validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        alert("Invalid email format");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);

        // add user data
        await addDoc(collection(db, "users"), {
            fName: fName.value,
            lName: lName.value,
            email: email.value,
            password:password.value,
            userId: userCredential.user.uid,
        });

        alert("Signup successful");
    } catch (error) {
        alert("Error: " + error.message);
    }
};

window.signin = async function (e) {
  e.preventDefault();

  const emailSignIn = document.getElementById("emailSignIn");
  const passwordSignIn = document.getElementById("passwordSignIn");

  try {
      const userCredential = await signInWithEmailAndPassword(auth, emailSignIn.value, passwordSignIn.value);

      alert("Login successful");
      showUserDetails(userCredential.user.uid);
      saveSession(userCredential.user.uid);

      // Retrieve fName and lName from Firebase collection
      const userId = userCredential.user.uid;
      const userRef = collection(db, "users");
      const userQuery = query(userRef, where("userId", "==", userId));

      getDocs(userQuery)
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  const userData = doc.data();
                  const userFirstName = userData.fName;
                  const userLastName = userData.lName;
                  const userPassword = userData.password;
                  const userEmail = userData.email;

                  // Add user data to http://localhost:3000/users
                  fetch("http://localhost:3000/users", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          fName: userFirstName,
                          lName: userLastName,
                          userId: userId,
                          email: userEmail,
                          password: userPassword,
                      }),
                  })
                      .then(response => {
                          if (response.ok) {
                              console.log("User data added to http://localhost:3000/users successfully");
                          } else {
                              console.error("Failed to add user data to http://localhost:3000/users");
                          }
                      })
                      .catch(error => console.error("Error adding user data:", error));
              });
          })
          .catch((error) => {
              console.error("Error getting user details: ", error);
          });

      // You can redirect the user or perform additional actions after successful login
      window.location.href = "../index.html";
  } catch (error) {
      alert("Error: " + error.message);
  };
};



function saveSession(userId) {
    sessionStorage.setItem("userId", userId);
    localStorage.setItem("userId", userId);
}

export function showUserDetails(userId) {
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("userId", "==", userId));

    getDocs(userQuery)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const userName = userData.username;

                const userDetailsElement = document.getElementById("login-side");

                if (userDetailsElement) {
                    userDetailsElement.innerHTML = `
                        <p style="color: black; font-size:24px;">Welcome, ${userName}!</p>
                        <button id="logout">Logout</button>
                    `;

                    const logoutButton = document.getElementById("logout");
                    logoutButton.addEventListener("click", () => {
                        signOut(auth).then(() => {
                            location.reload();
                        });
                    });
                } else {
                    console.error("Element with id 'login-side' not found");
                }
            });
        })
        .catch((error) => {
            console.error("Error getting user details: ", error);
        });
}

export function logout() {
    signOut(auth).then(() => {
        localStorage.removeItem("userId");
        location.reload();
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
}

export async function updateUserInfo(userId, newUsername) {
    const userRef = doc(db, "users", userId);

    try {
        await updateDoc(userRef, {
            username: newUsername,
        });

        console.log("User information updated successfully!");
    } catch (error) {
        console.error("Error updating user information:", error);
        throw error;
    }
}

export function showUserDetailsInForm() {
    const userId = localStorage.getItem("userId");

    if (userId) {
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("userId", "==", userId));

        getDocs(userQuery)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();

                    document.getElementById("username").value = userData.username;
                    document.getElementById("email").value = userData.email; // Assuming email is stored in the database
                });
            })
            .catch((error) => {
                console.error("Error getting user details: ", error);
            });
    } else {
        console.error("User ID not found in localStorage");
    }
}
