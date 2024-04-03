import axios from "axios";
import { env } from "./environment/environment";

export function checkDoctorStatus(doctorId, callBack){
    if(!doctorId) return;
    axios.get(env.api_Url + "getDoctorStatus?doctorId=" + doctorId)
    .then(res=>{
        callBack(res.data);
    }).catch(err=>{
        console.log(err);
    })
}