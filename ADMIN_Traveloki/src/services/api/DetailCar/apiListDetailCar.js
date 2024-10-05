import axios from '../../axiosCustomize.js';

const fetchListDetailCar = async() => {
  const URL_BACKEND = '/api/GetDetailCar';
  return axios.get(URL_BACKEND);
}

const deleteDetailCar = async(_id) => {
  const URL_BACKEND = `/api/DeleteDetailCar/${_id}`;
  return axios.delete(URL_BACKEND);
}

export {
  fetchListDetailCar, deleteDetailCar
}
