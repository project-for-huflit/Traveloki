import axios from "../../axiosCustomize.js";

const createDanhSachSanBay = async (data) => {
  const URL_BACKEND = "/api/CreateDanhSachSanBay";
  return axios.post(URL_BACKEND, data);
}

export {
  createDanhSachSanBay
}
