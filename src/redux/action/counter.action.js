import * as ActionType from "./actionTypes"

export const increment = () => (dispatch)=>{
    dispatch({type: ActionType.INCREMENT_COUNTER})
}
export const decriment = () => (dispatch)=>{
    dispatch({type: ActionType.DECREMENT_COUNTER})
}