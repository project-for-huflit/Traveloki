import axios from '../../axiosCustomize.js';

const getUser = async () => {
  const URL_BACKEND = '/api/getAccount';
  return axios.get(URL_BACKEND);
};

export { getUser };
