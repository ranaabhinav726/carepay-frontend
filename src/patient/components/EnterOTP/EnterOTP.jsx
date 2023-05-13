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

    function handleOTP(e){
        const {keyCode} = e;
        if(keyCode!=8 && keyCode < 48 || keyCode > 57){
            e.target.value = "";
            return
        }

        if(keyCode == 8){
            e.target.value = "";
            let inputBox = e.target.id.charAt(6) * 1;
            if(inputBox == 1) return;
            let prev = "digit-" + (inputBox-1);
            document.getElementById(prev).focus();
        }else{
            e.target.value = e.key;
            let inputBox = e.target.id.charAt(6) * 1;
            if(inputBox == 4) return;
            let next = "digit-" + (inputBox+1);
            document.getElementById(next).focus();
        }
    }

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
                if(response?.data?.status == 200){
                    let userId = response.data.data;
                    if(userId){
                        localStorage.setItem("userId", userId);
                        axios.get(env.api_Url + "/userDetails/getFormStatusByUserId?userId=" + userId)
                        .then(response =>{
                            if(response.data.status === 200){
                                let stage = response?.data?.data;
                                let path;
                                switch(stage){
                                    case "bank_statement_uploaded":
                                        path = "LoanDetails"
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
                                navigate("/patient/"+path)
                                // if(stage !== null){
                                //     navigate("/patient/"+stage)
                                // }else{
                                //     navigate('/patient/PhoneNumberVerified')
                                // }
                            }
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
                <input className="otpDigit" id="digit-1" onKeyUp={handleOTP} type="number" inputMode="numeric" placeholder="-" />
                <input className="otpDigit" id="digit-2" onKeyUp={handleOTP} type="number" inputMode="numeric" placeholder="-" />
                <input className="otpDigit" id="digit-3" onKeyUp={handleOTP} type="number" inputMode="numeric" placeholder="-" />
                <input className="otpDigit" id="digit-4" onKeyUp={handleOTP} type="number" inputMode="numeric" placeholder="-" />
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