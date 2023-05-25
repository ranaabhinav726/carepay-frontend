import './homepage.scss'
import Logo from '../../assets/Logo-carepay.webp'
import HeroImage from '../../assets/Hero-image.png'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { env, showErrorOnUI, showWrapper, hideWrapper } from '../../environment'

import axios from 'axios'

const DocHomepage = () =>{

    let URL = window.location.href;
    let URLparts = URL.split('/');
    // http://3.92.13.36:3003/doctor/Verma/SC0002/
    let scoutName = URLparts[4]
    let scoutCode = URLparts[5]

    if(!! scoutName) localStorage.setItem("scoutName", scoutName);
    if(!! scoutCode) localStorage.setItem("scoutCode", scoutCode);

    console.log(scoutName, scoutCode, "v1.1");

    const navigate = useNavigate();

    const [number, setNumber] = useState('')
    const [isNumValid, setNumValid] = useState(false)

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);


    const [doctorId, setDoctorId] = useState(localStorage.getItem('doctorId'));

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
    },[])

    useEffect(()=>{
        if(!! doctorId){
            axios.get(env.api_Url + "getDoctorVerificationStatus?doctorId=" + doctorId)
            .then(response =>{
                console.log(response);
                if(response.data.status === 200){
                    if(response.data.data === "VERIFIED"){
                        navigate('/doctor/dashboard')
                    }
                }
            })
        }
    }, [doctorId])



    // useEffect(()=>{
    //     if(canSubmit){
    //         console.log("hide")
    //         ref?.current?.classList?.remove('show');
    //     }else{
    //         console.log("show")
    //         ref?.current?.classList.add('show');
    //     }
    // }, [canSubmit])

    function numberChange(val){
        // let val = e.target.value;
        // console.log(val)
        if(val.length > 10) return
        if(val.length <= 10){
            setNumber(val);
            if(val[0] < 6){
                document.getElementById('number-msg').style.display = "block";
                setNumValid(false);
            }else{
                document.getElementById('number-msg').style.display = "none";
                setNumValid(true);
            }
            if(val.length < 10) setNumValid(false)
        }
    }

    useEffect(()=>{
        let phoneNumber = localStorage.getItem('phoneNumber');
        if(phoneNumber){
            numberChange(phoneNumber);
        }
    },[])

    async function onSubmit(){
        if(! isNumValid){
            let elem = document.getElementById('phoneNumber');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        localStorage.setItem('phoneNumber', number)
        console.log("called")
        await axios.get(env.api_Url + "sendOtp?phoneNumber=" + number)
        .then((response) => {
            console.log(response)
            if(response.data.status == 200){
                navigate('/doctor/verifyOTP')
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
        <main id='homepage'>
            <div id="head"><img id='logo' src={Logo} alt="Carepay's Logo" /></div>
            <h1 className='clr-purple'>Grow your revenue<br/>& patient retention</h1>
            <img id='hero' src={HeroImage} alt="Hero Image" />

            <div className="number">
                <h2 className='clr-purple'>Sign up</h2>
                <div className="inputGroup">
                    <p className='group-title'>Mobile Number</p>
                    <span style={{fontSize: "15.5px", padding:"16px"}}>+91</span>
                    <input
                    style={{width:"calc(100% - 62px)"}}
                    className='group-input'
                        id='phoneNumber'
                        type="number"
                        inputMode="numeric"
                        onChange={(e)=>numberChange(e.target.value)}
                        value={number}
                        placeholder="Enter your mobile number" 
                    />
                    <p id="number-msg">Please enter a correct mobile number</p>
                </div>
                <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
                <button onClick={()=> onSubmit()} className="submit">Send OTP</button>
            </div>
        </main>
    )
}

export default DocHomepage