import React, { useEffect, useState } from "react";
import SearchingDoc from '../../../../assets/GIFs/Document in process.gif'
import NoteText from "../../../Fibe flow/Comps/NoteText";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../../../environment/environment";
import Header from "../../../Header/Header";
import routes from "../../../../../layout/Routes";

const WaitArhmate = () => {
    let navigate = useNavigate()
    let userId = localStorage.getItem('userId')
    const [scoreState, setAScore] = useState(false)
    const [refreshState, setRefreshButton] = useState(true)
    const [refreshbuttonDisable,setrefreshbuttonDisable]=useState(false)

    const refreshScreen = () => {
        if (scoreState === true) {
            setrefreshbuttonDisable(true)
            axios.post(env.api_Url + "coLenderSelection?userId=" + userId)
                .then((response) => {
                    console.log(response.data.message)
                    if (response.data.message === 'success') {
                        axios.post(env.api_Url + "loanApi?userId=" + userId)
                            .then((response) => {
                                if (response.data.message === 'success') {
                                    setRefreshButton(false)
                                    setrefreshbuttonDisable(false)

                                    axios.get(env.api_Url + "getLoanApi?userId=" + userId,)
                                        .then((response) => {

                                            if (response.data.message === 'success' && response.data.data.status === 'open') {
                                                axios.put(env.api_Url + "loanStatusApi?userId=" + userId + '&status=' + 'kyc_data_approved',)
                                                    .then((response) => {

                                                        if (response.data.message === 'success') {
                                                            axios.post(env.api_Url + "repaymentScheduleApi?userId=" + userId)
                                                                .then((response) => {

                                                                    if (response.data.message === 'success') {
                                                                        navigate(routes.ARTH_CREDIT_AGREEMENT)

                                                                    }
                                                                }).catch(error => {
                                                                    console.log(error);
                                                                });

                                                        }
                                                    }).catch(error => {
                                                        console.log(error);
                                                    });
                                            }

                                        }).catch(error => {
                                            console.log(error);
                                        });
                                }
                            }).catch(error => {
                                console.log(error);
                            });
                    } else {

                    }
                })
        } else {
            getscore()
        }
    }
    const refresh2 = () => {
        axios.get(env.api_Url + "getLoanApi?userId=" + userId,)
            .then((response) => {

                if (response.data.message === 'success' && response.data.data.status === 'open') {
                    axios.put(env.api_Url + "loanStatusApi?userId=" + userId + '&status=' + 'kyc_data_approved',)
                        .then((response) => {

                            if (response.data.message === 'success') {
                                axios.post(env.api_Url + "repaymentScheduleApi?userId=" + userId)
                                    .then((response) => {

                                        if (response.data.message === 'success') {
                                            navigate(routes.ARTH_CREDIT_AGREEMENT)

                                        }
                                    }).catch(error => {
                                        console.log(error);
                                    });

                            }
                        }).catch(error => {
                            console.log(error);
                        });
                }
                if (response.data.message === 'success' && response.data.data.status === 'kyc_data_approved') {
                    axios.post(env.api_Url + "repaymentScheduleApi?userId=" + userId)
                        .then((response) => {

                            if (response.data.message === 'success') {
                                navigate(routes.ARTH_CREDIT_AGREEMENT)

                            }
                        }).catch(error => {
                            console.log(error);
                        });

                }


            }).catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getscore()
        axios.get(env.api_Url + "getLoanApi?userId=" + userId,)
            .then((response) => {
                console.log(response)
                if (response.data.message === 'success') {
                    setRefreshButton(false)

                } else {
                    setRefreshButton(true)

                }
            })
    }, [])
    const getscore = () => {
        axios.post(env.api_Url + 'getAScore?userId=' + userId)
            .then((response) => {
                console.log(response.data.message, 'getAScore')
                if (response.data.message === 'success') {
                    setAScore(true)
                } else {
                    setAScore(false)


                }

            })
    }

    return (
        <>
            <Header />
            <main>
                <div style={{ display: "flex", placeContent: "center", marginTop: "3rem" }}>
                    <img src={SearchingDoc} alt="" style={{ width: "50%" }} />
                </div>
                <NoteText text="Generating credit agreement..." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />
                <NoteText text="This may take 5 to 10 minutes." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />

                {refreshState ? <button disabled={refreshbuttonDisable} className="submit" style={{ margin: "2rem 0 12px 0" }} onClick={() => refreshScreen()}>Refresh status</button> : ""}
                {refreshState === false ?
                    <button className="submit" style={{ margin: "2rem 0 12px 0" }} onClick={() => refresh2()}>Refresh Again</button>
                    : ""}

                <NoteText text="For more details and enquiries, reach out to us" styles={{ textAlign: "center", color: "#000000C", fontSize: "16px", lineHeight: "20px", marginTop: "1.7rem" }} />
                <div style={{ textAlign: "center", margin: "1rem 0 2rem 0" }}>
                    <Link to={"tel:+918069489655"} style={{ color: "#514C9F", fontWeight: "700", textDecoration: "underline", textAlign: "center" }}>Contact Support</Link>
                </div>
            </main>
        </>
    )
}
export default WaitArhmate