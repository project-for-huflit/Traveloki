import axios from '../../axiosCustomize.js'

const fetchAllTramDung = async () => {
  const URL_BACKEND = '/api/GetTramDung'
  return axios.get(URL_BACKEND)
}

const deleteTramDung = async (_id) => {
  const URL_BACKEND = `/api/DeleteTramDung/${_id}`
  return axios.delete(URL_BACKEND)
}

export {
  fetchAllTramDung, deleteTramDung
}
