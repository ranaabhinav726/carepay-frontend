import axios from "axios";

let BASE_URL = process.env.REACT_APP_BACKEND;

export async function getBasicDetails(userId, callback) {

    axios.get(BASE_URL + "userDetails/getUserDetailsByUserId?userId=" + userId)
        .then(res => {
            callback(res)
        })
}
export async function saveBasicDetails(data, callback) {

    await axios.post(BASE_URL + "userDetails/basicDetail", data)
        .then(res => {
            callback(res);
        }).catch(err => console.log(err))
}

export async function saveAddressDetails(data, callback) {

    await axios.post(BASE_URL + "userDetails/addressDetail", data)
        .then(res => {
            callback(res);
        }).catch(err => console.log(err))
}

export async function saveEmploymentDetails(data, callback) {

    await axios.post(BASE_URL + "userDetails/employmentDetail", data)
        .then(res => {
            callback(res);
        }).catch(err => console.log(err))
}

export async function saveOrUpdateAdditionalUserData(data, callback) {
    await axios.post(BASE_URL + "userDetails/saveOrUpdateAdditionalUserData", data)
        .then(res => {
            callback(res);
        }).catch(err => console.log(err))
}

export async function sendAadharOtp(userId, callback) {

    axios.post(BASE_URL + "aadhaarXmlDownloadOtp?userId=" + userId)
        .then(res => {
            callback(res);
        }).catch(err => {
            console.log(err);
        })
}

export async function getBankList(method = "Statement", callBack) {

    axios.get(BASE_URL + "/getDigitapInstituteId?type=" + method)
        .then(res => {
            callBack(res.data);
        }).catch(err => console.warn(err));
}

export async function startUploadURL(userId, id, callBack) {

    axios.post(BASE_URL + "/startUploadURL?userId=" + userId + "&institutionId=" + id)
        .then(res => {
            callBack(res.data);
        }).catch(err => console.warn(err));
}


export async function uploadDoc(data, callBack) {



    axios.post(BASE_URL + "uploadDocuments", data)
        .then(res => {
            callBack(res)
        }).catch(err => console.warn(err))
}
export async function saveMonthlyExpensesApi(data, callBack) {
    axios.put(BASE_URL + "userDetails/saveMonthlyEmiExpense?userId=" + data.userId + '&monthlyEmiExpense=' + data.monthliEmiExpense)
        .then(res => {
            callBack(res)
        }).catch(err => console.warn(err))
}
export const uploadPdfNew = (
    file, userId, fileName,
    callBack
) => {
    var self = this
    return new Promise((resolve, reject) => {
        var self = this
        let imageFormData = new FormData()
        imageFormData.append('file', file)
        imageFormData.append('userId', userId)
        imageFormData.append("type", "pdf");
        imageFormData.append("fileName", fileName);
        var xhr = new XMLHttpRequest()
        xhr.open('post', BASE_URL + "uploadDocuments", true)
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response)
                callBack(this.response)
            } else {
                reject(this.statusText)
                callBack(this.response)
            }
        }
        xhr.send(imageFormData)
    })
}
export  function getKycStatusApi(userId, type, callBack) {

    axios.get(BASE_URL + "checkKycValidation?userId=" + userId + '&type=' + type)
        .then(res => {
            callBack(res.data);
        }).catch(err => console.warn(err));
}
export  function getBankListApi( callBack) {

    axios.get(BASE_URL + 'getBanksInformation?page_no=1&no_of_entry=300')
        .then(res => {
            callBack(res.data);
        }).catch(err => console.warn(err));
}