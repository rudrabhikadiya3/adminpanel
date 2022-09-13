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
  getStorage,
} from "firebase/firestore";
import * as ActionType from "../reducer/ActionType";
import { db, storage } from "../../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

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
    const randomNum = Math.floor(Math.random() * 100000).toString();
    const imgRef = ref(storage, `medicine/${randomNum}`);

    uploadBytes(imgRef, data.img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const docRef = await addDoc(collection(db, "medicine"), {
          ...data,
          img: url,
          fileName: randomNum,
        });
        dispatch({
          type: ActionType.ADD_DATA, payload: { id: docRef.id, ...data, img: url },});
      });
    });

  } catch (error) {
    dispatch(errMed(error.message));
  }
};
// DELETE
export const apiDelete = (data) => async (dispatch) => {
  try {
    console.log(data);
    

    const medicineRef = ref(storage, `medicine/${data.fileName}`);

   
    deleteObject(medicineRef)
      .then(async() => {
        await deleteDoc(doc(db, "medicine", data.id));
        dispatch({ type: ActionType.DEL_DATA, payload: data.id });
      })
      .catch((error) => {
        dispatch(errMed(error.message));
      });
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
