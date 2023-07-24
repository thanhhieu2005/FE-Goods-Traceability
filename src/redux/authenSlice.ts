import UserServices from "@/api/user_api";
import { createSlice } from "@reduxjs/toolkit";

let res: any;

if (localStorage.getItem("token") !== null) {
  res = await UserServices.RefreshUserAPI();

  console.log(res);
  
  if( res.status === undefined || res.status !== 200) {
    localStorage.clear();
  }
}

const initialState = {
  currentUserInfo: res?.data || {},
  token: localStorage.getItem("token") || "",
  isLogin: res?.data ? true : false,
};

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setCurrentUserInfo: (state, action) => {
      state.currentUserInfo = action.payload.model;
      state.token = action.payload.token;
      state.isLogin = true;
    },
    updateCurrentUserInfo: (state, action) => {
      state.currentUserInfo = action.payload;
    },
    logout: (state) => {
      state.currentUserInfo = {};
      state.token = "";
      state.isLogin = false;
    },
  },
});

export const { setCurrentUserInfo, updateCurrentUserInfo, logout } =
  authenSlice.actions;

export default authenSlice.reducer;
