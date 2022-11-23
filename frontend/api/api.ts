import axios from "axios";

export const post = async (endpoint, data) => {
  let response = await axios.post(endpoint, data);
  return response;
};

export const get = async (endpoint) => {
  let data = await axios.get(endpoint);
  return data;
};

export const login = async (endpoint, data) => {
  let login = await axios.post("login", data);
  return data;
};
