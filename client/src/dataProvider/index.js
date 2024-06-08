import axios from 'axios';

const axiosHttp = axios.create({
  baseURL: 'https://contactmanagementapp0001.vercel.app/',
});

axiosHttp.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    return {
      ...config,
      headers: {
        ...(token !== null && { token: `${token}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosHttp.interceptors.response.use(
  (response) => {
    //const url = response.config.url;

    //setLocalStorageToken(token);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //(`unauthorized :)`);
      localStorage.clear();
      //removeLocalStorageToken
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosHttp;
