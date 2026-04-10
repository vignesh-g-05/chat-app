async function getChats() {
  try {
    const res = await fetch("http://localhost:3000/messages/", {
      credentials: "include",
    });
    if (res.status === 401) {
      location.href = "../index.html";
    }
    if (!res.ok) {
      alert("failed to fetch chats");
      return;
    }
    const data = await res.json();
    const chats = data.data;
    const chatList = document.getElementById("chat-list");
    for (let i = 0; i < chats.length; i++) {
      const name = chats[i].username;
      const lastMessage = chats[i].lastMessage;
      const lastMessageAt = chats[i].lastMessageAt;
      const chatId = chats[i].chatId;
      const userId = chats[i].userId;
      const formttedTime = new Intl.DateTimeFormat([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(lastMessageAt));

      const listChat = `
<a class="list-row" href="chat.html">
  <div>
    <img
      class="size-10 rounded-box"
      src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
    />
  </div>
  <div>
    <div>${name}</div>
    <div class="text-xs uppercase font-semibold opacity-60">
      ${lastMessage}
    </div>
  </div>
  <p class="text-xs">${formttedTime}</p>
  <button class="btn btn-square btn-ghost">
    <i data-lucide="send-horizontal" class="w-4.5"></i>
  </button>
</a>
`;
      const li = document.createElement("li");
      li.innerHTML = listChat;
      li.onclick = function () {
        sessionStorage.setItem("username", name);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("chatId", chatId);
      };
      chatList.appendChild(li);
    }
  } catch (error) {
    console.error(error);
    alert("failed to fetch chats");
  }
}

async function logoutUser() {
  const res = await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    alert("failed to logout");
    return;
  }

  location.href = "../index.html";
}

getChats();
