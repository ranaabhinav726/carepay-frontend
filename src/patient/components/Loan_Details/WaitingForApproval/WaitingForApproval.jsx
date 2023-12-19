import Header from "../../Header/Header";

import { env } from "../../../environment/environment";
import Waiting from '../../../assets/waiting.png'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { showWrapper, hideWrapper } from "../../../environment/environment";

function WaitingForApproval(){

    let email = localStorage.getItem('email');
    let number = localStorage.getItem('phoneNumber');

    const [uploadedFiles, setUploadedFiles] = useState(null);

    let ref = useRef(0);
    useEffect(()=>{
        chechForUploadedDocuments();
        ref.current = document.getElementById('animation-wrapper');
    },[])

    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    function chechForUploadedDocuments(){
        axios.get(env.api_Url + "getDocumentsByUserId?userId=" + userId)
        .then(response =>{
            if(response.data.status === 200){
                console.log(response)
                let uploadedFiles = response?.data?.data?.multipleBankStatements?.split(',');
                console.log(uploadedFiles)
                setUploadedFiles(uploadedFiles);
            }
        }).catch(err =>{
            console.log(err)
        })
    }

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
                            navigate("/patient/LoanDetails");   // Enter Payms's flow
                        }
                    }
                }
            }).catch(error =>{
                console.log(error)
            })
            hideWrapper(ref.current)
    }

    function navigateBack(){
        navigate("/patient/BankDetails", {state : {"reVisitToUploadStatement" : true}})
    }
    return(
        <main className="waitingForApproval">
            <Header />
            <div className="reviewPageContent" style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem", marginTop:"2rem"}}>
                <img src={Waiting} alt="waiting" style={{maxWidth:"30%"}} />
                <h3 style={{color:"#1C8769", fontWeight:"700"}}>Under Review</h3>
                <p style={{textAlign:"center"}}>We are assessing your credit application.<br />This might take 15-20 minutes.</p>
                <div className="msgBox" style={{background:"#FAE1CD", borderRadius:"4px", padding:"16px 32px", textAlign:"center", lineHeight:"150%", letterSpacing:"0.5px", wordSpacing:"0.5px"}}>
                    You will be notified on your registered contact number <strong>+91 {number} </strong> once the application is reviewed.
                </div>
            </div>
            {!uploadedFiles && 
                <div style={{
                    background:"#ECEBFF",
                    textAlign:"center",
                    padding:"10px",
                    borderRadius:"4px",
                    color:"#514c9f",
                    marginTop:"1rem",
                    whiteSpace:"normal"
                }}>
                    {"To share Bank details, Account statement and KYC documents (if required)  "}
                    <span style={{textDecoration:"underline", fontWeight:"700", cursor:"pointer"}} onClick={()=>navigateBack()}>click here</span>
                </div>
            }
            <button className="submit" onClick={()=>checkStatus()}>Check Status</button>
            <a href="tel:+918069489655"><button className="submit" style={{color:"#514C9F", background:"#ECEBFF", marginTop:"0px"}}>Contact Support</button></a>
        </main>
    )
}

export default WaitingForApproval