import * as ActionType from "../action/actionTypes";

const initVal = {
  count: 0,
};

export const counterReducer = (state = initVal, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_COUNTER:
      return {
        ...state,
        count: state.count + 1,
      };
    case ActionType.DECREMENT_COUNTER:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
        return state;
      break;
  }
};
