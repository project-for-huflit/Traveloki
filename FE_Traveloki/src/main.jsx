import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {AuthWrapper} from "./components/context/authContext.jsx";
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthWrapper>
    </AuthWrapper> */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
