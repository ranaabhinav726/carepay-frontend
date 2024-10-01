import React, { useEffect } from "react";
import Loader from '../../assets/GIFs/loading.gif'
import Header from "../Header/Header";
import axios from "axios";
import routes from "../../../layout/Routes";
import { useNavigate } from "react-router";
import { env } from "../../environment/environment";

const Processing = () => {
    let navigate = useNavigate()
    let userId = localStorage.getItem('userId')
    // useEffect(() => {

    // }, [])
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
    const refreshBtn = () => {
        axios.get(env.api_Url + "getFinalNbfc?userId=" + userId)
            .then(async (response) => {
                if (response.data.data === 'AM') {
                    // navigate(routes.ARTH_CONGRATULATIONS)
                    checkdigitapdataForAthMate()
                }
                if (response.data.data === 'CF') {
                    navigate(routes.CONGRATS)
                }
                if (response.data.data === 'FIBE') {
                    axios.get(env.api_Url + "checkFibeFlow?userId=" + userId)
                        .then(async (response) => {
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
                    // navigate(routes.APPROVAL_INCRED)
                    axios.get(env.api_Url + "getIncredStatusForUser?userId=" + userId)
                    .then( (response) => {
                        console.log(response.data.data.status,'response.data.data')
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
                }


            })
    }
    return (
        <main>
            <Header />
            <div style={{ marginTop: "12%", textAlign: 'center' }} >
                <img src={Loader} style={{ width: '30%' }} />
                <p>Sit back and relax!
                    while we assess your credit application...</p>
                <button style={{ marginTop: '20px' }} onClick={() => refreshBtn()} className="submit">Refresh</button>
                <p style={{ marginTop: '40px' }} className="text-center">Need help? Reach out to us.</p>

                <a style={{ color: '#000' }} href={"tel:+91 806 948 9655"}>  <button style={{ color: "#514C9F", background: '#ECEBFF', fontWeight: "700", textDecoration: "underline", textAlign: "center" }} className="submit">Contact Support</button></a>

            </div>
        </main>
    )
}
export default Processing