
import { deletPatient, GetAllPatient, addPatient, editPatient } from "../../common/APIs/patient.api";
import * as ActionType from "../reducer/ActionType";

export const getPatient = () => (dispatch) => {
  try{
    setTimeout(function () {
      GetAllPatient()
        .then((res) =>
          dispatch({ type: ActionType.GET_PAT_DATA, payload: res.data })
        )
        .catch((error) => dispatch(errPat(error.message)));
    }, 2000);
  } catch (err){
    dispatch(errPat(err.message));
  }
};


export const postPatData = (data) => (dispatch) => {
  try {
    addPatient(data)
      .then((res) => {
        dispatch({ type: ActionType.ADD_PAT_DATA, payload: res.data });
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  } catch (error) {
    dispatch(errPat(error.message));
  }
};

export const deletPatientAction = (id) => (dispatch) => {
  try {

    deletPatient(id)
    .then(dispatch({ type: ActionType.DELETE_PAT_DATA, payload: id }))
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    dispatch(errPat(error.message));
  }
};


export const editPatientAction = (data) => (dispatch) => {
  try {
    editPatient(data)
    .then((res) => {
          dispatch({ type: ActionType.EDIT_PAT_DATA, payload:res.data });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  } catch (error) {
    dispatch(errPat(error.message));
  }
};

export const errPat = (error) => (dispatch) => {
  dispatch({ type: ActionType.PAT_ERROR, payload: error });
};