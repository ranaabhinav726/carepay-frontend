import { useEffect, useRef, useState } from "react"
import axios from "axios";
import Header from "../Header/Header"
import "./mobileNumberVerification.scss"

import { useNavigate } from "react-router-dom";
// import { useContext } from "react"
// import { DataContext } from "../../App"

import { env, showWrapper, hideWrapper } from "../../environment/environment"
// import { useData } from "../data";

const MobileNumberVerification = () =>{
    const [number, setNumber] = useState('')
    const [isNumValid, setNumValid] = useState(false)
    const [accepted, setAccept] = useState(false)

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const navigate = useNavigate();
    // const data = useData();
    // const data = useContext(DataContext);
    
    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');

        setNumber(localStorage.getItem("phoneNumber"));
        setNumValid(true)
    },[])

    function numberChange(e){
        let val = e.target.value;
        if(val.length > 10) return
        if(val.length >= 10){
            setNumber(val);
            if(val.length != 10 || val[0] < 6){
                document.getElementById('number-msg').style.display = "block";
                setNumValid(false);
            }else{
                document.getElementById('number-msg').style.display = "none";
                setNumValid(true);
            }
        }
        setNumber(val)
        // console.log(val)
    }
    
    let elem = document.getElementById('terms');
    let elem2 = document.getElementsByClassName('termsAndCond')[0];
    function consentError(){
        elem.classList.remove('errorAnimate');
        elem.style.color = "black";
        elem2.style.color = "black";
    }

    async function verifyAndNavigate(){
        if(! isNumValid  || !number){
            let elem = document.getElementById('number-msg');
            elem.style.display = "block";

            setTimeout(()=>{
                elem.style.display = "none";
            },1000)
            return;
        }
        if(! accepted){    
            // let elem = document.getElementsByClassName('termsAndConditions')[0];
            elem.style.color = "red";
            elem2.style.color = "red";
            elem.classList.add('errorAnimate');
            // navigator.vibrate(
            //     [100, 30, 100, 30]
            // );

            setTimeout(consentError.bind(this), 400);
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        await axios
            .post(env.api_Url + "userDetails/sendOtpToMobile?mobile="+number, {}, )
            .then((response) => {
                console.log(response)
                if(response.data.status == 200){
                    localStorage.setItem("phoneNumber", number);
                    navigate('/patient/EnterOTP');
                }else{
                    apiErrorHandler();
                }
            }).catch(error => {
            apiErrorHandler();
            console.log(error);
        });
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
        <h3 className="mobileVerificationHeading">Mobile Number Verification</h3>
        <p className="mobileVerificationSubheading">Enter mobile number</p>
        <div className="number-group">
            <div className="number-group--leftHalf">+91</div>
            <div className="number-group--rightHalf">
                <input type="number" inputMode="numeric" onChange={(e)=>numberChange(e)} value={number??""} placeholder="Enter your mobile number" />
                <p id="number-msg">Please enter correct number</p>
            </div>
        </div>

        <div className="termsAndConditions">
            <input type="checkbox" checked={accepted} onChange={e => setAccept(e.target.checked)} />
            <p id="terms">I accept the <a href="" className="termsAndCond">Terms & Conditions</a></p>
        </div>
        <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
        <button onClick={()=> verifyAndNavigate()} className="submit">Send OTP</button>
    </main>
    </>
   )
}


export default MobileNumberVerification