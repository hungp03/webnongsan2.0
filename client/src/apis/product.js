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


export const apiRatings = async (data)=>
    axiosInstance({
        url: `/product/ratings`,
        method: "put",
        data
    });

export const apiGetRatingsPage = async (pid,params)=>
    axiosInstance({
        url: `/product/ratings/${pid}`,
        method: "get",
        params,
    });

