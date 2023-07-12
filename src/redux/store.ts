import accountReducer from "@/features/connectWallet";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authenSlice from "./authenSlice";
import modeSlide from "./modeSlide";

export const store = configureStore({
    reducer: {
        authen: authenSlice,
        account: accountReducer,
        mode: modeSlide,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;