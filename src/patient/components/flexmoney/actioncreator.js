import axios from 'axios';
import { APIS } from '../../../utils/apifactory';

export const checkEligibilityForFMApi = (userId, callBack) => {
    axios.post(APIS.CHECK_ELIGIBILITY_FOR_FM + userId)
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
export const createOrderApiFm = (userId, callBack) => {
    axios.post(APIS.CREATE_ORDER_FOR_FM + userId)
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
export const getLogoApi = (userId, callBack) => {
    axios.get(APIS.GET_LOGO_API + userId)
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
export const webHookCallApiFlexMoney = (data, callBack) => {
    axios.post(APIS.WEB_HOOK_CALL , data)
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