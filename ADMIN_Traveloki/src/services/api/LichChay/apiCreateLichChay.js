import axios from "../../axiosCustomize.js";

const createLichChay = async (MaPT, MaTuyen, ngayKhoiHanh, gioKhoiHanh, gioKetThuc) => {
  const data = {MaPT, MaTuyen, ngayKhoiHanh, gioKhoiHanh, gioKetThuc,};
  const URL_BACKEND = "/api/lichChay";
  return axios.post(URL_BACKEND,data );
}

export {
  createLichChay
}
