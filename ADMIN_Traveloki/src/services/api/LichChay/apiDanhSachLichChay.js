import axios from '../../axiosCustomize.js';
const fetchLichChayPartner = async (userId) => {
  const URL_BACKEND = `/api/GetLichChayPartern/${userId}`;
  return axios.get(URL_BACKEND);
};

const fetchAllLichChay = async () => {
  const URL_BACKEND = '/api/lichChay';
  return axios.get(URL_BACKEND);
};

const deleteLichChay = async (_id) => {
  const URL_BACKEND = `/api/lichChay/${_id}`;
  return axios.delete(URL_BACKEND);
};

export { fetchLichChayPartner, fetchAllLichChay, deleteLichChay };
