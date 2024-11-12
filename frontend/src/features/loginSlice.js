import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuentaId: 0,
    tokken: "",
    URLBASE: ""
}
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        saveSessionToken: (state, action) => {
            state.tokken = action.payload;
        },
        saveBaseUrl: (state, action) => {
            state.URLBASE = action.payload;
        }
    }
})
export const { saveSessionToken, saveBaseUrl } = loginSlice.actions;
export default loginSlice.reducer;