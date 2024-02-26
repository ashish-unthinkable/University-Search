import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    emailWarning : false,
    passwordWarning : false,
    doesExistWarning : false
}


export const warningSlice = createSlice({
    name : "warning",
    initialState : initialState,
    reducers : {
        updateEmailWarning : (state, action) => {
            // state.warning = action.payload
            state.emailWarning = action.payload;
        },
        updatePasswordWarning : (state, action) => {
            state.passwordWarning =  action.payload;
        },
        updateDoesExistWarning : (state, action) => {
            state.doesExistWarning =  action.payload;
        }
    }
})

export const {updateEmailWarning, updatePasswordWarning, updateDoesExistWarning} = warningSlice.actions;

export default warningSlice.reducer;

