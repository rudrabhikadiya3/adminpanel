import * as ActionType from "../reducer/ActionType";

const initVal = {
  isLoading: false,
  patient: [],
  error: "",
};
export const patientReducer = (state = initVal, action) => {
  switch (action.type) {
    case ActionType.GET_PAT_DATA:
      return {
        isLoading: false,
        patient: action.payload,
        error: "",
        ...state,
      };
    default:
      return state;
  }
};
