import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App.jsx';
import DanhSachSanBay from '../components/ListSanBay/DanhSachSanBay.jsx';
import CreateDanhSachSanBay from '../components/ListSanBay/CreateDanhSachSanBay.jsx';

import DanhSachTuyenXe from '../components/TuyenXe/DanhSachTuyenXe.jsx';
import ChiTietTuyenXe from '../page/detailRoute/index.jsx'
import CreateTuyenXe from '../components/TuyenXe/CreateTuyenXe.jsx';

import PhuongTien from '../components/PhuongTien/DanhSachPhuongTien.jsx';
import CreatePhuongTien from '../components/PhuongTien/CreatePhuongTien.jsx';
import DetailPhuongTien from '../page/detailVehicle/index.jsx';

import DanhSachTramDung from '../components/TramDung/DanhSachTramDung.jsx';
import CreateTramDung from '../components/TramDung/CreateTramDung.jsx';
import ChiTietTramDung from '../page/detailWaypoint/index.jsx'

import ListDetailCar from '../components/DetailCar/ListDetailCar.jsx';
import CreateDetailCar from '../components/DetailCar/CreateDetailCar.jsx';
import GetDetailCar from '../components/DetailCar/GetDetailCar.jsx';
import EditDetailCar from '../components/DetailCar/UpdateDetail.jsx';
import ErrorPage from './ErrorPage.jsx';
import { Dashboard } from '../components/DashBoard/DashBoard.jsx';
import DanhSachLichChay from '../components/LichChay/DanhSachLichChay.jsx';
import CreateLichChay from '../components/LichChay/CreateLichChay.jsx';
import DanhSachTaiKhoan from '../components/Partner/DanhSachTaiKhoan.jsx';
import DanhSachGiaoDich from '../components/Transaction/DanhSachGiaoDich.jsx';
import Login from '../page/Login.jsx';
import SignUp from "../page/Register.jsx";
import CallBack from "../page/CallBackPage";
import Loading from '../page/loading/index.jsx'

import OnlyCanvas from '../layouts/centerLayout.jsx'

import ProtectedRoute from './ProtectedRoute.jsx';



const router = createBrowserRouter([
  {
    path: 'auth',
    element: <OnlyCanvas />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <SignUp />},
      { path: 'callback', element: <CallBack />},
      { path: 'load', element: <Loading />}
    ]
  },
  {
    path: '',
    element:   <App />,
    errorElement: <ErrorPage />,
    children: [
      // { path: '', element: <Navigate to="/home" replace /> },
      {
        path: 'dashboard',
        // element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        element: <Dashboard />,
      },
      {
        path: 'airport/list',
        element: <DanhSachSanBay />,
      },
      {
        path: 'airport/list/create',
        element: <CreateDanhSachSanBay />,
      },
      {
        path: 'road/list',
        element: <DanhSachTuyenXe />,
      },
      {
        path: 'road/list/:slug',
        element: <ChiTietTuyenXe />,
      },
      {
        path: 'road/list/create',
        element: <CreateTuyenXe />,
      },
      {
        path: 'vehicle/list',
        element: <PhuongTien />,
      },
      {
        path: 'vehicle/list/:slug',
        element: <DetailPhuongTien />,
      },
      {
        path: 'vehicle/list/create',
        element: <CreatePhuongTien />,
      },
      {
        path: 'waypoint/list',
        element: <DanhSachTramDung />,
      },
      {
        path: 'waypoint/list/:slug',
        element: <ChiTietTramDung />,
      },
      {
        path: 'waypoint/list/create',
        element: <CreateTramDung />,
      },
      {
        path: 'detail-car/list',
        element: <ListDetailCar />,
      },
      {
        path: 'detail-car/list/create',
        element: <CreateDetailCar />,
      },

      {
        path: `GetDetailCar/:id`,
        element: <GetDetailCar />,
      },
      {
        path: `EditDetailCar/:id`,
        element: <EditDetailCar />,
      },
      {
        path: 'schedule/list',
        element: <DanhSachLichChay />,
      },
      {
        path: 'schedule/list/create',
        element: <CreateLichChay />,
      },
      {
        path: 'transactions/list',
        element: <CreateLichChay />,
      },
      {
        path: 'account/list',
        element: <DanhSachTaiKhoan />,
      },
      {
        path: 'transaction/list',
        element: <DanhSachGiaoDich />,
      },
    ],
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'airport/list',
        element: <DanhSachSanBay />,
      },
      {
        path: 'airport/list/create',
        element: <CreateDanhSachSanBay />,
      },
      {
        path: 'road/list',
        element: <DanhSachTuyenXe />,
      },
      {
        path: 'road/list/create',
        element: <CreateTuyenXe />,
      },
      {
        path: 'vehicle/list',
        element: <PhuongTien />,
      },
      {
        path: 'vehicle/list/create',
        element: <CreatePhuongTien />,
      },
      {
        path: 'waypoint/list',
        element: <DanhSachTramDung />,
      },
      {
        path: 'waypoint/list/create',
        element: <CreateTramDung />,
      },
      {
        path: 'schedule/list',
        element: <DanhSachLichChay />,
      },
      {
        path: 'schedule/list/create',
        element: <CreateLichChay />,
      },
      {
        path: 'transactions/list',
        element: <CreateLichChay />,
      },
    ],
  },
]);

export default router;
