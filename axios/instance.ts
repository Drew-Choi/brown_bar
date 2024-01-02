import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();
//     const user = session?.user;

//     if (config.url !== 'join' && config.url !== 'login' && config.url !== 'login/re') {
//       if (!user) {
//         const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + 'login/re', {});

//         if (res.status === 200) {
//           return config;
//         } else {
//           window.location.href = '/admin/login';
//           return Promise.reject(new Error('Authentication failed'));
//         }
//       }
//     }
//     return config;
//   },
//   (err) => Promise.reject(err),
// );

export default axiosInstance;
