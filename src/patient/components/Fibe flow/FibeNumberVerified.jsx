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
    function checkAndNavigate() {
        // navigate(routes.ARTH_CONGRATULATIONS)
        // setLoaderState(false)
        axios.get(env.api_Url + "getFinalNbfc?userId=" + userId)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.data === 'AM') {
                    // navigate(routes.ARTH_CONGRATULATIONS)
                    checkdigitapdataForAthMate()
                }
                if (response.data.data === 'CF') {
                    navigate(routes.CONGRATS)
                }
                if (response.data.data === 'FIBE') {
                    axios.get(env.api_Url + "checkFibeFlow?userId=" + userId)
                        .then((response) => {
                            if (response.data.data === 'GREEN') {
                                navigate(routes.FIBE_LOAN_APPROVED)
                            }
                            if (response.data.data === 'AMBER') {
                                navigate(routes.FIBE_BANK_STATEMENT_REQUIRED)

                            }

                        })

                    // 
                }
                if (response.data.data === 'INCRED') {


                    axios.get(env.api_Url + "getIncredStatusForUser?userId=" + userId)
                        .then((response) => {
                            console.log(response.data.data.status, 'response.data.data')
                            if (response.data.data.status === 'GREEN') {
                                navigate(routes.APPROVAL_INCRED)
                            }
                            if (response.data.data.status === 'AMBER') {
                                navigate(routes.INCRED_PREAPPROVED)

                            }

                        })

                }
                if (response.data.data === 'WAIT') {
                    navigate(routes.WAIT_FOR_PROCESSING)

                }
                if (response.data.data === 'LOL') {
                    navigate(routes.REJECTED_SCREEN)

                }
                if (response.data.data === 'NOT_FIT') {
                    navigate(routes.REJECTED_SCREEN)
                }
                if (response.data.data === 'MV') {
                    // navigate(routes.REJECTED_SCREEN)
                    // mvscrees
                    axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                        .then((loanData) => {
                            axios.get(env.api_Url + 'moneyViewActivityStatus?loanId=' + loanData.data.data.loanId)
                                .then((res) => {
                                    if (res.data.data.leadStatus === 'DOCS_REQUIRED') {
                                        navigate(routes.MONEY_VIEW_BANKSTATEMENT)

                                    }
                                    if (res.data.data.leadStatus === 'NOT_REQUIRED') {
                                        navigate(routes.MV_CONGRATULATIONS)


                                    }



                                })
                        })
                }
                if (response.data.data === 'FINZY') {


                    axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                        .then((loanData) => {
                            axios.get(env.api_Url + 'finzy/getFinzyDetailByLoanId?loanId=' + loanData.data.data.loanId)
                                .then((res) => {
                                    if (res.data.message === 'success') {
                                        if (res.data.data.amount === loanData.data.data.loanAmount) {
                                            navigate(routes.FINZY_APPROVAL)
                                        } else {
                                            navigate(routes.FINZY_APPROVE_LESS_AMOUNT)

                                        }

                                    }
                                })
                        })
                }




            })
    }
    const checkdigitapdataForAthMate = () => {
        axios.get(env.api_Url + "checkAMFlowGreenOrAmber?userId=" + userId)
            .then(response => {
                if (response.data.message === "success") {
                    let data = response.data.data;
                    if (!!data) {
                        // setDigitapData(data)
                        if (data === 'GREEN') {
                            navigate(routes.ARTH_CONGRATULATIONS)
                        }
                        if (data === 'AMBER') {
                            navigate(routes.DIGITAP_BANK_STATEMENT)
                        }

                    }
                }
            }).catch(() => {
                console.log("Error fetching data");
            })
    }
    useEffect(() => {
        if (userId && userId !== 'null') {
            // axios.get(`${env.api_Url}userDetails/getUserLoanFormStatus?userId=${userId}`)
            //     .then(response => {
            //         if (response.data.message === 'success') {
            axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                .then((loanData) => {
                    if (loanData.data.message === 'success') {
                        axios.get(env.api_Url + 'finzy/getFinzyDetailByLoanId?loanId=' + loanData.data.data.loanId)
                            .then((statusData) => {
                                console.log(statusData, 'statusData')
                                if(statusData.data.message==='success'){
                                if (statusData.data.data.cpStatus === 'ESIGN_COMPLETE') {
                                    navigate('/patient/fach/' + loanData.data.data.loanId)
                                }
                                if (statusData.data.data.cpStatus === 'LOAN_ACCEPTED') {
                                    navigate(routes.FINZY_AGREEMENT)
                                }
                                if (statusData.data.data.cpStatus === 'BANK_INFO') {
                                    navigate(routes.STATUS_WAIT_FINZY)

                                }
                                if (statusData.data.data.cpStatus === 'FINZY') {
                                    checkAndNavigate()
                                }
                                if (statusData.data.data.cpStatus === 'DIGITAP') {
                                    navigate(routes.DIGITAP_BANK_STATEMENT)

                                }
                                if (statusData.data.data.cpStatus === 'AADHAAR_VERIFIED') {
                                    navigate(routes.ARTH_SELFIE)

                                }
                                if (statusData.data.data.cpStatus === 'LOAN_CREATED') {
                                    navigate(routes.ARTH_BANKDETAILS)

                                }
                                if (statusData.data.data.cpStatus !== 'ESIGN_COMPLETE' && statusData.data.data.cpStatus !== 'LOAN_ACCEPTED' && statusData.data.data.cpStatus !== 'BANK_INFO' && statusData.data.data.cpStatus !== 'FINZY' && statusData.data.data.cpStatus !== 'DIGITAP' && statusData.data.data.cpStatus !== 'AADHAAR_VERIFIED' && statusData.data.data.cpStatus !== 'LOAN_CREATED') {
                                    navigate(routes.ARTH_CREDIT_DETAILS)
                                }
                            }else{
                                navigate(routes.ARTH_CREDIT_DETAILS)
                            }


                            })
                    } else {
                        navigate(routes.ARTH_CREDIT_DETAILS)
                    }

                })

            // const data = response.data.data;

            // if (!data) {
            //     timerId.current = setTimeout(() => {
            //         navigate(routes.ARTH_CREDIT_DETAILS, { replace: true });
            //     }, 2500);
            //     return;
            // }

            // const navigationMap = {
            //     'LEAD_CREATED_AM': routes.CONNECTING_WITH_LENDERS,
            //     'KYC_AADHAR_AM': routes.ARTH_PAN_PHOTO,
            //     'KYC_PAN_AM': routes.KYC_PAN_AM,
            //     'ESIGN_AM': routes.ARTH_AUTO_REPAYMENT,
            //     'KYC_SELFIE_AM': routes.WAIT_ARTH,
            //     'LOAN_CREATED_AM': routes.WAIT_ARTH,
            //     'NACH_AM': `/patient/nachmandatewait/${userId}`
            // };

            // const route = navigationMap[data] || routes.ARTH_CREDIT_DETAILS;
            // timerId.current = setTimeout(() => {
            //     navigate(route, { replace: true });
            // }, 2500);
        }
        // else {
        //     timerId.current = setTimeout(() => {
        //         navigate(routes.ARTH_CREDIT_DETAILS, { replace: true });
        //     }, 2500);
        // }
        //         })
        //         .catch(error => {
        //             console.error("Error fetching user loan form status:", error);
        //             navigate(routes.ARTH_CREDIT_DETAILS, { replace: true });
        //         });
        // }
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
