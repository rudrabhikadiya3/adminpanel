import ActionType from "../action/ActionType";

const initVal = {
    counter: 0,
};


export const counterReducer = (state = initVal, action) => {
    switch(action.type){
        case ActionType.INCREMENT:
            return { counter : state.counter + 1};
            break;
        case ActionType.deCREMENT:
            return { counter : state.counter + 1};
            break;
            default: return state;
    }

};

export default counterReducer;