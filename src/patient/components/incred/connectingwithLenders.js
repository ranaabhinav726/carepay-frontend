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
    let intervalId;
    useEffect(() => {
        let operatingsystem = detect()
        console.log(operatingsystem, 'operatingsystem')
        axios.get(env.api_Url + "/checkNbfcEligibilityForUser?userId=" + userId + '&nbfcName=AM')
            .then((response) => {
                if (response.data.message === "success") {
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
                }
            })
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
                if (operatingsystem === 'ios') {
                    redirect()
                } else {

                }
            })
        if (operatingsystem !== 'iOS') {
            initiateProcess()
        }
        // redirect()

    }, [])
    function initiateProcess() {

        const apiUrl = env.api_Url;


        // axios.get(env.api_Url + "/checkNbfcEligibilityForUser?userId=" + userId + '&nbfcName=INCRED')
        // .then((response) => {
        //     console.log(response.data)
        //     if (response.data.message === 'success') {
        //         axios.get(env.api_Url + "/initiateApplicationForIncred?userId=" + userId)
        //             .then((response) => {
        //                 if (response.data.message === 'success') {
        //                     axios.get(env.api_Url + "/generateOfferInCred?userId=" + userId)
        //                         .then((response) => {
        //                             if (response.data.message === 'success') {
        //                                 checkOfferStatus()
        //                                 // axios.get(env.api_Url + "/offerStatusIncred?userId=" + userId)
        //                                 //     .then((response) => {
        //                                 //         if (response.data.message === 'success') {

        //                                 //         }

        //                                 //     })
        //                             }

        //                         })
        //                 }

        //             })
        //     }

        // })
        axios.get(`${apiUrl}/checkNbfcEligibilityForUser?userId=${userId}&nbfcName=INCRED`)
            .then((response) => {
                if (response.data.message === 'success') {
                    axios.get(`${apiUrl}/initiateApplicationForIncred?userId=${userId}`)
                        .then((response) => {
                            if (response.data.message === 'success') {
                                makeApiCall()
                                // axios.get(`${apiUrl}/generateOfferInCred?userId=${userId}`)
                                //     .then((response) => {
                                //         if (response.data.message === 'success') {
                                //             intervalId = setInterval(checkOfferStatus, 10000);
                                //         } else {
                                //             console.log('Error generating offer');
                                //         }
                                //     })
                                //     .catch((error) => {
                                //         console.error('Error generating offer:', error);
                                //     });
                            } else {
                                console.log('Error initiating application');
                                // navigate(routes.REJECTED_SCREEN)
                                redirect()

                            }
                        })
                        .catch((error) => {
                            console.error('Error initiating application:', error);
                        });
                } else {
                    redirect()
                }
            })
            .catch((error) => {
                console.error('Error checking eligibility:', error);
            });

    }
    const makeApiCall = () => {
        const apiUrl = env.api_Url;

        axios.get(`${apiUrl}/generateOfferInCred?userId=${userId}`)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.message === 'success') {
                        intervalId = setInterval(checkOfferStatus, 10000);
                    } else {
                        console.log('Error generating offer');
                    }
                } else {
                    // For any status code other than 200 and 500
                    navigate(routes.ARTHMATE_OFFERS)
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    console.error('Error 500, re-hitting the API');
                    makeApiCall(); // Re-hit the API
                } else {
                    console.error('Error generating offer:', error);
                    // For any status code other than 200 and 500
                    navigate(routes.ARTHMATE_OFFERS)
                }
            });
    };

    function checkOfferStatus() {

        const apiUrl = `${env.api_Url}/offerStatusIncred?userId=${userId}`;

        axios.get(apiUrl)
            .then((response) => {
                if (response.data.message === 'success') {
                    const status = response.data.data;
                    if (status === 'COMPLETED' || status === 'REJECTED') {
                        clearInterval(intervalId);
                        console.log(`Offer status: ${status}`);
                        redirect()
                    } else {
                        console.log(`Current status: ${status}`);
                    }
                } else {
                    console.log('Error: Unsuccessful response');
                }
            })
            .catch((error) => {
                console.error('Error fetching offer status:', error);
            });
    }



    const redirect = () => {
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