import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const router = useRouter();
  const { status } = useSession();

  console.log('log', config);

  if (config.url !== '/api/join' && config.url !== '/api/login' && config.url !== '/api/login/re') {
    if (status === 'unauthenticated') {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + 'login/re', {});

      if (res.status === 200) {
        return Promise.resolve(config);
      } else {
        router.replace('/admin/login');
        return Promise.reject(new Error('Authentication failed'));
      }
    }
  }
  return Promise.resolve(config);
});

export default axiosInstance;
