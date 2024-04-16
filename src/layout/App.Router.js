import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OurRoutes from './Routes';
import * as Routers from './Routers';
import ScoutDahboardLayout from '../Scouts/dashboard'
function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div></div>} >
        <Routes>
          <Route path={OurRoutes.WEB_HOMEPAGE} element={<Routers.WebHomepage />} />
          <Route path={OurRoutes.ABOUT} element={<Routers.About />} />
          <Route path={OurRoutes.PRIVACY_POLICY} element={<Routers.PrivacyPolicy />} />
          <Route path={OurRoutes.REFUND_AND_CANCELLATION} element={<Routers.RefundandCancellation />} />
          <Route path={OurRoutes.ICICI_TERMS_AND_CONDITIONS} element={<Routers.ICICITermsAndConditions />} />
          {/* Add more website routes here */}

          {/* Patient Routes */}
          <Route path={OurRoutes.PATIENT_HOMEPAGE} element={<Routers.Homepage />} />
          <Route path={OurRoutes.DOCTOR_NOT_AVAILABLE} element={<Routers.DoctorNotAvailable />} />
          <Route path={OurRoutes.MOBILE_NUMBER_VERIFICATION} element={<Routers.MobileNumberVerification />} />
          <Route path={OurRoutes.ENTER_OTP} element={<Routers.EnterOTP />} />

          <Route path={OurRoutes.PHONE_NUMBER_VERIFIED} element={<Routers.PhoneNumberVerified />} />

          <Route path={OurRoutes.CREDIT_DETAILS} element={<Routers.CreditDetails />} />
          <Route path={OurRoutes.PRESCRIPTION_UPLOAD} element={<Routers.PrescriptionUpload />} />
          <Route path={OurRoutes.PERSONAL_DETAILS} element={<Routers.PersonalDetails />} />
          <Route path={OurRoutes.NOT_SERVICEABLE} element={<Routers.NotServiceable />} />
          <Route path={OurRoutes.ADDRESS_DETAILS} element={<Routers.AddressDetails />} />
          <Route path={OurRoutes.ADDRESS_NOT_SERVICEABLE} element={<Routers.AddressNotServiceable />} />
          <Route path={OurRoutes.EMPLOYMENT_DETAILS} element={<Routers.EmploymentDetails />} />
          <Route path={OurRoutes.LOAN_DETAILS} element={<Routers.LoanDetails />} />
          <Route path={OurRoutes.CREDIT_FAIR_OFFERS} element={<Routers.CreditFairOffers />} />

          <Route path={OurRoutes.WAITING_FOR_APPROVAL} element={<Routers.WaitingForApproval />} />
          <Route path={OurRoutes.CHECKING_STATUS} element={<Routers.ChechkingStatus />} />
          <Route path={OurRoutes.CF_APPROVED} element={<Routers.CfApproved />} />
          <Route path={OurRoutes.REJECTED_SCREEN} element={<Routers.RejectedScreen />} />

          <Route path={OurRoutes.SEARCHING_OFFERS} element={<Routers.SearchingOffers />} />
          <Route path={OurRoutes.CONGRATS_PRE_APPROVED_ICICI} element={<Routers.CongratsPreApprovedICICI />} />
          <Route path={OurRoutes.EMI_OPTIONS} element={<Routers.EmiOptions />} />
          <Route path={OurRoutes.PAN_VERIFICATION_ICICI} element={<Routers.PanVerificationIcici />} />
          <Route path={OurRoutes.CONGRATS_APPROVED_ICICI} element={<Routers.CongratsApprovedICICI />} />
          <Route path={OurRoutes.FINAL_CONSENT} element={<Routers.FinalConsent />} />

          <Route path={OurRoutes.FIBE_MOBILE_NUMBER_VERIFICATION} element={<Routers.FibeMobileNumberVerification />} />
          <Route path={OurRoutes.FIBE_OTP_AUTHENTICATION} element={<Routers.FibeOtpAuthentication />} />
          <Route path={OurRoutes.FIBE_NUMBER_VERIFIED} element={<Routers.FibeNumberVerified />} />
          <Route path={OurRoutes.FIBE_WELCOME} element={<Routers.FibeWelcome />} />
          <Route path={OurRoutes.FIBE_CREDIT_DETAILS} element={<Routers.FibeCreditDetails />} />
          <Route path={OurRoutes.FIBE_PRESCRIPTION_UPLOAD} element={<Routers.FibePrescriptionUpload />} />
          <Route path={OurRoutes.FIBE_BASIC_DETAILS} element={<Routers.FibeBasicDetails />} />
          <Route path={OurRoutes.FIBE_EMPLOYMENT_DETAILS} element={<Routers.FibeEmploymentDetails />} />
          <Route path={OurRoutes.FIBE_GREAT_JOB} element={<Routers.FibeGreatJob />} />
          <Route path={OurRoutes.FIBE_CREATE_USER} element={<Routers.FibeCreateUser />} />
          <Route path={OurRoutes.FIBE_WAITING_FOR_APPROVAL} element={<Routers.FibeWaitingForApproval />} />
          <Route path={OurRoutes.FIBE_CHECKING_STATUS} element={<Routers.FibeCheckingStatus />} />
          <Route path={OurRoutes.FIBE_LOAN_APPROVED} element={<Routers.FibeLoanApproved />} />
          <Route path={OurRoutes.FIBE_BANK_STATEMENT_REQUIRED} element={<Routers.FibeBankStatementRequired />} />
          <Route path={OurRoutes.FIBE_LOAN_REJECTED} element={<Routers.FibeLoanRejected />} />
          <Route path={OurRoutes.FIBE_REDIRECTING} element={<Routers.FibeRedirecting />} />
          <Route path={OurRoutes.FIBE_USER_FALLBACK} element={<Routers.FibeUserFallback />} />
          <Route path={OurRoutes.FIBE_CONGRATS_USER} element={<Routers.FibeCongratsUser />} />

          <Route path={OurRoutes.FETCHING_LOAN_LIMIT} element={<Routers.FetchingLoanLimit />} />
          <Route path={OurRoutes.APPROVED_LOAN_LIMIT_NEG} element={<Routers.ApprovedLoanLimitNeg />} />
          <Route path={OurRoutes.KYC_ALREADY_VERIFIED} element={<Routers.KycAlreadyVerified />} />
          <Route path={OurRoutes.KYC_VERIFICATION} element={<Routers.KycVerification />} />
          <Route path={OurRoutes.KYC_REDIRECTION} element={<Routers.KycRedirection />} />
          <Route path={OurRoutes.KYC_WEBVIEW} element={<Routers.KycWebview />} />
          <Route path={OurRoutes.KYC_VERIFYING} element={<Routers.KycVerifying />} />
          <Route path={OurRoutes.KYC_VERIFICATION_SUCCESSFUL} element={<Routers.KycVerificationSuccesful />} />

          <Route path={OurRoutes.INCOME_VERIFICATION} element={<Routers.IncomeVerification />} />
          <Route path={OurRoutes.FILE_UPLOAD} element={<Routers.FileUpload />} />
          <Route path={OurRoutes.STATEMENT_VERIFICATION_UNDER_PROCESS} element={<Routers.StatementVerificationUnderProcess />} />
          <Route path={OurRoutes.INCOME_VERIFICATION_STATUS} element={<Routers.IncomeVerificationStatus />} />
          <Route path={OurRoutes.STATEMENT_VERIFICATION_SUCCESSFUL} element={<Routers.StatementVerificationSuccesful />} />

          <Route path={OurRoutes.NEW_TENURE_CONFIRMATION} element={<Routers.NewTenureConfirmation />} />
          <Route path={OurRoutes.END_APPLICATION} element={<Routers.EndApplication />} />
          <Route path={OurRoutes.CONGRATS} element={<Routers.Congrats />} />

          <Route path={OurRoutes.BANK_DETAILS} element={<Routers.BankDetails />} />
          <Route path={OurRoutes.BANK_DETAILS_UNDER_PROCESS} element={<Routers.BankDetailsUnderProcess />} />
          <Route path={OurRoutes.BANK_VERIFYING} element={<Routers.BankVerifying />} />
          <Route path={OurRoutes.BANK_DETAILS_VERIFIED} element={<Routers.BankDetailsVerified />} />

          <Route path={OurRoutes.LOAN_AGREEMENT} element={<Routers.LoanAgreement />} />
          <Route path={OurRoutes.LOAN_REDIRECTION} element={<Routers.LoanRedirection />} />
          <Route path={OurRoutes.LOAN_WEBVIEW} element={<Routers.LoanWebview />} />
          <Route path={OurRoutes.VERIFYING_LOAN} element={<Routers.VerifyingLoan />} />
          <Route path={OurRoutes.LOAN_AGREEMENT_UNDER_PROCESS} element={<Routers.LoanAgreementUnderProcess />} />
          <Route path={OurRoutes.LOAN_VERIFICATION_SUCCESSFUL} element={<Routers.LoanVerificationSuccesful />} />

          <Route path={OurRoutes.EMANDATE} element={<Routers.Emandate />} />
          <Route path={OurRoutes.EMANDATE_REDIRECTION} element={<Routers.EmandateRedirection />} />
          <Route path={OurRoutes.EMANDATE_WEBVIEW} element={<Routers.EmandateWebview />} />
          <Route path={OurRoutes.VERIFYING_EMANDATE} element={<Routers.VerifyingEmandate />} />
          <Route path={OurRoutes.EMANDATE_UNDER_PROCESS} element={<Routers.EmandateUnderProcess />} />
          <Route path={OurRoutes.EMANDATE_VERIFICATION_SUCCESSFUL} element={<Routers.EmandateVerificationSuccesful />} />

          <Route path={OurRoutes.FIRST_PAYMENT_SCREEN} element={<Routers.FirstPaymentScreen />} />
          <Route path={OurRoutes.PG_REDIRECTION} element={<Routers.PGRedirection />} />
          <Route path={OurRoutes.PAYMENT_UNDER_PROCESS} element={<Routers.PaymentUnderProcess />} />
          <Route path={OurRoutes.PG_VERIFYING} element={<Routers.PGVerifying />} />
          <Route path={OurRoutes.PG_VERIFICATION_SUCCESSFUL} element={<Routers.PGVerificationSuccesful />} />
          <Route path={OurRoutes.LOAN_APP_UNDER_PROCESS} element={<Routers.LoanAppUnderProcess />} />
          <Route path={OurRoutes.LOAN_VERIFYING} element={<Routers.LoanVerifying />} />
          <Route path={OurRoutes.LOAN_APP_SUCCESSFUL} element={<Routers.LoanAppSuccessful />} />
          <Route path={OurRoutes.LOAN_APP_ON_HOLD} element={<Routers.LoanAppOnHold />} />

          <Route path={OurRoutes.USER_DASHBOARD} element={<Routers.UserDashboard />} />

          <Route path={OurRoutes.DOCTOR_HOMEPAGE} element={<Routers.DocHomepage />} />
          <Route path={OurRoutes.DOCTOR_VERIFY_OTP} element={<Routers.VerifyOTP />} />
          <Route path={OurRoutes.DOCTOR_WELCOME} element={<Routers.Welcome />} />
          <Route path={OurRoutes.DOCTOR_PERSONAL_DETAILS} element={<Routers.DocPersonalDetails />} />
          <Route path={OurRoutes.DOCTOR_PRACTICE_DETAILS} element={<Routers.PracticeDetails />} />
          <Route path={OurRoutes.DOCTOR_ADDRESS_DETAILS} element={<Routers.DocAddressDetails />} />
          <Route path={OurRoutes.DOCTOR_BANK_DETAILS} element={<Routers.DocBankDetails />} />
          <Route path={OurRoutes.DOCTOR_UPLOAD_DOCUMENTS} element={<Routers.UploadDocuments />} />
          <Route path={OurRoutes.DOCTOR_THANK_YOU} element={<Routers.ThankYou />} />

          <Route path={OurRoutes.DOCTOR_DASHBOARD} element={<Routers.DoctorDashboard />} />
          <Route path={OurRoutes.ALL_TRANSACTIONS} element={<Routers.AllTransactions />} />
          <Route path={OurRoutes.ADD_PATIENT} element={<Routers.AddPatient />} />
          <Route path={OurRoutes.UNDER_REVIEW} element={<Routers.UnderReview />} />
          <Route path={OurRoutes.LOGIN_FROM_URL} element={<Routers.LoginFromURL />} />

          <Route path={OurRoutes.QR_DATA} element={<Routers.QrPdfMaker />} />

          <Route path={OurRoutes.ARTH_CREDIT_DETAILS} element={<Routers.ArthCreditDetails />} />
          <Route path={OurRoutes.ARTH_PRESCRIPTION_UPLOAD} element={<Routers.ArthPrescriptionUpload />} />
          <Route path={OurRoutes.ARTH_PERSONAL_DETAILS} element={<Routers.ArthPersonalDetails />} />
          <Route path={OurRoutes.ARTH_ADDRESS_DETAILS} element={<Routers.ArthAddressDetails />} />
          <Route path={OurRoutes.ARTH_EMPLOYMENT_DETAILS} element={<Routers.ArthEmploymentDetails />} />
          <Route path={OurRoutes.ARTH_CURRENT_EMI_EXPENSES} element={<Routers.ArthCurrentEMIExpenses />} />
          <Route path={OurRoutes.ARTHMATE_OFFERS} element={<Routers.ArthmateOffers />} />
          <Route path={OurRoutes.ARTH_INCOME_VERIFICATION} element={<Routers.ArthIncomeVerification />} />
          <Route path={OurRoutes.ARTH_BANK_SELECTION} element={<Routers.ArthBankSelection />} />
          <Route path={OurRoutes.ARTH_FILE_UPLOAD} element={<Routers.ArthFileUpload />} />
          <Route path={OurRoutes.ARTH_METHOD_SELECTION} element={<Routers.ArthMethodSelection />} />
          <Route path={OurRoutes.ARTH_CREDIT_AGREEMENT} element={<Routers.ArthCreditAgreement />} />
          <Route path={OurRoutes.ARTH_AGREEMENT_STATUS} element={<Routers.ArthAgreementStatus />} />
          <Route path={OurRoutes.ARTH_AUTO_REPAYMENT} element={<Routers.ArthAutoRepayment />} />
          <Route path={OurRoutes.ARTH_KYC} element={<Routers.ArthKyc />} />
          <Route path={OurRoutes.ARTH_AADHAAR_VERIFICATION} element={<Routers.ArthAadhaarVerification />} />
          <Route path={OurRoutes.ARTH_AADHAAR_PHOTO} element={<Routers.ArthAadhaarPhoto />} />
          <Route path={OurRoutes.ARTH_PAN_PHOTO} element={<Routers.ArthPANPhoto />} />
          {/* scouts */}
          <Route path={OurRoutes.SCOUTS_MAIN} element={<Routers.SCOUTS_MAIN />} />
          <Route path={OurRoutes.SCOUTS_LOGIN} element={<Routers.SCOUTS_LOGIN />} />
          <Route path={OurRoutes.SCOUTS_OTP} element={<Routers.SCOUTS_OTP />} />
          <Route path={OurRoutes.SCOUTS_ALREADYEXIST} element={<Routers.SCOUTS_ALREADYEXIST />} />
          <Route path={OurRoutes.SCOUTES_WELCOME} element={<Routers.SCOUTES_WELCOME />} />
          <Route element={<ScoutDahboardLayout />}>
          <Route path={OurRoutes.SCOUTES_DASHBOARD} element={<Routers.SCOUTES_DASHBOARD />} />
          

        </Route>
        </Routes>
      

      </Suspense>
    </Router>
  )
}

export default AppRouter