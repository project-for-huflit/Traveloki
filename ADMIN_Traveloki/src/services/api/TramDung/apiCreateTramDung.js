import axios from '../../axiosCustomize.js';

const createTramDung = async (parternId, ThanhPho, TenTramDung, DiaChi) => {
  const URL_BACKEND = '/api/CreateTramDung';
  const data = {
    parternId,
    ThanhPho: ThanhPho,
    TenTramDung: TenTramDung,
    DiaChi: DiaChi,
  };
  return axios.post(URL_BACKEND, data);
};

export { createTramDung };
