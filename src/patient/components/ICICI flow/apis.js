import axios from "axios";
import { env } from "../../environment/environment";

export function preEligibility(number, callback){
    let data = {
        "mobileNo": number, // only this
        "tenure" : "",
        "panNo" : "",
        "transactionId" : "",
        "downPaymentEmi" : "",
        "requestLoanAmount" : "",
        "otpValidation" : "",
        "otpConfirmation" : "",
        "processInstanceId" : ""
    
    }
    axios.post(env.api_Url + "icici/preEligibility", data)
    .then(res=>{
        callback(res);
    }).catch(e=>{
        
    })
}

export function eligibility(number, reqLoanAmt, tenure, txnId, panNo, callback){
    let data = {
        "mobileNo": number, // only this
        "tenure" : tenure,
        "panNo" : panNo,
        "transactionId" : txnId,
        "downPaymentEmi" : "",
        "requestLoanAmount" : reqLoanAmt,
        "otpValidation" : "",
        "otpConfirmation" : "",
        "processInstanceId" : ""
    
    }
    axios.post(env.api_Url + "icici/eligibility", data)
    .then(res=>{
        callback(res);
    }).catch(e=>{

    })
}

export function reSendOtp(){

}

export function validateUser(otp, txnId, pInstId, callback){
    let data = {
        "mobileNo": "", // only this
        "tenure" : "",
        "panNo" : "",
        "transactionId" : txnId,
        "downPaymentEmi" : "",
        "requestLoanAmount" : "",
        "otpValidation" : otp,
        "otpConfirmation" : "",
        "processInstanceId" : pInstId
    
    }
    axios.post(env.api_Url + "icici/validateUser", data)
    .then(res=>{
        callback(res);
    }).catch(e=>{

    })
}

export function confirmUser(reqLoanAmt, tenure, txnId, pInstId, callback){
    let data = {
        "mobileNo": "", // only this
        "tenure" : tenure,
        "panNo" : "",
        "transactionId" : txnId,
        "downPaymentEmi" : "",
        "requestLoanAmount" : reqLoanAmt,
        "otpValidation" : "",
        "otpConfirmation" : "",
        "processInstanceId" : pInstId
    
    }
    console.log(data)
    axios.post(env.api_Url + "icici/confirmUser", data)
    .then(res=>{
        callback(res);
    }).catch(e=>{

    })
}