import Header from '../../Header/Header'
import './loanAppUnderProcess.scss'

// import { useEffect } from 'react'
// import axios from 'axios'
// import { env } from '../../../environment/environment'

import underProcess from '../../../assets/underProcess.png'
import { useNavigate } from 'react-router-dom'

const BankDetailsUnderProcess = () =>{

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

    // let phoneNo = "+91 " + localStorage.getItem("phoneNumber");
    // let email = localStorage.getItem("email");

    return(
    <>
        <main className="loanAppUnderProcess">
        <Header progressbarDisplay="none" />

            <img src={underProcess} alt="" />

            <h3>Under Process</h3>

            <p className="text">Your bank details<br/>are being reviewed.</p>

            <div className="msg">This will take a minute or two to get verified.</div>

            <button onClick={()=>navigate('/patient/BankVerifying')} className="submit">Refresh Status</button>
            
        </main>
    </>
    )
}

export default BankDetailsUnderProcess