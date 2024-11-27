import React, { useEffect, useState } from "react";
import { Header } from "../../Fibe flow/Comps/Header";
import ImageBank from '../assets/statemnetimg.svg'
import { useNavigate } from "react-router-dom";
import routes from "../../../../layout/Routes";
import axios from "axios";
import { APIS } from "../../../../utils/apifactory";
import { env } from "../../../environment/environment";
let userId = localStorage.getItem('userId')

const BankstatementShare = () => {
    const [haveReport, setHaveReport] = useState(false)
    let navigate = useNavigate()
    const onSubmit = () => {
        if (haveReport === false) {
            navigate(routes.DIGITAP_AGREEGATOR)
        }
        // if (haveReport === true) {
        //     navigate(routes.DIGITAP_DATA_RECEIVED)
        // }
    }
    useEffect(() => {
        axios.get(APIS.GET_DIGITA_BANK_REPORT + userId)
            .then((response) => {
                console.log(response.data.data.status)
                if (response.data.data.status === 'Success') {

                    axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                        .then((loandata) => {
                            if (loandata.data.message === 'success') {
                                axios.get(APIS.GET_BS_INFO_API + loandata.data.data.loanId)
                                    .then((bsapiData) => {
                                        if (bsapiData.data.message === 'success') {
                                            // navigate(routes.DIGITAP_DATA_RECEIVED)
                                            // setHaveReport(true)
                                            axios.get(env.api_Url + 'finzy/cibilApi?loanId=' + loandata.data.data.loanId)
                                                .then((cibildata) => {
                                                    if (cibildata.status === 200 && cibildata.data.data === 'APPROVED') {
                                                        navigate(routes.FINZY_APPROVAL)

                                                    }else{
                                                        navigate(routes.REJECTED_SCREEN)   
                                                    }

                                                })
                                        }
                                    })

                            }
                        })



                } else {
                    setHaveReport(false)
                }

            })



    }, [])
    return (
        <>
            <main className="bankDetails personalDetails" style={{ position: "relative" }}>

                <Header progress={80} />
                <div style={{ padding: '5px' }}>
                    <h4><b>Share bank statement</b></h4>
                    <p style={{ marginTop: '20px' }}>To verify your income, we need to access your<br /> bank statement for the latest 3 months. This data<br /> sharing is completely secured and encrypted. </p>
                    <div style={{ marginTop: '24px', textAlign: 'center' }}> <img src={ImageBank} /></div>
                    <button onClick={() => onSubmit()} className="submit">Continue</button>
                </div>

            </main>
        </>
    )
}
export default BankstatementShare