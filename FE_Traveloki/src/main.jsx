import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"
// import {AuthWrapper} from "./components/context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthWrapper>
    </AuthWrapper> */}
    <App />
  </React.StrictMode>
);
