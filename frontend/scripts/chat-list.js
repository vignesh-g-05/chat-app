async function getMessages() {
  const res = await fetch("http://localhost:3000/messages", {
    credentials: "include",
  });
  if (res.status === 401) {
    location.href = "../html/login.html";
    return;
  }
  const data = await res.json();
  if (!data.success) {
    alert(data.message || "failed to fetch ");
    return;
  }

  const messages = data.data;
  renderChats(messages);
}

function renderChats(users) {
  const userList = document.getElementById("user-list");

  for (let i = 0; i < users.length; i++) {
    const username = users[i].username;
    const userId = users[i].userId;
    const lastMessage = users[i].lastMessage;
    const date = new Date(users[i].lastMessageAt);
    const chatId = users[i].chatId;
    const formatted = date
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
    const listChat = `
<a class="list-row" href="chat.html?name=${username}&chatId=${chatId}&userId=${userId}">
  <div>
    <img
      class="size-10 rounded-box"
      src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
    />
  </div>
  <div>
    <div class="flex justify-between items-center">
      <p>${username}</p>
    </div>
    <div class="text-xs uppercase font-semibold opacity-60">
      ${lastMessage}
    </div>
  </div>
  <p>${formatted}</p>
  <button class="btn btn-square btn-ghost">
    <i data-lucide="send-horizontal" class="w-4.5"></i>
  </button>
</a>
`;
    const li = document.createElement("li");
    li.innerHTML = listChat;
    userList.appendChild(li);
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

getMessages();
