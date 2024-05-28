import React, { useEffect } from "react";
import Loader from '../../assets/GIFs/loading.gif'
import Header from "../Header/Header";
import axios from "axios";
import routes from "../../../layout/Routes";
import { useNavigate } from "react-router";
import { env } from "../../environment/environment";

const ConnectWithLenders = () => {
    let navigate = useNavigate()
    let userId=localStorage.getItem('userId')
    useEffect(() => {
        axios.get(env.api_Url + "/checkNbfcEligibilityForUser?userId=" + userId + '&nbfcName=CF')
            .then((response) => {
                if (response.data.message === "success") {
                    axios.post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
                        .then(async (response) => {
                            console.log(response)
                            if (response.data.message === "success") {
                                navigate(routes.ARTH_BANKDETAILS)
                                // axios.get(env.api_Url + "getFinalNbfc?userId=" + userId)
                                //     .then(async (response) => {
                                //         if (response.data === 'AM') {
                                //             navigate(routes.ARTH_CONGRATULATIONS)
                                //         }
                                //         if (response.data === 'CF') {
                                //             navigate(routes.CONGRATS)
                                //         }
                                //         if (response.data === 'FIBE') {
                                //             navigate(routes.FIBE_LOAN_APPROVED)
                                //         }


                                //     })
                            }

                        })

                }

            })
    }, [])
    return (
        <main>
            <Header />
            <div style={{ marginTop: "12%", textAlign: 'center' }} >
                <img src={Loader} style={{ width: '30%' }} />
                <p>Please Wait for a while...</p>
            </div>
        </main>
    )
}
export default ConnectWithLenders