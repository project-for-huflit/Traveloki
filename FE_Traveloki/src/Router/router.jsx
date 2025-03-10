// router.js
import { createBrowserRouter, Navigate } from "react-router-dom";

// import { lazy } from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

/**
 * @example
 * @code element={<AuthGuard><Profile /></AuthGuard>}
 */
// import AuthGuard from "../guards/AuthGuard.js";
import ProtectedRoute from "./ProtectedRoute.jsx";

import BookingCar from "../components/booking/BookingCar.jsx";
import ListVehicle from "../components/booking/ListMain.jsx";
// import ListMain from "../components/listVehicle/ListVehicleComponent.jsx";

import BookingBus from "../components/booking/BookingBus.jsx";
import BookingTrain from "../components/booking/BookingTrain.jsx";
import DatChoCuaToi from "../components/datChoCuaToi/DatChoCuaToi.jsx";
import LichSuDatCho from "../components/datChoCuaToi/LichSuDatCho.jsx";
import CancelTicketBus from "../components/cancel/CancelTicketBus.jsx";
import CancelTicketTrain from "../components/cancel/CancelTicketTau.jsx";
import CancelTicket from "../components/cancel/CancelTicket.jsx";
import Paymentsuccess from "../components/success/Paymentsuccess.jsx";
import { RatingCar } from "../components/rating/RatingCar.jsx";
import { RatingBus } from "../components/rating/RatingBus.jsx";
import { RatingTau } from "../components/rating/RatingTau.jsx";
import { ErrorPage } from "../pages/SystemPage/ErrorPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import ProfilePage from '../pages/Profile/index.jsx'
import Account from "../pages/account/index.jsx";
import Login from "../pages/Auth/LogIn";
import SignUp from "../pages/Auth/Register.jsx";
import CallBack from "../pages/Auth/CallBackPage.jsx";
import Loading from '../pages/loading/index.jsx'
// import ProfilePage from '../pages/Profile/index.jsx'
// import { TextEditorReact } from "../Customer/Rating/TextEditorReact.jsx";

// layouts
import MainLayout from '../layouts/mainLayout.jsx'
import SecondLayout from "../layouts/secondLayout.jsx"
import OnlyCanvas from '../layouts/centerLayout.jsx'


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
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Navigate to="/home" replace /> },
      {
        path: "home",
        element: <HomePage />
      },
      { path: "list/cars/result", element: <ProtectedRoute><Paymentsuccess /></ProtectedRoute> },
    ],
  },
  {
    path: 'user',
    element: <SecondLayout />,
    children: [
      {
        path: "history-booking",
        element: <ProtectedRoute><LichSuDatCho /></ProtectedRoute>
      },
      {
        path: "my-booking",
        element: <ProtectedRoute><DatChoCuaToi /></ProtectedRoute>,
      },
      {
        path: "rate",
        element: <SecondLayout />,
        children: [
            { path: "trips-car", element: <RatingCar /> },
            { path: "trips-bus", element: <RatingBus /> },
            { path: "trips-train", element: <RatingTau /> }
        ]
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "account",
        element: <Account />,
      }
    ]
  },
  {
    path: "user/my-booking/cancel",
    element: <OnlyCanvas />,
    children: [
      { path: "ticket", element: <CancelTicket />, },
      { path: "ticket-train", element: <CancelTicketTrain />, },
      { path: "ticket-bus", element: <CancelTicketBus />, },
    ]
  },

  // ======================================================================================================
  {
    path: 'airport-transfer/search',
    element: <SecondLayout />,
    children: [
      { path: "list", element: <ListVehicle/>, },
      { path: "list/cars", element: <ProtectedRoute><BookingCar /></ProtectedRoute>, },
      { path: "list/bus", element: <ProtectedRoute><BookingBus /></ProtectedRoute>, },
      { path: "list/trains", element: <ProtectedRoute><BookingTrain /></ProtectedRoute>, },
      // { path: "list/cars/result", element: <ProtectedRoute><Paymentsuccess /></ProtectedRoute> },
    ],
  },
  { path: 'swagger', element: <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" /> }
]);

export default router;
