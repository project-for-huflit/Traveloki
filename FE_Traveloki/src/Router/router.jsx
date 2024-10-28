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
// import Login from "../pages/Auth/LogIn.jsx";
import Login from "../pages/Auth/LogIn";
import SignUp from "../pages/Auth/Register.jsx";
import CallBack from "../pages/Auth/CallBackPage.jsx";
import Loading from '../pages/loading/index.jsx'
import ProfilePage from '../pages/Profile/index.jsx'
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
      { path: 'loading', element: <Loading />}
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
      }
    ],
  },
  {
    path: 'user',
    element: <SecondLayout />,
    children: [
      { path: "history-booking", element: <LichSuDatCho /> },
      {
        path: "my-booking",
        element: <DatChoCuaToi />,
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
        element: <Paymentsuccess />,
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
      { path: "list/cars", element: <BookingCar />, },
      { path: "list/bus", element: <BookingBus />, },
      { path: "list/trains", element: <BookingTrain />, },
      { path: "list/cars/result", element: <Paymentsuccess /> },
    ],
  },
  { path: 'swagger', element: <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" /> }
]);

export default router;
