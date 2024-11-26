import axios from '../../axiosCustomize.js';

const fetchAllTuyenXePartern = async (userId) => {
  const URL_BACKEND = `/api/GetTuyenPartern/${userId}`;
  return axios.get(URL_BACKEND);
};

const fetchAllTuyenXe = async () => {
  const URL_BACKEND = '/api/GetTuyen';
  return axios.get(URL_BACKEND);
};

const deleteTuyenXe = async (_id) => {
  const URL_BACKEND = `/api/DeleteTuyen/${_id}`;
  return axios.delete(URL_BACKEND);
};

export { fetchAllTuyenXePartern, fetchAllTuyenXe, deleteTuyenXe };
