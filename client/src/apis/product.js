import axiosInstance from "../utils/axios";
import axiosInstanceRecommended from "../utils/recommendedAxios";
export const apiGetProducts = async (params) =>
    axiosInstance({
        url: "/products",
        method: "get",
        params,
    });

export const apiGetProduct = async (pid) =>
    axiosInstance({
        url: `/products/${pid}`,
        method: "get",
    });

export const apiGetRecommendedProducts = async(pid) =>
    axiosInstanceRecommended({
        url: `/similar-products/${pid}`,
        method: 'get'
    })
