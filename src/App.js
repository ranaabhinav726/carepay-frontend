import './App.scss';
import { Route, Routes } from 'react-router-dom';

/////////Patient imports//////////////

import Homepage from './patient/components/Homepage/Homepage'
import MobileNumberVerification from './patient/components/MobileNumberVerification/MobileNumberVerification'
import EnterOTP from './patient/components/EnterOTP/EnterOTP'
import PhoneNumberVerified from './patient/components/Personal_Details/PhoneNumberVerified/PhoneNumberVerified'
import PersonalDetails from './patient/components/Personal_Details/PersonalDetails/PersonalDetails'
import AddressDetails from './patient/components/Address_Details/AddressDetails/AddressDetails'
import EmploymentDetails from './patient/components/Employment_Details/EmploymentDetails/EmploymentDetails'
import FetchingLoanLimit from './patient/components/Eligibility_Status/FetchingLoanLimit/FetchingLoanLimit'
import ApprovedLoanLimitNeg from './patient/components/Eligibility_Status/ApprovedLoanLimitNeg/ApprovedLoanLimitNeg'
import LoanDetails from './patient/components/Loan_Details/LoanDetails/LoanDetails'

import KycAlreadyVerified from './patient/components/KYC_Notification/KycAlreadyVerified/KycAlreadyVerified'
import KycVerification from './patient/components/KYC_Notification/KycVerification/KycVerification'
import KycRedirection from './patient/components/KYC_Notification/KycRedirection/KycRedirection'
// import KycPopupBlocked from './patient/components/KYC_Notification/KycPopupBlocked/KycPopupBlocked'
import KycWebview from './patient/components/KYC_Notification/KycWebview/KycWebview'
import KycVerifying from './patient/components/KYC_Notification/KycVerifying/KycVerifying'
import KycVerificationSuccesful from './patient/components/KYC_Notification/KycVerificationSuccesful/KycVerificationSuccesful'

import IncomeVerification from './patient/components/Income_Verification_Notification/IncomeVerification/IncomeVerification'
import FileUpload from './patient/components/Income_Verification_Notification/FileUpload/FileUpload'
import StatementVerificationUnderProcess from './patient/components/Income_Verification_Notification/StatementVerificationUnderProcess/StatementVerificationUnderProcess'
import IncomeVerificationStatus from './patient/components/Income_Verification_Notification/VerifyingStatus/IncomeVerificationStatus'
import StatementVerificationSuccesful from './patient/components/Income_Verification_Notification/StatementVerificationSuccesful/StatementVerificationSuccesful'
import NewTenureConfirmation from './patient/components/Income_Verification_Notification/NewTenureConfirmation/NewTenureConfirmation'
import EndApplication from './patient/components/Income_Verification_Notification/EndApplication/EndApplication'
import Congrats from './patient/components/Income_Verification_Notification/Congratulation/Congratulation'
// import Redirection from './patient/components/Redirection/Redirection'
// import Verifying from './patient/components/Verifying/Verifying'
// import VerificationSuccesful from './patient/components/VerificationSuccesful/VerificationSuccesful'
import BankDetails from './patient/components/Bank_Account_Verification/BankDetails/BankDetails'
import BankDetailsUnderProcess from './patient/components/Bank_Account_Verification/BankDetailsUnderProcess/BankDetailsUnderProcess'
import BankVerifying from './patient/components/Bank_Account_Verification/BankDetailsVerifying/BankVerifying'
import BankDetailsVerified from './patient/components/Bank_Account_Verification/BankDetailsVerified/BankDetailsVerified'

import LoanAgreement from './patient/components/Loan_Agreement_Notification/LoanAgreement/LoanAgreement'
import LoanRedirection from './patient/components/Loan_Agreement_Notification/LoanRedirection/LoanRedirection'
import LoanWebview from './patient/components/Loan_Agreement_Notification/LoanWebview/LoanWebview'
import VerifyingLoan from './patient/components/Loan_Agreement_Notification/VerifyingLoan/VerifyingLoan'
import LoanAgreementUnderProcess from './patient/components/Loan_Agreement_Notification/LoanAgreementUnderProcess/LoanAgreementUnderProcess'
import LoanVerificationSuccesful from './patient/components/Loan_Agreement_Notification/LoanVerificationSuccesful/LoanVerificationSuccesful'

