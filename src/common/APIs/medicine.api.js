import { getMedicine } from "../request"


export const GetAllMedicine = (path) => {
    return getMedicine("medicine")
}