
import * as ActionTypes from './ActionType';

const initVal = {
    isLoading: false,
    medicine: [],
    error: ''
}

export const medicineReducer = (state= initVal, action) =>{
    switch (action.type) {
        case ActionTypes.GET_DATA:
            return{
                ...state,
                isLoading: false,
                medicine: action.payload,
                error: '',
            }
            break;
        case ActionTypes.LOADING_DATA:
            return{
                ...state,
                isLoading: true,
                error: '',
            }
            break;
        case ActionTypes.MED_ERROR:
            return{
                ...state,
                isLoading: false,
                error: action.payload,
            }
            break;
        case ActionTypes.ADD_DATA:
            return{
                ...state,
                isLoading: false,
                medicine: state.medicine.concat(action.payload),
            }
            break;
    
        default: return state;
    }
}