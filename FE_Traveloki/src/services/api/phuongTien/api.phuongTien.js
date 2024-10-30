import axios from '../../axios.customize';

const getPhuongTienByLichChay = (MaTuyen) =>{
  const URL_BACKEND = `/api/GetPhuongTienByLichChay`;
  const data = {MaTuyen}
  console.log("MaTuyen", MaTuyen)
  return axios.post(URL_BACKEND, data)
}

export {
  getPhuongTienByLichChay
}
