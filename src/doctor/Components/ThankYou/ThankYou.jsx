import { useEffect } from 'react';
import Logo from '../../assets/Logo-carepay.webp'
import Lens from '../../assets/lens.png'

import './thankYou.scss'
import axios from 'axios';
import { env } from '../../environment';

let phoneNo = localStorage.getItem('phoneNumber');
let email = localStorage.getItem('email');


let doctorId = localStorage.getItem('doctorId');

const ThankYou = () =>{
    useEffect(()=>{
        doctorId = localStorage.getItem('doctorId');
        phoneNo = localStorage.getItem('phoneNumber');
        email = localStorage.getItem('email');

        if(doctorId){
            console.log(doctorId)
            axios.get(env.api_Url+"generateQRCode?doctorId=" + doctorId)
            .then(response =>{
                console.log(response)
            })
        }
        
        axios.get(env.api_Url + "sendUnderReviewMail?doctorId=" + doctorId)
        .then(response =>{
            console.log(response)
        })
    }, [])
    return(
        <main id='thankYou'>
            <div className='head'><img id='logo' src={Logo} alt="Carepay's Logo" /></div>
            <img id='lens' src={Lens} alt="" />
            <h2 className='clr-purple'>Thank you!</h2>
            <p className='line1'>Your application is under review,<br/>we will inform you once verified.</p>
            <p className='line2'>This typically takes around 30 mins...</p>
            <div className="msg">You will be notified on your<br/>registered contact number <strong style={{whiteSpace: "nowrap"}}>+91 {phoneNo}</strong><br/> and email-id <strong style={{whiteSpace: "nowrap"}}>{email}</strong> once your application is verified.</div>
        </main>
    )
}

export default ThankYou