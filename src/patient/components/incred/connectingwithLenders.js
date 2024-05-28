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
        let operatingsystem = detect()
        console.log(operatingsystem,'operatingsystem')
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
        if (operatingsystem !== 'iOS') {
            axios.get(env.api_Url + "/checkNbfcEligibilityForUser?userId=" + userId + '&nbfcName=INCRED')
                .then((response) => {
                    console.log(response.data)
                    if (response.data.message === 'success') {
                        axios.get(env.api_Url + "/initiateApplicationForIncred?userId=" + userId)
                            .then((response) => {
                                if (response.data.message === 'success') {
                                    axios.get(env.api_Url + "/generateOfferInCred?userId=" + userId)
                                        .then((response) => {
                                            if (response.data.message === 'success') {
                                                axios.get(env.api_Url + "/offerStatusIncred?userId=" + userId)
                                                    .then((response) => {
                                                        if (response.data.message === 'success') {

                                                        }

                                                    })
                                            }

                                        })
                                }

                            })
                    }

                })
        }
        redirect()

    }, [])
    const redirect =()=>{
        setTimeout(() => {
            navigate(routes.ARTHMATE_OFFERS)
        }, 5000);
    }
    const detect = () => {
        const { userAgent } = window.navigator;

        if (/Windows NT 10.0/.test(userAgent)) return 'Windows 10';
        if (/Windows NT 6.2/.test(userAgent)) return 'Windows 8';
        if (/Windows NT 6.1/.test(userAgent)) return 'Windows 7';
        if (/Windows NT 6.0/.test(userAgent)) return 'Windows Vista';
        if (/Windows NT 5.1/.test(userAgent)) return 'Windows XP';
        if (/Mac/.test(userAgent)) return 'MacOS';
        if (/X11/.test(userAgent)) return 'UNIX';
        if (/Linux/.test(userAgent)) return 'Linux';
        if (/Android/.test(userAgent)) return 'Android';
        if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';

        return 'Unknown OS';
    };
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