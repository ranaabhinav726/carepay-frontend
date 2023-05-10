import Header from "../../Header/Header"
import './verificationSuccesful.scss'

import NumberVerified from '../../../assets/shield.png'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const EmandateVerificationSuccesful = ({data = "E-Mandate Verified!"}) =>{


    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/patient/FirstPaymentScreen') // will be navigated to 1st EMI payemnt screen
        },2000)
    }, [])

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


export default EmandateVerificationSuccesful