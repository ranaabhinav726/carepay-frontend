import axios from "axios";
import { env } from "../../../../environment/environment";

export function getPincodeDetails(pincode){
    if(pincode.length !== 6){
        return;
    }
    axios.get(env.api_Url+"userDetails/codeDetail?code=" + pincode +"&type=zip")
    .then(response =>{
        // console.log(response)
        return response;
    }).catch(error=>{
        console.warn(error);
    })
}

// export function handlePincode(value, setValue){
//     if(val.length !== 6){
//         return;
//     }
//     axios.get(env.api_Url+"userDetails/codeDetail?code=" + pincode +"&type=zip")
//     .then(response =>{
//         console.log(response)
//         return response;
//     }).catch(error=>{
//         console.warn(error);
//     })
// }