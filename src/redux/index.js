import { combineReducers } from "redux";
import counterReducer from "./reducer/counterReducer";


const rootReducer = combineReducers({
    counter: counterReducer
});

export default rootReducer;