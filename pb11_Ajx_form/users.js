document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const tableBody = document.getElementById('userTableBody');

    if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">No users registered yet.</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>${user.dob}</td>
            <td>${user.city}</td>
            <td>${user.address}</td>
        `;
        tableBody.appendChild(row);
    });
});