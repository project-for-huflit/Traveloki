import * as React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// import { AuthContext } from '../../components/context/authContext.jsx';
import { loginApi } from '../../services/api/auth/auth_api.js';
import MaterialUISwitch from './CustomSwitch.jsx';
import axios from '../../services/axios.customize.js';

const Login = () => {
  // const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [service, setService] = useState('');

  const [isPartner, setIsPartner] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Show/hide pass
  // const [showPassword, setShowPassword] = React.useState(false);
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (event) => { event.preventDefault(); };

  const newDirect = `https://sso-pointer.vercel.app/authorize?callbackUrl=${import.meta.env.VITE_FE_URL_HOME}`
  // Navigate to Pointer
  const redirectToSSOPointer = () => {
    navigate('/load');
    window.location.href = newDirect;
  };

  /**
   * @author LOQ-burh
   * @description Xử lý logic login
   */
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginApi(credentials)
      // console.log(response.data)
      const { accessToken, refreshToken } = response.data.metadata.tokens;
      const { user } = response.data.metadata;
      // Store the tokens in localStorage or secure cookie for later use
      console.log(response?.data.metadata);
      console.log(response?.data.metadata.user);
      console.log(response?.data.metadata.tokens);
      // console.log(response?.metadata.tokens.accessToken);
      // console.log(response?.metadata.tokens.refreshToken);
      console.log(JSON.stringify(response))

      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect or perform other actions upon successful login
      if(response.data.status == 200) {
        // setSuccess('Đăng nhập thành công!');
        navigate('/home');
      } else {
        throw new Error("Response was not ok");
      }
    } catch (error) {
      setError('Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.');
    }
  }
  return (
    <div
      className="flex items-center justify-center py-9 min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w4N3x8ZW58MHx8fHx8')",
      }}
    >
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Đăng Nhập</h2>
        <form onSubmit={handleSubmit} method='post'>
          <div className="mb-4">
            <label className="block"> </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                type="email"
                name='email'
                value={credentials.email}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Mật Khẩu
              </span>
              <input
                type="password"
                name='password'
                value={credentials.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="nhập mật khẩu của bạn"
                required
              />
            </label>
          </div>
          {isPartner && (
            <div className="mb-4">
              <label className="block">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Service
                </span>
                <input
                  type="text"
                  // value={service}
                  // onChange={(e) => setService(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                  placeholder="Nhập mã dịch vụ"
                />
              </label>
            </div>
          )}

          <FormGroup>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              label={isPartner ? 'Switch to Customer' : 'Switch to Partner'}
              onClick={() => setIsPartner(!isPartner)}
            />
          </FormGroup>

          <button
            type="button"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mb-2"
            onClick={redirectToSSOPointer}
          >
            Login with SSO-Pointer
          </button>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Đăng Nhập
          </button>
          <Link
            to={'/auth/register'}
            className="text-blue-600 mt-2 flex justify-center hover: underline"
          >
            Don&apos;t have an account? Sign up now!
          </Link>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {success && (
          <p className="mt-4 text-center text-green-500">{success}</p>
        )}
      </div>
    </div>
  );
};
//Đức
export default Login;
