import Header from "../../Header/Header"
import './verificationSuccesful.scss'

import { useNavigate } from "react-router-dom"

import NumberVerified from '../../../assets/shield.png'


const StatementVerificationSuccesful = ({data = "Bank Account Statement Verified!"}) =>{
    // data = 
    // "Documents Verified!"  for documents verification
    // "Bank Details Verified" from bank details verification

    const navigate = useNavigate();

    setTimeout(()=>{
        navigate('Congrats', {replace:true})
    },2500)

   return(
    <>
    <Header progressbarDisplay="none" />

    <main className="statementVerificationSuccesful">
        <div className="centerSection">
            <img src={NumberVerified} alt="" />
            <p className="redirectionMsg">{data}</p>
        </div>
    </main>
    </>
   )
}


export default StatementVerificationSuccesful