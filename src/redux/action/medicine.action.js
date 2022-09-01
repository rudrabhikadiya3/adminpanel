import {
  addMedicine,
  deletMedicine,
  editMedicine,
  GetAllMedicine,
} from "../../common/APIs/medicine.api";

import { collection, addDoc, getDocs } from "firebase/firestore";
import * as ActionType from "../reducer/ActionType";
import { db } from "../../firebase";

// show Data
export const getMedicine = () => async (dispatch) => {
  try {
    dispatch(loadMed());
    setTimeout(function () {
      GetAllMedicine()
        .then((data) =>
          dispatch({ type: ActionType.GET_DATA, payload: data.data })
        )
        .catch((error) => dispatch(errMed(error.message)));
    }, 1000);
  } catch (error) {
    dispatch(errMed(error.message));
  }
};

export const postData = (data) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "medicine"), data);
    // console.log("Document written with ID: ", docRef.id);
    dispatch({ type: ActionType.ADD_DATA, payload: data});
  } catch (error) {
    dispatch(errMed(error.message));
  }
};

export const apiDelete = (id) => (dispatch) => {
  try {
    deletMedicine(id)
      .then(dispatch({ type: ActionType.DEL_DATA, payload: id }))
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    dispatch(errMed(error.message));
  }
};

export const editMed = (data) => (dispatch) => {
  try {
    editMedicine(data)
      .then((data) => {
        dispatch({ type: ActionType.EDT_DATA, payload: data.data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    dispatch(errMed(error.message));
  }
};

export const loadMed = () => (dispatch) => {
  dispatch({ type: ActionType.LOADING_DATA });
};

export const errMed = (error) => (dispatch) => {
  dispatch({ type: ActionType.MED_ERROR, payload: error });
};
