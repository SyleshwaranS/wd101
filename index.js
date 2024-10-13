const form = document.getElementById("registration-form");
const userTable = document
  .getElementById("userTable")
  .getElementsByTagName("tbody")[0];

// Helper function to calculate age
function calculateAge(dob) {
  const diff = Date.now() - new Date(dob).getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Validate age between 18 and 55
function validateAge(dob) {
  const age = calculateAge(dob);
  return age >= 18 && age <= 55;
}

// Load saved data from local storage
function loadSavedData() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user) => addUserToTable(user));
}

// Add user to the table
function addUserToTable(user) {
  const row = userTable.insertRow();
  row.insertCell(0).textContent = user.name;
  row.insertCell(1).textContent = user.email;
  row.insertCell(2).textContent = user.password;
  row.insertCell(3).textContent = user.dob;
  row.insertCell(4).textContent = user.terms ? "true" : "false";
}

// Save user data to local storage
function saveUserData(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;

  if (!validateAge(dob)) {
    alert("Age must be between 18 and 55");
    return;
  }

  const user = { name, email, password, dob, terms };
  addUserToTable(user);
  saveUserData(user);

  form.reset(); // Clear the form
});

// Load saved data on page load
window.onload = loadSavedData;
