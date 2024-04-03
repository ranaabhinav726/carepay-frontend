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

import CreditDetails from './patient/components/Personal_Details/CreditDetails/CreditDetails';
import WaitingForApproval from './patient/components/Loan_Details/WaitingForApproval/WaitingForApproval';
import CreditFairOffers from './patient/components/Loan_Details/CreditFairOffers/CreditFairOffers';
import LoginFromURL from './doctor/Components/DirectLogin/LoginFromURL';
import ChechkingStatus from './patient/components/Loan_Details/ChechkingStatus/ChechkingStatus';
import RejectedScreen from './patient/components/Loan_Details/RejectedScreen/RejectedScreen';


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

// const Home = Loadable(lazy(() => import("./website/pages/Home")));
// const About = Loadable(lazy(() => import("./website/pages/About")));
// const ContactUs = Loadable(lazy(() => import("./website/pages/Contact")));

import WebHomepage from "./website/pages/Homepage"
import About from './website/pages/About';
import PrivacyPolicy from './website/pages/PrivacyPolicy';


import SearchingOffers from './patient/components/ICICI flow/SearchingOffers';
import CongratsApprovedICICI from './patient/components/ICICI flow/CongratsApprovedICICI';
import CongratsPreApprovedICICI from './patient/components/ICICI flow/CongratsPreApprovedICICI';
import EmiOptions from './patient/components/ICICI flow/EmiOptions';
import PanVerificationIcici from './patient/components/ICICI flow/PanVerificationIcici';
import FinalConsent from './patient/components/ICICI flow/FinalConsent';

import { Screen1 } from './patient/components/Fibe flow/Screen1';
import Screen2 from './patient/components/Fibe flow/Screen2';
import Screen3 from './patient/components/Fibe flow/Screen3';
import Screen4 from './patient/components/Fibe flow/Screen4';
import Screen5 from './patient/components/Fibe flow/Screen5';
import Screen6 from './patient/components/Fibe flow/Screen6';
import Screen7 from './patient/components/Fibe flow/Screen7';
import Screen8 from './patient/components/Fibe flow/Screen8';
import Screen9 from './patient/components/Fibe flow/Screen9';
import Screen10 from './patient/components/Fibe flow/Screen10';
import Screen11 from './patient/components/Fibe flow/Screen11';
import Screen12 from './patient/components/Fibe flow/Screen12';
import Screen12sub1 from './patient/components/Fibe flow/Screen12sub1';
import Screen12sub2 from './patient/components/Fibe flow/Screen12sub2';
import Screen13 from './patient/components/Fibe flow/Screen13';
import Screen14 from './patient/components/Fibe flow/Screen14';
import Screen15 from './patient/components/Fibe flow/Screen15';

import TermsAndConditions from './website/pages/TermsAndConditions';
import RefundandCancellation from './website/pages/RefundandCancellation';
import AddressNotServiceable from './patient/components/Address_Details/AddressDetails/AddressNotServiceable';
import CfApproved from './patient/components/Loan_Details/CfApproved/CfApproved';
import { NotServiceable } from './patient/components/Fibe flow/NotServiceable';
import ICICITermsAndConditions from './website/pages/ICICITermsAndConditions';
import DoctorNotAvailable from './patient/components/Homepage/DoctorNotAvailable';
import PrescriptionUpload from './patient/components/Personal_Details/Prescription/PrescriptionUpload';
import FibePrescriptionUpload from './patient/components/Fibe flow/PrescriptionUpload';

