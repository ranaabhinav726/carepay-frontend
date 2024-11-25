import React, { useEffect, useState } from "react";
import SearchingDoc from '../../../../assets/GIFs/Document in process.gif'
import NoteText from "../../../Fibe flow/Comps/NoteText";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../../../environment/environment";
import Header from "../../../Header/Header";
import routes from "../../../../../layout/Routes";
import Loadinggif from "../../../../../utils/loader/loadergif";

const WaitLegality = () => {
    let navigate = useNavigate()
    const [loaderState, setLoader] = useState(false)
    let userId = localStorage.getItem('userId')
    const refreshScreen = () => {
        setLoader(true)

        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loanData) => {

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
                        {console.log(res.data.data)}
                        if (res.data.message === 'success' && res.data.data === 'PRE_APPROVED') {
                              {console.log(res.data.data)}
                            axios.get(env.api_Url + 'finzy/loanSanction?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                .then((res) => {
                                    if (res.data.message === 'success') {
                                        axios.get(env.api_Url + 'finzy/finzyLoanDetailByRefId?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                            .then((res) => {
                                                if (res.data.message === 'success' && res.data.data === 'APPROVED') {
                                                    axios.get(env.api_Url + 'finzy/loanAccept?loanId=' + loanData.data.data.loanId + '&accept=true')
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

                    })

            })
        setLoader(false)

    }


    return (
        <>

            <main>
                <Header />
                {loaderState === false ?
                    <>
                        <div style={{ display: "flex", placeContent: "center", marginTop: "3rem" }}>
                            <img src={SearchingDoc} alt="" style={{ width: "50%" }} />
                        </div>
                        <NoteText text="Assessing your credit..." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />
                        <NoteText text="This may take up to 5-10 minutes." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />

                        <button className="submit" style={{ margin: "2rem 0 12px 0" }} onClick={() => refreshScreen()}>Refresh status</button>
                        <NoteText text="For more details and enquiries, reach out to us" styles={{ textAlign: "center", color: "#000000C", fontSize: "16px", lineHeight: "20px", marginTop: "1.7rem" }} />
                        <div style={{ textAlign: "center", margin: "1rem 0 2rem 0" }}>
                            <Link to={"tel:+918069489655"} style={{ color: "#514C9F", fontWeight: "700", textDecoration: "underline", textAlign: "center" }}>Contact Support</Link>
                        </div>
                    </>
                    : ""}
                {loaderState ?
                    <Loadinggif />
                    : ""}

            </main>
        </>
    )
}
export default WaitLegality