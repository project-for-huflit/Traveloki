import axios from "../../axiosCustomize.js";

const fetchAllLichChay = async () => {
  const URL_BACKEND = "/api/lichChay";
  return axios.get(URL_BACKEND);
}

const deleteLichChay = async(_id) => {
  const URL_BACKEND = `/api/lichChay/${_id}`;
  return axios.delete(URL_BACKEND);
}

export {
  fetchAllLichChay, deleteLichChay
}
