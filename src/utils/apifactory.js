const BASE_URL = process.env.REACT_APP_BACKEND
// const BASE_URL = 'https://backend.carepay.money/'

const APIS = {

    SEND_OTP: BASE_URL + 'generateOtp?phoneNumber=',
    VERIFY_OTP: BASE_URL + 'verifyDashboardOtp?phoneNumber=',
    CHECK_ROLE_SCOUT: BASE_URL + 'checkRoleBasedOnNumber?phoneNumber=',
    GET_SCOUT_DATA_BY_SCOUT_ID: BASE_URL + 'getAllLoanDetailForScout?scoutId=',
    GET_DOCTOR_DATA_BY_ID: BASE_URL + 'getAllLoanDetailForDoctor?doctorId=',
    GET_PARENT_DOCTOR_DATA_BY_ID: BASE_URL + 'getAllLoanDetailForParentDoctor?parentDoctorId=',
    GET_PARENT_SCOUT_DATA_BY_ID: BASE_URL + 'getAllLoanDetailForParentScout?parentScoutId=',
    GET_GRAPH_DATA_BY_SCOUT_ID: BASE_URL + 'getTrendGraphForScout?scoutId=',
    GET_PARENT_SCOUT_DATA_GRAPH: BASE_URL + 'getTrendGraphForParentScout?parentScoutId=',
    GET_MONTHLY_LEADS_BY_PARENT_DOCTOR_ID: BASE_URL + 'getMonthlyLeadsPerClinicParentDoctor?parentDoctorId=',
    GET_MONTHLY_LEADS_BY_DOCTOR_ID: BASE_URL + 'getMonthlyLeadsPerClinicDoctor?doctorId=',
    GET_MONTHLY_LEADS_BY_SCOUT_ID: BASE_URL + 'getMonthlyLeadsPerClinic?scoutId=',
    GET_MONTHLY_LEADS_BY_PARENT_SCOUT_ID: BASE_URL + 'getMonthlyLeadsPerClinicParentScout?parentScoutId=',
    GET_TOTAL_LOANS_BY_SCOUT_ID: BASE_URL + 'getLoanAmountAndCountForScout?scoutId=',
    GET_LOAN_DETAILS_BY_USER_ID: BASE_URL + 'getProductDetailByUserId?userId='




}
export {
    APIS,
    BASE_URL,

};