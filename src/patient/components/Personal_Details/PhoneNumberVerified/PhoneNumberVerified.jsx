import Header from "../../Header/Header"
import './phoneNumberVerified.scss'

import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import NumberVerified from '../../../assets/shield.png'
import axios from "axios"
import { env } from "../../../../doctor/environment"
import { checkDoctorStatus } from "../../../services"
const fibeNbfcId = "lYsPxk42bDzRgJVmHoNNcegqyC9ww1XK";

const PhoneNumberVerified = () => {


    const navigate = useNavigate();

    useEffect(() => {
        //fetch Liquiloan URL against doctorID
        //if it exists, then navigate user to screen with iframe.
        //if it doesn't, navigate to personal details


    }, [])

    useEffect(() => {
        if (window.localStorage.getItem('doctorId')) {
            checkDoctorStatus(window.localStorage.getItem('doctorId'), res => {
                if (res.message === "success" && res.data === "HOLD") {
                    navigate("/patient/DoctorNotAvailable");
                }
                if (res.message === "Not Found") {
                    navigate("/patient/DoctorNotAvailable");
                }
                // setTimeout(()=>{
                if (res.message === 'success' && res.data === 'APPROVED') {
                    navigate('/patient/CreditDetails', { replace: true })
                }
                // },3000)
            })
            // axios.get(env.api_Url+"getDoctorProfDetailsByDoctorId?doctorId=" + doctorId)
            // .then((response)=>{
            //     // console.log(response)
            //     setGoogleReviewLink(response?.data?.data?.googleReviewLink)
            //     setJustdialReviewLink(response?.data?.data?.justdialReviewLink)
            // }).catch((error)=>{
            //     console.warn(error)
            // })
        }
    }, [])

    // useEffect(() => {
    //     if (window.localStorage.getItem('doctorId')) {
    //         axios.get(env.api_Url + "userDetails/getNbfcStatusForDoctor?doctorId=" + window.localStorage.getItem('doctorId'))
    //             .then((response) => {
    //                 // console.log(response);
    //                 if (response) {
    //                     let id = response?.data?.data[0];
    //                     if (id) {
    //                         if (id === fibeNbfcId) {
    //                             navigate('/patient/fibeMobileNumberVerification')
    //                         } else {
    //                             navigate('/patient/MobileNumberVerification')
    //                         }
    //                         localStorage.setItem('nbfcId', id);
    //                     }
    //                 }
    //             }).catch((error) => {
    //                 console.warn(error)
    //             })
    //     }
    // }, [])

    return (
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