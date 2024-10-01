import axios from "../../axios.customize.js";

const loginAPi = (username, password) => {
    const URL_API = "/v1/api/login";
    const  data = {username, password};
    return axios.post(URL_API, data);
}

export {
    loginAPi
};