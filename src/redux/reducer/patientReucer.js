import * as ActionType from "../reducer/ActionType";

const initVal = {
  isLoading: false,
  patient: [],
  error: "",
};
export const patientReducer = (state = initVal, action) => {
  console.log("reducer info:", action.type, action.payload);
  switch (action.type) {
    case ActionType.GET_PAT_DATA:
      return {
        ...state,
        isLoading: false,
        patient: action.payload,
        error: "",
      };
    case ActionType.ADD_PAT_DATA:
      return {
        ...state,
        isLoading: false,
        patient: state.patient.concat(action.payload),
      };
    case ActionType.DELETE_PAT_DATA:
      return {
        ...state,
        isLoading: false,
        patient: state.patient.filter((p) => p.id !== action.payload),
      };
      case ActionType.EDIT_PAT_DATA:
      return {
        ...state,
        isLoading: false,
        patient: state.patient.map((p) => {
          if (p.id === action.payload.id) {
            return action.payload;
          } else {
            return p;
          }
        }),
      };
    default:
      return state;
  }
};
