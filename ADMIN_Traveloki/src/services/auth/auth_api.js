import { useNavigate } from 'react-router-dom';
import axios from '../axiosCustomize';

// region user
const loginApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/login',
    body,
    {
      withCredentials: true,
    },
  );
};

const registerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/register',
    body,
    {
      withCredentials: true,
    },
  );
};

const logoutApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/logout',
    body,
    {
      withCredentials: true,
    },
  );
};

const handlerRefreshTokenUserApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/handle-refresh-token-user',
    body,
    {
      withCredentials: true,
    },
  );
};
//#endregion user

//#region partner
const loginPartnerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/partner/login',
    body,
    {
      withCredentials: true,
    },
  );
};

const regisPartnerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/partner/register',
    body,
    {
      withCredentials: true,
    },
  );
};

const pointerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL +
      '/api/v2/auth/partner/continue-with-pointer',
    body,
    {
      withCredentials: true,
    },
  );
};

// const fetchPointerApi = async (code) => {
//   const navigate = useNavigate()
//   return await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v2/auth/partner/continue-with-pointer`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ code })
//   }).then(response => {
//     if (!response.status === 201) {
//       throw new Error('Network response was not okk')
//     }
//     response.json()
//   }).then(data => {
//     console.log("API response: ", data)
//     if(data.metadata.tokens) {
//       localStorage.setItem('token', data.metadata.tokens)
//       localStorage.setItem('userId', data.metadata.partnerId)

//       const userId = data.metadata.partnerId
//       console.log("userId: ", userId)

//       navigate('', { state: { userId }})
//     } else {
//       console.error('No token found in response: ', data)
//     }
//   })
// };

const logoutPartnerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/partner/logout',
    body,
    {
      withCredentials: true,
    },
  );
};

const handlerRefreshTokenPointerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL +
      '/api/v2/auth/handle-refresh-token-pointer',
    body,
    {
      withCredentials: true,
    },
  );
};
//#endregion partner

export {
  loginApi,
  registerApi,
  logoutApi,
  handlerRefreshTokenUserApi,
  pointerApi,
  loginPartnerApi,
  regisPartnerApi,
  logoutPartnerApi,
  handlerRefreshTokenPointerApi,
};
