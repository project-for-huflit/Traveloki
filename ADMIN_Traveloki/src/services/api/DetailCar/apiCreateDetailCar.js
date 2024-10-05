import axios from "../../axiosCustomize.js";


const createDetailCar = async (data) => {
  const URL_BACKEND = "/api/CreateDetailCar";
  return axios.post(URL_BACKEND, data);
}


export{
  createDetailCar
}
