import axios from '../../axiosCustomize.js';

const fetchAllPhuongTienPartern = async (_id) => {
  const URL_BACKEND = `/api/GetPhuongTien/${_id}`;
  return axios.get(URL_BACKEND);
};

const fetchAllPhuongTien = async () => {
  const URL_BACKEND = '/api/GetPhuongTien';
  return axios.get(URL_BACKEND);
};

const deletePhuongTien = async (_id) => {
  const URL_BACKEND = `/api/DeletePhuongTien/${_id}`;
  return axios.delete(URL_BACKEND);
};

export { fetchAllPhuongTien, deletePhuongTien };
