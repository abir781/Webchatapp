// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyDsIsZdoMGbjbIuGy25eo7E1NjsfRaDcXw",
//   authDomain: "chatapp-c5f85.firebaseapp.com",
//   projectId: "chatapp-c5f85",
//   storageBucket: "chatapp-c5f85.firebasestorage.app",
//   messagingSenderId: "254936895010",
//   appId: "1:254936895010:web:1f7570b0b801e4073fc47b"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// window.username = null;

// // const chatcontainer = document.getElementById("chat-container");
// // const inputpagla = document.getElementById("input-pagla");

// const amazon = document.getElementById("buttoncontainer");
// let username;




// document.getElementById("googleSignInBtn").addEventListener("click", () => {
 

//      loginWithGoogle((username) => {
//     window.username = username;
//     console.log("Returned username:", username);
//   });
// });

// function loginWithGoogle(callback) {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const username = result.user.displayName;
//       callback(username); // ✅ এখানে "return"
//     })
//     .catch(console.error);
// }


// document.getElementById("logoutBtn").addEventListener("click", () => {
//   signOut(auth)
//     .then(() => {
//       alert("Logged out successfully");
//       console.log("User signed out");
//     })
//     .catch((error) => console.error(error));
// });


// function getUsername() {
//   return window.username;
// }




// auth.onAuthStateChanged(user => {
//   if(user){
//     // User logged in → show chat and input
//     document.getElementById("googleSignInBtn").style.display = "none";
//     document.getElementById("logoutBtn").style.display = "block";
//     document.getElementById("chat-container").style.display = "block";
//     document.getElementById("input-pagla").style.display = "block";
//     amazon.classList.remove("min-h-screen");
   
//   } else {
//     // User not logged in → hide chat and input
//     document.getElementById("googleSignInBtn").style.display = "block";
//     document.getElementById("logoutBtn").style.display = "none";
//     document.getElementById("chat-container").style.display = "none";
//     document.getElementById("input-pagla").style.display = "none";
//   }
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* ---------------- Firebase config ---------------- */
const firebaseConfig = {
  apiKey: "AIzaSyDsIsZdoMGbjbIuGy25eo7E1NjsfRaDcXw",
  authDomain: "chatapp-c5f85.firebaseapp.com",
  projectId: "chatapp-c5f85",
  storageBucket: "chatapp-c5f85.firebasestorage.app",
  messagingSenderId: "254936895010",
  appId: "1:254936895010:web:1f7570b0b801e4073fc47b"
};

/* ---------------- Init ---------------- */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* ---------------- Global shared state ---------------- */
window.username = null;

/* ---------------- Elements ---------------- */
const googleBtn = document.getElementById("googleSignInBtn");
const logoutBtn = document.getElementById("logoutBtn");
const amazon = document.getElementById("buttoncontainer");

/* ---------------- Login function ---------------- */
function loginWithGoogle() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      window.username = result.user.displayName;
      console.log("Username set:", window.username);
      return window.username;
    })
    .catch(console.error);
}

/* ---------------- Button events ---------------- */
googleBtn.addEventListener("click", () => {
  loginWithGoogle();
});

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.username = null;
      alert("Logged out successfully");
    })
    .catch(console.error);
});

/* ---------------- Auth state listener (MOST IMPORTANT) ---------------- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.username = user.displayName;

    googleBtn.style.display = "none";
    logoutBtn.style.display = "block";
    document.getElementById("chat-container").style.display = "block";
    document.getElementById("input-pagla").style.display = "block";
    amazon.classList.remove("min-h-screen");

    console.log("Auth state username:", window.username);
  } else {
    window.username = null;

    googleBtn.style.display = "block";
    logoutBtn.style.display = "none";
    document.getElementById("chat-container").style.display = "none";
    document.getElementById("input-pagla").style.display = "none";
  }
});
