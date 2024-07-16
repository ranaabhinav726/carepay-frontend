import { Header } from "./Comps/Header";
import Gratification from '../../assets/GIFs/Gratification.gif'
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/Comp 1.json'
import { useEffect } from "react";
import ScreenTitle from "./Comps/ScreenTitle";
import routes from "../../../layout/Routes";
import axios from "axios";
import { env } from "../../environment/environment";

let userId = localStorage.getItem("userId");

export default function FibeNumberVerified() {

    const navigate = useNavigate();
    let timerId = setTimeout(() => {

        // navigate(routes.ARTH_CREDIT_DETAILS, { replace: "true" })
    }, 2500);

    useEffect(() => {
        console.log(userId)
        if (userId !== null && userId !== '' && userId !== 'null') {

            axios.get(env.api_Url + "userDetails/getUserLoanFormStatus?userId=" + userId)
                .then(response => {
                    if (response.data.data === null||response.data.data === '') {
                        setTimeout(() => {
                            navigate(routes.ARTH_CREDIT_DETAILS, { replace: "true" })
                        }, 2500);

                    }

                    if (response.data.data !== 'LEAD_CREATED_AM' && response.data.data !== 'KYC_AADHAR_AM' && response.data.data !== 'KYC_PAN_AM' && response.data.data !== 'ESIGN_AM' && response.data.data !== 'KYC_SELFIE_AM' && response.data.data !== 'LOAN_CREATED_AM' && response.data.data !== 'NACH_AM') {
                        setTimeout(() => {
                            navigate(routes.ARTH_CREDIT_DETAILS, { replace: "true" })
                        }, 2500);

                    }
                    if (response.data.data === 'LEAD_CREATED_AM') {
                        setTimeout(() => {
                            navigate(routes.CONNECTING_WITH_LENDERS, { replace: "true" })
                        }, 2500);

                    }
                    if (response.data.data === 'KYC_AADHAR_AM') {
                        setTimeout(() => {
                            navigate(routes.ARTH_PAN_PHOTO, { replace: "true" })
                        }, 2500);

                    }
                    if (response.data.data === 'KYC_PAN_AM') {
                        setTimeout(() => {
                            navigate(routes.KYC_PAN_AM, { replace: "true" })
                        }, 2500);

                    }
                    if (response.data.data === 'ESIGN_AM') {
                        setTimeout(() => {
                            navigate(routes.ARTH_AUTO_REPAYMENT, { replace: "true" })
                        }, 2500);

                    }
                    if (response.data.data === 'KYC_SELFIE_AM' || response.data.data === 'LOAN_CREATED_AM') {
                        setTimeout(() => {
                            navigate(routes.WAIT_ARTH, { replace: "true" })
                        }, 2500);

                    }
                    if (response.data.data === 'NACH_AM') {
                        setTimeout(() => {
                            navigate('/patient/nachmandatewait/' + userId, { replace: "true" })
                        }, 2500);

                    }
                  
                }
                )
        } else {

        }
    }, [])
    // setTimeout(()=>{
    //     let elem = document.getElementById('screen3Title');
    //     elem.classList.add('fadeInUpAnimate');
    // }, 2000)

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#searchAnimation"),
            animationData: animationData,
            renderer: "canvas"
        });

        return () => {
            clearTimeout(timerId)
        }

    }, []);

    return (
        <main className="screenContainer">
            <Header progressBar="hidden" />
            {/* <div style={{display:"flex", minHeight:"70vh", alignItems:"center", justifyContent:"center"}}>
                <img src={Gratification} style={{maxWidth:"40%"}} alt="" />
            </div> */}
            <div style={{ marginTop: "25%" }} id="searchAnimation"></div>
            <ScreenTitle
                id="screen3Title"
                className="fadeInUpAnimate"
                title="Mobile number verified!"
                styles={{
                    color: "#514C9F",
                    textAlign: "center",
                    margin: "0",
                    opacity: "0"
                }}
            />
        </main>
    )
}