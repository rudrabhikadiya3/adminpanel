import { deletReq, getMedicine, postReq, putReq } from "../request"


export const GetAllPatient = (path) => {
    return getMedicine("patients")
}
export const addPatient = (data) =>{
    return postReq('patients/', data)
}
export const deletPatient = (id) =>{
    return deletReq('patients/', id)
}
export const editPatient = (data) =>{
    return putReq('patients/', data)
}
