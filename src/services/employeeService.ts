export interface Employee {
  id: number;
  name: string;
  department: string;
}

const API_URL = "http://localhost:3000/employees";

/**
 * Get all employees
 */
export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return await response.json();
}

/**
 * Add new employee
 */
export async function addEmployee(
  employee: Omit<Employee, "id">
): Promise<Employee> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return await response.json();
}

/**
 * Delete employee
 */
export async function deleteEmployee(
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
}

/**
 * Update employee
 */
export async function updateEmployee(
  employee: Employee
): Promise<Employee> {
  const response = await fetch(
    `${API_URL}/${employee.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return await response.json();
}