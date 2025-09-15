import { api } from "../index";

export default {
  // Get all employees or Fileter Data
  async getEmployees(payload) {
    return await api.post("/employee/getemployees", payload);
  },

  // // Store Employees
  async storeEmployee(payload) {
    return await api.post("/employee/storeemployee", payload);
  },

  // Get all employees or Fileter Data
  async getAllEmployees(payload) {
    return await api.post("/employee/getallemployees", payload);
  },

  // Update employee
  async updateEmployee(id, payload) {
    return await api.put(`/employee/updateemployee/${id}`, payload);
  },

  // get total empoyee count
  async totalEmployees() {
    return await api.get("/employee/totemployees");
  },

  // delete employee
  async confirmDelete() {
    return await api.post(`/employee/deleteemployee/${id}`);
  },
};
