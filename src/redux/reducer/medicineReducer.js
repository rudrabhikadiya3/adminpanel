import * as ActionTypes from "./ActionType";

const initVal = {
  isLoading: false,
  medicine: [],
  error: "",
};
export const medicineReducer = (state = initVal, action) => {
  switch (action.type) {
    case ActionTypes.GET_DATA:
      return {
        ...state,
        isLoading: false,
        medicine: action.payload,
        error: "",
      };
    case ActionTypes.LOADING_DATA:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case ActionTypes.MED_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ActionTypes.ADD_DATA:
      return {
        ...state,
        isLoading: false,
        medicine: state.medicine.concat(action.payload),
      };
    case ActionTypes.DEL_DATA:
      return {
        ...state,
        isLoading: false,
        medicine: state.medicine.filter((m) => m.id !== action.payload),
      };
    case ActionTypes.EDT_DATA:
      return {
        ...state,
        isLoading: false,
        medicine: state.medicine.map((m) => {
          if (m.id === action.payload.id) {
            return action.payload;
          } else {
            return m;
          }
        }),
      };

    default:
      return state;
  }
};
