import {
  addMedicine,
  deletMedicine,
  editMedicine,
  GetAllMedicine,
} from "../../common/APIs/medicine.api";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import * as ActionType from "../reducer/ActionType";
import { db } from "../../firebase";

// READ
export const getMedicine = () => async (dispatch) => {
  let data = [];
  const querySnapshot = await getDocs(collection(db, "medicine"));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  dispatch({ type: ActionType.GET_DATA, payload: data });
};
// CREATE
export const postData = (data) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "medicine"), data);
    dispatch({
      type: ActionType.ADD_DATA,
      payload: { id: docRef.id, ...data },
    });
  } catch (error) {
    dispatch(errMed(error.message));
  }
};
// DELETE
export const apiDelete = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "medicine", id));
    dispatch({ type: ActionType.DEL_DATA, payload: id });
  } catch (error) {
    console.log(error);
  }
};
// UPDATE
export const editMed = (data) => async (dispatch) => {
  const medicineRef = doc(db, "medicine", data.id);

  await updateDoc(medicineRef, {
    expiry: data.expiry,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  });
  dispatch({ type: ActionType.EDT_DATA, payload: data });
};


export const loadMed = () => (dispatch) => {
  dispatch({ type: ActionType.LOADING_DATA });
};
export const errMed = (error) => (dispatch) => {
  dispatch({ type: ActionType.MED_ERROR, payload: error });
};