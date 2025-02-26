import { createSlice } from "@reduxjs/toolkit";

const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");
const storedUserId = localStorage.getItem("userId");

const initialState = {
  isAuth: !!storedAccessToken, 
  accessToken: storedAccessToken || null,
  refreshToken: storedRefreshToken || null,
  userId: storedUserId || null, 
  user: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken, userId, user } = action.payload;

      state.isAuth = true;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userId = userId; 
      state.user = user; 

  
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId); 
    },
    logout: (state) => {
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.userId = null;
      state.user = null; 

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
    },
    setUser: (state, action) => {
     
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
