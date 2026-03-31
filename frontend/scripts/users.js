async function getUsers() {
  const res = await fetch("http://localhost:3000/users", {
    credentials: "include",
  });
  const data = await res.json();
  if (!data.success) {
    alert(data.message || "failed to fetch users");
    return;
  }

  const users = data.data;
  renderUsers(users);
}

function renderUsers(users) {
  const userList = document.getElementById("user-list");

  for (let i = 0; i < users.length; i++) {
    const username = users[i].username;
    const email = users[i].email;
    const listUser = `
<a class="list-row" href="chat.html?name=${username}">
  <div>
    <img
      class="size-10 rounded-box"
      src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
    />
  </div>
  <div>
    <div>${username}</div>
    <div class="text-xs uppercase font-semibold opacity-60">
      ${email}
    </div>
  </div>
  <button class="btn btn-square btn-ghost">
    <i data-lucide="send-horizontal" class="w-4.5"></i>
  </button>
</a>
`;
    const li = document.createElement("li");
    li.innerHTML = listUser;
    userList.appendChild(li);
  }
}

getUsers();
