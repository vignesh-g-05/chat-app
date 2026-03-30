async function registerUser(e) {
  e.preventDefault();
  const username = document.getElementById("username")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;
  const body = {
    username,
    email,
    password,
  };

  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.success) {
    alert(data.message || "failed to register user");
  } else {
    alert(data.message || "user registered successfully");
    window.open("../html/users.html");
  }
}
