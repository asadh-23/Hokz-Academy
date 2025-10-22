import axios from "axios";

const createAxiosInstance = (role) => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/${role}`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const userAxios = createAxiosInstance("user");
export const tutorAxios = createAxiosInstance("tutor");
export const adminAxios = createAxiosInstance("admin");

export const publicAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});