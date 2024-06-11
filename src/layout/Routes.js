const routes = {
  WEB_HOMEPAGE: '/',
  ABOUT: '/about',
  PRIVACY_POLICY: '/PrivacyPolicy',
  TERMS_AND_CONDITIONS: '/TermsAndConditions',
  REFUND_AND_CANCELLATION: '/RefundAndCancellation',
  ICICI_TERMS_AND_CONDITIONS: '/ICICITermsAndConditions',
  LENDING_PARTNERS: "/partnersforlending",

  PATIENT_HOMEPAGE: '/patient/*',
  DOCTOR_NOT_AVAILABLE: '/patient/DoctorNotAvailable',
  MOBILE_NUMBER_VERIFICATION: '/patient/MobileNumberVerification',
  ENTER_OTP: '/patient/EnterOTP',

  PHONE_NUMBER_VERIFIED: '/patient/PhoneNumberVerified',

  CREDIT_DETAILS: '/patient/CreditDetails',
  PRESCRIPTION_UPLOAD: '/patient/PrescriptionUpload',
  PERSONAL_DETAILS: '/patient/PersonalDetails',
  NOT_SERVICEABLE: '/patient/NotServiceable',
  ADDRESS_DETAILS: '/patient/AddressDetails',
  ADDRESS_NOT_SERVICEABLE: '/patient/AddressNotServiceable',
  EMPLOYMENT_DETAILS: '/patient/EmploymentDetails',
  LOAN_DETAILS: '/patient/LoanDetails',
  CREDIT_FAIR_OFFERS: '/patient/CreditFairOffers',

  WAITING_FOR_APPROVAL: '/patient/WaitingForApproval',
  CHECKING_STATUS: '/patient/ChechkingStatus',
  CF_APPROVED: '/patient/CfApproved',
  REJECTED_SCREEN: '/patient/RejectedScreen',

  SEARCHING_OFFERS: '/patient/SearchingOffers',
  CONGRATS_PRE_APPROVED_ICICI: '/patient/congratsPreApprovedIcici',
  EMI_OPTIONS: '/patient/EmiOptions',
  PAN_VERIFICATION_ICICI: '/patient/PanVerificationIcici',
  CONGRATS_APPROVED_ICICI: '/patient/congratsApprovedIcici',
  FINAL_CONSENT: '/patient/FinalConsent',

  FIBE_MOBILE_NUMBER_VERIFICATION: '/patient/fibeMobileNumberVerification',
  FIBE_OTP_AUTHENTICATION: '/patient/fibeOtpAuthentication',
  FIBE_NUMBER_VERIFIED: '/patient/fibeNumberVerified',
  FIBE_WELCOME: '/patient/fibeWelcome',
  FIBE_CREDIT_DETAILS: '/patient/fibeCreditDetails',
  FIBE_PRESCRIPTION_UPLOAD: '/patient/fibePrescriptionUpload',
  FIBE_BASIC_DETAILS: '/patient/fibeBasicDetails',
  FIBE_EMPLOYMENT_DETAILS: '/patient/fibeEmploymentDetails',
  FIBE_GREAT_JOB: '/patient/fibeGreatJob',
  FIBE_CREATE_USER: '/patient/fibeCreateUser',
  FIBE_WAITING_FOR_APPROVAL: '/patient/fibeWaitingForApproval',
  FIBE_CHECKING_STATUS: '/patient/fibeCheckingStatus',
  FIBE_LOAN_APPROVED: '/patient/fibeLoanApproved',
  FIBE_BANK_STATEMENT_REQUIRED: '/patient/fibeBankStatementRequired',
  FIBE_LOAN_REJECTED: '/patient/fibeLoanRejected',
  FIBE_REDIRECTING: '/patient/fibeRedirecting',
  FIBE_USER_FALLBACK: '/patient/screen14/:userId',
  FIBE_CONGRATS_USER: '/patient/fibeCongratsUser',

  FETCHING_LOAN_LIMIT: '/patient/FetchingLoanLimit',
  APPROVED_LOAN_LIMIT_NEG: '/patient/ApprovedLoanLimitNeg',
  KYC_ALREADY_VERIFIED: '/patient/KycAlreadyVerified',
  KYC_VERIFICATION: '/patient/KycVerification',
  KYC_REDIRECTION: '/patient/KycRedirection',
  KYC_WEBVIEW: '/patient/KycWebview',
  KYC_VERIFYING: '/patient/KycVerifying',
  KYC_VERIFICATION_SUCCESSFUL: '/patient/KycVerificationSuccesful',

  INCOME_VERIFICATION: '/patient/IncomeVerification',
  FILE_UPLOAD: '/patient/FileUpload',
  STATEMENT_VERIFICATION_UNDER_PROCESS: '/patient/StatementVerificationUnderProcess',
  INCOME_VERIFICATION_STATUS: '/patient/IncomeVerificationStatus',
  STATEMENT_VERIFICATION_SUCCESSFUL: '/patient/StatementVerificationSuccesful',
  NEW_TENURE_CONFIRMATION: '/patient/NewTenureConfirmation',
  END_APPLICATION: '/patient/EndApplication',
  CONGRATS: '/patient/Congrats',

  BANK_DETAILS: '/patient/BankDetails',
  BANK_DETAILS_UNDER_PROCESS: '/patient/BankDetailsUnderProcess',
  BANK_VERIFYING: '/patient/BankVerifying',
  BANK_DETAILS_VERIFIED: '/patient/BankDetailsVerified',

  LOAN_AGREEMENT: '/patient/LoanAgreement',
  LOAN_REDIRECTION: '/patient/LoanRedirection',
  LOAN_WEBVIEW: '/patient/LoanWebview',
  VERIFYING_LOAN: '/patient/VerifyingLoan',
  LOAN_AGREEMENT_UNDER_PROCESS: '/patient/LoanAgreementUnderProcess',
  LOAN_VERIFICATION_SUCCESSFUL: '/patient/LoanVerificationSuccesful',

  EMANDATE: '/patient/Emandate',
  EMANDATE_REDIRECTION: '/patient/EmandateRedirection',
  EMANDATE_WEBVIEW: '/patient/EmandateWebview',
  VERIFYING_EMANDATE: '/patient/VerifyingEmandate',
  EMANDATE_UNDER_PROCESS: '/patient/EmandateUnderProcess',
  EMANDATE_VERIFICATION_SUCCESSFUL: '/patient/EmandateVerificationSuccesful',

  FIRST_PAYMENT_SCREEN: '/patient/FirstPaymentScreen',
  PG_REDIRECTION: '/patient/PGRedirection',
  PAYMENT_UNDER_PROCESS: '/patient/PaymentUnderProcess',
  PG_VERIFYING: '/patient/PGVerifying',
  PG_VERIFICATION_SUCCESSFUL: '/patient/PGVerificationSuccesful',
  LOAN_APP_UNDER_PROCESS: '/patient/LoanAppUnderProcess',
  LOAN_VERIFYING: '/patient/LoanVerifying',
  LOAN_APP_SUCCESSFUL: '/patient/LoanAppSuccessful',
  LOAN_APP_ON_HOLD: '/patient/LoanAppOnHold',

  USER_DASHBOARD: '/patient/UserDashboard',

  DOCTOR_HOMEPAGE: '/doctor',
  DOCTOR_VERIFY_OTP: '/doctor/verifyotp',
  DOCTOR_WELCOME: '/doctor/welcome',
  DOCTOR_PERSONAL_DETAILS: '/doctor/PersonalDetails',
  DOCTOR_PRACTICE_DETAILS: '/doctor/PracticeDetails',
  DOCTOR_ADDRESS_DETAILS: '/doctor/AddressDetails',
  DOCTOR_BANK_DETAILS: '/doctor/BankDetails',
  DOCTOR_UPLOAD_DOCUMENTS: '/doctor/UploadDocuments',
  DOCTOR_THANK_YOU: '/doctor/ThankYou',

  DOCTOR_DASHBOARD: '/doctor/dashboard/',
  ALL_TRANSACTIONS: '/doctor/dashboard/AllTransactions',
  ADD_PATIENT: '/doctor/dashboard/addPatient',
  UNDER_REVIEW: '/doctor/dashboard/UnderReview',
  LOGIN_FROM_URL: '/doctor/:doctorId',

  QR_DATA: '/qrData/:doctorId',

  ARTH_CREDIT_DETAILS: '/patient/ArthCreditDetails',
  ARTH_PRESCRIPTION_UPLOAD: '/patient/ArthPresciptionUpload',
  ARTH_PERSONAL_DETAILS: '/patient/ArthPersonalDetails',
  ARTH_ADDRESS_DETAILS: '/patient/ArthAddressDetails',
  ARTH_EMPLOYMENT_DETAILS: '/patient/ArthEmploymentDetails',
  ARTH_CURRENT_EMI_EXPENSES: '/patient/ArthCurrentEMIExpenses',
  ARTHMATE_OFFERS: '/patient/ArthmateOffers',
  ARTH_INCOME_VERIFICATION: '/patient/ArthIncomeVerification',
  ARTH_BANK_SELECTION: '/patient/ArthBankSelection',
  ARTH_FILE_UPLOAD: '/patient/ArthFileUpload',
  ARTH_METHOD_SELECTION: '/patient/ArthMethodSelection',
  ARTH_CREDIT_AGREEMENT: '/patient/ArthCreditAgreement',
  ARTH_AGREEMENT_STATUS: '/patient/ArthAgreementStatus',
  ARTH_AUTO_REPAYMENT: '/patient/ArthAutoRepayment',
  ARTH_KYC: '/patient/ArthKyc',
  ARTH_AADHAAR_VERIFICATION: '/patient/ArthAadhaarVerification',
  ARTH_AADHAAR_PHOTO: '/patient/ArthAadhaarPhoto',
  ARTH_PAN_PHOTO: '/patient/ArthPANPhoto',
  ARTH_SELFIE:'/patient/ArthSelfie',
  ARTH_CONGRATULATIONS:'/patient/ArthCongratulations',
  ARTH_BANKDETAILS:'/patient/Arthbankdeails',
  ARTH_KYC_SUCCESS:'/patient/Arthdone',
  WAIT_ARTH:'/patient/wait',
  WAIT_LEGALITY:'/patient/legalitywait',
  APPROVAL_INCRED:'/patient/incredapproval',
  INCRED_DOWNLOAD:'/patient/increddownload',
  CONNECTING_WITH_LENDERS:'/patient/connecting',
  PLEASE_WAIT:'/patient/pleasewait',
  FINAL_SCREEN_ARTH:'/patient/final',
  WAIT_FOR_PROCESSING:'/patient/processing',
  INCRED_PREAPPROVED:'/patient/incredpreapproved',
  FLEX_WAIT_SCREEN:'/patient/flexwait',


  ///SCOUTS///
  SCOUTS_MAIN: '/scouts',
  SCOUTS_LOGIN: '/scouts/login',
  SCOUTS_OTP: '/scouts/verifyotp',
  SCOUTS_ALREADYEXIST: '/scouts/alreadyexist',
  SCOUTES_WELCOME:'/scouts/welcome',
  SCOUTES_DASHBOARD:'/scouts/dashboard',
  SCOUTES_PERSONAL:'/scouts/personal',
  SCOUTES_PRACTICE:'/scouts/practice',
  SCOUTES_ADDRESS:'/scouts/address',
  SCOUTES_BANK:'/scouts/bank',
  SCOUTES_DOC:'/scouts/document'




};

