const token = localStorage.getItem("linkedin_token");
if (!token || token === "undefined") {
  window.location.href = "signin.html";
}

function logout() {
  localStorage.removeItem("linkedin_token");
  window.location.href = "signin.html";
}

const user = JSON.parse(localStorage.getItem("user"));
$("#user-name-id").text(user.username);
$("#user-email-id").text(user.email);
