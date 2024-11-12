import axios from "../../axiosCustomize.js"

const getThanhPho = async() => {
  const URL_BACKEND = "/api/ThanhPho";
  return axios.get(URL_BACKEND);
}

export {
  getThanhPho
}
