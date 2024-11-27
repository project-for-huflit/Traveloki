import axios from '../../axiosCustomize.js';

const fetchHistoryCar = async () => {
  const URL_BACKEND = '/api/GetLichSuDatXeOto';
  return axios.get(URL_BACKEND);
};

const fetchHistoryTrain = async () => {
  const URL_BACKEND = '/api/GetLichSuDatTau';
  return axios.get(URL_BACKEND);
};

const fetchHistoryBus = async () => {
  const URL_BACKEND = '/api/GetBuyTicketBus';
  return axios.post(URL_BACKEND);
};

export { fetchHistoryCar, fetchHistoryTrain, fetchHistoryBus };
