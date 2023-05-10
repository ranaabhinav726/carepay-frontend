// import { useState, createContext, useCallback, useMemo } from 'react'
import './App.scss'
import Homepage from './components/Homepage/Homepage'
import MobileNumberVerification from './components/MobileNumberVerification/MobileNumberVerification'
import EnterOTP from './components/EnterOTP/EnterOTP'
import PhoneNumberVerified from './components/Personal_Details/PhoneNumberVerified/PhoneNumberVerified'
import PersonalDetails from './components/Personal_Details/PersonalDetails/PersonalDetails'
import AddressDetails from './components/Address_Details/AddressDetails/AddressDetails'
import EmploymentDetails from './components/Employment_Details/EmploymentDetails/EmploymentDetails'
import FetchingLoanLimit from './components/Eligibility_Status/FetchingLoanLimit/FetchingLoanLimit'
import ApprovedLoanLimit from './components/Eligibility_Status/ApprovedLoanLimit/ApprovedLoanLimit'
import ApprovedLoanLimitNeg from './components/Eligibility_Status/ApprovedLoanLimitNeg/ApprovedLoanLimitNeg'
import LoanDetails from './components/Loan_Details/LoanDetails/LoanDetails'

import KycAlreadyVerified from './components/KYC_Notification/KycAlreadyVerified/KycAlreadyVerified'
import KycVerification from './components/KYC_Notification/KycVerification/KycVerification'
import KycRedirection from './components/KYC_Notification/KycRedirection/KycRedirection'
// import KycPopupBlocked from './components/KYC_Notification/KycPopupBlocked/KycPopupBlocked'
import KycWebview from './components/KYC_Notification/KycWebview/KycWebview'
import KycVerifying from './components/KYC_Notification/KycVerifying/KycVerifying'
import KycVerificationSuccesful from './components/KYC_Notification/KycVerificationSuccesful/KycVerificationSuccesful'

import IncomeVerification from './components/Income_Verification_Notification/IncomeVerification/IncomeVerification'
import BankSelection from './components/Income_Verification_Notification/BankSelection/BankSelection'
import FileUpload from './components/Income_Verification_Notification/FileUpload/FileUpload'
import MethodSelection from './components/Income_Verification_Notification/MethodSelection/MethodSelection'
import StatementVerificationUnderProcess from './components/Income_Verification_Notification/StatementVerificationUnderProcess/StatementVerificationUnderProcess'
import IncomeVerificationStatus from './components/Income_Verification_Notification/VerifyingStatus/IncomeVerificationStatus'
import StatementVerificationSuccesful from './components/Income_Verification_Notification/StatementVerificationSuccesful/StatementVerificationSuccesful'
import NewTenureConfirmation from './components/Income_Verification_Notification/NewTenureConfirmation/NewTenureConfirmation'
import EndApplication from './components/Income_Verification_Notification/EndApplication/EndApplication'
import Congrats from './components/Income_Verification_Notification/Congratulation/Congratulation'
// import Redirection from './components/Redirection/Redirection'
// import Verifying from './components/Verifying/Verifying'
// import VerificationSuccesful from './components/VerificationSuccesful/VerificationSuccesful'
import BankDetails from './components/Bank_Account_Verification/BankDetails/BankDetails'
import BankDetailsUnderProcess from './components/Bank_Account_Verification/BankDetailsUnderProcess/BankDetailsUnderProcess'
import BankVerifying from './components/Bank_Account_Verification/BankDetailsVerifying/BankVerifying'
import BankDetailsVerified from './components/Bank_Account_Verification/BankDetailsVerified/BankDetailsVerified'

import LoanAgreement from './components/Loan_Agreement_Notification/LoanAgreement/LoanAgreement'
import LoanRedirection from './components/Loan_Agreement_Notification/LoanRedirection/LoanRedirection'
import LoanWebview from './components/Loan_Agreement_Notification/LoanWebview/LoanWebview'
import VerifyingLoan from './components/Loan_Agreement_Notification/VerifyingLoan/VerifyingLoan'
import LoanAgreementUnderProcess from './components/Loan_Agreement_Notification/LoanAgreementUnderProcess/LoanAgreementUnderProcess'
import LoanVerificationSuccesful from './components/Loan_Agreement_Notification/LoanVerificationSuccesful/LoanVerificationSuccesful'

