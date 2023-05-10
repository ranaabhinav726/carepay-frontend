import Header from "../../Header/Header"
import './verificationSuccesful.scss'

import { useNavigate } from "react-router-dom"

import NumberVerified from '../../../assets/shield.png'


const KycVerificationSuccesful = ({data = "KYC Documents Verified!"}) =>{
    // data = 
    // "Documents Verified!"  for documents verification
    // "Bank Details Verified" from bank details verification

    const navigate = useNavigate();

    setTimeout(()=>{
        navigate('/patient/StatementVerificationUnderProcess', {replace: true})
    },3000)

   return(
    <>
    <main className="verificationSuccesful">
    <Header progressbarDisplay="none" />
        <div className="centerSection">
            <img src={NumberVerified} alt="" />
            <p className="redirectionMsg">{data}</p>
        </div>
    </main>
    </>
   )
}


export default KycVerificationSuccesful