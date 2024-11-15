import axios from "../../axiosCustomize.js";
const updateTramDung = async (_id ,ThanhPho, TenTramDung, DiaChi) => {
  const URL_BACKEND = '/api/UpdateTramDung'
  const data ={
    _id: _id,
    ThanhPho: ThanhPho,
    TenTramDung: TenTramDung,
    DiaChi: DiaChi,
  }
  return axios.post(URL_BACKEND, data)
}
export {
  updateTramDung
}
