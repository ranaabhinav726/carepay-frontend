import Header from "../../Header/Header"
import './phoneNumberVerified.scss'

import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import NumberVerified from '../../../assets/shield.png'

const PhoneNumberVerified = () =>{

    const navigate = useNavigate();

    useEffect(() => {
        //fetch Liquiloan URL against doctorID
        //if it exists, then navigate user to screen with iframe.
        //if it doesn't, navigate to personal details

        setTimeout(()=>{
            navigate('/patient/CreditDetails',{ replace: true })
        },3000)
    }, [])

   return(
    <>
    <main className="phoneNumberVerified">
    <Header progressbarDisplay="none" />
        <div className="centerSection">
            <img src={NumberVerified} alt="" />
            <p className="verifiedConfirmation">Phone Number Verified!</p>
            <p className="redirectionMsg">Redirecting...</p>
        </div>

        <div className="msgBox">We need a few details to check your <br />eligibility for the credit.</div>
    </main>
    </>
   )
}


export default PhoneNumberVerified