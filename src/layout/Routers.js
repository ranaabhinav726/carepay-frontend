import React from 'react';

export const Homepage = React.lazy(() => import('../patient/components/Homepage/Homepage'));
export const MobileNumberVerification = React.lazy(() => import('../patient/components/MobileNumberVerification/MobileNumberVerification'));
export const EnterOTP = React.lazy(() => import('../patient/components/EnterOTP/EnterOTP'));
export const PhoneNumberVerified = React.lazy(() => import('../patient/components/Personal_Details/PhoneNumberVerified/PhoneNumberVerified'));
export const PersonalDetails = React.lazy(() => import('../patient/components/Personal_Details/PersonalDetails/PersonalDetails'));
export const AddressDetails = React.lazy(() => import('../patient/components/Address_Details/AddressDetails/AddressDetails'));
export const EmploymentDetails = React.lazy(() => import('../patient/components/Employment_Details/EmploymentDetails/EmploymentDetails'));
export const FetchingLoanLimit = React.lazy(() => import('../patient/components/Eligibility_Status/FetchingLoanLimit/FetchingLoanLimit'));
export const ApprovedLoanLimitNeg = React.lazy(() => import('../patient/components/Eligibility_Status/ApprovedLoanLimitNeg/ApprovedLoanLimitNeg'));
export const LoanDetails = React.lazy(() => import('../patient/components/Loan_Details/LoanDetails/LoanDetails'));

export const KycAlreadyVerified = React.lazy(() => import('../patient/components/KYC_Notification/KycAlreadyVerified/KycAlreadyVerified'));
export const KycVerification = React.lazy(() => import('../patient/components/KYC_Notification/KycVerification/KycVerification'));
export const KycRedirection = React.lazy(() => import('../patient/components/KYC_Notification/KycRedirection/KycRedirection'));
export const KycWebview = React.lazy(() => import('../patient/components/KYC_Notification/KycWebview/KycWebview'));
export const KycVerifying = React.lazy(() => import('../patient/components/KYC_Notification/KycVerifying/KycVerifying'));
export const KycVerificationSuccesful = React.lazy(() => import('../patient/components/KYC_Notification/KycVerificationSuccesful/KycVerificationSuccesful'));
export const ARTH_KYC_SUCCESS = React.lazy(() => import('../patient/components/KYC_Notification/KycVerificationSuccesful/newkycarthmate'));

export const IncomeVerification = React.lazy(() => import('../patient/components/Income_Verification_Notification/IncomeVerification/IncomeVerification'));
export const FileUpload = React.lazy(() => import('../patient/components/Income_Verification_Notification/FileUpload/FileUpload'));
export const StatementVerificationUnderProcess = React.lazy(() => import('../patient/components/Income_Verification_Notification/StatementVerificationUnderProcess/StatementVerificationUnderProcess'));
export const IncomeVerificationStatus = React.lazy(() => import('../patient/components/Income_Verification_Notification/VerifyingStatus/IncomeVerificationStatus'));
export const StatementVerificationSuccesful = React.lazy(() => import('../patient/components/Income_Verification_Notification/StatementVerificationSuccesful/StatementVerificationSuccesful'));
export const NewTenureConfirmation = React.lazy(() => import('../patient/components/Income_Verification_Notification/NewTenureConfirmation/NewTenureConfirmation'));
export const EndApplication = React.lazy(() => import('../patient/components/Income_Verification_Notification/EndApplication/EndApplication'));
export const Congrats = React.lazy(() => import('../patient/components/Income_Verification_Notification/Congratulation/Congratulation'));
export const BankDetails = React.lazy(() => import('../patient/components/Bank_Account_Verification/BankDetails/BankDetails'));
export const BankDetailsUnderProcess = React.lazy(() => import('../patient/components/Bank_Account_Verification/BankDetailsUnderProcess/BankDetailsUnderProcess'));
export const BankVerifying = React.lazy(() => import('../patient/components/Bank_Account_Verification/BankDetailsVerifying/BankVerifying'));
export const BankDetailsVerified = React.lazy(() => import('../patient/components/Bank_Account_Verification/BankDetailsVerified/BankDetailsVerified'));

