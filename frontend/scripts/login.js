async function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;
  const body = {
    email,
    password,
  };

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.success) {
    alert(data.message || "failed to login");
  } else {
    alert(data.message || "logged in successfully");
    window.open("../html/users.html");
  }
}
