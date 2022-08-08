import * as ActionType from "../reducer/ActionType";

export const getPatient = () => (dispatch) => {
  try{
    fetch("http://localhost:3000/patients")
    .then((response) => response.json())
    .then((data) => dispatch({ type: ActionType.GET_PAT_DATA, payload: data}));
  } catch (err){
    console.log(err);
  }

  
};
