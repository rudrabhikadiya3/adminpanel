
import * as ActionType from '../reducer/ActionType'


export const getMedicine = () => (dispatch)=> {
    fetch('http://localhost:3000/medicine')
    .then((response) => response.json())
    .then((data) => dispatch({type: ActionType.GET_DATA, payload:data}));
}