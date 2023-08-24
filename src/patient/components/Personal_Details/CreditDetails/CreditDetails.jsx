import { useEffect, useRef, useState } from "react"
import axios from "axios";
import Header from "../../Header/Header"
import "../../MobileNumberVerification/mobileNumberVerification.scss"

import { useNavigate } from "react-router-dom";
// import { useContext } from "react"
// import { DataContext } from "../../App"

import { env, showWrapper, hideWrapper } from '../../../environment/environment'
// import { useData } from "../data";

const CreditDetails = () => {
    const [number, setNumber] = useState('')
    const [fullName, setFullName] = useState("");
    const [amount, setAmount] = useState("");
    const [treatment, setTreatment] = useState("");

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const navigate = useNavigate();
    // const data = useData();
    // const data = useContext(DataContext);
    
    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
    },[])

    let doctorId = localStorage.getItem("doctorId")
    let doctorName = localStorage.getItem("doctorName")
    let userId = localStorage.getItem("userId");
    
    async function verifyAndNavigate(){
        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        let submitObj = {
            "userId" : userId,
            "doctorName": doctorName,
            "doctorId": doctorId,
            "loanReason": treatment,
            "loanAmount": amount,
            "formStatus": ""
        };

        await axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(async(response) => {
                console.log(response)
                if(response.data.message === "success"){
                    // await handleNavigation();
                    localStorage.setItem("fullName", fullName);
                    navigate('/patient/PersonalDetails');
                }else{
                    apiErrorHandler();
                }
            }).catch(error => {
                apiErrorHandler();
                console.log(error);
            });

        // await axios
        //     .post(env.api_Url + "userDetails/sendOtpToMobile?mobile="+number, {}, )
        //     .then((response) => {
        //         console.log(response)
        //         if(response.data.status == 200){
        //             navigate('/patient/EnterOTP');
        //         }else{
        //             apiErrorHandler();
        //         }
        //     }).catch(error => {
        //     apiErrorHandler();
        //     console.log(error);
        // });
        setCanSubmit(true);
        hideWrapper(ref.current)
    }

    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 1500);
    }


   return(
    <>
    <main className="mobileNumberVerification">
    <Header progressbarDisplay="none" />
        <h3 className="mobileVerificationHeading">Credit Details</h3>
        
        <div className="inputGroup">
            <p>Credit amount</p>
            <input 
                type="text" 
                value={amount} 
                placeholder="Enter credit amount"
                onChange={(e)=>setAmount(e.target.value)}  
            />
        </div>

        <div className="inputGroup">
            <p>Treatment name</p>
            <input 
                type="text" 
                value={treatment} 
                placeholder="Name of treatment"
                onChange={(e)=>setTreatment(e.target.value)}  
            />
        </div>

        <div className="inputGroup">
            <p>Full name (as per PAN)</p>
            <input 
                type="text" 
                value={fullName} 
                placeholder="Enter your name"
                onChange={(e)=>setFullName(e.target.value)}  
            />
        </div>

        <button onClick={()=> verifyAndNavigate()} className="submit">Submit</button>
    </main>
    </>
   )

}

export default CreditDetails