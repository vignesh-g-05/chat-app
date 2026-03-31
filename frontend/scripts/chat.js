function setUserName() {
  const url = new URL(window.location);
  const name = url.searchParams.get("name");
  const username = document.getElementById("name");
  username.textContent = name;
}

setUserName();
