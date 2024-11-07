import React from "react";
import ReactDOM from "react-dom/client";
import router from './Router/router.jsx';
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {AuthWrapper} from "./components/context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router}/>
    </AuthWrapper>
  </React.StrictMode>
);
