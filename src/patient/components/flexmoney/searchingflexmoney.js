import React, { useState } from "react";
import Header from "../Header/Header";
import Image from './imagesflex/Searching for offers.gif'
import { checkEligibilityForFMApi } from "./actioncreator";
import { useNavigate } from "react-router-dom";
import routes from "../../../layout/Routes";
import axios from "axios";
import { env } from "../../environment/environment";
const SearchFlex = () => {
    let userId = window.localStorage.getItem('userId')
    let navigate = useNavigate()
    useState(() => {
        checkEligibilityForFMApi(userId, callback => {

            if (callback.data === 'true') {

                navigate(routes.FLEX_APPROVAL_SCREEN)

            } else {
                // navigate(routes.ARTH_PERSONAL_DETAILS)
                axios.get(env.api_Url + 'getActiveFlow')
                    .then((response) => {
                        if (response.data.data === 'PAYU') {
                            axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                                .then((response) => {
                                    axios.get(env.api_Url + "getCheckoutDetails?loanId=" + response.data.data.loanId)
                                        .then(response => {
                                            axios.get(env.api_Url + "checkCustomerEligibility?loanId=" + response.data.data.loanId)
                                                .then(response => {
                                                    console.log(response)
                                                })
                                        })
                                })
                        }
                        if (response.data.data === 'RAZORPAY') {
                            navigate(routes.RAZORPAY_OFFERS)
                        }
                        if (response.data.data === 'MASTER') {
                            navigate(routes.ARTH_PERSONAL_DETAILS)


                        }
                    }
                    )
            }
        })
        // setTimeout(() => {
        //     navigate(routes.FLEX_APPROVAL_SCREEN)
        // }, 5000);
    })
    return (
        <main className="waitingForApproval">
            <>
                <Header />
                <img src={Image} style={{ width: '100%' }} />
                <p style={{ marginTop: '-100px' }} className="text-center">Searching the best offer for you...</p>
            </>
        </main>
    )
}
export default SearchFlex