import Emandate from './patient/components/E_Mandate_Notification/Emandate/Emandate'
import EmandateRedirection from './patient/components/E_Mandate_Notification/EmandateRedirection/EmandateRedirection'
import EmandateWebview from './patient/components/E_Mandate_Notification/EmandateWebview/EmandateWebview'
import VerifyingEmandate from './patient/components/E_Mandate_Notification/VerifyingEmandate/VerifyingEmandate'
import EmandateUnderProcess from './patient/components/E_Mandate_Notification/EmandateUnderProcess/EmandateUnderProcess'
import EmandateVerificationSuccesful from './patient/components/E_Mandate_Notification/EmandateVerificationSuccesful/EmandateVerificationSuccesful'

import FirstPaymentScreen from './patient/components/PG_Notification/FirstPaymentScreen/FirstPaymentScreen'
import PGRedirection from './patient/components/PG_Notification/PGRedirection/PGRedirection'
import PaymentUnderProcess from './patient/components/PG_Notification/PaymentUnderProcess/PaymentUnderProcess'
import PGVerifying from './patient/components/PG_Notification/PGVerifying/PGVerifying'
import PGVerificationSuccesful from './patient/components/PG_Notification/PGVerificationSuccesful/PGVerificationSuccesful'

import LoanAppUnderProcess from './patient/components/PG_Notification/LoanAppUnderProcess/LoanAppUnderProcess'
import LoanVerifying from './patient/components/PG_Notification/LoanVerifying/LoanVerifying'
import LoanAppSuccessful from './patient/components/PG_Notification/LoanAppSuccessful/LoanAppSuccessful'
import LoanAppOnHold from './patient/components/PG_Notification/LoanAppOnHold/LoanAppOnHold'

// import PayFirstInstallment from './patient/components/PG_Notification/PayFirstInstallment/PayFirstInstallment'

import UserDashboard from './patient/components/Dashboard/UserDashboard/UserDashboard'

/////////Doctor imports//////////////
import DocHomepage from './doctor/Components/Homepage/Homepage'
import VerifyOTP from './doctor/Components/VerifyOTP/VerifyOTP'
import Welcome from './doctor/Components/Welcome/Welcome'
import DocPersonalDetails from './doctor/Components/PersonalDetails/PersonalDetails'
import PracticeDetails from './doctor/Components/PracticeDetails/PracticeDetails'
import DocAddressDetails from './doctor/Components/AddressDetails/AddressDetails'
import DocBankDetails from './doctor/Components/BankDetails/BankDetails'
import UploadDocuments from './doctor/Components/UploadDocuments/UploadDocuments'
import ThankYou from './doctor/Components/ThankYou/ThankYou'

import UnderReview from './doctor/Components/Dashboard/components/UnderReview/UnderReview';
import Dashboard from './doctor/Components/Dashboard/components/Dashboard/Dashboard';
import AllTransactions from './doctor/Components/Dashboard/components/AllTransactions/AllTransactions';
import AddPatient from './doctor/Components/Dashboard/components/AddPatient/AddPatient';

import QrPdfMaker from './qrData/QRPDF';
// import QrTemplate from './qrData/QrTemplate';

///////////////////website imports//////////////////////
// import { lazy } from "react";
// import Loadable from "./website/compponents/Loadable";
// import PrivacyPolicy from './website/pages/PrivacyPolicy';
import CreditDetails from './patient/components/Personal_Details/CreditDetails/CreditDetails';
import WaitingForApproval from './patient/components/Loan_Details/WaitingForApproval/WaitingForApproval';

// const Home = Loadable(lazy(() => import("./website/pages/Home")));
// const About = Loadable(lazy(() => import("./website/pages/About")));
// const ContactUs = Loadable(lazy(() => import("./website/pages/Contact")));

import WebHomepage from "./website/pages/Homepage"
import About from './website/pages/About';
import PrivacyPolicy from './website/pages/PrivacyPolicy';

