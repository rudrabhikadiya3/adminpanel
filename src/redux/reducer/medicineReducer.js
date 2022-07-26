
import * as ActionTypes from './ActionType';


const initVal = {
    isLoading: false,
    medicine: []
}

export const medicineReducer = (state= initVal, action) =>{
    switch (action.type) {
        case ActionTypes.GET_DATA:
            return{
                ...state,
                isLoading: false,
                medicine: action.payload
            }
            break;
    
        default: return state;
    }
}


