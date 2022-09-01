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

export const postReq = (path, data) => {
  return reqMedicine({
    method: "POST",
    url: path,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },

  });
};

export const deletReq = (path, id) =>{
    return reqMedicine({
      method: "DELETE",
      url: path + id,
    
    })
}

export const putReq = (path, data) => {
  return reqMedicine({
    method: "PUT",
    url: path + data.id,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },

  });
};



