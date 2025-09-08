import { message } from "antd";
import axios, { AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const request = axios.create({
  baseURL,
  timeout: 30 * 1000,
});

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    } else {
      message.error(error.response?.data?.message || "请求失败");
    }
    return Promise.reject(error);
  }
);

export default request;
