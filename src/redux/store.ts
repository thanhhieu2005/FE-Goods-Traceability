import { configureStore } from "@reduxjs/toolkit";
import authenSlice from "./authenSlice";

export const store = configureStore({
    reducer: {
        authen: authenSlice,
    },
});