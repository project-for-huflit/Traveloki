import axios from '../../axiosCustomize.js';

const fetchAllTuyenXe = async () => {
  const URL_BACKEND = "/api/GetTuyenXe";
  return axios.get(URL_BACKEND);
}

const deleteTuyenXe = async (_id) => {
  const URL_BACKEND = `/api/DeleteTuyen/${_id}`;
  return axios.delete(URL_BACKEND);
}

export {
  fetchAllTuyenXe, deleteTuyenXe
}
