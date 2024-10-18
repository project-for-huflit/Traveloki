import axios from "../../axios.customize.js";

const loginAPi = async (email, password) => {
    const URL_API = "/api/v2/auth/login";
    // const  data = {email, password};
    const data = JSON.stringify({ email, password })

    return await axios.post(URL_API, data,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    // return axios.post(API_URL + "signin", {
    //   username,
    //   password
    // })
    // .then(response => {
    //   if (response.data.accessToken) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //   }

    //   return response.data;
    // });
}

export {
    loginAPi
};
