import './verifyOtp.scss'
import Logo from '../../assets/Logo-carepay.webp'
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import axios from 'axios';
import { env, showWrapper, hideWrapper } from '../../environment'
import { useEffect, useRef, useState } from 'react';

const VerifyOTP = () =>{
    
    const navigate = useNavigate();

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    
    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
    },[])

    let phoneNumber = localStorage.getItem('D-phoneNumber')
    // const [counter, setCounter] = useState(60);
    // useEffect(() => {
    //     const timer =
    //       counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    //     return () => clearInterval(timer);
    //   }, [counter]);
      
    // let phoneNumber = "9898989898";
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

        console.log(otp)//doctorLogin?phoneNumber=9711783438&otp=1111

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        await axios.get(env.api_Url + "getOtp?phoneNumber=" + phoneNumber + "&otp=" + otp)
        .then(async (response) => {
            console.log(response)
            if(response.data.status == 200){
                let status = response.data.data;
                if(status === "NOT_VERIFIED"){
                    navigate('/doctor/welcome')
                }else if(status === "VERIFIED"){
                    //get and save doctorId
                    await axios.get(env.api_Url + "getDoctorDetailsByPhoneNumber?mobileNo=" + phoneNumber)
                    .then((response) => {
                        console.log(response)
                        if(response.data.data != null){
                            // setId(response?.data?.data?.id);
                            localStorage.setItem("D-doctorId", response?.data?.data?.doctorId);
                            navigate('/doctor/dashboard')
                        }else{
                            apiErrorHandler();
                        }
                    })
                }else if(!! status){
                    let path = "/doctor/welcome";
                    switch(status){
                        case "PERSONAL":
                            path = "/doctor/PracticeDetails";
                            break;
                        case "PRACTICE":
                            path = "/doctor/AddressDetails";
                            break;
                        case "ADDRESS":
                            path = "/doctor/BankDetails";
                            break;
                        case "BANK":
                            path = "/doctor/UploadDocuments";
                            break;
                        case "DOCUMENTS":
                            path = "/doctor/ThankYou";
                            break;
                    }
                    navigate(path);
                }else{
                    apiErrorHandler();
                }
            }else{
                apiErrorHandler();
            }
        }).catch(error => {
            apiErrorHandler();
            console.log(error);
        });
        setCanSubmit(true);
        hideWrapper(ref.current)
        // navigate('/welcome')
    }
    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 1500);
    }
    return(
        <main className='verifyOtp'>
            <img id='logo' src={Logo} alt="Carepay's Logo" />
            <h2 className='clr-purple'>Verify OTP</h2>
            <p>Enter the OTP sent to</p>
            <div className="number-group">
            <div className="viewAndChangeNumber">
                <div className="phoneNumber"><strong>+91 {phoneNumber}</strong></div>
                <a onClick={()=>navigate(-1)} className="changeNumber">Change Number</a>
            </div>
            <div className="otpInputGroup">
                <input className="otpDigit" id="digit-1" onKeyUp={handleOTP} type="number" inputMode="numeric" placeholder="-" />
                <input className="otpDigit" id="digit-2" onKeyUp={handleOTP} type="number" inputMode="numeric" placeholder="-" />
                <input className="otpDigit" id="digit-3" onKeyUp={handleOTP} type="number" inputMode="numeric" placeholder="-" />
                <input className="otpDigit" id="digit-4" onKeyUp={handleOTP} type="number" inputMode="numeric" placeholder="-" />
            </div>
            <p id="error">Please enter correct OTP</p>
            <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
            <button onClick={()=> login()} className="submit">Submit</button>
            {/* <div id="timer">00:{counter}</div> */}
        </div>
        </main>
    )
}

export default VerifyOTP