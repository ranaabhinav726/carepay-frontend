import Header from '../../Header/Header'
import './paymentUnderProcess.scss'

// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { env } from '../../../environment/environment'

import underProcess from '../../../assets/underProcess.png'
import { useNavigate } from 'react-router-dom'

const PaymentUnderProcess = () =>{
    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "PaymentUnderProcess"
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
    let phoneNo = "+91 " + localStorage.getItem('phoneNumber');
    let email = localStorage.getItem('email');

    // const [url, setURL] = useState("")
    // const [canClick, setCanClick] = useState(false)

    // let userId = localStorage.getItem("userId");
    // useEffect(()=>{
    //     axios
    //     .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get", {},)
    //     .then((response) => {
    //         console.log(response)
    //         if(response.data.status == "200"){
    //             let link = response.data.data;
    //             console.log(link)
    //             setURL(link);
    //             setCanClick(true);
    //         }
    //     }).catch(error => {
    //             console.log(error);
    //     });
    // }, [])
    return(
    <>

        <main className="paymentUnderProcess">
        <Header progressbarDisplay="block" progress={96} />

            <img src={underProcess} alt="" />
            <h3>Under Process</h3>
            <p className="text">We are checking the status of your payment.<br/>This might take a minute or two.<br/>Don’t worry, your money is safe with us.</p>
            <div className="msg">You will be notified on your<br/>registered contact number <strong style={{whiteSpace: "nowrap"}}>{phoneNo}</strong> <br/>and email-id <strong style={{whiteSpace: "nowrap"}}>{email}</strong> once the instalment is received.</div>
            <button onClick={()=>navigate('/patient/PGVerifying')} className="submit">Refresh Status</button>
        </main>
    </>
    )
}

export default PaymentUnderProcess