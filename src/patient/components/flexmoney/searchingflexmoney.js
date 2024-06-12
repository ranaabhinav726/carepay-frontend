import React, { useState } from "react";
import Header from "../Header/Header";
import Image from './imagesflex/Searching for offers.gif'
import { checkEligibilityForFMApi } from "./actioncreator";
import { useNavigate } from "react-router-dom";
import routes from "../../../layout/Routes";
const SearchFlex = () => {
    let userId = window.localStorage.getItem('userId')
    let navigate=useNavigate()
    // useState(() => {
    //     checkEligibilityForFMApi(userId, callback => {
           
    //         if (callback.data === true) {

    //             navigate(routes.FLEX_APPROVAL_SCREEN)

    //         } else {
    //             navigate(routes.ARTH_PERSONAL_DETAILS)
    //         }
    //     })
    // })
    return (
        <main className="waitingForApproval">
            <>
                <Header />
                <img src={Image} style={{ width: '100%' }} />
                <p style={{marginTop:'-100px'}} className="text-center">Searching the best offer for you...</p>
            </>
        </main>
    )
}
export default SearchFlex