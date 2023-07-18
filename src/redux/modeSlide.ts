import UserServices from "@/api/user_api";
import { createSlice } from "@reduxjs/toolkit";

let res: any;

if (localStorage.getItem("token") !== null) {
  res = await UserServices.getCurrentMode();

  if(res.status !== 200 || res.status === undefined) {
    localStorage.clear();
  }
}

const initialState = {
  currentMode: res?.data.result || "",
};

export const modeSlide = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setBlockchainMode: (state, action) => {
      state.currentMode = action.payload.mode;
    },
    updateBlockchainMode: (state, action) => {
      state.currentMode = action.payload;
    },
    clearBlockchainMode: (state) => {
      state.currentMode = "";
    },
  },
});

export const { setBlockchainMode, updateBlockchainMode, clearBlockchainMode } =
  modeSlide.actions;

export default modeSlide.reducer;
