import { createSlice } from "@reduxjs/toolkit";
import RefreshUserAPI from "../api/user_api";


const res = await RefreshUserAPI();

const initialState = {
    currentUserInfo: res?.data || {},
    token: localStorage.getItem('token') || '',
    isLogin: res?.data ? true : false,
};

export const authenSlice = createSlice({
    name: "authen",
    initialState,
    reducers: {
        setCurrentUserInfo: (state, action) => {
            state.currentUserInfo = action.payload.user;
            state.token = action.payload.token;
            state.isLogin = true;
        },
        updateCurrentUserInfo: (state, action) => {
            state.currentUserInfo = action.payload;
        },
        logout: (state) => {
            state.currentUserInfo = {};
            state.token = '';
            state.isLogin = false;
        },
    },
});


export const { setCurrentUserInfo, updateCurrentUserInfo, logout } = authenSlice.actions;

export default authenSlice.reducer;