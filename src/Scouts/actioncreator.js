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
export const getScoutDataById = (scoutId, clinic, startDate, endDate, callBack) => {
    axios.get(APIS.GET_SCOUT_DATA_BY_SCOUT_ID + scoutId + '&type=detail' + '&clinicName=' + clinic + '&startDate=' + startDate + '&endDate=' + endDate)
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
export const getDoctorDataById = (docId, clinic, startDate, endDate, callBack) => {
    axios.get(APIS.GET_DOCTOR_DATA_BY_ID + docId + '&type=detail' + '&clinicName=' + clinic + '&startDate=' + startDate + '&endDate=' + endDate)
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
export const getParentDoctorDataById = (docId, clinic, startDate, endDate, callBack) => {
    axios.get(APIS.GET_PARENT_DOCTOR_DATA_BY_ID + docId + '&type=detail' + '&clinicName=' + clinic + '&startDate=' + startDate + '&endDate=' + endDate)
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
export const getParentSCoutDataById = (docId, clinic, startDate, endDate, callBack) => {
    axios.get(APIS.GET_PARENT_SCOUT_DATA_BY_ID + docId + '&type=detail' + '&clinicName=' + clinic + '&startDate=' + startDate + '&endDate=' + endDate)
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
export const getScoutTrendDataApi = (scoutId, type, loanStatus, clinic, callBack) => {
    axios.get(APIS.GET_GRAPH_DATA_BY_SCOUT_ID + scoutId + '&type=' + type + '&loanStatus=' + loanStatus + '&clinicName=' + clinic)
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
export const getParentScoutTrendDataApi = (scoutId, type, loanStatus, clinic, callBack) => {
    axios.get(APIS.GET_PARENT_SCOUT_DATA_GRAPH + scoutId + '&type=' + type + '&loanStatus=' + loanStatus + '&clinicName=' + clinic)
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

export const getLeadsPerClinicByParentClinicId = (docId, clinic, callBack) => {
    axios.get(APIS.GET_MONTHLY_LEADS_BY_PARENT_DOCTOR_ID + docId + '&clinicName=' + clinic)
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
export const getLeadsPerClinicByDoctorId = (docId, clinic, callBack) => {
    axios.get(APIS.GET_MONTHLY_LEADS_BY_DOCTOR_ID + docId + '&clinicName=' + clinic)
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
export const getLeadsPerClinicByScoutId = (docId, clinic, callBack) => {
    axios.get(APIS.GET_MONTHLY_LEADS_BY_SCOUT_ID + docId + '&clinicName=' + clinic)
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
export const getLeadsPerClinicByparentScoutId = (docId, clinic, callBack) => {
    axios.get(APIS.GET_MONTHLY_LEADS_BY_PARENT_SCOUT_ID + docId + '&clinicName=' + clinic)
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
export const getLoanDataByScoutId = (docId, clinic, callBack) => {
    axios.get(APIS.GET_TOTAL_LOANS_BY_SCOUT_ID + docId + '&clinicName=' + clinic)
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
export const getLoanDataByUserId = (userId, callBack) => {
    axios.get(APIS.GET_LOAN_DETAILS_BY_USER_ID + userId)
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('notfound');
                callBack('notfound');
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack('notfound');
            } else {
                console.error('Error:', error.message);
                callBack('notfound');
            }
        });
};
export const getPotentialByScoutId = (scoutId, clinic, callBack) => {
    axios.get(APIS.GET_POTENTIAL_BY_SCOUT_ID + scoutId + '&clinicName=' + clinic)
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('notfound');
                callBack('notfound');
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack('notfound');
            } else {
                console.error('Error:', error.message);
                callBack('notfound');
            }
        });
};
export const getPotentialByParentScoutId = (id, clinic, callBack) => {
    axios.get(APIS.GET_POTENTIAL_BY_PARENT_SCOUT_ID + id + '&clinicName=' + clinic)
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('notfound');
                callBack('notfound');
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack('notfound');
            } else {
                console.error('Error:', error.message);
                callBack('notfound');
            }
        });
};
export const getAllClinicName = (parentScoutId, scoutId, parentDoctorId, callBack) => {
    axios.get(APIS.GET_ALL_CLINIC_NAMES + parentScoutId + '&scoutId=' + scoutId + '&parentDoctorId=' + parentDoctorId)
        .then(response => {
            callBack(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('notfound');
                callBack('notfound');
            } else if (error.request) {
                console.error('Request error:', error.request);
                callBack('notfound');
            } else {
                console.error('Error:', error.message);
                callBack('notfound');
            }
        });
};
export const getScoutsByParenScoutId = (docId, callBack) => {
    axios.get(APIS.GE_ALL_SCOUT_FOR_PARENT_SCOUTS + docId)
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
export const getLeadsCountBYparentScoutId = (docId, type, callBack) => {
    axios.get(APIS.GET_PARENT_SCOUNT_LEADS_CONTS + docId + '&type=' + type)
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
export const getLeadsCountByScoutIdApi = (scoutId, type, callBack) => {
    axios.get(APIS.GET_LEADS_COUNT_BY_SCOUT_ID + scoutId + '&type=' + type)
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
export const getLeadsByStatusForScoutsdApi = (scoutId, type, doctorStatus, callBack) => {
    axios.get(APIS.GET_LEADS_COUNT_BY_SCOUT_ID + scoutId + '&type=' + type + '&doctorStatus=' + doctorStatus)
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
export const getLiveClinicsApi = (scoutId, callBack) => {
    axios.get(APIS.GET_LIVE_CLINICS_BY_SCOUT_ID + scoutId)
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
export const getqrInstalledApiCount = (scoutId, callBack) => {
    axios.get(APIS.GET_QR_INSTALLED_SCOUT_ID + scoutId + '&type=' + 'count')
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
export const productNotMappedCountApi = (scoutId, callBack) => {
    axios.get(APIS.GET_PRODUCT_MAPPED_BY_SCOUT_ID + scoutId + '&type=' + 'count')
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
export const getInactiveCountApi = (scoutId, callBack) => {
    axios.get(APIS.GET_INACTIVE_CLINICS + scoutId + '&type=' + 'count')
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
export const getqrInstalledApidetail = (scoutId, callBack) => {
    axios.get(APIS.GET_QR_INSTALLED_SCOUT_ID + scoutId + '&type=' + 'detail')
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
export const productNotMappeddetailApi = (scoutId, callBack) => {
    axios.get(APIS.GET_PRODUCT_MAPPED_BY_SCOUT_ID + scoutId + '&type=' + 'detail')
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
export const getInactivedetailApi = (scoutId, callBack) => {
    axios.get(APIS.GET_INACTIVE_CLINICS + scoutId + '&type=' + 'detail')
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
export const searchDetailsApi = (data, scoutId,callBack) => {
    axios.get(APIS.SEARCH_API_DOCTOR_DETAILS + data + '&scoutId=' + scoutId)
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
export const getactivePercentageApi = (scoutId, callBack) => {
    axios.get(APIS.GET_AVERAGE_PERCENTAGE_BY_SCOUT_ID + scoutId )
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