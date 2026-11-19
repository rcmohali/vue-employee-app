import axios from "axios";

const API_URL = "http://localhost:3000/employees";

export interface Employee {
  id: string;
  name: string;
  department: string;
}

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addEmployee = async (
  employee: Omit<Employee, "id">
): Promise<Employee> => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};