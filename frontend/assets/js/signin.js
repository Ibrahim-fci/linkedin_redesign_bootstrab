const token = localStorage.getItem("linkedin_token");
if (token) {
  window.location.href = "index.html";
}

$(document).ready(function () {
  $("#signin-form").on("submit", function (e) {
    e.preventDefault();
    var password = $("#user-password").val();
    var email = $("#user-email").val();
    console.log(password, email);

    // Perform signup logic here
    signin({ password, email });

    // Redirect to login page
  });
});

/// signup Function
async function signin(data) {
  const errorsDiv = $("#errors");
  // fetch api call
  const response = await fetch("http://localhost:8000/api/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // parse the response
  const result = await response.json();

  if (response.status !== 200 && response.status !== 201) {
    errorsDiv.html("");
    for (const [key, value] of Object.entries(result)) {
      errorsDiv.append(`<div class="alert alert-danger" role="alert">
        ${value}
        </div>`);
    }
  } else {
    errorsDiv.html("");

    localStorage.setItem("linkedin_token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    // redirect to login page

    // rest form inputs
    $("#signin-form").trigger("reset");
    window.location.href = "index.html";
  }
}
