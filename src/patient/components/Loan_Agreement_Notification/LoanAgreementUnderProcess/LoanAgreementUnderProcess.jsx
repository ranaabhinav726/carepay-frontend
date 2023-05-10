import Header from '../../Header/Header'
import './loanAppUnderProcess.scss'

import { useEffect } from 'react'
import axios from 'axios'
import { env } from '../../../environment/environment'

import underProcess from '../../../assets/underProcess.png'
import { useNavigate } from 'react-router-dom'

const LoanAgreementUnderProcess = () =>{

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "LoanAgreementUnderProcess"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, [])

    const navigate = useNavigate()

    return(
    <>
        <main className="loanAppUnderProcess">
        <Header progressbarDisplay="none" canGoBack='/patient/LoanAgreement' />
            <img src={underProcess} alt="" />
            <h3>Under Process</h3>
            <p className="text">Your credit agreement is getting reviewed.<br/>This might take a minute or two.</p>
            <button onClick={()=>navigate('/patient/VerifyingLoan')} className="submit">Refresh Status</button>
        </main>
    </>
    )
}

export default LoanAgreementUnderProcess