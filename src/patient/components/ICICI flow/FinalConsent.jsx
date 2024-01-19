import Header from "../Header/Header"
import StepBar from "./comps/StepBar"

import './FinalConsent.scss'

import OTPChars from '../../assets/OTPChars.svg'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function FinalConsent(){

    const [otpSent, setOtpSent] = useState(true);
    const [number, setNumber] = useState("9999999999");

    const [otpAmt, setOtpAmt] = useState(20000);
    const [doctor, setDoctor] = useState("Y");

    const navigate = useNavigate();
    const handleOTP = (e) => {
        const inputValue = e.target.value;
    
        if (!/^\d?$/.test(inputValue)) {
          // If input is not empty or not a digit, reset the input value
          e.target.value = '';
          return;
        }
    
        const inputBox = e.target.id.charAt(6) * 1;
        const prev = 'digit-' + (inputBox - 1);
        const next = 'digit-' + (inputBox + 1);
    
        if (e.key === 'Backspace') {
          // Backspace is pressed
          if (inputValue === '' && inputBox > 1) {
            // Empty current input box and shift focus to the previous one
            e.preventDefault(); // Prevent the default backspace behavior (going back in history)
            document.getElementById(prev).focus();
          } else if (inputValue === '' && inputBox === 1) {
            // Empty current input box and focus remains on the first box
            e.preventDefault(); // Prevent the default backspace behavior (going back in history)
          } else if (inputBox > 1) {
            // Non-empty input box, so clear it and shift focus to the previous one
            e.preventDefault(); // Prevent the default backspace behavior (going back in history)
            e.target.value = '';
            document.getElementById(prev).focus();
          }
        } else if (/^\d$/.test(inputValue) && inputBox < 4) {
          // Valid digit input, and the current input box is not the last one
          document.getElementById(next).focus();
        }
    };

    const handlePaste = (e) => {
    const pastedData = e.clipboardData?.getData('text/plain');
    if (!pastedData) {
        // Fallback: if clipboardData is not available, try getting the pasted content from the event value
        const pastedDataFallback = e.target.value;
        const digits = pastedDataFallback.match(/\d/g);
        if (digits && digits.length === 4) {
        const inputBoxes = document.querySelectorAll('[id^=digit-]');
        for (let i = 0; i < Math.min(digits.length, inputBoxes.length); i++) {
            inputBoxes[i].value = digits[i];
            if (i < inputBoxes.length - 1) {
            inputBoxes[i].dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
        }
    } else {
        const digits = pastedData.match(/\d/g);
        if (digits && digits.length === 4) {
        const inputBoxes = document.querySelectorAll('[id^=digit-]');
        for (let i = 0; i < Math.min(digits.length, inputBoxes.length); i++) {
            inputBoxes[i].value = digits[i];
            if (i < inputBoxes.length - 1) {
            inputBoxes[i].dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
        }
    }
    e.preventDefault();
    };

    useEffect(()=>{
        document.getElementById('digit-1').focus()
    },[])


    return(
        <main style={{display: "flex", flexDirection:"column", gap:"1rem"}}>
            <Header progressbarDisplay='none' />
            <StepBar currStep={3} />

            { !otpSent ? 
                <>
                    <h3 style={{margin:"1rem 0"}}>Final consent</h3>
                    <div style={{background:"#FAE1CD", textAlign:"center", borderRadius:"4px", padding:"10px", marginBottom:"1rem"}}>
                        ICICI will send an OTP on your registered mobile number. This OTP will help us disburse the credit amount to the doctor.
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
                        <div className="otpInputGroup">
                            <input className="otpDigit" id="digit-1" onInput={handleOTP} onPaste={handlePaste} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                            <input className="otpDigit" id="digit-2" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                            <input className="otpDigit" id="digit-3" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                            <input className="otpDigit" id="digit-4" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                        </div>
                        <p id="error">Please enter correct OTP</p>
                    </div>

                    <div style={{background:"#FAE1CD", textAlign:"center", borderRadius:"4px", padding:"10px", marginBottom:"1rem"}}>
                        Note : By submitting OTP, amount ₹ {otpAmt} will be transferred to doctor {doctor}’s account.
                    </div>

                    <button className="submit">Submit</button>
                </>   
            }
        </main>
    )
}

export default FinalConsent