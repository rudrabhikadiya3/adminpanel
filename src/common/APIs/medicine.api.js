
import { deletReq, getMedicine, postReq, putReq } from "../request"


export const GetAllMedicine = (path) => {
    return getMedicine("medicine")
}
export const addMedicine = (data) =>{
    return postReq('medicine/', data)
}
export const deletMedicine = (id) =>{
    return deletReq('medicine/', id)
}
export const editMedicine = (data) =>{
    return putReq('medicine/', data)
}
