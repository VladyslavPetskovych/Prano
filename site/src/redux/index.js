import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { attachStore } from "../api/api"; // імпорт attachStore

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// тут "прив'язуємо" store до api
attachStore(store);

export default store;
