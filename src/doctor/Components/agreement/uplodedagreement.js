
import React from 'react'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import NumberVerified from '../../../patient/assets/shield.png'
import { Header } from '../../../patient/components/Fibe flow/Comps/Header'
import routes from '../../../layout/Routes'
import CompletedGif from '../../../utils/loader/completegif'
const PhoneNumberVerified = () =>{

    const navigate = useNavigate();

    useEffect(() => {
        //fetch Liquiloan URL against doctorID
        //if it exists, then navigate user to screen with iframe.
        //if it doesn't, navigate to personal details

        setTimeout(()=>{
            navigate(routes.DOCTOR_THANK_YOU,{ replace: true })
        },3000)
    }, [])

   return(
    <>

    <main className="phoneNumberVerified">
    <CompletedGif text={'Agreement e-signing complete!!'}/>
    </main>
    </>
   )
}


export default PhoneNumberVerified