document.getElementById('user_form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        displayValidationMessage('Age must be between 18 and 55.');
        return;
    }

    const hashedPassword = hashPassword(password);

    const userData = {
        name,
        email,
        password: hashedPassword,
        dob,
        acceptTerms
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    loadUserData();
});

function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';
    users.forEach(user => {
        tableBody.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.dob}</td>
                <td>${user.acceptTerms ? 'Yes' : 'No'}</td>
            </tr>
        `;
    });
}

function setDateLimits() {
    const today = new Date();
    const minAge = 18;
    const maxAge = 55;

    const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

    const dobInput = document.getElementById('dob');
    dobInput.min = minDate.toISOString().split('T')[0];
    dobInput.max = maxDate.toISOString().split('T')[0];
}

function displayValidationMessage(message) {
    const validationMessage = document.getElementById('validationMessage');
    validationMessage.textContent = message;
    validationMessage.style.display = 'block';
}

function hashPassword(password) {
    // Simple hash function for demonstration purposes
    return btoa(password);
}

window.onload = function() {
    setDateLimits();
    loadUserData();
};
