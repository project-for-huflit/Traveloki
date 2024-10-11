import axios from '../../axios.customize';

const url = `${import.meta.env.VITE_BACKEND_URL}/api`;

const suggestsAirportAPI = (query) => {
    const URL_BACKEND = `${url}/SuggestsAirpost?query=${query}`;
    return axios.get(URL_BACKEND)
}

const suggestsTramDungAPI = (query) => {
    const URL_BACKEND = `${url}/SuggestsTramDung?query=${query}`;
    return axios.get(URL_BACKEND)
}

const tramDungByDiaChi = (diemKetThuc) => {
    const URL_BACKEND = `${url}/TramDungByDiaChi?diaChi=${encodeURIComponent(diemKetThuc)}`;
    return axios.get(URL_BACKEND)
}

const getSanBaybyTenSanBay = (diemSanBay) => {
    const URL_BACKEND = `${url}/getSanBaybyTenSanBay?TenSanBay=${encodeURIComponent(diemSanBay)}`
    return axios.get(URL_BACKEND)
}

const getTuyenDiemSanBay = (maSanBay) => {
    const URL_BACKEND = `${url}/TuyenDiemSanBay?diemSanBay=${encodeURIComponent(maSanBay)}`
    return axios.get(URL_BACKEND)
}

export{
    suggestsAirportAPI, suggestsTramDungAPI, tramDungByDiaChi,
    getSanBaybyTenSanBay, getTuyenDiemSanBay
}
