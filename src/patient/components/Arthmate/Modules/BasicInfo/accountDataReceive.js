import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import animationData from '../../../../assets/JSON animations/Comp 1.json'
import { useEffect, useState } from "react";
import routes from "../../../../../layout/Routes";
import ScreenTitle from "../../comps/ScreenTitle";
import { Header } from "../../comps/Header";
import { APIS } from "../../../../../utils/apifactory";
import axios from "axios";
import { env } from "../../../../environment/environment";
import NoteText from "../../../Fibe flow/Comps/NoteText";
import SearchingDoc from '../../../../assets/GIFs/Document in process.gif'
import { Link } from "react-router-dom";

let userId=localStorage.getItem('userId')
export default function DataVerified() {


    const navigate = useNavigate();
    const [loaderState, setLoaderState] = useState(false)
    
    // let timerId = setTimeout(() => {

    //     navigate(routes.WAIT_FOR_PROCESSING, { replace: "true" })
    // }, 2500);

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



    }, []);
    useEffect(() => {
        setLoaderState(true)
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loandata) => {
                if (loandata.data.message === 'success') {
                    axios.get(APIS.GET_BS_INFO_API + loandata.data.data.loanId)
                        .then((bsapiData) => {
                            if (bsapiData.data.message === 'success') {
                                // navigate(routes.DIGITAP_DATA_RECEIVED)
                                // setHaveReport(true)
                                axios.get(env.api_Url + 'finzy/cibilApi?loanId=' + loandata.data.data.loanId)
                                    .then((cibildata) => {
                                        checkAndNavigate()
                                        // if (cibildata.status === 200 && cibildata.data.data === 'APPROVED') {
                                        //     axios.get(env.api_Url + 'finzy/getFinzyDetailByLoanId?loanId=' + loandata.data.data.loanId)
                                        //         .then((res) => {
                                        //             if (res.data.message === 'success') {
                                        //                 if (res.data.data.amount === loandata.data.data.loanAmount) {
                                        //                     navigate(routes.FINZY_APPROVAL)
                                        //                 } else {
                                        //                     navigate(routes.FINZY_APPROVE_LESS_AMOUNT)

                                        //                 }

                                        //             }
                                        //         })
                                        //     // navigate(routes.FINZY_APPROVAL)

                                        // } else {
                                        //     navigate(routes.REJECTED_SCREEN)
                                        // }

                                    })
                            }
                        })

                }
            })


    }, [])
    const checkdigitapdataForAthMate = () => {
        axios.get(env.api_Url + "checkAMFlowGreenOrAmber?userId=" + userId)
            .then(response => {
                setLoaderState(false)
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
                setLoaderState(false)
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
                                        if (res.data.data.loanAmountOffered === loanData.data.data.loanAmount) {
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


    return (
        <main className="screenContainer">
            <Header progressBar="hidden" />
            {/* <div style={{display:"flex", minHeight:"70vh", alignItems:"center", justifyContent:"center"}}>
                <img src={Gratification} style={{maxWidth:"40%"}} alt="" />
            </div> */}
            {loaderState ?
                <>
                    <div style={{ display: "flex", placeContent: "center", marginTop: "3rem" }}>
                        <img src={SearchingDoc} alt="" style={{ width: "50%" }} />
                    </div>
                    <NoteText text="We are assessing your credit application." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />
                    <NoteText text="This might take 5-10 minutes." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />
                 
                    <button onClick={() => checkAndNavigate()} className="submit" style={{ margin: "2rem 0 12px 0" }}>Refresh status</button>
                    <NoteText text="For more details and enquiries, reach out to us" styles={{ textAlign: "center", color: "#000000C", fontSize: "16px", lineHeight: "20px", marginTop: "1.7rem" }} />
                    <div style={{ textAlign: "center", margin: "1rem 0 2rem 0" }}>
                        <Link to={"tel:+918069489655"} style={{ color: "#514C9F", fontWeight: "700", textDecoration: "underline", textAlign: "center" }}>Contact Support</Link>
                    </div>
                </>
                : ""}
            {/* <div style={{ marginTop: "25%" }} id="searchAnimation"></div>
            <ScreenTitle
                id="screen3Title"
                className="fadeInUpAnimate"
                title="Account data received!"
                styles={{
                    color: "#514C9F",
                    textAlign: "center",
                    margin: "0",
                    opacity: "0"
                }}
            /> */}
        </main>
    )
}