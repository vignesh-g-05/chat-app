let username = "";

function setUserName() {
  const url = new URL(window.location);
  const name = url.searchParams.get("name");
  username = name;
  const usernameText = document.getElementById("name");
  usernameText.textContent = name;
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
}

setUserName();
