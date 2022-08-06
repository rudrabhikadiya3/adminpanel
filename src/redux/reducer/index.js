import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";

export const rootReducer = combineReducers({
  count: counterReducer,
});
