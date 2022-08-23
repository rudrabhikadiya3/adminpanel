import { combineReducers } from "redux";
import counterReducer from "./reducer/counterReducer";
import { medicineReducer } from "./reducer/medicineReducer";
import { patientReducer } from "./reducer/patientReucer";


const rootReducer = combineReducers({
    counter: counterReducer,
    medicine: medicineReducer,
    patient: patientReducer
});

export default rootReducer;