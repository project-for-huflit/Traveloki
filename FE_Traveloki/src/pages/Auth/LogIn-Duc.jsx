import * as React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { AuthContext } from '../../components/context/authContext.jsx';
import { loginAPi } from '../../services/api/auth/auth_api.js';
import MaterialUISwitch from './CustomSwitch.jsx';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPartner, setIsPartner] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [service, setService] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Vui lòng nhập tên người dùng và mật khẩu.');
      return;
    }

    try {
      const response = await loginAPi(username, password);

      if (response.status === 200) {
        const { token, user } = response.data;
        setSuccess('Đăng nhập thành công!');
        setUser({
          isAuthenticated: true,
          user: {
            email: response?.user?.email ?? '',
            name: response?.user?.name ?? '',
          },
        });
        navigate('/HomePage');
      } else {
        throw new Error('Đăng nhập không thành công.');
      }
    } catch (error) {
      setError('Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.');
    }
  };

  // Show/hide pass
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => { event.preventDefault(); };
  //Đức
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
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block"> </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                  placeholder="Nhập dịch vụ"
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
            onClick={() => alert('Login with SSO-Pointer')}
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
