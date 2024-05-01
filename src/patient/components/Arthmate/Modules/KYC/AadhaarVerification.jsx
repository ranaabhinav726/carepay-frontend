import { useState } from "react";
import { Header } from "../../comps/Header";
import { HiOutlineFingerPrint } from "react-icons/hi";
import { MdRemoveRedEye } from "react-icons/md";
import { onlyNumbers } from "../../servicesAndUtility/utilityFunctions";
import Timer from '../../comps/Timer'
import InputBox from "../../comps/InputBox";
import { useEffect } from "react";
import lottie from "lottie-web";
import loaderAnimData from '../../assets/loader simple.json'
import doneAnimData from '../../assets/Comp 1.json'
import { sendAadharOtp } from "../../servicesAndUtility/api";
import { useNavigate } from "react-router-dom";

export default function ArthAadhaarVerification(){

    const navigate = useNavigate();
    const[aadhaar, setAadhaar] = useState("XXXX XXXX 1234");
    const[userId, ] = useState(localStorage.getItem("userId"));
    const[otp, setOtp] = useState("");

    const [canResendOtp, setCanResendOtp] = useState(false);
    function allowOtpResend(){
        setCanResendOtp(true);
    }
    function reSendOtp(){
        setCanResendOtp(false);
    }

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#loadAnim1"),
          animationData: loaderAnimData,
          renderer: "canvas"
        });
        lottie.loadAnimation({
          container: document.querySelector("#loadAnim2"),
          animationData: loaderAnimData,
          renderer: "canvas"
        });
        lottie.loadAnimation({
          container: document.querySelector("#doneAnim"),
          animationData: doneAnimData,
          renderer: "canvas"
        });

        if(!userId) return;
        let timer1 = setTimeout(sendAadharOtp(userId, res=>{
            console.log(res);
            if(res.data.message === "success"){
                setScreenState("otpSent")
            }
        }), 3000)
        
        return ()=>{
            clearTimeout(timer1)
        }
        
    }, []);


    const[screenState, setScreenState] = useState("sendingOtp"); // sendingOtp, otpSent, verifyingOtp, verified

    return(
        <main>
            {screenState === "sendingOtp" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"12%"}} id="loadAnim1"></div>
                <p style={{textAlign:"center"}}>Triggering OTP on your number...</p>
            </>
            }
            {screenState === "otpSent" &&
            <>
                <Header />
                <h3 style={{margin:"1.5rem 0"}}>Aadhaar Verification</h3>

                <p>A 6 digit OTP has been sent on the phone number linked to your Aadhaar card. Please enter that OTP below.</p>

                <div style={{display:"flex", flexDirection:"row", alignItems:"center", gap:"12px", margin:"2rem 0"}}>
                    <div style={{height:"40px", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"4px", color:"#514C9F", background:"#FAE1CD"}}>
                        <HiOutlineFingerPrint style={{fontSize:"24px"}} />
                    </div>
                    <span>{aadhaar}</span>
                    <div style={{marginLeft:"auto", height:"40px", aspectRatio:"1/1", background:"#ECEBFF", color:"#514C9F", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"4px", cursor:"pointer"}}>
                        <MdRemoveRedEye style={{fontSize:"24px"}} />
                    </div>
                </div>

                <h3>Enter OTP</h3>
                <div className="emiExpense">
                    <input autoComplete="off"Box
                        type="number"
                        value={otp}
                        setValue={(val)=>onlyNumbers(val, setOtp)}
                        length={6}
                        placeholder="______"
                        styles={{
                            margin:"1rem 0",
                            letterSpacing:"12px"
                        }}
                    />
                    <span className="fieldError">This field can't be empty.</span>
                </div>
                <div style={{width:"100%", display:"flex", justifyContent:"flex-end", margin:"1.5rem 0"}}>
                    {canResendOtp ? 
                        <p onClick={()=>{reSendOtp()}} style={{color:"#514C9F", fontWeight:"700", cursor:"pointer"}}>Resend OTP</p>
                    :
                        <span >Resend OTP in <Timer seconds={59} onTimerEnd={allowOtpResend} /></span>
                    }
                </div>
                <button className="submit" style={{marginTop:"0"}}>Submit OTP</button>
                <p style={{textAlign:"center", marginTop:"1rem"}}>For any details and enquiries, reach out to us</p>
                <a href="tel:+918069489655"><button className="submit lite">Contact Support</button></a>
            </>
            }
            {screenState === "verifyingOtp" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"12%"}} id="loadAnim2"></div>
                <p style={{textAlign:"center"}}>Fetching your Aadhaar details...</p>
            </>
            }
            {screenState === "verified" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"12%"}} id="doneAnim"></div>
                <p style={{color:"#514C9F", fontWeight:"bold", fontSize:"18px", textAlign:"center"}}>Aadhaar verified!</p>
            </>
            }
        </main>
    )
}