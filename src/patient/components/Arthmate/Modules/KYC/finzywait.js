import { useState, useEffect } from "react"
import { Header } from "../../comps/Header";
import lottie from "lottie-web";
import animationData from '../../assets/loader simple.json'
import completeAnimation from '../../../../assets/GIFs/Comp 1.json'
import axios from "axios";
import { env } from "../../../../environment/environment";
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";


export default function ArthAgreementStatus() {
    let navigate=useNavigate()
    let userId = localStorage.getItem('userId')
    const [screenState, setScreenState] = useState("fetching");

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#searchAnimation"),
            animationData: animationData,
            renderer: "canvas"
        });

        lottie.loadAnimation({
            container: document.querySelector("#completeAnimation"),
            animationData: completeAnimation,
            renderer: "canvas"
        });

        if (!!userId) {
            axios.get(env.api_Url + "/checkNbfcEligibilityForUser?userId=" + userId + '&nbfcName=FINZY')
                .then((response) => {
                    if (response.data.message === "success") {
                        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                            .then((loanData) => {

                                axios.get(env.api_Url + "finzy/createLoan?loanId=" + loanData.data.data.loanId)
                                    .then((response) => {
                                        if (response.data.message === "success" ||response.data.message === "duplicate" ) {
                                            axios.get(env.api_Url + "finzy/loanAadhaarStep?loanId=" + loanData.data.data.loanId)
                                                .then((response) => {
                                                    if (response.data.message === "success") {
                                                        navigate(routes.FINZY_AADHAR_VERIFICATION)
                                                        
                                                    } else {
                                                        
                                                    }
                                                })

                                        } else {
                                            checkAndNavigate()
                                        }
                                    })
                            })
                    }
                })
        }

    }, []);
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


    function checkAndNavigate() {
        // navigate(routes.ARTH_CONGRATULATIONS)
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
                            axios.get(env.api_Url + 'bankInfo?loanId=' + loanData.data.data.loanId)
                                .then((res) => {
                                    if (res.data.message === 'success') {
                                        axios.get(env.api_Url + 'loanSanction?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                            .then((res) => {
                                                if (res.data.message === 'success') {
                                                    axios.get(env.api_Url + 'loanAccept?loanId=' + loanData.data.data.loanId + '&accept=true')
                                                        .then((res) => {
                                                            if (res.data.message === 'success') {

                                                            }
                                                        })
                                                }
                                            })
                                    }




                                })
                        })
                }



            })
    }
    
    return (
        <main>
            {screenState === "fetching" &&
                <>
                    <Header progressBar="hidden" />
                    <div style={{ marginTop: "10%" }} id="searchAnimation"></div>
                    <p style={{ textAlign: "center", opacity: "0.8" }}>Generating OTP for verifying Aadhaar...</p>
                </>
            }

        </main>
    )
}