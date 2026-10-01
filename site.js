(function () {
  var button = document.querySelector(".menu-button");
  var nav = document.querySelector("#site-nav");
  var form = document.querySelector("#visit-form");

  button.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    button.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    }
  });

  var fields = [
    { id: "name", errorId: "name-error", check: checkName, message: "Enter a name with at least 2 characters." },
    { id: "email", errorId: "email-error", check: checkEmail, message: "Enter an email address with a name and a domain." },
    { id: "service", errorId: "service-error", check: checkService, message: "Choose a visit." },
    { id: "message", errorId: "message-error", check: checkMessage, message: "Describe the visit in at least 12 characters." }
  ];

  function checkName(value) { return value.trim().length >= 2; }
  function checkEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()); }
  function checkService(value) { return value.trim() !== ""; }
  function checkMessage(value) { return value.trim().length >= 12; }

  function showError(field, input, valid) {
    var error = document.querySelector("#" + field.errorId);
    input.setAttribute("aria-invalid", valid ? "false" : "true");
    error.hidden = valid;
    error.textContent = valid ? "" : field.message;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var validForm = true;
    fields.forEach(function (field) {
      var input = document.querySelector("#" + field.id);
      var valid = field.check(input.value);
      showError(field, input, valid);
      if (!valid) validForm = false;
    });
    var success = document.querySelector("#form-success");
    success.hidden = !validForm;
  });
})();
