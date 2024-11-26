import axios from '../../axiosCustomize.js';

const createPhuongTien = async (data) => {
  const URL_BACKEND = `/api/CreatePhuongTien`;
  return axios.post(URL_BACKEND, data);
};

export { createPhuongTien };
