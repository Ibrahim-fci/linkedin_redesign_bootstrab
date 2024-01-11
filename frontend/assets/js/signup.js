// check if user already loged in
const token = localStorage.getItem("linkedin_token");
if (token) {
  window.location.href = "index.html";
}

$(document).ready(function () {
  $("#signup-form").on("submit", function (e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#user-password").val();
    var email = $("#user-email").val();
    var gender = $("#user-gender").val();
    console.log(username, password, email, gender);

    // Perform signup logic here
    signup({ username, password, email, gender });

    // Redirect to login page
  });
});

/// signup Function
async function signup(data) {
  const errorsDiv = $("#errors");
  // fetch api call
  const response = await fetch("http://localhost:8000/api/users/signup/", {
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

    if (result.errors) {
      result.errors.map((error) => {
        console.log(error.msg);
        errorsDiv.append(`<div class="alert alert-danger" role="alert">
      ${error.msg}
      </div>`);
      });
    } else {
      for (const [key, value] of Object.entries(result)) {
        errorsDiv.append(`<div class="alert alert-danger" role="alert">
        ${value}
        </div>`);
      }
    }
  } else {
    errorsDiv.html("");

    // rest form inputs
    $("#signup-form").trigger("reset");
    // redirect to login page
    window.location.href = "signin.html";
  }
}
