let username = "";
let userId = "";

function setUserName() {
  const url = new URL(window.location);
  const name = url.searchParams.get("name");
  const receiverId = url.searchParams.get("userId");
  username = name;
  userId = receiverId;
  const usernameText = document.getElementById("name");
  usernameText.textContent = name;
}

async function fetchMessages() {
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
