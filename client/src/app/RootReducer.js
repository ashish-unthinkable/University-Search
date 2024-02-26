import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../feature/userFeature'; // imported userSlice.reducer
// import warningReducer from '../feature/warningFeature';
import suggestionsUniversityReducer from '../feature/suggestionsUniversityFeature';

const rootReducer = combineReducers({
  user: userReducer,
  // warning : warningReducer,
  universitySuggestions : suggestionsUniversityReducer,
});

export default rootReducer;