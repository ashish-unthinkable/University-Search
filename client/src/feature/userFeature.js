import { createSlice } from "@reduxjs/toolkit";

const localStorageUser = localStorage.getItem("user");
const initialState = localStorageUser !== null ? JSON.parse(localStorageUser) : "";


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      if(action.payload !== null){
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
      return action.payload 
    },
  },
});

export const {updateUser} = userSlice.actions;

export default userSlice.reducer;

// The updateUser is a reducer that has state and 'user/updateUser' as action i.e. "name/reducer"