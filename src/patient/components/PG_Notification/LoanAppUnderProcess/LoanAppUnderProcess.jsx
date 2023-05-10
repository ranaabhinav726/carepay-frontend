import Header from '../../Header/Header'
import './loanAppUnderProcess.scss'
import underProcess from '../../../assets/underProcess.png'
import axios from 'axios'
import { env } from '../../../environment/environment'
import { BiRupee } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const LoanAppUnderProcess = () => {
    let phoneNo = "+91 " + localStorage.getItem('phoneNumber');
    let email = localStorage.getItem('email');
    const [firstPaymentAmount, setFirstPaymentAmount] = useState("0");
    const navigate = useNavigate()

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    let userId = localStorage.getItem("userId");

    useEffect(()=>{
        axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
        .then(response =>{
            console.log(response);
            if(response.data.status == "200"){
                let LoanAmt = response.data.data.loanAmount;
                let Tenure = response.data.data.loanEmi;
                setFirstPaymentAmount((LoanAmt/Tenure).toLocaleString('en-IN',{maximumFractionDigits: 2}))
            }
        }).catch(error => {
            console.log(error);
        });
    }, [])
    
    return(
    <>
        <main className="loanAppUnderProcess">
        <Header progressbarDisplay="none" />
            <img src={underProcess} alt="" />
            <h3>Under Process</h3>
            <p className="text">Thank you! we have received your payment for<br/>the first EMI of <b><BiRupee className='rupee' /> {firstPaymentAmount}</b>.<br/>Your loan is under process, and will be<br/>disbursed within the next 24 hours.</p>
            <div className="msg">You will be notified on your registered contact number <strong style={{whiteSpace: "nowrap"}}>{phoneNo}</strong><br/> and email id <strong style={{whiteSpace: "nowrap"}}>{email}</strong><br/>once the loan is processed.</div>
            <button onClick={()=>navigate('/patient/LoanVerifying')} className="submit">Check Status</button>
        </main>
    </>
    )
}

export default LoanAppUnderProcess