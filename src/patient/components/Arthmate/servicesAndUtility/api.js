import axios from "axios";

let BASE_URL = process.env.REACT_APP_BACKEND;

export async function getBasicDetails(userId, callback){

    axios.get(BASE_URL + "userDetails/getUserDetailsByUserId?userId=" + userId)
    .then(res=>{
        callback(res)
    })
}
export async function saveBasicDetails(data, callback){

    await axios.post(BASE_URL + "userDetails/basicDetail", data)
    .then(res=>{
        callback(res);
    }).catch(err=>console.log(err))
}

export async function saveAddressDetails(data, callback){

    await axios.post(BASE_URL + "userDetails/addressDetail", data)
    .then(res=>{
        callback(res);
    }).catch(err=>console.log(err))
}

export async function saveEmploymentDetails(data, callback){

    await axios.post(BASE_URL + "userDetails/employmentDetail", data)
    .then(res=>{
        callback(res);
    }).catch(err=>console.log(err))
}

export async function sendAadharOtp(userId, callback){

    axios.post(BASE_URL + "aadhaarXmlDownloadOtp?userId=" + userId)
    .then(res=>{
        callback(res);
    }).catch(err=>{
        console.log(err);
    })
}

export async function getBankList(method="Statement", callBack){

    axios.get(BASE_URL + "/getDigitapInstituteId?type=" + method)
    .then(res=>{
        callBack(res.data);
    }).catch(err=>console.warn(err));
}

export async function uploadDoc(userId, data, callBack){

    

    axios.post(BASE_URL + "/uploadDocuments", data)
    .then(res=>{
        callBack(res)
    }).catch(err=>console.warn(err))
}