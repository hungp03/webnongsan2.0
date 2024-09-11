import axiosInstance from "../utlis/axios";

export const apiGetCategories = () =>
  axiosInstance({
    url: "/categories",
    method: "get",
  });