export default routes;















// const routes = {
//     WEB_HOMEPAGE: '/',
//     ABOUT: '/about',
//     PRIVACY_POLICY: '/PrivacyPolicy',
//     TERMS_AND_CONDITIONS: '/TermsAndConditions',
//     REFUND_AND_CANCELLATION: '/RefundandCancellation',
//     ICICI_TERMS_AND_CONDITIONS: '/ICICITermsAndConditions',

//     DOC_HOMEPAGE: '/doctor',
//     DOC_VERIFY_OTP: '/doctor/verifyotp',
//     DOCTOR_WELCOME: '/doctor/welcome',
//     DOCTOR_PERSONAL_DETAILS: '/doctor/PersonalDetails',
//     DOCTOR_PRACTICE_DETAILS: '/doctor/PracticeDetails',
//     DOCTOR_ADDRESS_DETAILS: '/doctor/AddressDetails',
//     DOCTOR_BANK_DETAILS: '/doctor/BankDetails',
//     DOCTOR_UPLOAD_DOCUMENTS: '/doctor/UploadDocuments',
//     DOCTOR_THANK_YOU: '/doctor/ThankYou',
//     DOCTOR_DASHBOARD: '/doctor/dashboard/',
//     DOCTOR_ALL_TRANSACTIONS: '/doctor/dashboard/AllTransactions',
//     DOCTOR_ADD_PATIENT: '/doctor/dashboard/addPatient',
//     DOCTOR_UNDER_REVIEW: '/doctor/dashboard/UnderReview',
//     DOCTOR_LOGIN_FROM_URL: '/doctor/:doctorId',
//     QR_DATA: '/qrData/:doctorId',

