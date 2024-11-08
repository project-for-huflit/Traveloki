import axios from "../../axiosCustomize.js";

const createTramDung = async (ThanhPho, TenTramDung, DiaChi) => {
  const URL_BACKEND = '/api/CreateTramDung'
  const data ={
    ThanhPho: ThanhPho,
    TenTramDung: TenTramDung,
    DiaChi: DiaChi,
  }
  return axios.post(URL_BACKEND, data)
}

export {
  createTramDung
}
