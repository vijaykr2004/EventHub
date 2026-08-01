import API from "./api";

export const getEvents = async (params) => {
  return API.get("/events", {
    params,
  });
};

export const getEvent = async (id) => {
  return API.get(`/events/${id}`);
};