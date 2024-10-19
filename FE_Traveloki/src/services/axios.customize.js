//interceptor
import axios from 'axios';
import NProgress from "nprogress";

//NProgress là thư viện giúp tạo hiệu ứng loading khi chuyển trang
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
  });

//set config defaults when creating an instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_SECRET_API_KEY
    },
});
instance.defaults.withCredentials = true
axios.defaults.withCredentials = true
// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/refresh-token', { refreshToken });
        const { token } = response.data;

        localStorage.setItem('token', token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

//Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// instance.interceptors.request.use(function (config) {
//     NProgress.start();
//     // Do something before request is sent
//     if (typeof window !== "undefined" && window && window.localStorage &&
//       window.localStorage.getItem('access_token')) {
//       // lấy token từ local storage và gán vào header
//       // Bearer là định dạng để truyền data
//       config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
//     }
//     return config;
//   }, function (error) {
//     NProgress.done();
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//     NProgress.done();
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     //lược bỏ response.data.data nếu không cần thiết để trả về đơn giản hơn
//     if (response.data && response.data.data)
//         return response.data;
//     return response;
//   }, function (error) {
//     NProgress.done();
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     //khi có lỗi thì trả ra data từ backend gửi lên
//     if (error.response && error.response.data) {
//       return error.response.data;
//     }
//     return Promise.reject(error);
//   });
export default instance;
