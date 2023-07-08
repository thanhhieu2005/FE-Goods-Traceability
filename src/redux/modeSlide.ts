import UserServices from "@/api/user_api";
import { createSlice } from "@reduxjs/toolkit"

const res: any = await UserServices.getCurrentMode();

const initialState = {
    currentMode: res.data.result || "",
}

export const modeSlide = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setBlockchainMode: (state, action) => {
            state.currentMode = action.payload.mode;
        },
        updateBlockchainMode: (state, action) => {
            state.currentMode = action.payload;
        },
        clearBlockchainMode: (state) => {
            state.currentMode="";
        }
    }
})

export const { setBlockchainMode, updateBlockchainMode, clearBlockchainMode } = modeSlide.actions;

export default modeSlide.reducer;