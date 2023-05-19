import { useEffect, useState } from 'react';
import Logo from '../../assets/Logo-carepay.webp'
import Lens from '../../assets/lens.png'

import './thankYou.scss'
import axios from 'axios';
import { env } from '../../environment';
import { useNavigate } from 'react-router-dom';

const ThankYou = () =>{

    const [email, setEmail] = useState(localStorage.getItem('emailId'));
    const [doctorId, setDoctorId] = useState(localStorage.getItem('doctorId'));
    const [phoneNo, setPhoneNo] = useState(localStorage.getItem('phoneNumber'));

    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(doctorId){
    //         // console.log(doctorId)
    //         // axios.get(env.api_Url+"generateQRCode?doctorId=" + doctorId)
    //         // .then(response =>{
    //         //     console.log(response)
    //         // })

            
    //     }
    // }, [doctorId])

    function checkVerificationStatus(e){
        if(!! doctorId){
            e.target.innerText = "Checking...";
            axios.get(env.api_Url + "getDoctorVerificationStatus?doctorId=" + doctorId)
            .then(response =>{
                console.log(response);
                if(response.data.status === 200){
                    if(response.data.data === "VERIFIED"){
                        navigate('/doctor/dashboard');
                    }else{
                        e.target.innerText = "Please try after some time";
                        setTimeout(() => {
                            e.target.innerText = "Refresh status";
                        }, 1500);
                    }
                }else{
                    e.target.innerText = "Refresh status";
                }
            }).catch(error =>{
                console.log(error);
                e.target.innerText = "Refresh status";
            })
        }
    }

    return(
        <main id='thankYou'>
            <div className='head'><img id='logo' src={Logo} alt="Carepay's Logo" /></div>
            <img id='lens' src={Lens} alt="" />
            <h2 className='clr-purple'>Thank you!</h2>
            <p className='line1'>Your application is under review,<br/>we will inform you once verified.</p>
            <p className='line2'>This typically takes around 30 mins...</p>
            <div className="msg">You will be notified on your<br/>registered contact number <strong style={{whiteSpace: "nowrap"}}>+91 {phoneNo}</strong><br/> and email-id <strong style={{whiteSpace: "nowrap"}}>{email}</strong> once your application is verified.</div>
            <button onClick={(e)=>checkVerificationStatus(e)} className="submit">Refresh status</button>
        </main>
    )
}

export default ThankYou