export const LoanAgreement = React.lazy(() => import('../patient/components/Loan_Agreement_Notification/LoanAgreement/LoanAgreement'));
export const LoanRedirection = React.lazy(() => import('../patient/components/Loan_Agreement_Notification/LoanRedirection/LoanRedirection'));
export const LoanWebview = React.lazy(() => import('../patient/components/Loan_Agreement_Notification/LoanWebview/LoanWebview'));
export const VerifyingLoan = React.lazy(() => import('../patient/components/Loan_Agreement_Notification/VerifyingLoan/VerifyingLoan'));
export const LoanAgreementUnderProcess = React.lazy(() => import('../patient/components/Loan_Agreement_Notification/LoanAgreementUnderProcess/LoanAgreementUnderProcess'));
export const LoanVerificationSuccesful = React.lazy(() => import('../patient/components/Loan_Agreement_Notification/LoanVerificationSuccesful/LoanVerificationSuccesful'));

export const Emandate = React.lazy(() => import('../patient/components/E_Mandate_Notification/Emandate/Emandate'));
export const EmandateRedirection = React.lazy(() => import('../patient/components/E_Mandate_Notification/EmandateRedirection/EmandateRedirection'));
export const EmandateWebview = React.lazy(() => import('../patient/components/E_Mandate_Notification/EmandateWebview/EmandateWebview'));
export const VerifyingEmandate = React.lazy(() => import('../patient/components/E_Mandate_Notification/VerifyingEmandate/VerifyingEmandate'));
export const EmandateUnderProcess = React.lazy(() => import('../patient/components/E_Mandate_Notification/EmandateUnderProcess/EmandateUnderProcess'));
export const EmandateVerificationSuccesful = React.lazy(() => import('../patient/components/E_Mandate_Notification/EmandateVerificationSuccesful/EmandateVerificationSuccesful'));

export const FirstPaymentScreen = React.lazy(() => import('../patient/components/PG_Notification/FirstPaymentScreen/FirstPaymentScreen'));
export const PGRedirection = React.lazy(() => import('../patient/components/PG_Notification/PGRedirection/PGRedirection'));
export const PaymentUnderProcess = React.lazy(() => import('../patient/components/PG_Notification/PaymentUnderProcess/PaymentUnderProcess'));
export const PGVerifying = React.lazy(() => import('../patient/components/PG_Notification/PGVerifying/PGVerifying'));
export const PGVerificationSuccesful = React.lazy(() => import('../patient/components/PG_Notification/PGVerificationSuccesful/PGVerificationSuccesful'));

export const LoanAppUnderProcess = React.lazy(() => import('../patient/components/PG_Notification/LoanAppUnderProcess/LoanAppUnderProcess'));
export const LoanVerifying = React.lazy(() => import('../patient/components/PG_Notification/LoanVerifying/LoanVerifying'));
export const LoanAppSuccessful = React.lazy(() => import('../patient/components/PG_Notification/LoanAppSuccessful/LoanAppSuccessful'));
export const LoanAppOnHold = React.lazy(() => import('../patient/components/PG_Notification/LoanAppOnHold/LoanAppOnHold'));

export const CreditDetails = React.lazy(() => import('../patient/components/Personal_Details/CreditDetails/CreditDetails'));
export const WaitingForApproval = React.lazy(() => import('../patient/components/Loan_Details/WaitingForApproval/WaitingForApproval'));
export const CreditFairOffers = React.lazy(() => import('../patient/components/Loan_Details/CreditFairOffers/CreditFairOffers'));
export const LoginFromURL = React.lazy(() => import('../doctor/Components/DirectLogin/LoginFromURL'));
export const ChechkingStatus = React.lazy(() => import('../patient/components/Loan_Details/ChechkingStatus/ChechkingStatus'));
export const RejectedScreen = React.lazy(() => import('../patient/components/Loan_Details/RejectedScreen/RejectedScreen'));

export const UserDashboard = React.lazy(() => import('../patient/components/Dashboard/UserDashboard/UserDashboard'));

