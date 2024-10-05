import axios from "../../axiosCustomize.js";

const getDetailCar = async (id) => {
  const URL_BACKEND = `/api/GetDetailCarID/${id}`;
  return axios.get(URL_BACKEND);
}

const deleteDetailCar = async (id) => {

}

export {
  getDetailCar, deleteDetailCar
}