import CreditFairOffers from './patient/components/Loan_Details/CreditFairOffers/CreditFairOffers';
import { useEffect } from 'react';
import LoginFromURL from './doctor/Components/DirectLogin/LoginFromURL';
import ChechkingStatus from './patient/components/Loan_Details/ChechkingStatus/ChechkingStatus';
import TermsAndConditions from './website/pages/TermsAndConditions';
import RefundandCancellation from './website/pages/RefundandCancellation';
import RejectedScreen from './patient/components/Loan_Details/RejectedScreen/RejectedScreen';
import AddressNotServiceable from './patient/components/Address_Details/AddressDetails/AddressNotServiceable';
import CfApproved from './patient/components/Loan_Details/CfApproved/CfApproved';
import PrescriptionUpload from './patient/components/Arthmate/Modules/Prescription/PrescriptionUpload';
import ArthPersonalDetails from './patient/components/Arthmate/Modules/BasicInfo/PersonalDetails';
import ArthAddressDetails from './patient/components/Arthmate/Modules/BasicInfo/AddressDetails';
import ArthEmploymentDetails from './patient/components/Arthmate/Modules/BasicInfo/EmploymentDetails';
import ArthCurrentEMIExpenses from './patient/components/Arthmate/Modules/BasicInfo/CurrentEMIExpenses';
import ArthmateOffers from './patient/components/Arthmate/Modules/BasicInfo/ArthmateOffers';
import ArthIncomeVerification from './patient/components/Arthmate/Modules/FinancialDataCapture/IncomeVerification';