//     HOMEPAGE: '/patient',
//     DOCTOR_NOT_AVAILABLE : '/patient/DoctorNotAvailable',
//     MOBILE_NUMBER_VERIFICATION: '/patient/MobileNumberVerification',
//     ENTER_OTP: '/patient/EnterOTP',
//     PHONE_NUMBER_VERIFIED: '/patient/PhoneNumberVerified',
//     CREDIT_DETAILS: '/patient/CreditDetails',
//     PRESCRIPTION_UPLOAD: '/patient/PrescriptionUpload',
//     PERSONAL_DETAILS: '/patient/PersonalDetails',
//     NOT_SERVICEABLE: '/patient/NotServiceable',
//     ADDRESS_DETAILS: '/patient/AddressDetails',
//     ADDRESS_NOT_SERVICEABLE: '/patient/AddressNotServiceable',
//     EMPLOYMENT_DETAILS: '/patient/EmploymentDetails',
//     FETCHING_LOAN_LIMIT: '/patient/FetchingLoanLimit',
//     APPROVED_LOAN_LIMIT_NEG: '/patient/ApprovedLoanLimitNeg',
//     LOAN_DETAILS: '/patient/LoanDetails',
//     KYC_ALREADY_VERIFIED: '/patient/KycAlreadyVerified',
//     KYC_VERIFICATION: '/patient/KycVerification',
//     KYC_REDIRECTION: '/patient/KycRedirection',
//     KYC_WEBVIEW: '/patient/KycWebview',
//     KYC_VERIFYING: '/patient/KycVerifying',
//     KYC_VERIFICATION_SUCCESSFUL: '/patient/KycVerificationSuccesful',
//     INCOME_VERIFICATION: '/patient/IncomeVerification',
//     FILE_UPLOAD: '/patient/FileUpload',
//     STATEMENT_VERIFICATION_UNDER_PROCESS: '/patient/StatementVerificationUnderProcess',
//     INCOME_VERIFICATION_STATUS: '/patient/IncomeVerificationStatus',
//     STATEMENT_VERIFICATION_SUCCESSFUL: '/patient/StatementVerificationSuccesful',
//     NEW_TENURE_CONFIRMATION: '/patient/NewTenureConfirmation',
//     END_APPLICATION: '/patient/EndApplication',
//     CONGRATS: '/patient/Congrats',
//     BANK_DETAILS: '/patient/BankDetails',
//     BANK_DETAILS_UNDER_PROCESS: '/patient/BankDetailsUnderProcess',
//     BANK_VERIFYING: '/patient/BankVerifying',
//     BANK_DETAILS_VERIFIED: '/patient/BankDetailsVerified',
//     LOAN_AGREEMENT: '/patient/LoanAgreement',
//     LOAN_REDIRECTION: '/patient/LoanRedirection',
//     LOAN_WEBVIEW: '/patient/LoanWebview',
//     VERIFYING_LOAN: '/patient/VerifyingLoan',
//     LOAN_AGREEMENT_UNDER_PROCESS: '/patient/LoanAgreementUnderProcess',
//     LOAN_VERIFICATION_SUCCESSFUL: '/patient/LoanVerificationSuccesful',
//     E_MANDATE: '/patient/Emandate',
//     E_MANDATE_REDIRECTION: '/patient/EmandateRedirection',
//     E_MANDATE_WEBVIEW: '/patient/EmandateWebview',
//     VERIFYING_E_MANDATE: '/patient/VerifyingEmandate',
//     E_MANDATE_UNDER_PROCESS: '/patient/EmandateUnderProcess',
//     E_MANDATE_VERIFICATION_SUCCESSFUL: '/patient/EmandateVerificationSuccesful',
//     FIRST_PAYMENT_SCREEN: '/patient/FirstPaymentScreen',
//     PG_REDIRECTION: '/patient/PGRedirection',
//     PAYMENT_UNDER_PROCESS: '/patient/PaymentUnderProcess',
//     PG_VERIFYING: '/patient/PGVerifying',
//     PG_VERIFICATION_SUCCESSFUL: '/patient/PGVerificationSuccesful',
//     LOAN_APP_UNDER_PROCESS: '/patient/LoanAppUnderProcess',
//     LOAN_VERIFYING: '/patient/LoanVerifying',
//     LOAN_APP_SUCCESSFUL: '/patient/LoanAppSuccessful',
//     LOAN_APP_ON_HOLD: '/patient/LoanAppOnHold',
//     USER_DASHBOARD: '/patient/UserDashboard',

