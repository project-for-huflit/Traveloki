import axios from '../../axios.customize';

const getPhuongTienByLichChay = (MaTuyen) =>{
  const URL_BACKEND = `/api/GetPhuongTienByLichChay`;
  const data = {MaTuyen}
  return axios.post(URL_BACKEND, data)
}

const getAllCar = () =>{
  const URL_BACKEND = `/api/GetDetailCar`;
  return axios.get(URL_BACKEND)
}

const getPhuongTienId = (id) =>{
  const URL_BACKEND = `/api/GetPhuongTienID/${id}`;
  return axios.get(URL_BACKEND)
}

export {
  getPhuongTienByLichChay, getAllCar, getPhuongTienId
}
