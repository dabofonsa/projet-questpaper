import { createSlice } from "@reduxjs/toolkit";






const loginSlice = createSlice({
    name: "loginstatus",
    initialState: {value: false},
    reducers: {
        situation: (state, action) =>{
            state.value = action.payload;
        }
    }
})

export const {situation} = loginSlice.actions;

export default loginSlice.reducer;