import Emandate from './components/E_Mandate_Notification/Emandate/Emandate'
import EmandateRedirection from './components/E_Mandate_Notification/EmandateRedirection/EmandateRedirection'
import EmandateWebview from './components/E_Mandate_Notification/EmandateWebview/EmandateWebview'
import VerifyingEmandate from './components/E_Mandate_Notification/VerifyingEmandate/VerifyingEmandate'
import EmandateUnderProcess from './components/E_Mandate_Notification/EmandateUnderProcess/EmandateUnderProcess'
import EmandateVerificationSuccesful from './components/E_Mandate_Notification/EmandateVerificationSuccesful/EmandateVerificationSuccesful'

import FirstPaymentScreen from './components/PG_Notification/FirstPaymentScreen/FirstPaymentScreen'
import EMIOptions from './components/EMI_Selection/EMIOptions/EMIOptions'
import PGRedirection from './components/PG_Notification/PGRedirection/PGRedirection'
import PaymentUnderProcess from './components/PG_Notification/PaymentUnderProcess/PaymentUnderProcess'
import PGVerifying from './components/PG_Notification/PGVerifying/PGVerifying'
import PGVerificationSuccesful from './components/PG_Notification/PGVerificationSuccesful/PGVerificationSuccesful'

import LoanAppUnderProcess from './components/PG_Notification/LoanAppUnderProcess/LoanAppUnderProcess'
import LoanVerifying from './components/PG_Notification/LoanVerifying/LoanVerifying'
import LoanAppSuccessful from './components/PG_Notification/LoanAppSuccessful/LoanAppSuccessful'
import LoanAppOnHold from './components/PG_Notification/LoanAppOnHold/LoanAppOnHold'

// import PayFirstInstallment from './components/PG_Notification/PayFirstInstallment/PayFirstInstallment'

import UserDashboard from './components/Dashboard/UserDashboard/UserDashboard'

import QRHomeScreen from './components/QRHomeScreen/QRHomeScreen'

import { AuthProvider } from './components/auth'
import { Route, Routes } from 'react-router-dom'
import { DataProvider } from './components/data'

// export const DataContext = createContext(null);



