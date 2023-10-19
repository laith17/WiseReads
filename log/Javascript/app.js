// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWMfXEXYmlfhR3VH5HHdHR4i6SaQ7Ye0c",
  authDomain: "wisereads-2c9b1.firebaseapp.com",
  projectId: "wisereads-2c9b1",
  storageBucket: "wisereads-2c9b1.appspot.com",
  messagingSenderId: "154401321323",
  appId: "1:154401321323:web:a840fa979ad311d64c5c2e",
  measurementId: "G-C50KEQPTM9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

var fName = document.getElementById("fName");
var lName = document.getElementById("lName");
var email = document.getElementById("email");
var password = document.getElementById("password");
var address = document.getElementById("address");
let message = document.getElementById("message");

// Function to reset form fields
function resetFormFields() {
  fName.value = "";
  lName.value = "";
  email.value = "";
  password.value = "";
  address.value = "";
}
function showPopup(message, isSuccess) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");
  popupMessage.innerText = message;

  if (isSuccess) {
    popup.className = "popup success";
  } else {
    popup.className = "popup error";
  }
  popup.style.display = "block";

  // Hide the pop-up after 3 seconds (adjust the timing as needed)
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

window.signup = async function (e) {
  e.preventDefault();

  const fNameError = document.getElementById("fNameError");
  const lNameError = document.getElementById("lNameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const addressError = document.getElementById("addressError");

  // Reset previous error messages
  fNameError.textContent = "";
  lNameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  addressError.textContent = "";

  if (/\s/.test(fName.value)) {
    fNameError.textContent = "First Name cannot contain spaces";
    return;
  }
  if (/\s/.test(lName.value)) {
    lNameError.textContent = "Last Name cannot contain spaces";
    return;
  }

  // Validation for password
  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-z]).{8,}$/;
  if (!passwordRegex.test(password.value)) {
    passwordError.textContent =
      "Password must be at least 8 characters long and include at least one number, uppercase letter, and special character";
    return;
  }

  // Validation for email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.textContent = "Invalid email format";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    // Add user data to Firestore
    await addDoc(collection(db, "users"), {
      fName: fName.value,
      lName: lName.value,
      email: email.value,
      password: password.value,
      address: address.value,
      userId: userCredential.user.uid,
    });

    showPopup("Sign up successful", true);

    resetFormFields();
    location.reload();
  } catch (error) {
    showPopup("Error: " + error.message, false);
  }
};

window.signin = async function (e) {
  e.preventDefault();

  const emailSignIn = document.getElementById("emailSignIn");
  const passwordSignIn = document.getElementById("passwordSignIn");

  // Reset previous error messages
  document.getElementById("emailSignInError").textContent = "";
  document.getElementById("passwordSignInError").textContent = "";

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      emailSignIn.value,
      passwordSignIn.value
    );

    showPopup("Login successful", true);
    // Assuming you have a showUserDetails function, call it here
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
          const userAddress = userData.address;

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
              address: userAddress,
            }),
          })
            .then((response) => {
              if (response.ok) {
                console.log(
                  "User data added to http://localhost:3000/users successfully"
                );
              } else {
                console.error(
                  "Failed to add user data to http://localhost:3000/users"
                );
              }
            })
            .catch((error) => console.error("Error adding user data:", error));

          window.location.href = "../index.html";
        });
      })
      .catch((error) => {
        console.error("Error getting user details: ", error);
      });

    // You can redirect the user or perform additional actions after successful login
    //
  } catch (error) {
    showPopup("Error: " + error.message, false);
  }
};

function saveSession(userId) {
  sessionStorage.setItem("userId", userId);
  localStorage.setItem("userId", userId);
}

// Assuming you have a showUserDetails function, declare it here
function showUserDetails(userId) {
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

// ... (other functions if any)

// Export the necessary functions (if needed)
// export function showUserDetailsInForm() {
//     // Implementation here
// }

// export function logout() {
//     // Implementation here
// }

// export async function updateUserInfo(userId, newUsername) {
//     // Implementation here
// }