import PrescriptionUpload from './patient/components/Arthmate/Modules/Prescription/PrescriptionUpload';
import ArthPersonalDetails from './patient/components/Arthmate/Modules/BasicInfo/PersonalDetails';
import ArthAddressDetails from './patient/components/Arthmate/Modules/BasicInfo/AddressDetails';
import ArthEmploymentDetails from './patient/components/Arthmate/Modules/BasicInfo/EmploymentDetails';
import ArthCurrentEMIExpenses from './patient/components/Arthmate/Modules/BasicInfo/CurrentEMIExpenses';
import ArthmateOffers from './patient/components/Arthmate/Modules/BasicInfo/ArthmateOffers';
import ArthIncomeVerification from './patient/components/Arthmate/Modules/FinancialDataCapture/IncomeVerification';
import ArthBankSelection from './patient/components/Arthmate/Modules/FinancialDataCapture/BankSelection';
import ArthFileUpload from './patient/components/Arthmate/Modules/FinancialDataCapture/FileUpload';
import ArthMethodSelection from './patient/components/Arthmate/Modules/FinancialDataCapture/MethodSelection';
import ArthCreditAgreement from './patient/components/Arthmate/Modules/Esigning/CreditAgreement';
import ArthAgreementStatus from './patient/components/Arthmate/Modules/Esigning/AgreementStatus';
import ArthAutoRepayment from './patient/components/Arthmate/Modules/AutoRepayment/AutoRepayment';
import ArthAadhaarVerification from './patient/components/Arthmate/Modules/KYC/AadhaarVerification';
import ArthPANPhoto from './patient/components/Arthmate/Modules/KYC/PANPhoto';
import ArthKyc from './patient/components/Arthmate/Modules/KYC/KYC';
import ArthAadhaarPhoto from './patient/components/Arthmate/Modules/KYC/AadhaarPhoto';



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
        <Route path='/ICICITermsAndConditions' element={<ICICITermsAndConditions />} ></Route>

        <Route path='/patient' element={<Homepage />}></Route>
        <Route path='/patient/DoctorNotAvailable' element={<DoctorNotAvailable />}></Route>
        <Route path='/patient/MobileNumberVerification' element={<MobileNumberVerification />} />

        <Route path='/patient/EnterOTP' element={<EnterOTP />} />

        <Route path='/patient/PhoneNumberVerified' element={<PhoneNumberVerified />} />

        <Route path='/patient/CreditDetails' element={<CreditDetails />} />
        <Route path='/patient/PrescriptionUpload' element={<PrescriptionUpload />} />
        <Route path='/patient/PersonalDetails' element={<PersonalDetails />} />
        <Route path='/patient/NotServiceable' element={<NotServiceable />} />

        <Route path='/patient/AddressDetails' element={<AddressDetails />} />
        <Route path='/patient/AddressNotServiceable' element={<AddressNotServiceable />} />

        <Route path='/patient/EmploymentDetails' element={<EmploymentDetails />} />

        <Route path='/patient/LoanDetails' element={<LoanDetails />} />
        <Route path='/patient/CreditFairOffers' element={<CreditFairOffers />} />
        <Route path='/patient/WaitingForApproval' element={<WaitingForApproval />} />
        
        <Route path='/patient/ChechkingStatus' element={<ChechkingStatus />} />
        <Route path='/patient/CfApproved' element={<CfApproved />} />
        <Route path='/patient/RejectedScreen' element={<RejectedScreen />} />

        <Route path='/patient/SearchingOffers' element={<SearchingOffers />} />
        <Route path='/patient/congratsPreApprovedIcici' element={<CongratsPreApprovedICICI />} />
        <Route path='/patient/EmiOptions' element={<EmiOptions />} />
        <Route path='/patient/PanVerificationIcici' element={<PanVerificationIcici />} />
        <Route path='/patient/congratsApprovedIcici' element={<CongratsApprovedICICI />} />
        <Route path='/patient/FinalConsent' element={<FinalConsent />} />

        <Route path='/patient/SearchingOffers' element={<SearchingOffers />} />
        <Route path='/patient/congratsPreApprovedIcici' element={<CongratsPreApprovedICICI />} />
        <Route path='/patient/EmiOptions' element={<EmiOptions />} />
        <Route path='/patient/PanVerificationIcici' element={<PanVerificationIcici />} />
        <Route path='/patient/congratsApprovedIcici' element={<CongratsApprovedICICI />} />
        <Route path='/patient/FinalConsent' element={<FinalConsent />} />

        <Route path='/patient/SearchingOffers' element={<SearchingOffers />} />
        <Route path='/patient/congratsPreApprovedIcici' element={<CongratsPreApprovedICICI />} />
        <Route path='/patient/EmiOptions' element={<EmiOptions />} />
        <Route path='/patient/PanVerificationIcici' element={<PanVerificationIcici />} />
        <Route path='/patient/congratsApprovedIcici' element={<CongratsApprovedICICI />} />
        <Route path='/patient/FinalConsent' element={<FinalConsent />} />

        <Route path='/patient/SearchingOffers' element={<SearchingOffers />} />
        <Route path='/patient/congratsPreApprovedIcici' element={<CongratsPreApprovedICICI />} />
        <Route path='/patient/EmiOptions' element={<EmiOptions />} />
        <Route path='/patient/PanVerificationIcici' element={<PanVerificationIcici />} />
        <Route path='/patient/congratsApprovedIcici' element={<CongratsApprovedICICI />} />
        <Route path='/patient/FinalConsent' element={<FinalConsent />} />

        <Route path='/patient/fibeMobileNumberVerification' element={<Screen1 />} />
        <Route path='/patient/fibeOtpAuthentication' element={<Screen2 />} />
        <Route path='/patient/fibeNumberVerified' element={<Screen3 />} />
        <Route path='/patient/fibeWelcome' element={<Screen4 />} />
        <Route path='/patient/fibeCreditDetails' element={<Screen5 />} />
        <Route path='/patient/fibePrescriptionUpload' element={<FibePrescriptionUpload />} />
        <Route path='/patient/fibeBasicDetails' element={<Screen6 />} />
        <Route path='/patient/fibeEmploymentDetails' element={<Screen7 />} />
        <Route path='/patient/fibeGreatJob' element={<Screen8 />} />
        <Route path='/patient/fibeCreateUser' element={<Screen9 />} />
        <Route path='/patient/fibeWaitingForApproval' element={<Screen10 />} />
        <Route path='/patient/fibeCheckingStatus' element={<Screen11 />} />
        <Route path='/patient/fibeLoanApproved' element={<Screen12 />} />
        <Route path='/patient/fibeBankStatementRequired' element={<Screen12sub1 />} />
        <Route path='/patient/fibeLoanRejected' element={<Screen12sub2 />} />
        <Route path='/patient/fibeRedirecting' element={<Screen13 />} />
        <Route path='/patient/screen14/:userId' element={<Screen14 />} />
        <Route path='/patient/fibeCongratsUser' element={<Screen15 />} />

        {/* <Route path='/patient/screen1' element={<Screen1 />} />
        <Route path='/patient/screen2' element={<Screen2 />} />
        <Route path='/patient/screen3' element={<Screen3 />} />
        <Route path='/patient/screen4' element={<Screen4 />} />
        <Route path='/patient/screen5' element={<Screen5 />} />
        <Route path='/patient/fibePrescriptionUpload' element={<FibePrescriptionUpload />} />
        <Route path='/patient/screen6' element={<Screen6 />} />
        <Route path='/patient/screen7' element={<Screen7 />} />
        <Route path='/patient/screen8' element={<Screen8 />} />
        <Route path='/patient/screen9' element={<Screen9 />} />
        <Route path='/patient/screen10' element={<Screen10 />} />
        <Route path='/patient/screen11' element={<Screen11 />} />
        <Route path='/patient/screen12' element={<Screen12 />} />
        <Route path='/patient/screen12sub1' element={<Screen12sub1 />} />
        <Route path='/patient/screen12sub2' element={<Screen12sub2 />} />
        <Route path='/patient/screen13' element={<Screen13 />} />
        <Route path='/patient/screen14/:userId' element={<Screen14 />} />
        <Route path='/patient/screen15' element={<Screen15 />} />
 */}

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
        <Route path='/patient/ArthBankSelection' element={<ArthBankSelection />}></Route>
        <Route path='/patient/ArthFileUpload' element={<ArthFileUpload />}></Route>
        <Route path='/patient/ArthMethodSelection' element={<ArthMethodSelection />}></Route>
        <Route path='/patient/ArthCreditAgreement' element={<ArthCreditAgreement />}></Route>
        <Route path='/patient/ArthAgreementStatus' element={<ArthAgreementStatus />}></Route>
        <Route path='/patient/ArthAutoRepayment' element={<ArthAutoRepayment />}></Route>
        <Route path='/patient/ArthKyc' element={<ArthKyc />}></Route>
        <Route path='/patient/ArthAadhaarVerification' element={<ArthAadhaarVerification />}></Route>
        <Route path='/patient/ArthAadhaarPhoto' element={<ArthAadhaarPhoto />}></Route>
        <Route path='/patient/ArthPANPhoto' element={<ArthPANPhoto />}></Route>

      </Routes>
    // {/* </div> */}
  );
}

export default App;
