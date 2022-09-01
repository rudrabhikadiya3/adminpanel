import {
  addMedicine,
  deletMedicine,
  editMedicine,
  GetAllMedicine,
} from "../../common/APIs/medicine.api";
import * as ActionType from "../reducer/ActionType";

// show Data
export const getMedicine = () => (dispatch) => {
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

export const postData = (data) => (dispatch) => {
  try {
    addMedicine(data)
      .then((data) => {
        dispatch({ type: ActionType.ADD_DATA, payload: data.data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // fetch("http://localhost:3006/medicine", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     dispatch({ type: ActionType.ADD_DATA, payload: data });
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
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
