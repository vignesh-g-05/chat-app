let username = sessionStorage.getItem("username");
let chatId = sessionStorage.getItem("chatId");

function setUserName() {
  const usernameText = document.getElementById("name");
  usernameText.textContent = username;
}

async function _fetchMessages() {
  const url = new URL(window.location);
  const chatId = url.searchParams.get("chatId");
  const res = await fetch(`http://localhost:3000/messages/${chatId}`, {
    credentials: "include",
  });
  const data = await res.json();
  const messages = data.data;
  messages.map((message) => {
    const timeStamp = new Date(message.created_at)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
    const messageBubble = `
<div class="chat chat-end">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
      />
    </div>
  </div>
  <div class="chat-header">
    ${username}
  </div>
  <div class="chat-bubble">${message.content}</div>
  <p class="text-xs opacity-50">${timeStamp}</p>
</div>
`;
    const chatScreen = document.getElementById("chat-screen");
    const newMessage = document.createElement("div");
    newMessage.innerHTML = messageBubble;
    chatScreen.appendChild(newMessage);
  });
}

async function fetchMessages() {
  const res = await fetch(`http://localhost:3000/messages/${chatId}`, {
    credentials: "include",
  });
  const data = await res.json();
  const messages = data.data;
  for (let i = 0; i < messages.length; i++) {
    console.log(messages[i]);
    const content = messages[i].content;
    const createdAt = messages[i].created_at;
    const formattedTime = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(createdAt));
    const messageBubble = `
<div class="chat chat-end">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
      />
    </div>
  </div>
  <div class="chat-header">
    Vicky
    <time class="text-xs opacity-50">${formattedTime}</time>
  </div>
  <div class="chat-bubble">${content}</div>
</div>
`;
    const chatScreen = document.getElementById("chat-screen");
    const newMessage = document.createElement("div");
    newMessage.innerHTML = messageBubble;
    chatScreen.appendChild(newMessage);
  }
}

function sendMessage(e) {
  e.preventDefault();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  messageInput.value = "";
  const date = new Date();

  const messageBubble = `
<div class="chat chat-end">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
      />
    </div>
  </div>
  <div class="chat-header">
    ${username}
    <time class="text-xs opacity-50">${date.getHours() % 12 || "12"}:${date.getMinutes()}</time>
  </div>
  <div class="chat-bubble">${message}</div>
</div>
`;
  const chatScreen = document.getElementById("chat-screen");
  const newMessage = document.createElement("div");
  newMessage.innerHTML = messageBubble;
  chatScreen.appendChild(newMessage);
  return;
  const res = fetch("http://localhost:3000/messages", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: message,
      receiverId: userId,
    }),
  });
}

setUserName();
fetchMessages();