export const DocHomepage = React.lazy(() => import('../doctor/Components/Homepage/DocHomepage'));
export const VerifyOTP = React.lazy(() => import('../doctor/Components/VerifyOTP/VerifyOTP'));
export const Welcome = React.lazy(() => import('../doctor/Components/Welcome/Welcome'));
export const DocPersonalDetails = React.lazy(() => import('../doctor/Components/PersonalDetails/PersonalDetails'));
export const PracticeDetails = React.lazy(() => import('../doctor/Components/PracticeDetails/PracticeDetails'));
export const DocAddressDetails = React.lazy(() => import('../doctor/Components/AddressDetails/AddressDetails'));
export const DocBankDetails = React.lazy(() => import('../doctor/Components/BankDetails/BankDetails'));
export const UploadDocuments = React.lazy(() => import('../doctor/Components/UploadDocuments/UploadDocuments'));
export const ThankYou = React.lazy(() => import('../doctor/Components/ThankYou/ThankYou'));

export const UnderReview = React.lazy(() => import('../doctor/Components/Dashboard/components/UnderReview/UnderReview'));
export const DoctorDashboard = React.lazy(() => import('../doctor/Components/Dashboard/components/Dashboard/Dashboard'));
export const AllTransactions = React.lazy(() => import('../doctor/Components/Dashboard/components/AllTransactions/AllTransactions'));
export const AddPatient = React.lazy(() => import('../doctor/Components/Dashboard/components/AddPatient/AddPatient'));

export const QrPdfMaker = React.lazy(() => import('../qrData/QRPDF'));

export const WebHomepage = React.lazy(() => import('../website/pages/WebHomepage'));
export const About = React.lazy(() => import('../website/pages/About'));
export const PrivacyPolicy = React.lazy(() => import('../website/pages/NewprivacyPolicy'));
export const LendingPartners = React.lazy(() => import('../website/pages/LendingPartners'));
export const TermsAndConditions = React.lazy(() => import('../website/pages/TermsAndConditions'));
export const RefundandCancellation = React.lazy(() => import('../website/pages/RefundandCancellation'));
export const ICICITermsAndConditions = React.lazy(() => import('../website/pages/ICICITermsAndConditions'));

export const SearchingOffers = React.lazy(() => import('../patient/components/ICICI flow/SearchingOffers'));
export const CongratsApprovedICICI = React.lazy(() => import('../patient/components/ICICI flow/CongratsApprovedICICI'));
export const CongratsPreApprovedICICI = React.lazy(() => import('../patient/components/ICICI flow/CongratsPreApprovedICICI'));
export const EmiOptions = React.lazy(() => import('../patient/components/ICICI flow/EmiOptions'));
export const PanVerificationIcici = React.lazy(() => import('../patient/components/ICICI flow/PanVerificationIcici'));
export const FinalConsent = React.lazy(() => import('../patient/components/ICICI flow/FinalConsent'));

export const FibeMobileNumberVerification = React.lazy(() => import('../patient/components/Fibe flow/FibeMobileNumberVerification'));
export const FibeOtpAuthentication = React.lazy(() => import('../patient/components/Fibe flow/FibeOtpAuthentication'));
export const FibeNumberVerified = React.lazy(() => import('../patient/components/Fibe flow/FibeNumberVerified'));
export const FibeWelcome = React.lazy(() => import('../patient/components/Fibe flow/FibeWelcome'));
export const FibeCreditDetails = React.lazy(() => import('../patient/components/Fibe flow/FibeCreditDetails'));
export const FibeBasicDetails = React.lazy(() => import('../patient/components/Fibe flow/FibeBasicDetails'));
export const FibeEmploymentDetails = React.lazy(() => import('../patient/components/Fibe flow/FibeEmploymentDetails'));
export const FibeGreatJob = React.lazy(() => import('../patient/components/Fibe flow/FibeGreatJob'));
export const FibeCreateUser = React.lazy(() => import('../patient/components/Fibe flow/FibeCreateUser'));
export const FibeWaitingForApproval = React.lazy(() => import('../patient/components/Fibe flow/FibeWaitingForApproval'));
export const FibeCheckingStatus = React.lazy(() => import('../patient/components/Fibe flow/FibeCheckingStatus'));
export const FibeLoanApproved = React.lazy(() => import('../patient/components/Fibe flow/FibeLoanApproved'));
export const FibeBankStatementRequired = React.lazy(() => import('../patient/components/Fibe flow/FibeBankStatementRequired'));
export const FibeLoanRejected = React.lazy(() => import('../patient/components/Fibe flow/FibeLoanRejected'));
export const FibeRedirecting = React.lazy(() => import('../patient/components/Fibe flow/FibeRedirecting'));
export const FibeUserFallback = React.lazy(() => import('../patient/components/Fibe flow/FibeUserFallback'));
export const FibeCongratsUser = React.lazy(() => import('../patient/components/Fibe flow/FibeCongratsUser'));

