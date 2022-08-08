import { combineReducers } from "redux";
import counterReducer from "./reducer/counterReducer";
import { medicineReducer } from "./reducer/medicineReducer";
import { patientReducer } from "./reducer/patientReducer";


const rootReducer = combineReducers({
    counter: counterReducer,
    medicine: medicineReducer,
    pts: patientReducer,
});

export default rootReducer;