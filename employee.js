// Example employee data, usually fetched from a server or localStorage
const currentEmployee = {
    id: 1,
    name: "Alice Johnson",
    department: "IT",
    email: "alice.johnson@example.com",
    salary: 5000,
    salaryStatus: "Pending"
};

// Function to load employee data into the HTML elements
window.onload = function() {
    document.getElementById("employee-name").textContent = currentEmployee.name;
    document.getElementById("department").textContent = currentEmployee.department;
    document.getElementById("email").textContent = currentEmployee.email;
    document.getElementById("salary").textContent = currentEmployee.salary;
    document.getElementById("salary-status").textContent = currentEmployee.salaryStatus;

    // Adding color style for salary status dynamically
    const salaryStatusElement = document.getElementById("salary-status");
    if (currentEmployee.salaryStatus === "Pending") {
        salaryStatusElement.style.color = "#e67e22"; // Orange for Pending
    } else if (currentEmployee.salaryStatus === "Given") {
        salaryStatusElement.style.color = "#2ecc71"; // Green for Given
    }
};
