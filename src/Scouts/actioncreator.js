import axios from 'axios';
import { APIS } from "../utils/apifactory";

export const sendOtpApi = (phoneNumber, callBack) => {
    axios.post(APIS.SEND_OTP + phoneNumber)
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



export const verifyOtpApi = (phoneNumber, otp, callBack) => {
    axios.post(APIS.VERIFY_OTP + phoneNumber + '&otp=' + otp)
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

export const getScoutRole = (phoneNumber, callBack) => {
    axios.get(APIS.CHECK_ROLE_SCOUT + phoneNumber)
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
export const getScoutDataById = (scoutId, callBack) => {
    axios.get(APIS.GET_SCOUT_DATA_BY_SCOUT_ID + scoutId + '&type=detail')
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
export const getDoctorDataById = (docId, callBack) => {
    axios.get(APIS.GET_DOCTOR_DATA_BY_ID + docId + '&type=detail')
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
export const getParentDoctorDataById = (docId, callBack) => {
    axios.get(APIS.GET_PARENT_DOCTOR_DATA_BY_ID + docId + '&type=detail')
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
export const getParentSCoutDataById = (docId, callBack) => {
    axios.get(APIS.GET_PARENT_SCOUT_DATA_BY_ID + docId + '&type=detail')
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
export const getScoutTrendDataApi = (scoutId, type,loanStatus, callBack) => {
    axios.get(APIS.GET_GRAPH_DATA_BY_SCOUT_ID + scoutId + '&type=' + type + '&loanStatus=' + loanStatus)
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
export const getParentScoutTrendDataApi = (scoutId, type,loanStatus, callBack) => {
    axios.get(APIS.GET_PARENT_SCOUT_DATA_GRAPH + scoutId + '&type=' + type + '&loanStatus=' + loanStatus)
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

export const getLeadsPerClinicByParentClinicId = (docId, callBack) => {
    axios.get(APIS.GET_MONTHLY_LEADS_BY_PARENT_DOCTOR_ID + docId )
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
export const getLeadsPerClinicByDoctorId = (docId, callBack) => {
    axios.get(APIS.GET_MONTHLY_LEADS_BY_DOCTOR_ID + docId )
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
export const getLeadsPerClinicByScoutId = (docId, callBack) => {
    axios.get(APIS.GET_MONTHLY_LEADS_BY_SCOUT_ID + docId )
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
export const getLeadsPerClinicByparentScoutId = (docId, callBack) => {
    axios.get(APIS.GET_MONTHLY_LEADS_BY_PARENT_SCOUT_ID + docId )
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
export const getLoanDataByScoutId = (docId, callBack) => {
    axios.get(APIS.GET_TOTAL_LOANS_BY_SCOUT_ID + docId )
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