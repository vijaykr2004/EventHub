import API from "./api";

export const getDashboard = async () => {
  return API.get("/dashboard");
};