function App() {

  return (
    // <div className="App">
      <Routes>
        <Route index element={<WebHomepage />} ></Route>
        <Route path='/about' element={<About />} ></Route>
        {/* <Route path='/contactUs' element={<ContactUs />} ></Route> */}
        <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} ></Route>
        <Route path='/TermsAndConditions' element={<TermsAndConditions />} ></Route>
        <Route path='/RefundandCancellation' element={<RefundandCancellation />} ></Route>

        <Route path='/patient' element={<Homepage />}></Route>
        <Route path='/patient/MobileNumberVerification' element={<MobileNumberVerification />} />

        <Route path='/patient/EnterOTP' element={<EnterOTP />} />

        <Route path='/patient/PhoneNumberVerified' element={<PhoneNumberVerified />} />

        <Route path='/patient/PersonalDetails' element={<PersonalDetails />} />
        <Route path='/patient/CreditDetails' element={<CreditDetails />} />

        <Route path='/patient/AddressDetails' element={<AddressDetails />} />
        <Route path='/patient/AddressNotServiceable' element={<AddressNotServiceable />} />

        <Route path='/patient/EmploymentDetails' element={<EmploymentDetails />} />

        <Route path='/patient/LoanDetails' element={<LoanDetails />} />
        <Route path='/patient/CreditFairOffers' element={<CreditFairOffers />} />
        <Route path='/patient/WaitingForApproval' element={<WaitingForApproval />} />
        <Route path='/patient/ChechkingStatus' element={<ChechkingStatus />} />
        <Route path='/patient/CfApproved' element={<CfApproved />} />
        <Route path='/patient/RejectedScreen' element={<RejectedScreen />} />


        <Route path='/patient/FetchingLoanLimit' element={<FetchingLoanLimit />} />
        <Route path='/patient/ApprovedLoanLimitNeg' element={<ApprovedLoanLimitNeg />} />

        <Route path='/patient/KycAlreadyVerified' element={<KycAlreadyVerified />} />
        <Route path='/patient/KycVerification' element={<KycVerification />} />
        <Route path='/patient/KycRedirection' element={<KycRedirection />} />
        <Route path='/patient/KycWebview' element={<KycWebview />} />
        <Route path='/patient/KycVerifying' element={<KycVerifying />} />
        <Route path='/patient/KycVerificationSuccesful' element={<KycVerificationSuccesful />} />

        <Route path='/patient/IncomeVerification' element={<IncomeVerification />} />
        <Route path='/patient/FileUpload' element={<FileUpload />} />
        <Route path='/patient/StatementVerificationUnderProcess' element={<StatementVerificationUnderProcess />} />
        <Route path='/patient/IncomeVerificationStatus' element={<IncomeVerificationStatus />} />
        <Route path='/patient/StatementVerificationSuccesful' element={<StatementVerificationSuccesful />} />
        <Route path='/patient/NewTenureConfirmation' element={<NewTenureConfirmation />} />
        <Route path='/patient/EndApplication' element={<EndApplication />} />
        <Route path='/patient/Congrats' element={<Congrats />} />

        <Route path='/patient/BankDetails' element={<BankDetails />} />
        <Route path='/patient/BankDetailsUnderProcess' element={<BankDetailsUnderProcess />} />
        <Route path='/patient/BankVerifying' element={<BankVerifying />} />
        <Route path='/patient/BankDetailsVerified' element={<BankDetailsVerified />} />

        <Route path='/patient/LoanAgreement' element={<LoanAgreement />} />
        <Route path='/patient/LoanRedirection' element={<LoanRedirection />} />
        <Route path='/patient/LoanWebview' element={<LoanWebview />} />
        <Route path='/patient/VerifyingLoan' element={<VerifyingLoan />} />
        <Route path='/patient/LoanAgreementUnderProcess' element={<LoanAgreementUnderProcess />} />
        <Route path='/patient/LoanVerificationSuccesful' element={<LoanVerificationSuccesful />} />

        <Route path='/patient/Emandate' element={<Emandate />} />
        <Route path='/patient/EmandateRedirection' element={<EmandateRedirection />} />
        <Route path='/patient/EmandateWebview' element={<EmandateWebview />} />
        <Route path='/patient/VerifyingEmandate' element={<VerifyingEmandate />} />
        <Route path='/patient/EmandateUnderProcess' element={<EmandateUnderProcess />} />
        <Route path='/patient/EmandateVerificationSuccesful' element={<EmandateVerificationSuccesful />} />

        <Route path='/patient/FirstPaymentScreen' element={<FirstPaymentScreen />} />
        <Route path='/patient/PGRedirection' element={<PGRedirection />} />
        <Route path='/patient/PaymentUnderProcess' element={<PaymentUnderProcess />} />
        <Route path='/patient/PGVerifying' element={<PGVerifying />} />
        <Route path='/patient/PGVerificationSuccesful' element={<PGVerificationSuccesful />} />

        <Route path='/patient/LoanAppUnderProcess' element={<LoanAppUnderProcess />} />
        <Route path='/patient/LoanVerifying' element={<LoanVerifying />} />
        <Route path='/patient/LoanAppSuccessful' element={<LoanAppSuccessful />} />
        <Route path='/patient/LoanAppOnHold' element={<LoanAppOnHold />} />

        <Route path='/patient/UserDashboard' element={<UserDashboard />} />
        <Route path='/patient/*' element={<Homepage />} />
        

        <Route path='/doctor' element={<DocHomepage />} ></Route>
        <Route path='/doctor/verifyotp' element={<VerifyOTP />} ></Route>
        <Route path='/doctor/welcome' element={<Welcome />} ></Route>
        <Route path='/doctor/PersonalDetails' element={<DocPersonalDetails />} ></Route>
        <Route path='/doctor/PracticeDetails' element={<PracticeDetails />} ></Route>
        <Route path='/doctor/AddressDetails' element={<DocAddressDetails />} ></Route>
        <Route path='/doctor/BankDetails' element={<DocBankDetails />} ></Route>
        <Route path='/doctor/UploadDocuments' element={<UploadDocuments />} ></Route>
        <Route path='/doctor/ThankYou' element={<ThankYou />} ></Route>

        <Route path='/doctor/dashboard/' element={<Dashboard />} />
        <Route path='/doctor/dashboard/AllTransactions' element={<AllTransactions />} />
        <Route path='/doctor/dashboard/addPatient' element={<AddPatient />} />
        <Route path='/doctor/dashboard/UnderReview' element={<UnderReview />} />
        <Route path='/doctor/:doctorId' element={<LoginFromURL />} /> 
        {/* Waiting screen.. to verify doctor ID and save it to localStorage and redirect to dashboard */}

        <Route path='/qrData/:doctorId' element={<QrPdfMaker />}></Route>

        <Route path='/patient/arthPresciptionUpload' element={<PrescriptionUpload />}></Route>
        <Route path='/patient/ArthPersonalDetails' element={<ArthPersonalDetails />}></Route>
        <Route path='/patient/ArthAddressDetails' element={<ArthAddressDetails />}></Route>
        <Route path='/patient/ArthEmploymentDetails' element={<ArthEmploymentDetails />}></Route>
        <Route path='/patient/ArthCurrentEMIExpenses' element={<ArthCurrentEMIExpenses />}></Route>
        <Route path='/patient/ArthmateOffers' element={<ArthmateOffers />}></Route>
        <Route path='/patient/ArthIncomeVerification' element={<ArthIncomeVerification />}></Route>

      </Routes>
    // {/* </div> */}
  );
}

export default App;
