import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";


export const login = async (email: string, password: string) => {
  return axios.post(
    `${API_URL}/login`,
    {
      email,
      password,
    },
  );
};

export const logout = async () => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};