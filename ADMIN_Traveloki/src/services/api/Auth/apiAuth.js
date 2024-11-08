import axios from '../../axiosCustomize.js';

const loginAPI = async (email, password) => {
  const URL_API = '/api/v2/auth/login';
  const data = { email, password };
  return axios.post(URL_API, data, {
    withCredentials: true,
  });
};

const createAdminAPI = async (name, username, email, password, role) => {
  const URL_API = '/api/v1/admin/register';
  const data = { name, username, email, password, role };
  return axios.post(URL_API, data, {
    withCredentials: true,
  });
};

export { loginAPI, createAdminAPI };
