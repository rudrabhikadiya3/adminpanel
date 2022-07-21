import {INCREMENT, DECREMENT} from '../reducer/ActionType';
 
export const increment = () => (dispatch) =>{
    dispatch({ type : INCREMENT})
}
export const decrement = () => (dispatch) =>{
    dispatch({ type : DECREMENT})
}