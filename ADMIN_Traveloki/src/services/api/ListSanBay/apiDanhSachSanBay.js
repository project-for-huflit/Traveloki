import axios from "../../axiosCustomize.js"

const fetchAllSanBay = async () => {
  const URL_BACKEND = "/api/GetDanhSachSanBay";
  return axios.get(URL_BACKEND);
}

const deleteSanBay = async (_id) => {
  const URL_BACKEND = `/api/DeleteDanhSachSanBay/${_id}`;
  return axios.delete(URL_BACKEND);
}

export{
  fetchAllSanBay, deleteSanBay
}
