import axios from 'axios';
import { APIS } from '../../../../../utils/apifactory';


export const createCashfreeSubscription = (userId, callBack) => {
    axios.post(APIS.CREATE_CASHFREE_MANDATE_SUBSCRIPTION + userId + '&type=PERIODIC')
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('Response error:', error.response.data);
                callBack({ error: error.response.data });
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack({ error: 'Request error: No response received' });
            } else {
                console.error('Error:', error.message);
                callBack({ error: 'Error: ' + error.message });
            }
        });
};
export const createAuthRequest = (userId, loanId, type, vpa, callBack) => {
    axios.post(APIS.CREATE_AUTH_REQUEST + userId + '&loanId=' + loanId + '&type=' + type + '&vpa=' + vpa)
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('Response error:', error.response.data);
                callBack({ error: error.response.data });
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack({ error: 'Request error: No response received' });
            } else {
                console.error('Error:', error.message);
                callBack({ error: 'Error: ' + error.message });
            }
        });
};
export const getPaymentStatusApi = (loanId, paymentType, callBack) => {
    axios.get(APIS.GET_AUTH_PAYMENT + loanId + '&paymentType=' + paymentType)
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('Response error:', error.response.data);
                callBack({ error: error.response.data });
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack({ error: 'Request error: No response received' });
            } else {
                console.error('Error:', error.message);
                callBack({ error: 'Error: ' + error.message });
            }
        });
};
export const getNachDetails = (loanId, callBack) => {
    axios.get(APIS.GET_NACH_DETAILS + loanId +'&noOfEmi=1')
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('Response error:', error.response.data);
                callBack({ error: error.response.data });
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack({ error: 'Request error: No response received' });
            } else {
                console.error('Error:', error.message);
                callBack({ error: 'Error: ' + error.message });
            }
        });
};
export const verifyUpiAPi = (userId,handelToCheck, callBack) => {
    axios.get(APIS.VERIFY_UPI_ID + userId + '&handelToCheck=' + handelToCheck)
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('Response error:', error.response.data);
                callBack({ error: error.response.data });
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack({ error: 'Request error: No response received' });
            } else {
                console.error('Error:', error.message);
                callBack({ error: 'Error: ' + error.message });
            }
        });
};
export const getBankListByUserId = (userId, callBack) => {
    axios.get(APIS.GET_BANK_LIST_FOR_USERS + userId )
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('Response error:', error.response.data);
                callBack({ error: error.response.data });
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack({ error: 'Request error: No response received' });
            } else {
                console.error('Error:', error.message);
                callBack({ error: 'Error: ' + error.message });
            }
        });
};
export const getTxnApi = (userId, callBack) => {
    axios.get(APIS.GET_TXN_SUMMARY + userId )
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('Response error:', error.response.data);
                callBack({ error: error.response.data });
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack({ error: 'Request error: No response received' });
            } else {
                console.error('Error:', error.message);
                callBack({ error: 'Error: ' + error.message });
            }
        });
};
export const getemiApi = (loanId, callBack) => {
    axios.get(APIS.GET_EMI_CALCULATION + loanId )
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('Response error:', error.response.data);
                callBack({ error: error.response.data });
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack({ error: 'Request error: No response received' });
            } else {
                console.error('Error:', error.message);
                callBack({ error: 'Error: ' + error.message });
            }
        });
};