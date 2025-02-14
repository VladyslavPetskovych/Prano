import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null, // Can store user data like email, role, etc.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload; // Store user info
      localStorage.setItem("user", JSON.stringify(action.payload)); // Persist login
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("user"); // Remove from storage
    },
    checkAuth: (state) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        state.isAuth = true;
        state.user = storedUser;
      }
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
