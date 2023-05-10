import './kycWebview.scss'
import Header from '../../Header/Header'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { env } from '../../../environment/environment'

import underProcess from '../../../assets/underProcess.png'

const KycWebview = () =>{

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "KycWebview"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, [])


    let phoneNo = "+91 " + localStorage.getItem("phoneNumber");
    let email = localStorage.getItem("email");
    const navigate = useNavigate();

    return(
        <>
            <Header progressbarDisplay="block" progress="96" canGoBack='/patient/KycVerification' />
            <main className='kycWebview'>
                <img src={underProcess} alt="" />
                <h3>Under Process</h3>
                <p className="text">Your KYC documents are being reviewed.</p>
                <div className="msg">You will be notified on your registered contact number <strong style={{whiteSpace: "nowrap"}}>{phoneNo}</strong> and email ID <strong style={{whiteSpace: "nowrap"}}>{email}</strong> once KYC is done.</div>
                <button onClick={()=>navigate('/patient/KycVerifying')} className="submit">Check Status</button>
            </main>
        </>
    )
}

export default KycWebview