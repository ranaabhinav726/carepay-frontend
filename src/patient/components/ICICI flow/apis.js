import axios from "axios";
import { env } from "../../environment/environment";

export function preEligibility(number, callback) {
  let data = {
    mobileNo: number, // only this
    tenure: "",
    panNo: "",
    transactionId: "",
    downPaymentEmi: "",
    requestLoanAmount: "",
    otpValidation: "",
    otpConfirmation: "",
    processInstanceId: "",
  };
  axios
    .post(env.api_Url + "icici/preEligibility", data)
    .then((res) => {
      callback(res);
    })
    .catch((e) => {});
}

export function eligibility(
  number,
  reqLoanAmt,
  tenure,
  txnId,
  panNo,
  callback,
  hideWaitingModal
) {
  let data = {
    mobileNo: number, // only this
    tenure: tenure,
    panNo: panNo,
    transactionId: txnId,
    downPaymentEmi: "",
    requestLoanAmount: reqLoanAmt,
    otpValidation: "",
    otpConfirmation: "",
    processInstanceId: "",
  };
  axios
    .post(env.api_Url + "icici/eligibility", data)
    .then((res) => {
      hideWaitingModal();
      callback(res);
    })
    .catch((e) => {
      hideWaitingModal();
    });
}

export function reSendOtp() {}

export function validateUser(otp, txnId, pInstId, callback, hideWaitingModal) {
  let data = {
    mobileNo: "", // only this
    tenure: "",
    panNo: "",
    transactionId: txnId,
    downPaymentEmi: "",
    requestLoanAmount: "",
    otpValidation: otp,
    otpConfirmation: "",
    processInstanceId: pInstId,
  };
  axios
    .post(env.api_Url + "icici/validateUser", data)
    .then((res) => {
      callback(res);
    })
    .catch((e) => {
      hideWaitingModal();
    });
}

export function confirmUser(
  reqLoanAmt,
  tenure,
  txnId,
  pInstId,
  callback,
  hideWaitingModal
) {
  let data = {
    mobileNo: "", // only this
    tenure: tenure,
    panNo: "",
    transactionId: txnId,
    downPaymentEmi: "",
    requestLoanAmount: reqLoanAmt,
    otpValidation: "",
    otpConfirmation: "",
    processInstanceId: pInstId,
  };
  console.log(data);
  axios
    .post(env.api_Url + "icici/confirmUser", data)
    .then((res) => {
      callback(res);
      hideWaitingModal();
    })
    .catch((e) => {
      hideWaitingModal();
    });
}

export function downloadKfs(userId, hideWaitingModal, callBack) {
  axios
    .get(env.api_Url + "getKFSDocument?userId=" + userId, {responseType: 'blob'})
    .then((res) => {
      if (res.status === 200) {
        let fileBlob = res.data;
        // let file = new File([fileBlob], 'KFS.pdf',{type:"application/pdf"});
        let fileURL = window.URL.createObjectURL(fileBlob);
        console.log(fileURL);
        const link = document.createElement("a");
        link.href = fileURL;
        link.style.display = "none";
        link.setAttribute("download", `KFS.pdf`);
        document.body.appendChild(link);
        link.click();
        hideWaitingModal();
        callBack();
      }
    })
    .catch((e) => {
      hideWaitingModal();
      console.warn(e);
    });
}
