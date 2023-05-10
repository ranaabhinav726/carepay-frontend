import Header from '../../Header/Header'
import './loanAppUnderProcess.scss'

import { useEffect } from 'react'
import axios from 'axios'
import { env } from '../../../environment/environment'

import underProcess from '../../../assets/underProcess.png'
import { useNavigate } from 'react-router-dom'

const StatementVerificationUnderProcess = () =>{

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "StatementVerificationUnderProcess"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, [])

    const navigate = useNavigate();

    let phoneNo = "+91 " + localStorage.getItem("phoneNumber");
    let email = localStorage.getItem("email");

    return(
    <>
        <main className="loanAppUnderProcess">
        <Header progressbarDisplay="block" progress={98} canGoBack='/patient/KycVerification' />

            <img src={underProcess} alt="" />

            <h3>Under Process</h3>

            <p className="text">Your bank account statement<br/>is under review.</p>

            <div className="msg">You will be notified on your registered contact number <strong style={{whiteSpace: "nowrap"}}>{phoneNo}</strong> and email-ID <strong style={{whiteSpace: "nowrap"}}>{email}</strong> once the bank account statement is verified.</div>

            <button onClick={()=>navigate('/patient/IncomeVerificationStatus')} className="submit">Refresh Status</button>
            
        </main>
    </>
    )
}

export default StatementVerificationUnderProcess