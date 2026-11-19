import { defineStore } from "pinia";
import type { Employee } from "@/services/employeeService";
import {
  getEmployees,
  addEmployee as createEmployee,
} from "@/services/employeeService";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [] as Employee[],
    loading: false,
  }),

  actions: {
    async fetchEmployees() {
      this.loading = true;

      try {
        this.employees = await getEmployees();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async addEmployee(name: string, department: string) {
      const employee = await createEmployee({
        name,
        department,
      });

      this.employees.push(employee);
    },
  },
});