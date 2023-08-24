import Header from "../../Header/Header";

import { env } from "../../../environment/environment";
import Waiting from '../../../assets/waiting.png'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { showWrapper, hideWrapper } from "../../../environment/environment";

function WaitingForApproval(){

    let email = localStorage.getItem('email');
    let number = localStorage.getItem('phoneNumber');

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
    },[])

    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    async function checkStatus(){
        showWrapper(ref.current)
        await axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
            .then(async(response) => {
                console.log(response)
                if(response.data.message === "success"){
                    // console.log(response)
                    let data = response?.data?.data;
                    if(data.loan_status === "105"){
                        navigate('/patient/congrats')
                    }else if(data.loan_status === "107"){
                        navigate('/patient/loanAppSuccessful')
                    }
                    else if(data.loan_status === "110"){            // if loan is rejected
                        let loanAmt = parseInt(data.amount);
                        if(loanAmt <= 75000){                       // if amount is less than 75k, then it means Bank details have not been collected yet.
                            navigate("/patient/BankDetails");       // Navigate to collect Bank details.
                        }else{                                      // if loan amount is greater than 75k then bank details have already been collected
                            navigate("/patient/KycVerification");   // Enter Payms's flow
                        }
                    }
                }
            }).catch(error =>{
                console.log(error)
            })
            hideWrapper(ref.current)
    }
    return(
        <main className="waitingForApproval">
            <Header />
            <div className="reviewPageContent" style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem", marginTop:"2rem"}}>
                <img src={Waiting} alt="waiting" style={{maxWidth:"30%"}} />
                <h3 style={{color:"#1C8769", fontWeight:"700"}}>Under Review</h3>
                <p>Your credit application is being reviewed.</p>
                <div className="msgBox" style={{background:"#FAE1CD", borderRadius:"4px", padding:"16px 32px", textAlign:"center", lineHeight:"150%", letterSpacing:"0.5px", wordSpacing:"0.5px"}}>
                    You will be notified on your registered contact 
                    number <strong>+91 {number} </strong>
                    and email-id <strong>{email}</strong> once the application is reviewed.
                </div>
            </div>
            <button className="submit" onClick={()=>checkStatus()}>Check Status</button>
        </main>
    )
}

export default WaitingForApproval