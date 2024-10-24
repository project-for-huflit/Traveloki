import axios from "../../axiosCustomize.js";

const createDanhSachSanBay = async (name) => {
  const URL_BACKEND = "/api/CreateDanhSachSanBay";
  return axios.post(URL_BACKEND, name);
}

export {
  createDanhSachSanBay
}
