import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuentaId: 0,
    tokken: ""

}
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        saveSessionToken: (state, action) => {
            state.tokken = action.payload;
        }
        
    }
})
export const { saveSessionToken } = loginSlice.actions;
export default loginSlice.reducer;