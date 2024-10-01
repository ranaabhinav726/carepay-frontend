import { Header } from "./Comps/Header";
import Gratification from '../../assets/GIFs/Gratification.gif';
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/Comp 1.json';
import { useEffect, useState, useRef } from "react";
import ScreenTitle from "./Comps/ScreenTitle";
import routes from "../../../layout/Routes";
import axios from "axios";
import { env } from "../../environment/environment";

export default function FibeNumberVerified() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const timerId = useRef(null);  // Use useRef to persist the timerId

    useEffect(() => {
        // Fetch userId from localStorage after component mounts
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId && userId !== 'null') {
            axios.get(`${env.api_Url}userDetails/getUserLoanFormStatus?userId=${userId}`)
                .then(response => {
                    if (response.data.message === 'success') {
                        const data = response.data.data;

                        if (!data) {
                            timerId.current = setTimeout(() => {
                                navigate(routes.ARTH_CREDIT_DETAILS, { replace: true });
                            }, 2500);
                            return;
                        }

                        const navigationMap = {
                            'LEAD_CREATED_AM': routes.CONNECTING_WITH_LENDERS,
                            'KYC_AADHAR_AM': routes.ARTH_PAN_PHOTO,
                            'KYC_PAN_AM': routes.KYC_PAN_AM,
                            'ESIGN_AM': routes.ARTH_AUTO_REPAYMENT,
                            'KYC_SELFIE_AM': routes.WAIT_ARTH,
                            'LOAN_CREATED_AM': routes.WAIT_ARTH,
                            'NACH_AM': `/patient/nachmandatewait/${userId}`
                        };

                        const route = navigationMap[data] || routes.ARTH_CREDIT_DETAILS;
                        timerId.current = setTimeout(() => {
                            navigate(route, { replace: true });
                        }, 2500);
                    } else {
                        timerId.current = setTimeout(() => {
                            navigate(routes.ARTH_CREDIT_DETAILS, { replace: true });
                        }, 2500);
                    }
                })
                .catch(error => {
                    console.error("Error fetching user loan form status:", error);
                    navigate(routes.ARTH_CREDIT_DETAILS, { replace: true });
                });
        }
    }, [userId, navigate]);

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#searchAnimation"),
            animationData: animationData,
            renderer: "canvas"
        });

        return () => {
            // Clean up the timer when component unmounts
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
        };
    }, []);

    return (
        <main className="screenContainer">
            <Header progressBar="hidden" />
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
    );
}
