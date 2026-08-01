import API from "./api";

export const registerEvent = async (eventId) => {
  return API.post(`/registrations/${eventId}`);
};

export const cancelRegistration = async (eventId) => {
  return API.delete(`/registrations/${eventId}`);
};

export const getMyEvents = async () => {
  return API.get("/registrations/my-events");
};
export const checkRegistration = (eventId) => {
  return API.get(`/registrations/check/${eventId}`);
};