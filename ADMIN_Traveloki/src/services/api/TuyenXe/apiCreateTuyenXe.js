import axios from '../../axiosCustomize.js';

const createTuyenXe = (
  parternId,
  DiemKhoiHanh,
  DiemKetThuc,
  ThoiGianKhoiHanh,
  ThoiGianKetThuc,
  TramList,
) => {
  const data = {
    parternId,
    DiemKhoiHanh: DiemKhoiHanh,
    DiemKetThuc: DiemKetThuc,
    ThoiGianKhoiHanh: ThoiGianKhoiHanh,
    ThoiGianKetThuc: ThoiGianKetThuc,
    TramList: TramList,
  };
  console.log('check data', data);
  const URL_BACKEND = '/api/CreateTuyen';
  return axios.post(URL_BACKEND, data);
};

export { createTuyenXe };