//     ARTH_CREDIT_DETAILS: '/patient/ArthCreditDetails',
//     ARTH_PRESCRIPTION_UPLOAD: '/patient/ArthPrescriptionUpload',
//     ARTH_PERSONAL_DETAILS: '/patient/ArthPersonalDetails',
//     ARTH_ADDRESS_DETAILS: '/patient/ArthAddressDetails',
//     ARTH_EMPLOYMENT_DETAILS: '/patient/ArthEmploymentDetails',
//     ARTH_CURRENT_EMI_EXPENSES: '/patient/ArthCurrentEMIExpenses',
//     ARTHMATE_OFFERS: '/patient/ArthmateOffers',
//     ARTH_INCOME_VERIFICATION: '/patient/ArthIncomeVerification',
//     ARTH_BANK_SELECTION: '/patient/ArthBankSelection',
//     ARTH_FILE_UPLOAD: '/patient/ArthFileUpload',
//     ARTH_METHOD_SELECTION: '/patient/ArthMethodSelection',
//     ARTH_CREDIT_AGREEMENT: '/patient/ArthCreditAgreement',
//     ARTH_AGREEMENT_STATUS: '/patient/ArthAgreementStatus',
//     ARTH_AUTO_REPAYMENT: '/patient/ArthAutoRepayment',
//     ARTH_KYC: '/patient/ArthKyc',
//     ARTH_AADHAAR_VERIFICATION: '/patient/ArthAadhaarVerification',
//     ARTH_PAN_PHOTO: '/patient/ArthPANPhoto',
// };

// export default routes;






// const routes = {
//     WEB_HOMEPAGE: '/',
//     ABOUT: '/about',
//     PRIVACY_POLICY : '/PrivacyPolicy',
//     TERMS_AND_CONDITIONS : '/TermsAndConditions',
//     REFUND_AND_CANCELLATION : '/RefundandCancellation',
//     ICICI_TERMS_AND_CONDITIONS : '/ICICITermsAndConditions',
//     DOC_HOMEPAGE : '/doctor',
//     DOC_VERIFY_OTP : '/doctor/verifyotp',
//     HOMEPAGE : '/patient',
//     MOBILE_NUMBER_VERIFICATION : '/patient/MobileNumberVerification',

// }
// export default routes;

