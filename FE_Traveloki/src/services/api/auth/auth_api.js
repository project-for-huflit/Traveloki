import axios from '../../axios.customize.js';

// region user
const loginApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/login',
    body,
    {
      withCredentials: true,
    }
  );
};

const registerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/register',
    body,
    {
      withCredentials: true,
    }
  );
};

const logoutApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/logout',
    body,
    {
      withCredentials: true,
    }
  );
};

const handlerRefreshTokenUserApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/handle-refresh-token-user',
    body,
    {
      withCredentials: true,
    }
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
    }
  );
};

const regisPartnerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/partner/register',
    body,
    {
      withCredentials: true,
    }
  );
};

const pointerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/partner/continue-with-pointer',
    body,
    {
      withCredentials: true,
    }
  );
};

const logoutPartnerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/partner/logout',
    body,
    {
      withCredentials: true,
    }
  );
};

const handlerRefreshTokenPointerApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/v2/auth/handle-refresh-token-pointer',
    body,
    {
      withCredentials: true,
    }
  );
};
//#endregion partner

export {
  loginApi, registerApi, logoutApi, handlerRefreshTokenUserApi,
  pointerApi, loginPartnerApi, regisPartnerApi, logoutPartnerApi, handlerRefreshTokenPointerApi
 };
