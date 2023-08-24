import Header from "../Header/Header"
import "./enterOTP.scss"

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useTransition } from "react";
// import { useData } from "../data";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../environment/environment"
// import { DataContext } from "../../App";

const EnterOTP = () =>{
    // const data = useContext(DataContext);

    // const data = useData();
    const navigate = useNavigate();

    const [number, setNumber] = useState("");

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    // let phoneNumber = data?.userData.phone_number || "98xxxx9898";
    // let phoneNumber = localStorage.getItem("phone_number") || "98xxxx9898";
    // console.log(data?.userData)

    let ref = useRef(0);
    useEffect(()=>{
        setNumber(localStorage.getItem("phoneNumber"));
        ref.current = document.getElementById('animation-wrapper');
    },[])

    // function handleOTP(e){
    //     const {keyCode} = e;
    //     if((keyCode!=8) && (keyCode < 48) || (keyCode > 57)){
    //         e.target.value = "";
    //         return
    //     }

    //     if(keyCode == 8){
    //         e.target.value = "";
    //         let inputBox = e.target.id.charAt(6) * 1;
    //         if(inputBox == 1) return;
    //         let prev = "digit-" + (inputBox-1);
    //         document.getElementById(prev).focus();
    //     }else{
    //         e.target.value = e.key;
    //         let inputBox = e.target.id.charAt(6) * 1;
    //         if(inputBox == 4) return;
    //         let next = "digit-" + (inputBox+1);
    //         document.getElementById(next).focus();
    //     }
    // }

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

    async function login(){
        let otp = "";
        let digit1 = document.getElementById('digit-1').value;
        let digit2 = document.getElementById('digit-2').value;
        let digit3 = document.getElementById('digit-3').value;
        let digit4 = document.getElementById('digit-4').value;

        if(!(digit1 && digit2 && digit3 && digit4)){
            let elem = document.getElementById("error");
            elem.style.display = "block";

            setTimeout(()=>{
                elem.style.display = "none";
            }, 1000)
            return;
        }

        otp = digit1 + digit2 + digit3 + digit4;

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        await axios
            .post(env.api_Url + "userDetails/verifyOtp?mobile=" + number + "&otp=" + otp, {}, )
            .then((response) => {
                console.log(response)
                if(response.data.message === "success"){
                    let userId = response.data.data;
                    if(userId){
                        localStorage.setItem("userId", userId);
                        axios.get(env.api_Url + "userDetails/getFormStatusByUserId?userId=" + userId)
                        .then(response =>{
                            if(response.data.message === "success"){
                                let stage = response?.data?.data;
                                let path;
                                switch(stage){
                                    case "Basic":
                                        path = "AddressDetails";
                                        break;
                                    case "Address":
                                        path = "EmploymentDetails";
                                        break;
                                    case "Occupation":
                                        path = "BankDetails";
                                        break;
                                    case "BankDetails":
                                        path = "IncomeVerification";
                                        break;
                                    case "BankStatement":
                                        path = "LoanDetails";
                                        break;
                                    case "LoanDetails":
                                        path = "KycVerification";
                                        break;
                                    case "CREATE_CUSTOMER":
                                        path = "KycVerification";
                                        break;
                                    case "KYC_INITIATED":
                                        path = "KycVerification";
                                        break;
                                    case "KYC_COMPLETED":
                                        path = "StatementVerificationUnderProcess";
                                        break;
                                    case "DOCUMENT_UPLOAD":
                                        path = "StatementVerificationUnderProcess";
                                        break;
                                    case "DOCUMENT_VERIFIED":
                                        path = "StatementVerificationUnderProcess";
                                        break;
                                    case "BANK_DETAILS":
                                        path = "BankDetailsUnderProcess";
                                        break;
                                    case "BANK_DETAILS_VERIFIED":
                                        path = "LoanAgreement";
                                        break;
                                    case "ESIGN_INITIATED":
                                        path = "LoanAgreement";
                                        break;
                                    case "ESIGN_COMPLETED":
                                        path = "Emandate";
                                        break;
                                    case "EMANDATE_INITIATED":
                                        path = "Emandate";
                                        break;
                                    case "EMANDATE_COMPLETED":
                                        path = "FirstPaymentScreen";
                                        break;
                                    case "LOAN_APPLIED":
                                        path = "FirstPaymentScreen";
                                        break;
                                    case "LOAN_APPROVED":
                                        path = "LoanAppUnderProcess";
                                        break;
                                    case "DISBURSED":
                                        path = "LoanAppUnderProcess";
                                        break;
                                    case "PAID":
                                        path = "UserDashboard";
                                        break;
                                    default:
                                        path = "PhoneNumberVerified"
                                }

                                navigate("/patient/" + path)
                                // if(stage !== null){
                                //     navigate("/patient/"+stage)
                                // }else{
                                //     navigate('/patient/PhoneNumberVerified')
                                // }
                            }
                        }).catch(error =>{
                            console.log(error);
                        })
                    } 
                }else{
                    apiErrorHandler();
                }
            }).catch(error => {
                console.log(error);
                apiErrorHandler();
            });

            setCanSubmit(true);
            hideWrapper(ref.current)

            function apiErrorHandler(){
                setApiError(true)
                setTimeout(()=>{
                    setApiError(false);
                }, 1500);
            }
    }

   return(
    <>

    <main className="enterOTP">
    <Header progressbarDisplay="none" />
        <h3 className="enterOTPHeading">Enter OTP sent to</h3>
        <div className="number-group">
            <div className="viewAndChangeNumber">
                <div className="phoneNumber">+91 {number}</div>
                <a onClick={()=>navigate(-1)} className="changeNumber">Change Number</a>
            </div>
            <div className="otpInputGroup">
                <input className="otpDigit" id="digit-1" onInput={handleOTP} onPaste={handlePaste} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                <input className="otpDigit" id="digit-2" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                <input className="otpDigit" id="digit-3" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
                <input className="otpDigit" id="digit-4" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
            </div>
            <p id="error">Please enter correct OTP</p>
        </div>
        
        <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
        <button onClick={()=>login()} className="submit">Submit</button>

    </main>
    </>
   )
}


export default EnterOTP