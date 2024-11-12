const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  // Add more routes as needed
};

export default API_ROUTES;
