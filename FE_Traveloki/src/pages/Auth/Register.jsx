import React, { useState } from "react";
import axios from "../../services/axios.customize";
import {Link, useNavigate} from "react-router-dom";
import { registerApi } from '../../services/api/auth/auth_api.js';

const SignUp = () => {

  /**
   * @author LOQ-burh
   * @description Xử lý logic register
   */
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    // setError("");
    // setSuccess("");
    setIsLoading(true);

    if (!credentials.name || !credentials.email || !credentials.password || !credentials.confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      setIsLoading(false);
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerApi(credentials)
      console.log(response)
      const { accessToken, refreshToken } = response.data.metadata.tokens;

      console.log(response?.data.metadata);
      console.log(response?.data.metadata.tokens.accessToken);
      console.log(response?.data.metadata.tokens.refreshToken);
      // console.log(response.data.status);
      console.log(JSON.stringify(response))

      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.metadata.user));

      // if (response.data.status === 201) {
      //   setSuccess("Đăng ký thành công!");
      //   navigate('/home');
      // } else {
      //   throw new Error("Response was not ok");
      // }

      if (response.data.status === 201) {
        setSuccess("Đăng ký thành công!");
        navigate('/home');
      } else {
        throw new Error("Response was not ok");
      }
    } catch (e) {
      console.log(e);
      setError("Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại. ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center py-9 min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w4N3x8ZW58MHx8fHx8')",
      }}
    >
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Đăng Ký</h2>
        <form onSubmit={handleSignUp} method='post'>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Tên người dùng
              </span>
            </label>
            <input
              placeholder=". . ."
              type="text"
              name='name'
              value={credentials.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
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
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700">
                Số điện thoại
              </span>
            </label>
            <input
              type="tel"
              name='phone'
              value={credentials.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Mật khẩu
              </span>
              <input
                type="password"
                name='password'
                value={credentials.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="Mật khẩu của bạn"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Xác nhận mật khẩu
              </span>
              <input
                type="password"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="Xác nhận mật khẩu"
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng ký..." : "Đăng Ký"}
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
            Bạn đã có tài khoản?
            <Link to={"/auth/login"} className="text-blue-500 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </form>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        {success && (
          <p className="mb-4 text-center text-green-500">{success}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
