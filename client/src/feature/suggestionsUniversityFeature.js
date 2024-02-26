import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { universityUrl } from "../Constant";
import { GET } from "../API";

const initialState = {
    status : 'idle',
    university : [],
};


//create async thunk gives the async function access of the dispatch , async funtion ko dispatch ka access de deta h
export const fetchUniversity = createAsyncThunk('university/fetchUniversity',async(searchValue) =>{
    try{
        const response = await GET(universityUrl + `${searchValue}`);
        const data = response?.data;
        return data;
    }
    catch(error){
        console.error(error.message);
    }
});

const suggestionsUniversitySlice = createSlice({
    name :'university',
    initialState,
    reducers : {
        updateStatus : (state, action)=>{
            state.status = action.payload;
        },
    },
    extraReducers(builder){
        builder
            .addCase(fetchUniversity.pending, (state, action) =>{
                state.status = 'pending'
            })
            .addCase(fetchUniversity.fulfilled, (state, action)=>{
                state.status = 'fulfilled',
                state.university = action.payload;
            })
            .addCase(fetchUniversity.rejected, (state, action)=>{
                state.status = 'failed'
                
            })
    }
})

export const {updateStatus, updateUniversity} = suggestionsUniversitySlice.actions;

export const getUniversitySuggestions = (state) => state.universitySuggestions.university;
export const getUniversityAPIStatus = (state) => state.universitySuggestions.status;

export default suggestionsUniversitySlice.reducer;  