


// const runcrack = document.getElementById("iconclick");
// const mawlaui = document.getElementById("chat-ul");
// const tracker = document.getElementById("track");

// // 🔶 Change 1: Generate a random username for this user
// // let username = "User" + Math.floor(Math.random() * 1000); // 🔶

// const socket = new WebSocket("ws://localhost:8080");

// // const username = window.username;
// console.log(username);

// socket.onopen = () => {
//   console.log("✅ Connected to WebSocket server");
// };

// socket.onmessage = (event) => {
//   // 🔶 Change 2: Parse JSON instead of plain text
//   const data = JSON.parse(event.data); // 🔶
//   const li = document.createElement("li");
//   const spantext = document.createElement("span");
//    li.classList.add("flex","w-full");

//   // 🔶 Change 3: Show username with message
//   spantext.textContent = `${data.sender}: ${data.text}`; // 🔶

//   if (data.sender === username) {
//     li.classList.add("justify-start");
//   } else {
//     li.classList.add("justify-end");
//   }

//   // 🔶 Change 4: Different style for self vs others
//   if (data.sender=== username) {
//    spantext.classList.add(
//       "inline-block",
//        "bg-black/20",
//       "backdrop-blur-md",
//       "text-slate-200",          // 🔹 silver base
//       "px-6",
//        "py-2",
//        "rounded-xl",
//         "max-w-[70%]",
//         "break-words",
//        "font-semibold",
//        "tracking-wide",

//   // 🔥 SILVER NEON GLOW (static)
//   "[text-shadow:0_0_2px_#ffffff,0_0_6px_#e5e7eb,0_0_12px_#9ca3af,0_0_25px_rgba(209,213,219,0.8),0_0_45px_rgba(209,213,219,0.6)]"
// );
//  // 🔶
//   } else {
  //   spantext.classList.add(
  //     "inline-block",
  //     "bg-black/20",
  //     "backdrop-blur-md",
  //     "border",
  //     "border-yellow-400/10",
  //     "px-6",
  //     "py-2",
  //     "rounded-xl",
  //     "max-w-[70%]",
  //     "break-words",
  //     "text-yellow-400",
  //     "font-semibold",
  //     "neon-glow"
  //   ); // 🔶
  // }

//   li.appendChild(spantext);
//   mawlaui.appendChild(li);
//   mawlaui.scrollTop = mawlaui.scrollHeight;
// };

// runcrack.addEventListener("click", () => {
//   const text = tracker.value.trim();
//   if (!text) return;

//   // 🔶 Change 5: Send JSON with username
//   socket.send(JSON.stringify({ sender: username, text })); // 🔶
//   tracker.value = "";
// });

// tracker.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     runcrack.click();
//   }
// });




const runcrack = document.getElementById("iconclick");
const mawlaui = document.getElementById("chat-ul");
const tracker = document.getElementById("track");
const preset = document.getElementById("preset-chat");

const presetTexts = [
  "মাদারচোদ",
  "বাইনচোদ",
  "খানকির ছেলে",
  " তর মায়েরে চিচিং ফাক"
];


presetTexts.forEach((text, i) => {
  const btn = document.createElement("button");
  btn.textContent = text;

  btn.classList.add(
    "px-4", "py-2", "rounded-lg", 
     "text-yellow-400",
     "transition-all","ml-[10px]","bg-black/25","mr-[10px]"
  );

  // Force new line after every 2 buttons


  btn.addEventListener("click", () => sendText(text));

  preset.appendChild(btn);
});


function sendText(text) {
  const username = getUsername(); // get username from first script
  if (!username) {
    alert("Please login first");
    return;
  }

  if (!text.trim()) return; // ignore empty messages

  // Send via WebSocket
  socket.send(JSON.stringify({
    sender: username,
    text
  }));

  // Clear input if it came from tracker
  if (tracker.value === text) tracker.value = "";

  // Play audio
  const audio = document.getElementById("myAudio");
  audio.play().catch(error => console.error("Audio play failed:", error));

  // Optional: immediately add to chat UI
  // const li = document.createElement("li");
  // const span = document.createElement("span");
  // li.classList.add("flex", "justify-start", "w-full"); // you can adjust alignment
  // span.textContent = `${username}: ${text}`;
  // span.classList.add(
  //   "inline-block", "bg-black/20", "text-slate-200",
  //   "px-6", "py-2", "rounded-xl", "max-w-[70%]"
  // );
  // li.appendChild(span);
  // document.getElementById("chat-ul").appendChild(li);
}


/* ---------------- helper ---------------- */
function getUsername() {
  return window.username;
}

/* ---------------- WebSocket ---------------- */
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  console.log("✅ Connected to WebSocket server");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  const li = document.createElement("li");
  const span = document.createElement("span");
  li.classList.add("flex", "w-full");

  span.textContent = `${data.sender}: ${data.text}`;

  if (data.sender === getUsername()) {
    li.classList.add("justify-start");
    span.classList.add(
      "inline-block",
       "bg-black/20",
      "backdrop-blur-md",
      "text-slate-200",          // 🔹 silver base
      "px-6",
       "py-2",
       "rounded-xl",
        "max-w-[70%]",
        "break-words",
       "font-semibold",
       "tracking-wide",

  // 🔥 SILVER NEON GLOW (static)
  "[text-shadow:0_0_2px_#ffffff,0_0_6px_#e5e7eb,0_0_12px_#9ca3af,0_0_25px_rgba(209,213,219,0.8),0_0_45px_rgba(209,213,219,0.6)]"
);
  } else {
    li.classList.add("justify-end");
    span.classList.add(
      "inline-block",
      "bg-black/20",
      "backdrop-blur-md",
      "border",
      "border-yellow-400/10",
      "px-6",
      "py-2",
      "rounded-xl",
      "max-w-[70%]",
      "break-words",
      "text-yellow-400",
      "font-semibold",
      "neon-glow"
    );
  }

  li.appendChild(span);
  mawlaui.appendChild(li);
  mawlaui.scrollTop = mawlaui.scrollHeight;
};



/* ---------------- Send message ---------------- */
runcrack.addEventListener("click", () => {
  const text = tracker.value.trim();
  sendText(text);
});

tracker.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runcrack.click();
});

