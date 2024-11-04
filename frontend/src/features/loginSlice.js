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
        saveSessionId: (state, actions) => {
            state.cuentaId = actions.payload;
        },
        saveSessionToken: (state, action) => {
            state.tokken = action.payload;
        },
        saveBaseUrl: (state, action) => {
            state.URLBASE = action.payload;
        }
    }
})
export const { saveSessionId, saveSessionToken, saveBaseUrl } = loginSlice.actions;
export default loginSlice.reducer;