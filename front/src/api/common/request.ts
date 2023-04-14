import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_GATEWAY_URL || "http://localhost:3000"
});

export { request };
