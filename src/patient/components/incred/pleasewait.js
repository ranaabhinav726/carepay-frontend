import React, { useEffect } from "react";
import Loader from '../../assets/GIFs/loading.gif'
import Header from "../Header/Header";
import axios from "axios";
import routes from "../../../layout/Routes";
import { useNavigate } from "react-router";
import { env } from "../../environment/environment";

const ConnectWithLenders = () => {
    let navigate = useNavigate()
    let userId = localStorage.getItem('userId')
    useEffect(() => {
        axios.get(env.api_Url + "checkNbfcEligibilityForUser?userId=" + userId + '&nbfcName=CF')
            .then((response) => {
                if (response.data.message === "success") {
                    axios.post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
                        .then(async (response) => {
                            console.log(response)
                            if (response.data.message === "success") {
                                navigate(routes.ARTH_BANKDETAILS)

                            } else {
                                navigate(routes.ARTH_BANKDETAILS)
                            }

                        })

                } else {
                    navigate(routes.ARTH_BANKDETAILS)
                }

            })
    }, [])
    return (
        <main>
            <Header />
            <div style={{ marginTop: "12%", textAlign: 'center' }} >
                <img src={Loader} style={{ width: '30%' }} />
                <p>Sit back and relax!
                    while we assess your credit application...</p>
            </div>
            <p className="text-center" style={{ marginTop: '40px' }}>Need help? Reach out to us.</p>
            <a style={{ color: '#000' }} href={"tel:+91 806 948 9655"}>  <button style={{ color: "#514C9F", background: '#ECEBFF', fontWeight: "700", textDecoration: "underline", textAlign: "center" }} className="submit">Contact Support</button></a>

        </main>
    )
}
export default ConnectWithLenders