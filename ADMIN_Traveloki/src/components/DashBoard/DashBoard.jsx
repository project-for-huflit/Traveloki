import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ChartBookingCar } from './ChartBookingCar';
import { getUser } from '../../services/api/Account/apiGetUser';
import {
  fetchHistoryCar,
  fetchHistoryBus,
  fetchHistoryTrain,
} from '../../services/api/Dashboard/apiDashboard.js';

export const Dashboard = () => {
  // const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const [isLoading, setIsLoading] = useState(true);
  const [slCar, setSlCar] = useState([]);
  const [slTrain, setSlTrain] = useState([]);
  const [slBus, setSlBus] = useState([]);
  const [error, setError] = useState(null);

  const [user, setUser] = useState([]);
  const fetchUser = async () => {
    try {
      const res = await getUser();
      console.log('API Response:', res);
      setUser(res.data.users);
    } catch (error) {
      setError('Không thể lấy dữ liệu từ máy chủ');
    } finally {
      setIsLoading(false);
    }
  };

  window.addEventListener('message', (event) => {
    if (event.origin === 'http://localhost:5173') {
      const { token, refreshToken, user } = event.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', user);
    }
  });

  //get History
  useEffect(() => {
    //get HistoryCar
    const historyCar = async () => {
      try {
        const res = await fetchHistoryCar();
        console.log(res.lichSuDatXeOto);
        setSlCar(res.lichSuDatXeOto);
      } catch (error) {
        setError('Không thể lấy dữ liệu từ máy chủ oto');
      } finally {
        setIsLoading(false);
      }
    };

    //get HistoryTrain
    const historyTrain = async () => {
      try {
        const res = await fetchHistoryTrain();
        console.log(res.lichSuDatTau);
        setSlTrain(res.lichSuDatTau);
      } catch (error) {
        setError('Không thể lấy dữ liệu từ máy chủ tau');
      } finally {
        setIsLoading(false);
      }
    };

    //get HistoryBus
    const historyBus = async () => {
      try {
        const res = await fetchHistoryBus();
        setSlBus(res.buyTicketBus);
      } catch (error) {
        setError('Không thể lấy dữ liệu từ máy chủ bus');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
    historyCar();
    historyBus();
    historyTrain();
  }, []);

  //Tính sl đã đặt
  const totalBookingsCar = slCar.length;
  const totalBookingsTrain = slTrain.length;
  const totalBookingsBus = slBus.length;
  console.log('dasjdsaj', totalBookingsBus);
  const total = totalBookingsCar + totalBookingsTrain + totalBookingsBus;

  if (isLoading)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );

  return (
    <main className="">
      <div className="p-6">
        <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>
        {/*Responsive dòng 1*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Bảng 1 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-sm font-medium text-gray-400 mb-[12px]">
                  Số lượng chuyến
                </div>
                <div className="text-5xl font-semibold mb-1">
                  {totalBookingsCar + totalBookingsBus + totalBookingsTrain}
                </div>
              </div>
            </div>
          </div>
          {/* Bảng 2 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-4">
              <div>
                <div className="flex items-center mb-1">
                  <div className="text-2xl font-semibold">{user.length}</div>
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Khách hàng
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block"
              />
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block -ml-3"
              />
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block -ml-3"
              />
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block -ml-3"
              />
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block -ml-3"
              />
            </div>
          </div>
          {/* Bảng 3 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-semibold mb-1">
                  <span className="text-base font-normal text-gray-400 align-top">
                    đ
                  </span>
                  1,843,242,345
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Lợi nhuận
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Responsive dòng 2*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Bảng 4 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                {/* Tổng số lượng xe đã đặt */}
                <div className="text-2xl font-semibold mb-1">
                  {totalBookingsCar}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Số lượng đặt xe
                </div>
              </div>
            </div>
            {/* <div className="flex items-center">
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="h-full bg-blue-500 rounded-full p-1"
                  style={{ width: `${(totalBookingsCar / total) * 100}` }}
                >
                  <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 ml-4">
                {(totalBookingsCar / total) * 100}%
              </span>
            </div> */}
          </div>
          {/* Bảng 5 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                {/* Tổng số lượng xe đã đặt */}
                <div className="text-2xl font-semibold mb-1">
                  {totalBookingsTrain}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Số lượng đặt Tàu
                </div>
              </div>
            </div>
            {/* <div className="flex items-center">
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="h-full bg-blue-500 rounded-full p-1"
                  style={{ width: `${(totalBookingsTrain / total) * 100}` }}
                >
                  <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 ml-4">
                {(totalBookingsTrain / total) * 100}%
              </span>
            </div> */}
          </div>
          {/* Bảng 6 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                {/* Tổng số lượng xe đã đặt */}
                <div className="text-2xl font-semibold mb-1">
                  {totalBookingsBus}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Số lượng đặt Bus
                </div>
              </div>
            </div>
            {/* <div className="flex items-center">
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="h-full bg-blue-500 rounded-full p-1"
                  style={{ width: `${(totalBookingsBus / total) * 100}` }}
                >
                  <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 ml-4">
                {(totalBookingsBus / total) * 100}%
              </span>
            </div> */}
          </div>
        </div>
        {/*Responsive dòng 3*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bảng 7 */}
          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <div className="flex justify-between mb-4 items-start">
              <div className="font-medium">Manage bookings</div>
              <div className="dropdown">
                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center mb-4 order-tab">
              <button
                type="button"
                data-tab="order"
                data-tab-page="active"
                className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 rounded-tl-md rounded-bl-md hover:text-gray-600 active"
              >
                Active
              </button>
              <button
                type="button"
                data-tab="order"
                data-tab-page="completed"
                className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600"
              >
                Completed
              </button>
              <button
                type="button"
                data-tab="order"
                data-tab-page="canceled"
                className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 rounded-tr-md rounded-br-md hover:text-gray-600"
              >
                Canceled
              </button>
            </div>
            <div className="overflow-x-auto">
              <table
                className="w-full min-w-[540px]"
                data-tab-for="order"
                data-page="active"
              >
                <thead>
                  <tr>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      Service
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Estimate
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Budget
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        In progress
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        In progress
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        In progress
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        In progress
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        In progress
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                className="w-full min-w-[540px] hidden"
                data-tab-for="order"
                data-page="completed"
              >
                <thead>
                  <tr>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      Service
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Estimate
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Budget
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                className="w-full min-w-[540px] hidden"
                data-tab-for="order"
                data-page="canceled"
              >
                <thead>
                  <tr>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      Service
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Estimate
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Budget
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Canceled
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Canceled
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Canceled
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Canceled
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        3 days
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $56
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Canceled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Bảng 8 */}
          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <div className="flex justify-between mb-4 items-start">
              <div className="font-medium">Manage Services</div>
            </div>
            <form action="" className="flex items-center mb-4">
              <div className="relative w-full mr-2">
                <input
                  type="text"
                  className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                  placeholder="Search..."
                />
                <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
              </div>
              <select className="text-sm py-2 pl-4 pr-10 bg-gray-50 border border-gray-100 rounded-md focus:border-blue-500 outline-none appearance-none bg-select-arrow bg-no-repeat bg-[length:16px_16px] bg-[right_16px_center]">
                <option value="">All</option>
              </select>
            </form>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px]">
                <thead>
                  <tr>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      Service
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Price
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Clicks
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        1K
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        1K
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        1K
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        1K
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                            >
                              Profile
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                            >
                              Settings
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        $235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        1K
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                            >
                              Profile
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                            >
                              Settings
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ChartBookingCar />
      </div>
    </main>
  );
};
