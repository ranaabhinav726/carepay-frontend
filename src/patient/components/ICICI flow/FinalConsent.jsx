import Header from "../Header/Header"
import StepBar from "./comps/StepBar"

import './FinalConsent.scss'

import OTPChars from '../../assets/OTPChars.svg'
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import { env, hideWaitingModal, showWaitingModal } from "../../environment/environment"
import { confirmUser, validateUser } from "./apis"
import InputBox from "./comps/InputBox"
import Timer from "../EnterOTP/Timer"

function FinalConsent(){

    const location = useLocation();
    let data = location?.state?.data;
    console.log(data)

    const [otpSent, ] = useState(true);
    const [number, ] = useState(Number(data?.number));

    const [loanAmt, ] = useState(Number(data?.loanAmount));
    const [otp, setOtp] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [consent, setConsent] = useState(false);

    const [canResendOtp, setCanResendOtp] = useState(false);
    function allowOtpResend(){
        setCanResendOtp(true);
    }  

    const navigate = useNavigate();
    // const handleOTP = (e) => {
    //     const inputValue = e.target.value;
    
    //     if (!/^\d?$/.test(inputValue)) {
    //       // If input is not empty or not a digit, reset the input value
    //       e.target.value = '';
    //       return;
    //     }
    
    //     const inputBox = e.target.id.charAt(6) * 1;
    //     const prev = 'digit-' + (inputBox - 1);
    //     const next = 'digit-' + (inputBox + 1);
    
    //     if (e.key === 'Backspace') {
    //       // Backspace is pressed
    //       if (inputValue === '' && inputBox > 1) {
    //         // Empty current input box and shift focus to the previous one
    //         e.preventDefault(); // Prevent the default backspace behavior (going back in history)
    //         document.getElementById(prev).focus();
    //       } else if (inputValue === '' && inputBox === 1) {
    //         // Empty current input box and focus remains on the first box
    //         e.preventDefault(); // Prevent the default backspace behavior (going back in history)
    //       } else if (inputBox > 1) {
    //         // Non-empty input box, so clear it and shift focus to the previous one
    //         e.preventDefault(); // Prevent the default backspace behavior (going back in history)
    //         e.target.value = '';
    //         // document.getElementById(prev).focus();
    //       }
    //     } else if (/^\d$/.test(inputValue) && inputBox < 4) {
    //       // Valid digit input, and the current input box is not the last one
    //       document.getElementById(next).focus();
    //     }
    // };

    // const handlePaste = (e) => {
    // const pastedData = e.clipboardData?.getData('text/plain');
    // if (!pastedData) {
    //     // Fallback: if clipboardData is not available, try getting the pasted content from the event value
    //     const pastedDataFallback = e.target.value;
    //     const digits = pastedDataFallback.match(/\d/g);
    //     if (digits && digits.length === 4) {
    //     const inputBoxes = document.querySelectorAll('[id^=digit-]');
    //     for (let i = 0; i < Math.min(digits.length, inputBoxes.length); i++) {
    //         inputBoxes[i].value = digits[i];
    //         if (i < inputBoxes.length - 1) {
    //         inputBoxes[i].dispatchEvent(new Event('input', { bubbles: true }));
    //         }
    //     }
    //     }
    // } else {
    //     const digits = pastedData.match(/\d/g);
    //     if (digits && digits.length === 4) {
    //     const inputBoxes = document.querySelectorAll('[id^=digit-]');
    //     for (let i = 0; i < Math.min(digits.length, inputBoxes.length); i++) {
    //         inputBoxes[i].value = digits[i];
    //         if (i < inputBoxes.length - 1) {
    //         inputBoxes[i].dispatchEvent(new Event('input', { bubbles: true }));
    //         }
    //     }
    //     }
    // }
    // e.preventDefault();
    // };

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

    // useEffect(()=>{
    //     document.getElementById('digit-1').focus()
    // },[])

    function handleSubmit(){
        // let otp = "";
        // let digit1 = document.getElementById('digit-1').value;
        // let digit2 = document.getElementById('digit-2').value;
        // let digit3 = document.getElementById('digit-3').value;
        // let digit4 = document.getElementById('digit-4').value;

        // otp = digit1 + digit2 + digit3 + digit4;

        if(otp.toString().length < 4){
            
            return;
        }

        let pInstId = data?.pInstId;
        showWaitingModal();
        validateUser(otp, data.txnId, pInstId, (res)=>{
            if(res?.data?.data?.status === 1){
                let loanAmount = data?.loanAmount;
                let tenure = data?.loanTenure;
                let txnId = data?.txnId;
                confirmUser(loanAmount, tenure, txnId, pInstId, res=>{
                    if(res?.data?.data?.status === 1){
                        navigate("/patient/LoanAppSuccessful")
                    }
                }, hideWaitingModal)
            }
        }, hideWaitingModal)
    }

    return(
        <main style={{display: "flex", flexDirection:"column", gap:"1rem"}}>
            <Header progressbarDisplay='none' />
            <StepBar currStep={3} />

            { !otpSent ? 
                <>
                    <h3 style={{margin:"1rem 0"}}>Final consent</h3>
                    <div style={{background:"#FAE1CD", textAlign:"center", borderRadius:"4px", padding:"10px", marginBottom:"1rem"}}>
                        ICICI will send an OTP on your registered mobile number. This OTP will help us disburse the credit amount to the doctorName.
                    </div>
                    <div style={{width:"100%", display:'flex', justifyContent:"center"}}>
                        <img src={OTPChars} alt="" />
                    </div>
                    <button className="submit">Send OTP</button>
                </> 
                :
                <>
                    <p style={{marginTop:"1.5rem"}}>Enter OTP sent to +91 {number} by ICICI</p>
                    <div className="number-group">
                        {/* <div className="otpInputGroup">
                            <input className="otpDigit" id="digit-1" onInput={handleOTP} onPaste={handlePaste} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                            <input className="otpDigit" id="digit-2" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                            <input className="otpDigit" id="digit-3" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                            <input className="otpDigit" id="digit-4" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                        </div> */}
                        <InputBox 
                            type="number"
                            length={6}
                            value={otp}
                            setValue={setOtp}
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
                    
                    <div style={{background:"#FAE1CD", borderRadius:"4px", padding:"10px", marginBottom:"1rem"}}>
                        Note : By submitting OTP, amount ₹ {loanAmt.toLocaleString('en-IN',{maximumFractionDigits: 2})} will be transferred to doctor{doctorName? ` ${doctorName}'s` : "'s"} account.
                    </div>

                    <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
                        <input value={consent} onClick={()=>setConsent(!consent)} style={{height:"16px", aspectRatio:"1/1", accentColor:"#514C9F"}} type="checkbox" name="" id="kfsConsentCheckbox" />
                        <label htmlFor="kfsConsentCheckbox" style={{userSelect:"none"}}>I agree to the <a href="../../assets/Key Fact Statement ICICI_CarePay.pdf" download={""} style={{color:"#000000", fontWeight:"600", textDecoration:"underline"}}>Key fact Statement</a></label>
                    </div>
                    <button className={"submit" + (!consent?" disabled" : "")} onClick={()=>handleSubmit()}>Submit OTP</button>
                </>
            }
        </main>
    )
}

export default FinalConsent