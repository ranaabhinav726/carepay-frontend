import React, { useState } from "react";
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
        axios.get(env.api_Url + "checkTransactionStatus?userId=" + userId)
            .then(response => {
                console.log(response.data.data)
                setLoader(false)

                if (response.data.data === true || response.data.data === 'true') {

                    // navigate(routes.ARTH_AUTO_REPAYMENT)
                    axios.get(env.api_Url + "/getDocumentsByUserId?userId=" + userId)
                        .then(response => {
                            if (response.data.status === 200) {

                                let uploadedFiles = response?.data?.data?.signedLoanAggreement
                                console.log(uploadedFiles)
                                axios.post(env.api_Url + "loanDocumentApi?userId=" + userId + '&documentName=' + 'signed_agreement' + '&url=' + uploadedFiles)
                                    .then(res => {
                                        if (res.status === 200) {
                                            if (res.data.message === 'success') {
                                                // setUpload2(true)
                                                navigate(routes.ARTH_AUTO_REPAYMENT)

                                            }
                                        }
                                    }).catch(e => console.warn(e));

                            }
                        })

                } else {
                    setLoader(false)
                }
            })
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
                        <NoteText text="fetching agreement status..." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />

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