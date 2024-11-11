import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

 import userReducer from "./slice/userSlice";
 import authReducer from './slice/authSlice';
 import vehicleReducer from './slice/vehicleSlice'
 import waypointReducer from './slice/waypointSlice'
 import routeReducer from './slice/routeSlice'

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: rootReducer,
    auth: authReducer,
    vehicle: vehicleReducer,
    waypoint: waypointReducer,
    route: routeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
export default store;
