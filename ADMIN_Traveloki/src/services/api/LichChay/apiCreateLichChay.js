import axios from '../../axiosCustomize.js';

const createLichChay = async (
  parternId,
  MaPT,
  MaTuyen,
  ngayKhoiHanh,
  gioKhoiHanh,
  gioKetThuc,
  SLVe,
) => {
  const data = {
    parternId,
    MaPT,
    MaTuyen,
    ngayKhoiHanh,
    gioKhoiHanh,
    gioKetThuc,
    SLVe,
  };
  const URL_BACKEND = '/api/lichChay';
  return axios.post(URL_BACKEND, data);
};

export { createLichChay };
