import axios from "../../axiosCustomize.js";

const updateDetailCar = async (id, formData) => {
  const URL_BACKEND = `/api/UpdateDetailCar/${id}`;
  return axios.put(URL_BACKEND, formData);
}

export {
  updateDetailCar
}
