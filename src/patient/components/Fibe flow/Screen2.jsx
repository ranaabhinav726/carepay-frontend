import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Comps/Header";

import { IoIosArrowBack } from 'react-icons/io'
import ScreenTitle from "./Comps/ScreenTitle";
import { useState } from "react";
import InputBox from "./Comps/InputBox";
import axios from "axios";
import { env, hideWaitingModal, showWaitingModal } from "../../environment/environment";

export default function Screen2(){

    const [number, ] = useState(localStorage.getItem("phoneNumber"));
    const [otp, setOtp] = useState();

    const navigate = useNavigate();


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
                <IoIosArrowBack /> 
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
            <button onClick={()=>login()} className="submit" style={{marginTop:"32px"}}>Submit OTP</button>
        </main>
    )
}