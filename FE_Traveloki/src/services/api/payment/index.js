import axios from '../../axios.customize.js';

// region user
const loginApi = async (body) => {
  return await axios.post(
    import.meta.env.VITE_API_PRESSPAY_BASE_URL + '/api/v1/payment',
    body,
    {
      withCredentials: true,
    }
  );
};

export {
  loginApi,
 };
