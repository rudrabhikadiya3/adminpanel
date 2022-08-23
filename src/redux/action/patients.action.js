
import { BASE_URL } from "../../shared/baseURL";
import * as ActionType from "../reducer/ActionType";

export const getPatient = () => (dispatch) => {
  try{
    fetch(`${BASE_URL}patients`)
    .then((response) => response.json())
    .then((data) => dispatch(
        { type: ActionType.GET_PAT_DATA, payload: data}
        ));
  } catch (err){
    console.log(err);
  }
};