import Header from "../../Header/Header"
import './verificationSuccesful.scss'

import { useNavigate } from "react-router-dom"

import NumberVerified from '../../../assets/shield.png'
import { useEffect } from "react"


const PGVerificationSuccesful = ({data = "Payment Received!"}) =>{
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/patient/LoanAppUnderProcess')
        },3000)
    },[])

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


export default PGVerificationSuccesful