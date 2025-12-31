import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsIsZdoMGbjbIuGy25eo7E1NjsfRaDcXw",
  authDomain: "chatapp-c5f85.firebaseapp.com",
  projectId: "chatapp-c5f85",
  storageBucket: "chatapp-c5f85.firebasestorage.app",
  messagingSenderId: "254936895010",
  appId: "1:254936895010:web:1f7570b0b801e4073fc47b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// const chatcontainer = document.getElementById("chat-container");
// const inputpagla = document.getElementById("input-pagla");

const amazon = document.getElementById("buttoncontainer");

document.getElementById("googleSignInBtn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      alert("Login successful");
    })
    .catch((error) => {
      console.error(error);
    });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully");
      console.log("User signed out");
    })
    .catch((error) => console.error(error));
});



auth.onAuthStateChanged(user => {
  if(user){
    // User logged in → show chat and input
    document.getElementById("googleSignInBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("chat-container").style.display = "block";
    document.getElementById("input-pagla").style.display = "block";
    amazon.classList.remove("min-h-screen");
   
  } else {
    // User not logged in → hide chat and input
    document.getElementById("googleSignInBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("chat-container").style.display = "none";
    document.getElementById("input-pagla").style.display = "none";
  }
});

