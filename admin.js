// Retrieve employees and leave requests from Local Storage or initialize with default data
let employees = JSON.parse(localStorage.getItem("employees")) || [];
let leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];

let editingEmployeeId = null;

// Function to save data to Local Storage
function saveData() {
    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
}

// Function to load and display employees in the admin table
function loadEmployees() {
    const tableBody = document.getElementById("employee-table").querySelector("tbody");
    tableBody.innerHTML = "";
    employees.forEach(employee => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.dateOfJoining}</td>
            <td>${employee.salary}</td>
            <td>${employee.salaryStatus}</td>
            <td>
                <button onclick="editEmployee(${employee.id})">Edit</button>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Open form to add a new employee
function openAddEmployeeForm() {
    document.getElementById("form-title").textContent = "Add Employee";
    document.getElementById("add-edit-form").reset();
    document.getElementById("employee-form").style.display = "block";
    editingEmployeeId = null;  // Reset editing ID for new entry
}

// Submit handler for adding/editing employee
document.getElementById("add-edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const dateOfJoining = document.getElementById("dateOfJoining").value;
    const salary = parseFloat(document.getElementById("salary").value);
    const salaryStatus = "Pending";
    
    if (editingEmployeeId) {
        // Edit existing employee
        const employee = employees.find(emp => emp.id === editingEmployeeId);
        if (employee) {
            employee.name = name;
            employee.department = department;
            employee.dateOfJoining = dateOfJoining;
            employee.salary = salary;
        }
    } else {
        // Add new employee
        const newEmployee = {
            id: employees.length ? employees[employees.length - 1].id + 1 : 1,
            name,
            department,
            dateOfJoining,
            salary,
            salaryStatus
        };
        employees.push(newEmployee);
    }

    // Save data and refresh the employee list
    saveData();
    loadEmployees();
    
    // Close the form after saving
    document.getElementById("employee-form").style.display = "none";
});

function closeForm() {
    document.getElementById("employee-form").style.display = "none";
}

// Delete an employee by ID
function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    saveData();
    loadEmployees();
}

// Load employees and leave requests when the page loads
window.onload = function() {
    loadEmployees();
};
