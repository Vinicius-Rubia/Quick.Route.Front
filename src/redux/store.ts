import { combineReducers, configureStore } from "@reduxjs/toolkit";
import flowSlice from "./flowSlice";

const combinedReducer = combineReducers({
  flowModel: flowSlice,
});

export default configureStore({
  reducer: combinedReducer,
});
