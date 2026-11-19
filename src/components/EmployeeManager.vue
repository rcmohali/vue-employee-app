<script setup lang="ts">
import { ref, computed } from "vue";

interface Employee {
  id: number;
  name: string;
  department: string;
}

// Form State
const employeeName = ref("");
const employeeDepartment = ref("");

// Search State
const searchQuery = ref("");

// Employee Data
const employees = ref<Employee[]>([
  { id: 1, name: "Rahul", department: "IT" },
  { id: 2, name: "Priya", department: "HR" },
  { id: 3, name: "Amit", department: "Finance" },
]);

// Add Employee
function addEmployee() {
  if (
    !employeeName.value.trim() ||
    !employeeDepartment.value.trim()
  ) {
    return;
  }

  employees.value.push({
    id: Math.max(...employees.value.map(emp => emp.id), 0) + 1,
    name: employeeName.value,
    department: employeeDepartment.value,
  });

  employeeName.value = "";
  employeeDepartment.value = "";
}

// Filter Employees
const filteredEmployees = computed(() => {
  return employees.value.filter((employee) => {
    const query = searchQuery.value.toLowerCase();

    return (
      employee.name.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
    );
  });
});
</script>

<template>
  <div class="employee-container">
    <!-- Header -->
    <div class="header-card">
      <h1>👨‍💼 Employee Management System</h1>

      <span class="employee-count">
        Total Employees: {{ employees.length }}
      </span>
    </div>

    <!-- Add Employee -->
    <div class="card">
      <h2>Add Employee</h2>

      <div class="form-group">
        <input
          v-model="employeeName"
          type="text"
          placeholder="Enter Employee Name"
        />

        <input
          v-model="employeeDepartment"
          type="text"
          placeholder="Enter Department"
        />
      </div>

      <button @click="addEmployee">
        Add Employee
      </button>
    </div>

    <!-- Employee List -->
    <div class="card">
      <div class="list-header">
        <h2>Employee List</h2>

        <input
          v-model="searchQuery"
          placeholder="🔍 Search employee..."
          class="search-input"
        />
      </div>

      <table v-if="filteredEmployees.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="employee in filteredEmployees"
            :key="employee.id"
          >
            <td>{{ employee.id }}</td>
            <td>{{ employee.name }}</td>
            <td>
              <span class="department-badge">
                {{ employee.department }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-else
        class="empty-state"
      >
        No employees found 🔍
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.employee-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
}

/* Header */
.header-card {
  background: linear-gradient(
    135deg,
    #2563eb,
    #1e40af
  );
  color: white;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.header-card h1 {
  margin: 0;
  font-size: 30px;
}

.employee-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 16px;
  border-radius: 50px;
  font-weight: 600;
}

/* Common Card */
.card {
  background: white;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.card h2 {
  margin-top: 0;
  color: #1f2937;
}

/* Form */
.form-group {
  display: flex;
  gap: 16px;
  margin: 20px 0;
}

.form-group input,
.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
}

.form-group input:focus,
.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 4px rgba(37, 99, 235, 0.3);
}

/* Button */
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 26px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

/* Employee List */
.list-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  max-width: 320px;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 12px;
}

thead {
  background: #eff6ff;
}

th {
  padding: 16px;
  text-align: left;
  color: #1e3a8a;
}

td {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

tbody tr {
  transition: 0.2s;
}

tbody tr:hover {
  background: #f8fafc;
}

/* Department Badge */
.department-badge {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #6b7280;
}

/* Mobile */
@media (max-width: 768px) {
  .form-group,
  .list-header,
  .header-card {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    max-width: 100%;
  }

  h1 {
    font-size: 24px;
  }

  table {
    display: block;
    overflow-x: auto;
  }
}
</style>