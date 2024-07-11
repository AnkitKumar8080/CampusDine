import axios from "axios";

// create an axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URI,
  withCredentials: true, // for sending cookies
  timeout: 120000, // timeout in milliseconds
});

apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = localStorage.getItem("token");
    // set authorization header with bearer token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// apiClient.interceptors.response.use(
//   function (response) {
//     // Handle successful responses
//     return response;
//   },
//   function (error) {
//     // Handle errors
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error("Response error:", error.response.data);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("No response received:", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("Request setup error:", error.message);
//     }
//     return Promise.reject(error);
// }
// );

export { apiClient };
