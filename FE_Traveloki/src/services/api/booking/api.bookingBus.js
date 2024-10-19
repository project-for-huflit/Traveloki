import axios from '../../axios.customize';

const bookingBusAPI = (data) => {
    const URL_BACKEND = `/BookingBus`;
    return axios.post(URL_BACKEND, data)
}

const fetchPhuongTien = (id) => {
  const URL_BACKEND = `/GetPhuongTienID/${id}`;
  return axios.get(URL_BACKEND)
}

const getTramDungId = (id) => {
  const URL_BACKEND = `/GetTramDungID/${id}`;
  return axios.get(URL_BACKEND)
}

const buyTicketBus = (data) => {
  const URL_BACKEND = `/BuyTicketBus`;
  return axios.post(URL_BACKEND, data)
}
export {
    bookingBusAPI, fetchPhuongTien, getTramDungId, buyTicketBus
}
