import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://95.217.134.12:4010",
  headers: {
    "Content-Type": "application/json",
  },
});
