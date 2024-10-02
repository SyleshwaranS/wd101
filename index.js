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
        alert('Age must be between 18 and 55.');
        return;
    }

    const userData = {
        name,
        email,
        password,
        dob,
        acceptTerms
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    loadUserData();
});

function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const tableBody = document.querySelector('#userTable tbody');
        tableBody.innerHTML = `
            <tr>
                <td>${userData.name}</td>
                <td>${userData.email}</td>
                <td>${userData.password}</td>
                <td>${userData.dob}</td>
                <td>${userData.acceptTerms ? 'Yes' : 'No'}</td>
            </tr>
        `;
    }
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

window.onload = function() {
    setDateLimits();
    loadUserData();
};

