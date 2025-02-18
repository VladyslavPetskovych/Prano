import { createSlice } from "@reduxjs/toolkit";

// Fetch stored token and user from localStorage
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

// If there's a user, parse it; otherwise, set it to null
let parsedUser = null;
try {
  if (storedUser) {
    parsedUser = JSON.parse(storedUser);
  }
} catch (error) {
  console.error("Error parsing user data from localStorage", error);
}

const initialState = {
  isAuth: !!storedToken, // Check if there's a token (authenticated)
  token: storedToken || null,
  user: parsedUser, // Use the parsed user or null if there's an error
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Store token and user in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.user = null;

      // Remove token and user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
