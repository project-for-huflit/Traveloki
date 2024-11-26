import axios from '../../axiosCustomize.js';

const createPhuongTien = async (data, parternId) => {
  const URL_BACKEND = `/api/CreatePhuongTien/${parternId}`;
  return axios.post(URL_BACKEND, data);
};

export { createPhuongTien };
