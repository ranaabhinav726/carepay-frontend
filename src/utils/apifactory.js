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
    GET_MONTHLY_LEADS_BY_SCOUT_ID: BASE_URL + 'getMonthlyLeadsPerClinicForScout?scoutId=',
    GET_MONTHLY_LEADS_BY_PARENT_SCOUT_ID: BASE_URL + 'getMonthlyLeadsPerClinicParentScout?parentScoutId=',
    GET_TOTAL_LOANS_BY_SCOUT_ID: BASE_URL + 'getLoanAmountAndCountForScout?scoutId=',
    GET_LOAN_DETAILS_BY_USER_ID: BASE_URL + 'getProductDetailByUserId?userId=',
    GET_POTENTIAL_BY_SCOUT_ID: BASE_URL + 'getPotentialCaptureForScout?scoutId=',
    GET_POTENTIAL_BY_PARENT_SCOUT_ID: BASE_URL + 'getPotentialCaptureForParentScout?parentScoutId=',
    GET_ALL_CLINIC_NAMES: BASE_URL + 'getAllClinicNameById?parentScoutId=',
    CREATE_CASHFREE_MANDATE_SUBSCRIPTION: BASE_URL + 'createSeamlessSubscriptionWithPlanInfo?userId=',
    CREATE_AUTH_REQUEST: BASE_URL + 'createAuthorisationRequest?userId=',
    GET_AUTH_PAYMENT: BASE_URL + 'getAuthStatusApi?loanId=',
    GET_NACH_DETAILS: BASE_URL + 'getRepaymentData?userId=',
    VERIFY_UPI_ID: BASE_URL + 'verifyHandel?userId=',
    GET_BANK_LIST_FOR_USERS: BASE_URL + 'getCashFreeSubscriptionPlanInfoDetail?userId=',
    GET_TXN_SUMMARY: BASE_URL + 'getMandateSummary?userId=',
    GET_EMI_CALCULATION: BASE_URL + 'getAmLoanCalculations?loanId=',
    CHECK_ELIGIBILITY_FOR_FM: BASE_URL + 'checkEligibilityForFM?userId=',
    CREATE_ORDER_FOR_FM: BASE_URL + 'createOrderForFM?userId=',
    GET_LOGO_API: BASE_URL + 'getFlexMoneyUserDetail?userId=',
    WEB_HOOK_CALL:BASE_URL+'flexMoneyTransactionWebhook',
    GET_DIGITA_BANK_REPORT:BASE_URL+'getDigitapBankStatementDetailByUserId?userId='








}
export {
    APIS,
    BASE_URL,

};