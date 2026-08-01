import API from "./api";

export const registerUser = async (userData) => {
  return API.post("/auth/register", userData);
};

export const loginUser = async (userData) => {
  return API.post("/auth/login", userData);
};