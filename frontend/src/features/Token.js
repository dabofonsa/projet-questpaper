import { createSlice } from "@reduxjs/toolkit";






const loginSlice = createSlice({
    name: "Tokenvalue",
    initialState: {value: ''},
    reducers: {
        tokenstate: (state, action) =>{
            state.value = action.payload;
        }
    }
})

export const {tokenstate} = loginSlice.actions;

export default loginSlice.reducer;