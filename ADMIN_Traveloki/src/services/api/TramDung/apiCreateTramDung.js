import axios from "../../axiosCustomize.js";

const createTramDung = async (MaTuyen, DiaChi, GiaTienVe, SoKM, GiaTienVeTau) => {
  const URL_BACKEND = '/api/CreateTramDung'
  const data ={
    MaTuyen: MaTuyen,
    DiaChi: DiaChi,
    GiaTienVe: GiaTienVe,
    SoKM: SoKM,
    GiaTienVeTau: GiaTienVeTau
  }
  return axios.post(URL_BACKEND, data)
}

export {
  createTramDung
}
