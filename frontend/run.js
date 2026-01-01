


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
  if (!text) return;

  const username = getUsername();
  if (!username) {
    alert("Please login first");
    return;
  }

  socket.send(
    JSON.stringify({
      sender: username,
      text
    })
  );

  tracker.value = "";
});

tracker.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runcrack.click();
});


