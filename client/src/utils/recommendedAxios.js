import axios from 'axios';

//Document: https://axios-http.com/docs/instance
const axiosInstanceRecommended = axios.create({
  baseURL: import.meta.env.VITE_RECOMMENDED_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

//Document: https://axios-http.com/docs/interceptors
// Add a request interceptor
axiosInstanceRecommended.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});



// Add a response interceptor
axiosInstanceRecommended.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  //console.log(response)
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosInstanceRecommended;