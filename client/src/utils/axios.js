import axios from 'axios';

//Document: https://axios-http.com/docs/instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

//Document: https://axios-http.com/docs/interceptors
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let localData = window.localStorage.getItem('persist:ogani_shop/user');
  if (localData && typeof localData === 'string') {
    localData = JSON.parse(localData);
    const accessToken = JSON.parse(localData?.token);
    if (accessToken && accessToken !== 'null') {
      config.headers = { authorization: `Bearer ${accessToken}` };
    }
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});



// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosInstance;