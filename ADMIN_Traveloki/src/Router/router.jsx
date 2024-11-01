import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx';
import DanhSachSanBay from "../components/ListSanBay/DanhSachSanBay.jsx";
import CreateDanhSachSanBay from "../components/ListSanBay/CreateDanhSachSanBay.jsx";
import DanhSachTuyenXe from "../components/TuyenXe/DanhSachTuyenXe.jsx";
import CreateTuyenXe from "../components/TuyenXe/CreateTuyenXe.jsx";
import PhuongTien from "../components/PhuongTien/DanhSachPhuongTien.jsx";
import CreatePhuongTien from "../components/PhuongTien/CreatePhuongTien.jsx";
import DanhSachTramDung from "../components/TramDung/DanhSachTramDung.jsx";
import CreateTramDung from "../components/TramDung/CreateTramDung.jsx";
import ListDetailCar from "../components/DetailCar/ListDetailCar.jsx";
import CreateDetailCar from "../components/DetailCar/CreateDetailCar.jsx";
import GetDetailCar from "../components/DetailCar/GetDetailCar.jsx";
import EditDetailCar from "../components/DetailCar/UpdateDetail.jsx";
import ErrorPage from "./ErrorPage.jsx";
import {Dashboard} from "../components/DashBoard/DashBoard.jsx";
import DanhSachLichChay from "../components/LichChay/DanhSachLichChay.jsx";
import CreateLichChay from "../components/LichChay/CreateLichChay.jsx";
import Login from "../page/Login.jsx";

const router = createBrowserRouter([
  {
    path:"/login",
    element: <Login/>
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "home",
        element: <Dashboard/>,
      },
      {
        path: "airport/list",
        element: <DanhSachSanBay />,
      },
      {
        path: "airport/list/create",
        element: <CreateDanhSachSanBay />,
      },
      {
        path: "road/list",
        element: <DanhSachTuyenXe />,
      },
      {
        path: "road/list/create",
        element: <CreateTuyenXe />,
      },
      {
        path: "vehicle/list",
        element: <PhuongTien />,
      },
      {
        path: "vehicle/list/create",
        element: <CreatePhuongTien />,
      },
      {
        path: "waypoint/list",
        element: <DanhSachTramDung />,
      },
      {
        path: "waypoint/list/create",
        element: <CreateTramDung />,
      },
      {
        path: "detail-car/list",
        element: <ListDetailCar />,
      },
      {
        path: "detail-car/list/create",
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
        path: "schedule/list/create",
        element: <CreateLichChay/>
      },
      {
        path: "transactions/list",
        element: <CreateLichChay/>
      },
    ],
  },
]);

export default router;
