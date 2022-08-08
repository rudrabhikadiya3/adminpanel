import axios from "axios";
import { BASE_URL } from "../shared/baseURL";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});

const reqMedicine = (config) => {
  return instance.request(config);
};

export const getMedicine = (path) => {
  return reqMedicine({
    method: "GET",
    url: path,
  });
};
