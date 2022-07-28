import * as ActionType from "../reducer/ActionType";

export const getMedicine = () => (dispatch) => {
  try {
    dispatch(loadMed())

    setTimeout(function() {
        fetch("http://localhost:3000//medicine")
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('ERROR ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
          },
            error => {
              var errmess = new Error(error.message);
              throw errmess;
            })
    .then((response) => response.json())
    .then((data) => dispatch({ type: ActionType.GET_DATA, payload: data }))
    .catch((error)=> dispatch(errMed(error.message)))
    }, 2000)
  } catch {
    
  }
};

export const loadMed = () => (dispatch) =>{
    dispatch({type: ActionType.LOADING_DATA})
}
export const errMed = (error) => (dispatch) =>{
    dispatch({type: ActionType.MED_ERROR, payload: error})
}
