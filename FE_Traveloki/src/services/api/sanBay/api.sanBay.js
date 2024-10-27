import axios from "../../axios.customize.js";

const url = `${import.meta.env.VITE_BACKEND_URL}/api`;

const getAllSanBayService = () => {
  const URL_BACKEND = `${url}/GetDanhSachSanBay`;
  return axios.get(URL_BACKEND);
}

export {
  getAllSanBayService
}
