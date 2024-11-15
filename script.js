// Check login status on page load
function checkLoginStatus() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else if (role === "employee") {
            window.location.href = "employee-dashboard.html";
        }
    }
}

// Login form handling
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (role === "admin" && username === "admin" && password === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        window.location.href = "admin-dashboard.html";
    } else if (role === "employee") {
        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        const employee = employees.find(emp => emp.username === username && emp.password === password);
        if (employee) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("role", "employee");
            localStorage.setItem("employeeName", employee.name);
            window.location.href = "employee-dashboard.html";
        } else {
            document.getElementById("error-message").textContent = "Invalid employee credentials.";
        }
    }
});

// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("employeeName");
    window.location.href = "index.html";
}

// Check admin login
function checkAdminLogin() {
    if (localStorage.getItem("isLoggedIn") !== "true" || localStorage.getItem("role") !== "admin") {
        alert("You must be logged in as an admin to access this page.");
        window.location.href = "index.html";
    } else {
        loadEmployees();
        loadLeaveRequests();
    }
}

// Check employee login
function checkEmployeeLogin() {
    if (localStorage.getItem("isLoggedIn") !== "true" || localStorage.getItem("role") !== "employee") {
        alert("You must be logged in as an employee to access this page.");
        window.location.href = "index.html";
    } else {
        loadEmployeeProfile();
        loadEmployeeLeaveStatus();
    }
}

// Load employees from localStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];
let leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];

// Load employee data into admin dashboard
function loadEmployees() {
    const tableBody = document.getElementById("employeeTable").querySelector("tbody");
    tableBody.innerHTML = "";

    employees.forEach((employee, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.joinDate}</td>
            <td>${employee.role}</td>
            <td>${employee.username}</td>
            <td>${employee.salary}</td>
            <td><button onclick="removeEmployee(${index})">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Add new employee
document.getElementById("addEmployeeForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("empName").value;
    const joinDate = document.getElementById("empJoinDate").value;
    const role = document.getElementById("empRole").value;
    const username = document.getElementById("empUsername").value;
    const password = document.getElementById("empPassword").value;
    const salary = document.getElementById("empSalary").value;

    const newEmployee = { name, joinDate, role, username, password, salary };
    employees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(employees));

    document.getElementById("addEmployeeForm").reset();
    loadEmployees();
});

// Remove employee
function removeEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    loadEmployees();
}

// Load leave requests into admin dashboard
function loadLeaveRequests() {
    const tableBody = document.getElementById("leaveRequestsTable").querySelector("tbody");
    tableBody.innerHTML = "";

    leaveRequests.forEach((request, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${request.employeeName}</td>
            <td>${request.leaveDate}</td>
            <td>${request.reason}</td>
            <td>
                <button onclick="acceptLeave(${index})">Accept</button>
                <button onclick="rejectLeave(${index})">Reject</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Accept leave request
function acceptLeave(index) {
    alert(`Leave request from ${leaveRequests[index].employeeName} accepted.`);
    leaveRequests[index].status = "Accepted";
    updateLeaveRequests();
    loadLeaveRequests();
}

// Reject leave request
function rejectLeave(index) {
    alert(`Leave request from ${leaveRequests[index].employeeName} rejected.`);
    leaveRequests[index].status = "Rejected";
    updateLeaveRequests();
    loadLeaveRequests();
}

// Update leave requests in localStorage
function updateLeaveRequests() {
    localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
}

// Employee leave request form handling
document.getElementById("leaveRequestForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const leaveDate = document.getElementById("leaveDate").value;
    const reason = document.getElementById("leaveReason").value;
    const employeeName = localStorage.getItem("employeeName") || "Employee";

    const newLeaveRequest = { employeeName, leaveDate, reason, status: "Pending" };
    leaveRequests.push(newLeaveRequest);
    updateLeaveRequests();

    document.getElementById("leaveRequestForm").reset();
    document.getElementById("leaveStatus").textContent = "Leave request submitted.";
    loadEmployeeLeaveStatus();
});

// Load employee leave status
function loadEmployeeLeaveStatus() {
    const employeeLeaveTable = document.getElementById("employeeLeaveTable").querySelector("tbody");
    const employeeName = localStorage.getItem("employeeName");
    employeeLeaveTable.innerHTML = "";

    leaveRequests
        .filter(request => request.employeeName === employeeName)
        .forEach(request => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${request.leaveDate}</td>
                <td>${request.reason}</td>
                <td>${request.status}</td>
            `;
            employeeLeaveTable.appendChild(row);
        });
}

// Load employee profile in employee dashboard
function loadEmployeeProfile() {
    const profileTable = document.getElementById("profileTable").querySelector("tbody");
    const employeeName = localStorage.getItem("employeeName");

    const employee = employees.find(emp => emp.name === employeeName);
    if (employee) {
        profileTable.innerHTML = `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.role}</td>
                <td>${employee.joinDate}</td>
                <td>${employee.salary}</td>
            </tr>
        `;
    }
}
