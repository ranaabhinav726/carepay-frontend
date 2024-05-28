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
        axios.post(env.api_Url + "leadAPI?userId=" + userId)
            .then((response) => {
                if (response.data.message === "success") {
                    axios.post(env.api_Url + "requestAScore?userId=" + userId)
                        .then((response) => {
                            console.log(response)
                        }).catch(error => {
                            console.log(error);
                        });

                }
            }).catch(error => {
                console.log(error);
            });
        axios.get(env.api_Url + "/checkNbfcEligibilityForUser?userId=" + userId + '&nbfcName=FIBE')
            .then((response) => {
                if (response.data.message === "success") {
                    axios.post(env.api_Url + "profileIngestionForFibe?userId=" + userId + "&type=customer")
                        .then(response => {
                            console.log(response)
                            if (response?.data?.data) {

                            }
                        })
                }
            })
        axios.get(env.api_Url + "/checkNbfcEligibilityForUser?userId=" + userId + '&nbfcName=INCRED')
            .then((response) => {
                if (response.data.status === 'success') {
                    axios.get(env.api_Url + "/initiateApplicationForIncred?userId=" + userId)
                        .then((response) => {
                            if (response.data.status === 'success') {
                                axios.get(env.api_Url + "/generateOfferInCred?userId=" + userId)
                                    .then((response) => {
                                        if (response.data.status === 'success') {
                                            axios.get(env.api_Url + "/offerStatusIncred?userId=" + userId)
                                                .then((response) => {
                                                    if (response.data.status === 'success') {
                                                       
                                                    }

                                                })
                                        }

                                    })
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
                <p>Connecting with lenders...</p>
            </div>
        </main>
    )
}
export default ConnectWithLenders