export const AddressNotServiceable = React.lazy(() => import('../patient/components/Address_Details/AddressDetails/AddressNotServiceable'));

export const CfApproved = React.lazy(() => import('../patient/components/Loan_Details/CfApproved/CfApproved'));
export const NotServiceable = React.lazy(() => import('../patient/components/Fibe flow/NotServiceable'));

export const DoctorNotAvailable = React.lazy(() => import('../patient/components/Homepage/DoctorNotAvailable'));
export const PrescriptionUpload = React.lazy(() => import('../patient/components/Personal_Details/Prescription/PrescriptionUpload'));
export const FibePrescriptionUpload = React.lazy(() => import('../patient/components/Fibe flow/PrescriptionUpload'));

export const ArthPrescriptionUpload = React.lazy(() => import('../patient/components/Arthmate/Modules/Prescription/PrescriptionUpload'));
export const ArthPersonalDetails = React.lazy(() => import('../patient/components/Arthmate/Modules/BasicInfo/PersonalDetails'));
export const ArthAddressDetails = React.lazy(() => import('../patient/components/Arthmate/Modules/BasicInfo/AddressDetails'));
export const ArthEmploymentDetails = React.lazy(() => import('../patient/components/Arthmate/Modules/BasicInfo/EmploymentDetails'));
export const ArthCurrentEMIExpenses = React.lazy(() => import('../patient/components/Arthmate/Modules/BasicInfo/CurrentEMIExpenses'));
export const ArthmateOffers = React.lazy(() => import('../patient/components/Arthmate/Modules/BasicInfo/ArthmateOffers'));
export const ArthIncomeVerification = React.lazy(() => import('../patient/components/Arthmate/Modules/FinancialDataCapture/IncomeVerification'));
export const ArthBankSelection = React.lazy(() => import('../patient/components/Arthmate/Modules/FinancialDataCapture/BankSelection'));
export const ArthFileUpload = React.lazy(() => import('../patient/components/Arthmate/Modules/FinancialDataCapture/FileUpload'));
export const ArthMethodSelection = React.lazy(() => import('../patient/components/Arthmate/Modules/FinancialDataCapture/MethodSelection'));
export const ArthCreditAgreement = React.lazy(() => import('../patient/components/Arthmate/Modules/Esigning/CreditAgreement'));
export const ArthAgreementStatus = React.lazy(() => import('../patient/components/Arthmate/Modules/Esigning/AgreementStatus'));
export const ArthAutoRepayment = React.lazy(() => import('../patient/components/Arthmate/Modules/AutoRepayment/AutoRepayment'));
export const ArthAadhaarVerification = React.lazy(() => import('../patient/components/Arthmate/Modules/KYC/AadhaarVerification'));
export const ArthPANPhoto = React.lazy(() => import('../patient/components/Arthmate/Modules/KYC/PANPhoto'));
export const ArthKyc = React.lazy(() => import('../patient/components/Arthmate/Modules/KYC/KYC'));
export const ArthAadhaarPhoto = React.lazy(() => import('../patient/components/Arthmate/Modules/KYC/AadhaarPhoto'));
export const ArthCreditDetails = React.lazy(() => import('../patient/components/Arthmate/Modules/BasicInfo/CreditDetails'));
export const SCOUTS_MAIN = React.lazy(() => import('../Scouts/mainScreenScouts'));
export const SCOUTS_LOGIN = React.lazy(() => import('../Scouts/loginscreen'));
export const SCOUTS_OTP = React.lazy(() => import('../Scouts/otpscreen'));
export const SCOUTS_ALREADYEXIST = React.lazy(() => import('../Scouts/altreadyexist'));
export const SCOUTES_WELCOME = React.lazy(() => import('../Scouts/welcome'));
export const SCOUTES_DASHBOARD = React.lazy(() => import('../Scouts/mainPageDashboard'));
export const SCOUTES_PERSONAL = React.lazy(() => import('../Scouts/Forms/PersonalDetails'));
export const SCOUTES_ADDRESS = React.lazy(() => import('../Scouts/Forms/AddressDetails'));
export const SCOUTES_PRACTICE = React.lazy(() => import('../Scouts/Forms/PracticeDetails'));
export const SCOUTES_BANK = React.lazy(() => import('../Scouts/Forms/BankingDetails'));
export const SCOUTES_DOC = React.lazy(() => import('../Scouts/Forms/DocumentVerification'));
export const ARTH_SELFIE = React.lazy(() => import('../patient/components/Arthmate/Modules/KYC/selfilephoto'));
export const ARTH_CONGRATULATIONS = React.lazy(() => import('../patient/components/Arthmate/Modules/AutoRepayment/congratulations'));
export const ARTH_BANKDETAILS = React.lazy(() => import('../patient/components/Arthmate/Modules/BasicInfo/bankDetails'));
export const WAIT_ARTH = React.lazy(() => import('../patient/components/Arthmate/Modules/AutoRepayment/waitScreen'));
export const WAIT_LEGALITY = React.lazy(() => import('../patient/components/Arthmate/Modules/AutoRepayment/legalitywaitscreen'));
export const APPROVAL_INCRED = React.lazy(() => import('../patient/components/incred/approvalCongratulation'));
export const INCRED_DOWNLOAD = React.lazy(() => import('../patient/components/incred/incredDownloadNew'));
export const CONNECTING_WITH_LENDERS = React.lazy(() => import('../patient/components/incred/connectingwithLenders'));
export const PLEASE_WAIT = React.lazy(() => import('../patient/components/incred/pleasewait'));
export const FINAL_SCREEN_ARTH = React.lazy(() => import('../patient/components/Arthmate/Modules/AutoRepayment/finalscreen'));
export const WAIT_FOR_PROCESSING = React.lazy(() => import('../patient/components/incred/processing'));
export const INCRED_PREAPPROVED = React.lazy(() => import('../patient/components/incred/incredpreapproved'));
export const FLEX_WAIT_SCREEN = React.lazy(() => import('../patient/components/flexmoney/searchingflexmoney'));
export const FLEX_APPROVAL_SCREEN = React.lazy(() => import('../patient/components/flexmoney/flexapproval'));
export const FLEX_APPROVAL_WAIT = React.lazy(() => import('../patient/components/flexmoney/waitscreenflex'));
export const REDIRECT_AUTO_MANDATE = React.lazy(() => import('../patient/components/Arthmate/Modules/AutoRepayment/redirectAutorepayment'));
export const FLEX_USER_WAIT = React.lazy(() => import('../patient/components/flexmoney/refreshflex'));
export const DIGITAP_BANK_STATEMENT = React.lazy(() => import('../patient/components/Arthmate/Modules/bankstatementshare.jsx'));
export const DIGITAP_AGREEGATOR = React.lazy(() => import('../patient/components/Arthmate/Modules/agreegator.jsx'));
export const PATIENT_TERMS = React.lazy(() => import('../website/pages/patientTermscondition'));
export const NOT_FOUND_SCREEN = React.lazy(() => import('../patient/components/Arthmate/Modules/BasicInfo/notfoundScreen'));
export const DIGITAP_REDIRECTION = React.lazy(() => import('../patient/components/Arthmate/Modules/BasicInfo/notfoundScreen'));









