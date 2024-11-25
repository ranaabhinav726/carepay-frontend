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
        // axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
        //     .then((response) => {
        //         setLoader(false)
        //         if (response.data.message === 'success') {
        //             axios.get(env.api_Url + 'finzy/eSignStatus?loanId=' + response.data.data.loanId)
        //                 .then((esignData) => {
        //                     console.log(esignData)
        //                     setLoader(false)
        //                     if(esignData.data.data==='REQUESTED'){

        //                     }
        //                 })
        //         }


        //     })


    }
    // const messageFromChildWindowCallback = (message) => {
    //     console.log(message, 'message')
    //     let originUrl = message.origin + '/';
    //     if (message != null) {
    //         console.log(message)
    //     }
    // }
    // useEffect(() => {
    //     window.addEventListener('message', messageFromChildWindowCallback);

    // }, [])

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