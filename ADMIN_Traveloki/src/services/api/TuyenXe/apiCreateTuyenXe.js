import axios from '../../axiosCustomize.js';

const createTuyenXe = async () => {
  const URL_BACKEND = "/api/CreateTuyenXe";
  return axios.post(URL_BACKEND);
}

export {
  createTuyenXe
}
