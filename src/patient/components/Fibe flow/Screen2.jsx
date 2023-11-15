import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Comps/Header";

import { IoIosArrowBack } from 'react-icons/io'
import ScreenTitle from "./Comps/ScreenTitle";
import { useEffect, useState } from "react";
import InputBox from "./Comps/InputBox";
import axios from "axios";
import { env, hideWaitingModal, showWaitingModal } from "../../environment/environment";

export default function Screen2(){

    const [number, ] = useState(localStorage.getItem("phoneNumber"));
    const [otp, setOtp] = useState();

    const [resendTime, setResendTime] = useState(10);
    let min = Math.floor(resendTime/60);
    let sec = resendTime%60;

    function reduceTime(){
        setResendTime((resendTime)=>resendTime-1);
    }

    useEffect(()=>{
        if(resendTime === 0){
            return;
        }
        const interval = setInterval(() => reduceTime(), 1000);
        return () => clearInterval(interval);
    }, [resendTime])

    const navigate = useNavigate();


    async function resendOtp(){
        if(! number){
            return;
        }
        showWaitingModal();

        await axios
            .post(env.api_Url + "userDetails/sendOtpToMobile?mobile=" + number, {}, )
            .then((response) => {
                // console.log(response)
                hideWaitingModal()
            }).catch(error => {
                // apiErrorHandler();
                console.warn(error);
                hideWaitingModal()
        });
    }

    async function login(){

        if(otp.length < 4) return;

        showWaitingModal();

        await axios
            .post(env.api_Url + "userDetails/verifyOtp?mobile=" + number + "&otp=" + otp, {}, )
            .then((response) => {
                console.log(response)
                if(response.data.message === "success"){
                    let userId = response.data.data;
                    if(userId){
                        localStorage.setItem("userId", userId);
                    }
                    navigate("/patient/screen3");
                }
                hideWaitingModal();
            }).catch(error =>{
                console.log(error)
                hideWaitingModal();
            })
    }

    return(
        <main className="screenContainer">
            <Header progressBar={"hidden"} />
            <Link 
            onClick={()=>navigate(-1)}
            style={{
                fontSize:"16px", 
                fontWeight:"700", 
                lineHeight:"20px", 
                color:"#514C9F", 
                textDecoration:"underline"
            }}>
                <IoIosArrowBack style={{margin:"0 5px -3px 0"}} /> 
                Change number
            </Link>

            <ScreenTitle 
                title={"Enter the OTP sent to"} 
                styles={{marginTop:"26px", marginBottom:"12px"}} 
            />
            <ScreenTitle 
                title={`+91 ${number}`} 
                styles={{marginBottom:"26px", marginTop:"0"}} 
            />

            <InputBox 
                type="number" 
                length={4} 
                placeholder="----" 
                variant="filled" 
                styles={{
                    border:"0", 
                    letterSpacing:"12px"
                }} 
                value={otp} 
                setValue={setOtp} 
            />
            <div style={{display:"flex", justifyContent:"flex-end"}}>
                {resendTime === 0 ?
                    <p onClick={()=>resendOtp()} style={{color:"#514C9F", fontWeight:"700", textDecoration:"underline", marginTop:"1rem"}}>Resend OTP</p>
                :
                    <p style={{marginTop:"1rem"}}><span style={{color:"rgba(0,0,0,0.4"}}>Resend in </span>{`  ${min} : ${sec}`}</p>
                }
            </div>
            <button onClick={()=>login()} className="submit" style={{marginTop:"32px"}}>Submit OTP</button>
        </main>
    )
}