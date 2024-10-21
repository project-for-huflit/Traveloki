import axios from "../../axiosCustomize.js";

const createTramDung = async (TenTramDung, DiaChi) => {
  const URL_BACKEND = '/api/CreateTramDung'
  const data ={
    TenTramDung: TenTramDung,
    DiaChi: DiaChi,
  }
  return axios.post(URL_BACKEND, data)
}

export {
  createTramDung
}
