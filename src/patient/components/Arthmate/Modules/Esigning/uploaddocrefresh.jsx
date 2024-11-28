import { useState, useEffect } from "react"
import { Header } from "../../comps/Header";
import lottie from "lottie-web";
import animationData from '../../assets/loader simple.json'
import completeAnimation from '../../../../assets/GIFs/Comp 1.json'

import SorryEmoji from '../../assets/sorryEmoji.png'
import axios from "axios";
import { env } from "../../../../environment/environment";
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";
import Loadinggif from "../../../../../utils/loader/loadergif";
import SearchingDoc from '../../../../assets/GIFs/Document in process.gif'
import NoteText from "../../../Fibe flow/Comps/NoteText";
import { Link } from "react-router-dom";

export default function ArthAgreementStatus() {
    const [loaderState, setLoaderState] = useState(false);

    const userId = localStorage.getItem("userId");

    let navigate = useNavigate()

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
    }, []);
    function checkAndNavigatedigitap() {
        // navigate(routes.ARTH_CONGRATULATIONS)
        setLoaderState(false)

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
                    navigate(routes.DIGITAP_BANK_STATEMENT)

                }
                if (response.data.data === 'NOT_FIT') {
                    navigate(routes.DIGITAP_BANK_STATEMENT)
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
                            // axios.get(env.api_Url + 'finzy/bankInfo?loanId=' + loanData.data.data.loanId)
                            //     .then((res) => {
                            //         if (res.data.message === 'success') {
                            axios.get(env.api_Url + 'finzy/finzyLoanDetailByRefId?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                .then((res) => {
                                    if (res.data.message === 'success' && res.data.data === 'APPROVED') {
                                        axios.get(env.api_Url + 'finzy/loanAccept?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                            .then((res) => {
                                                if (res.data.message === 'success') {
                                                    axios.get(env.api_Url + 'finzy/finzyLoanDetailByRefId?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                                        .then((res) => {
                                                            if (res.data.message === 'success' && res.data.data === 'DOCUMENTATION') {
                                                                //  navigate()
                                                                navigate(routes.FINZY_AGREEMENT)
                                                            }
                                                        })
                                                }
                                            })
                                    }
                                    if (res.data.message === 'success' && res.data.data === 'PRE-APPROVED') {
                                        axios.get(env.api_Url + 'finzy/loanSanction?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                            .then((res) => {
                                                if (res.data.message === 'success') {
                                                    axios.get(env.api_Url + 'finzy/finzyLoanDetailByRefId?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                                        .then((res) => {
                                                            if (res.data.message === 'success' && res.data.data === 'APPROVED') {
                                                                axios.get(env.api_Url + 'loanAccept?loanId=' + loanData.data.data.loanId + '&accept=true')
                                                                    .then((res) => {
                                                                        if (res.data.message === 'success') {
                                                                            axios.get(env.api_Url + 'finzy/finzyLoanDetailByRefId?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                                                                .then((res) => {
                                                                                    if (res.data.message === 'success' && res.data.data === 'DOCUMENTATION') {
                                                                                        // esignscreennavigate
                                                                                        navigate(routes.FINZY_AGREEMENT)
                                                                                    }
                                                                                })
                                                                        }
                                                                    })
                                                            }
                                                        })
                                                }
                                            })
                                    }
                                    if (res.data.message === 'success' && res.data.data === 'KYC') {
                                        navigate(routes.STATUS_WAIT_FINZY)
                                    }
                                })
                            //     }




                            // })
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

    function checkAndNavigate() {
        // navigate(routes.ARTH_CONGRATULATIONS)
        setLoaderState(false)
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
    const tryAgain = () => {
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loanData) => {
                axios.get(env.api_Url + 'finzy/uploadDocument?loanId=' + loanData.data.data.loanId)
                    .then((upload) => {
                        if (upload.status === 200 && upload.data.message === 'success') {
                            axios.get(env.api_Url + 'finzy/additionalInfo?loanId=' + loanData.data.data.loanId)
                                .then((additional) => {
                                    console.log(additional, 'additionalinfo')

                                    if (additional.data.message === 'success') {
                                        console.log(loanData.data.data.loanAmount, 'loanData.data.data.loanAmount')
                                        if (loanData.data.data.loanAmount >= 75000) {

                                            checkAndNavigatedigitap()
                                        } else {
                                            axios.get(env.api_Url + 'finzy/cibilApi?loanId=' + loanData.data.data.loanId)
                                                .then((additional) => {
                                                    if (additional.status === 200 && additional.data.message === 'success') {
                                                        checkAndNavigate()

                                                    }

                                                })
                                        }

                                    }

                                })
                        }

                    })
            })




    }
    return (
        <main>


            <>
            {loaderState && <Loadinggif />}
        
                <Header progressBar="hidden" />
                {!loaderState?
                <>
                   <div style={{ display: "flex", placeContent: "center", marginTop: "3rem" }}>
                            <img src={SearchingDoc} alt="" style={{ width: "50%" }} />
                        </div>
                        <NoteText text="Assessing your credit..." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />

                        <button className="submit" style={{ margin: "2rem 0 12px 0" }} onClick={() => tryAgain()}>Refresh status</button>
                        <NoteText text="For more details and enquiries, reach out to us" styles={{ textAlign: "center", color: "#000000C", fontSize: "16px", lineHeight: "20px", marginTop: "1.7rem" }} />
                        <div style={{ textAlign: "center", margin: "1rem 0 2rem 0" }}>
                            <Link to={"tel:+918069489655"} style={{ color: "#514C9F", fontWeight: "700", textDecoration: "underline", textAlign: "center" }}>Contact Support</Link>
                        </div>
                </>:""}
            </>

        </main>
    )
}