import { Routes, Route } from 'react-router-dom'
import './App.scss'
import Homepage from './Components/Homepage/Homepage'
import VerifyOTP from './Components/VerifyOTP/VerifyOTP'
import Welcome from './Components/Welcome/Welcome'
import PersonalDetails from './Components/PersonalDetails/PersonalDetails'
import PracticeDetails from './Components/PracticeDetails/PracticeDetails'
import AddressDetails from './Components/AddressDetails/AddressDetails'
import BankDetails from './Components/BankDetails/BankDetails'
import UploadDocuments from './Components/UploadDocuments/UploadDocuments'
import ThankYou from './Components/ThankYou/ThankYou'

function App() {

  return (
    <Routes>
      <Route path='doctor/' element={<Homepage />} ></Route>
      <Route path='doctor/verifyotp' element={<VerifyOTP />} ></Route>
      <Route path='doctor/welcome' element={<Welcome />} ></Route>
      <Route path='doctor/PersonalDetails' element={<PersonalDetails />} ></Route>
      <Route path='doctor/PracticeDetails' element={<PracticeDetails />} ></Route>
      <Route path='doctor/AddressDetails' element={<AddressDetails />} ></Route>
      <Route path='doctor/BankDetails' element={<BankDetails />} ></Route>
      <Route path='doctor/UploadDocuments' element={<UploadDocuments />} ></Route>
      <Route path='doctor/ThankYou' element={<ThankYou />} ></Route>
    </Routes>
  )
}

export default App
