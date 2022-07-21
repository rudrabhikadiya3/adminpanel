import * as ActionType from './ActionType'

const initVal = {
    counter: 0,
};

console.log();
export const counterReducer = (state = initVal, action) => {
    switch(action.type){
        case ActionType.INCREMENT:
            return { counter : state.counter + 1};
            break;
        case ActionType.DECREMENT:
            return { counter : state.counter - 1};
            break;
            default: return state;
    }

};

export default counterReducer;