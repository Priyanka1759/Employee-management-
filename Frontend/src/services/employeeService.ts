//Purpose: Keep all API calls in one place.
import axios from "axios";
import type { Employee } from "../types/Employee";

const API_URL = "http://127.0.0.1:8000/api";

const token = localStorage.getItem("token");

const api = axios.create({        // axios instance created
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export const getEmployees = async (page: number, search: string = "") => {
  try {
    const token = localStorage.getItem("token");

const response = await api.get(
  `/employees?page=${page}&search=${search}`,
  
);

    return {
      employees: response.data.data.map((employee: Employee) => ({
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        joining_date: employee.joining_date,
        aadhaar: employee.aadhaar,
        alternate_contact: employee.alternate_contact,
        description: employee.description,
        profile_image: employee.profile_image,
      })),
      currentPage: response.data.current_page,
      lastPage: response.data.last_page,
      total: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const addEmployee = async (formData: FormData) => {
  try {
    const response = await api.post(
      `${API_URL}/employees`,
      formData,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};
export const getEmployeeById = async (id: number) => {
  try {
    const response = await api.get(`${API_URL}/employees/${id}`);

    return {
      id: response.data.id,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email,
      phone: response.data.phone,
      department: response.data.department,
      designation: response.data.designation,
      joining_date: response.data.joining_date,
      aadhaar: response.data.aadhaar,
      alternate_contact: response.data.profile?.alternate_contact || "",
      description: response.data.profile?.description || "",
      profile_image: response.data.profile?.profile_image || "",
    };
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};
export const updateEmployee = async (id: number, formData: FormData) => {
  try {
    const response = await api.post(
      `${API_URL}/employees/${id}?_method=PUT`,
      formData,
    );

    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    const response = await api.delete(`${API_URL}/employees/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
