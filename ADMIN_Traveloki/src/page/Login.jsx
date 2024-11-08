import leftLogin from '../assets/left-login.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext.jsx';
import { useContext, useState } from 'react';
import { loginAPI } from '../services/api/Auth/apiAuth.js';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await loginAPI(email, password);
      console.log('check res: ', res);
      if (res && res.EC === 0) {
        localStorage.setItem('access_token', res.access_token);
        setUser({
          isAuthenticated: true,
          user: {
            email: res?.admin?.email ?? '',
            name: res?.admin?.name ?? '',
            role: res?.admin?.role ?? '',
          },
        });
        navigate('/home', { replace: true });
      } else {
        setError(res.EM);
      }
    } catch (e) {
      setError('Không thể kết nối tới server. Vui lòng thử lại sau.');
      console.error('Error connecting to backend:', e);
    }
  };

  const redirectToSSOPointer = () => {
    navigate('/load');
    const redirectToPointer = encodeURIComponent(
      `${import.meta.env.VITE_FE_URL}/auth/callback`,
    );
    window.location.href = `https://sso-pointer.vercel.app/authorize?callbackUrl=${redirectToPointer}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 md:p-8">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left */}
        <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center">
          <img
            src={leftLogin}
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Login</h2>
          <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
            <input
              type="username"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}{' '}
                {/* Hiển thị icon mắt */}
              </span>
            </div>
            {/* Thông báo lỗi */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>

            <button
            type="button"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mb-2"
            onClick={redirectToSSOPointer}
          >
            Login with SSO-Pointer
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
