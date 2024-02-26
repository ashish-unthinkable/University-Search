import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../feature/userFeature'; // imported userSlice.reducer
import suggestionsUniversityReducer from '../feature/suggestionsUniversityFeature';

const rootReducer = combineReducers({
  user: userReducer,
  universitySuggestions : suggestionsUniversityReducer,
});

export default rootReducer;