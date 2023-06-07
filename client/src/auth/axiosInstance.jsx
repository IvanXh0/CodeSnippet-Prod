import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://codesnippet-prod-production.up.railway.app/',
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
