import Header from "../Header/Header"
import StepBar from "./comps/StepBar"

import './FinalConsent.scss'

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import { env, hideWaitingModal, showWaitingModal } from "../../environment/environment"
import { confirmUser, downloadKfs, validateUser } from "./apis"
import InputBox from "./comps/InputBox"
import Timer from "../EnterOTP/Timer"

import { RiDeleteBin6Fill } from "react-icons/ri";

import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function FinalConsent(){

    const location = useLocation();
    let data = location?.state?.data;
    console.log(data)

    const [number, ] = useState(Number(data?.number));

    const [loanAmt, ] = useState(Number(data?.loanAmount));
    const [tenure, ] = useState(Number(data?.loanTenure));
    let emiAmount = Number(loanAmt/tenure);
    const [otp, setOtp] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [consent, setConsent] = useState(false);

    const [kfsUrl, setKfsUrl] = useState("");

    const [canResendOtp, setCanResendOtp] = useState(false);
    function allowOtpResend(){
        setCanResendOtp(true);
    }  

    const navigate = useNavigate(); 

    let userId = localStorage.getItem("userId");

    useEffect(()=>{
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.status === 200){
                    let data = response.data.data;
                    if(!! data){
                        setDoctorName(data.doctorName);
                    }
                }
            }).catch(()=>{

            });
        }
    }, [])

    function reSendOtp(){
        let submitObj = {
            "transactionId": data?.txnId,
            "mobileNo": data?.number,
            "processInstanceId": data?.pInstId,
            "tenure" : "",
            "panNo" : "",
            "downPaymentEmi" : "",
            "requestLoanAmount" : "",
            "otpValidation" : "",
            "otpConfirmation" : "",
        }
        axios.post(env.api_Url + "icici/resendOtp", submitObj)
        .then(res=>{
            if(res.data.message == "success"){
                console.log("OTP resent");
                setCanResendOtp(false)
            }
        }).catch(e=>{

        })
    }

    function showOtpEror(){
        let elem = document.getElementById("error");
        if(elem) elem.style.display = "block";
        
        setTimeout(() => {
            if(elem) elem.style.display = "none";
        }, 3000);
    }


    function handleSubmit(){
        console.log(data,'datadatadatadata')
        if(otp.toString().length < 6){
            showOtpEror()
            return;
        }
        

        let pInstId = data?.pInstId;
        showWaitingModal();
        validateUser(otp, data.txnId, pInstId, (res)=>{
            // console.log(res?.data?.data?.errorMessage)
            if(res?.data?.data?.errorMessage === "Invalid OTP.") showOtpEror();
            if(res?.data?.data?.status === 1){
                let loanAmount = data?.loanAmount;
                let tenure = data?.loanTenure;
                let txnId = data?.txnId;
                confirmUser(loanAmount, tenure, txnId, pInstId, res=>{
                    if(res?.data?.data?.status === 1){
                        navigate("/patient/LoanAppSuccessful")
                    }else{
                        hideWaitingModal()
                    }
                }, hideWaitingModal)
            }else{
                hideWaitingModal();
            }
        }, hideWaitingModal)
    }

    function downloadAndSaveKfs(){
        if(consent){
            setConsent(false);
            return;
        }

        downloadKfs(userId, hideWaitingModal, (url)=>{
            if(url){
                setKfsUrl(url);
            }
        });
    }

    return(
        <main className="employmentDetails" style={{display: "flex", flexDirection:"column", gap:"1rem", position:"relative"}}>
            <Header progressbarDisplay='none' />
            <StepBar currStep={3} />

            <h3 style={{margin:"1rem 0"}}>Accept your credit & tenure</h3>

            <div style={{background:"#EBFEED", borderRadius:"4px", padding:"1rem"}}>
                <div style={{display:"flex", flexDirection:"column", gap:"8px", marginBottom:"1rem"}}>
                    <span style={{color:"rgba(0,0,0,0.8)", fontSize:"14px"}}>Loan Amount</span>
                    <span style={{fontSize:"18px", fontWeight:"700"}}>₹ {loanAmt.toLocaleString('en-IN',{maximumFractionDigits: 2})}</span>
                </div>
                {/* <div></div> */}
                <div style={{width:"50%",display:"inline-flex", flexDirection:"column", gap:"8px"}}>
                    <span style={{color:"rgba(0,0,0,0.8)", fontSize:"14px"}}>Tenure</span>
                    <span style={{fontSize:"18px", fontWeight:"700"}}>{tenure} months</span>
                </div>
                <div style={{width:"50%",display:"inline-flex", flexDirection:"column", gap:"8px"}}>
                    <span style={{color:"rgba(0,0,0,0.8)", fontSize:"14px"}}>EMI Amount</span>
                    <span style={{fontSize:"18px", fontWeight:"700"}}>₹ {emiAmount.toLocaleString('en-IN',{maximumFractionDigits: 2})}</span>
                </div>
            </div>

            <p>
                ICICI Bank has sent an OTP on your registered mobile number. By submitting the OTP you accept the credit terms with your bank and convert the credit amount into monthly EMIs.  
            </p>

            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", fontWeight:"700", marginTop:"1.5rem"}}><span>Enter OTP sent to</span> <span>+91 {number}</span></div>
            <div className="number-group">
                <input autoComplete="off"Box
                    type="number"

                    length={6}
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    placeholder="______"
                    styles={{
                        letterSpacing : "10px"
                    }}
                />
                <p id="error">Please enter correct OTP</p>
            </div>

            <div style={{width:"100%", display:"flex", justifyContent:"flex-end", margin:"1rem 0"}}>
                {canResendOtp ? 
                    <p onClick={()=>{reSendOtp()}} style={{color:"#514C9F", fontWeight:"700", cursor:"pointer"}}>Resend OTP</p>
                :
                    <span >Resend OTP in <Timer seconds={45} onTimerEnd={allowOtpResend} /></span>
                }
            </div>

            <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
                <input autoComplete="off" onChange={(e)=>setConsent(e.target.checked)} checked={consent} style={{height:"16px", aspectRatio:"1/1", accentColor:"#514C9F",width:'20px'}} type="checkbox" name="" id="kfsConsentCheckbox" />
                <label htmlFor="kfsConsentCheckbox" onClick={()=>downloadAndSaveKfs()} style={{userSelect:"none"}}>I agree to the <span style={{color:"#000000", fontWeight:"600", textDecoration:"underline", cursor:"pointer"}}>Key fact Statement</span></label>
            </div>
            <button className={"submit" + (!consent?" disabled" : "")} onClick={()=>handleSubmit()}>Submit OTP</button>
            {kfsUrl && <FileViewerModal url={kfsUrl} setUrl={setKfsUrl} setConsent={setConsent} />}
        </main>
    )
}

export default FinalConsent

function FileViewerModal({url, setUrl, setConsent}){  
    console.log(url);

    function handleAcceptButtonClick(){
        setConsent(true);
        setUrl(null);
    }
    return(
        <div style={{position:"absolute", left:"0", top:"0", width:"100%", height:"100%", background:"rgba(0,0,0,0.4)", zIndex:"10", padding:"1rem 0.5rem"}}>
            <div style={{borderRadius:"12px", background:"white", padding:"0.5rem", display:"flex", flexDirection:"column", alignItems:"center"}}>
                {/* <div onClick={()=>{setUrl(null)}} style={{position:"absolute", margin:"5px", right:"18px", height:"48px", aspectRatio:"1/1", background:"#FAE1CD", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", padding:"5px", cursor:"pointer", zIndex:"1"}}>
                    <RiDeleteBin6Fill style={{fontSize:"20px", color:"#DB4E4E"}} />
                </div> */}
                <div style={{borderRadius:"8px", overflow:"clip", width:"100%", height:"80vh"}}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer fileUrl={url} />
                    </Worker>
                </div>
                <button onClick={()=>handleAcceptButtonClick()} className="submit">Accept</button>
            </div>
        </div>
    )
}