function App() {

  return (
    <AuthProvider>
      <div id='animation-wrapper'>
        <div className="multi-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
      <DataProvider>
        <Routes> 
          <Route path='/' element={<Homepage />} />

          <Route path='MobileNumberVerification' element={<MobileNumberVerification />} />

          <Route path='EnterOTP' element={<EnterOTP />} />

          <Route path='PhoneNumberVerified' element={<PhoneNumberVerified />} />

          <Route path='Personal_Details' element={<PersonalDetails />} />

          <Route path='Address_Details' element={<AddressDetails />} />

          <Route path='Employment_Details' element={<EmploymentDetails />} />

          <Route path='LoanDetails' element={<LoanDetails />} />

          <Route path='FetchingLoanLimit' element={<FetchingLoanLimit />} />
          <Route path='ApprovedLoanLimit' element={<ApprovedLoanLimit />} />
          <Route path='ApprovedLoanLimitNeg' element={<ApprovedLoanLimitNeg />} />

          <Route path='KycAlreadyVerified' element={<KycAlreadyVerified />} />
          <Route path='KycVerification' element={<KycVerification />} />
          <Route path='KycRedirection' element={<KycRedirection />} />
          <Route path='KycWebview' element={<KycWebview />} />
          <Route path='KycVerifying' element={<KycVerifying />} />
          <Route path='KycVerificationSuccesful' element={<KycVerificationSuccesful />} />

          <Route path='IncomeVerification' element={<IncomeVerification />} />
          <Route path='BankSelection' element={<BankSelection />} />
          <Route path='MethodSelection' element={<MethodSelection />} />
          <Route path='FileUpload' element={<FileUpload />} />
          <Route path='StatementVerificationUnderProcess' element={<StatementVerificationUnderProcess />} />
          <Route path='IncomeVerificationStatus' element={<IncomeVerificationStatus />} />
          <Route path='StatementVerificationSuccesful' element={<StatementVerificationSuccesful />} />
          <Route path='NewTenureConfirmation' element={<NewTenureConfirmation />} />
          <Route path='EndApplication' element={<EndApplication />} />
          <Route path='Congrats' element={<Congrats />} />

          <Route path='BankDetails' element={<BankDetails />} />
          <Route path='BankDetailsUnderProcess' element={<BankDetailsUnderProcess />} />
          <Route path='BankVerifying' element={<BankVerifying />} />
          <Route path='BankDetailsVerified' element={<BankDetailsVerified />} />

          <Route path='LoanAgreement' element={<LoanAgreement />} />
          <Route path='LoanRedirection' element={<LoanRedirection />} />
          <Route path='LoanWebview' element={<LoanWebview />} />
          <Route path='VerifyingLoan' element={<VerifyingLoan />} />
          <Route path='LoanAgreementUnderProcess' element={<LoanAgreementUnderProcess />} />
          <Route path='LoanVerificationSuccesful' element={<LoanVerificationSuccesful />} />

          <Route path='Emandate' element={<Emandate />} />
          <Route path='EmandateRedirection' element={<EmandateRedirection />} />
          <Route path='EmandateWebview' element={<EmandateWebview />} />
          <Route path='VerifyingEmandate' element={<VerifyingEmandate />} />
          <Route path='EmandateUnderProcess' element={<EmandateUnderProcess />} />
          <Route path='EmandateVerificationSuccesful' element={<EmandateVerificationSuccesful />} />

          <Route path='EMIOptions' element={<EMIOptions />} />
          <Route path='FirstPaymentScreen' element={<FirstPaymentScreen />} />
          <Route path='PGRedirection' element={<PGRedirection />} />
          <Route path='PaymentUnderProcess' element={<PaymentUnderProcess />} />
          <Route path='PGVerifying' element={<PGVerifying />} />
          <Route path='PGVerificationSuccesful' element={<PGVerificationSuccesful />} />

          <Route path='LoanAppUnderProcess' element={<LoanAppUnderProcess />} />
          <Route path='LoanVerifying' element={<LoanVerifying />} />
          <Route path='LoanAppSuccessful' element={<LoanAppSuccessful />} />
          <Route path='LoanAppOnHold' element={<LoanAppOnHold />} />

          <Route path='UserDashboard' element={<UserDashboard />} />

          {/* <Route path='QRHomeScreen' element={<QRHomeScreen />} /> */}
          
          <Route path='*' element={<Homepage />} />

        </Routes>
      </DataProvider>
    
  {/* {screen} */}
  {/* <Homepage /> */}
  {/* <MobileNumberVerification  /> */}
  {/* <EnterOTP /> */}
  {/* <PhoneNumberVerified /> */}
  {/* <PersonalDetails /> */}
  {/* <AddressDetails /> */}
  {/* <EmploymentDetails /> */}
  {/* <FetchingLoanLimit /> */}
  {/* <ApprovedLoanLimit /> */}
  {/* <ApprovedLoanLimitNeg /> */}
  {/* <LoanDetails /> */}
  

  {/* //  c-10 */}


  {/* <KycVerification /> */}
  {/* <KycRedirection /> */}
  {/* <KycVerifying /> */}
  {/* <KycVerificationSuccesful /> */}

{/* //////////////////////////////////Modular screens//////////////////////////////// */}
  {/* <Redirection line1="Redirecting to" line2="lending partner’s platform..." /> */}
  {/* <Verifying data="Verifying KYC documents..." /> */}
  {/* <VerificationSuccesful data="Documents verified" /> */}

{/* //////////////////////////////////Modular screens//////////////////////////////// */}

  {/* <IncomeVerification /> */}
  {/* <BankSelection /> */}
  {/* <MethodSelection /> */}
  {/* <FileUpload /> */}
  {/* <Redirection line1="Redirecting to partner’s platform..." /> */}
  {/* <Verifying data="Verifying Bank account statement..." /> */}
  {/* <VerificationSuccesful data="Account Statement Verified!" /> */}
  {/* <Congrats /> */}


  {/* <BankDetails /> */}
  {/* <Verifying data="Verifying bank details..." /> */}
  {/* <VerificationSuccesful data="Bank Details Verified!" /> */}
  

  {/* <LoanAgreement /> */}
  {/* <Redirection line1="Redirecting to" line2="lending partner’s platform..." /> */}
  {/* <Verifying data="Verifying loan agreement..." /> */}
  {/* <VerificationSuccesful data="Loan Agreement Verified!" /> */}

  {/* <Emandate /> */}
  {/* <Redirection line1="Redirecting to" line2="lending partner’s platform..." /> */}
  {/* <Verifying data="Verifying E-Mandate..." /> */}
  {/* <VerificationSuccesful data="E-Mandate Verified!" /> */}


  {/* <EMIOptions /> */}
  {/* <PayFirstInstallment /> */}

  {/* <LoanAppSuccessful /> */}
  {/* <LoanAppOnHold /> */}
  {/* <LoanAppUnderProcess /> */}
  {/* <UserDashboard /> */}

  </AuthProvider>
  )
}

export default App
