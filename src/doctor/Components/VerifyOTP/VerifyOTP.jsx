import './verifyOtp.scss'
import Logo from '../../assets/Logo-carepay.webp'
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import axios from 'axios';
import { env, showWrapper, hideWrapper } from '../../environment'
import { useEffect, useRef, useState } from 'react';

const VerifyOTP = () => {

  const navigate = useNavigate();

  const [apiError, setApiError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  let ref = useRef(0);
  useEffect(() => {
    ref.current = document.getElementById('animation-wrapper');
  }, [])

  let phoneNumber = localStorage.getItem('D-phoneNumber')

  // const [counter, setCounter] = useState(60);
  // useEffect(() => {
  //     const timer =
  //       counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  //     return () => clearInterval(timer);
  //   }, [counter]);

  // let phoneNumber = "9898989898";
  // function handleOTP(e){
  //     const {keyCode} = e;
  //     if(keyCode!=8 && keyCode < 48 || keyCode > 57){
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

  useEffect(() => {
    document.getElementById('digit-1').focus()
  }, [])

  async function getAndSetDoctorId() {
    await axios.get(env.api_Url + "getDoctorDetailsByPhoneNumber?mobileNo=" + phoneNumber)
      .then(async (response) => {
        let data = await response?.data?.data;
        if (data !== null) {
          let doctorId = response?.data?.data?.doctorId;
          if (doctorId !== null) {
            localStorage.setItem("D-doctorId", doctorId);
          }
        } else {
          let existingDoctorId = localStorage.getItem("D-doctorId");
          if (!!existingDoctorId) {
            localStorage.removeItem("D-doctorId");
          }
        }
      })
  }
  async function login() {
    let otp = "";
    let digit1 = document.getElementById('digit-1').value;
    let digit2 = document.getElementById('digit-2').value;
    let digit3 = document.getElementById('digit-3').value;
    let digit4 = document.getElementById('digit-4').value;

    if (!(digit1 && digit2 && digit3 && digit4)) {
      let elem = document.getElementById("error");
      elem.style.display = "block";

      setTimeout(() => {
        elem.style.display = "none";
      }, 1000)
      return;
    }

    otp = digit1 + digit2 + digit3 + digit4;

    console.log(otp)//doctorLogin?phoneNumber=9711783438&otp=1111

    if (!canSubmit) {
      return;
    }
    setCanSubmit(false);
    showWrapper(ref.current)

    await axios.post(env.api_Url + "getOtp", null, { params: { phoneNumber: phoneNumber, otp: otp } })
      .then(async (response) => {
        if (response.data.status == 200) {
          let accessToken = response.data.data.access_token;
          let refreshToken = response.data.data.refresh_token;
          if (accessToken && refreshToken) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
          }
          let status = response.data.data.data;
          console.log(status,'statusstatus')
          if (status === "NOT_VERIFIED") {
            await getAndSetDoctorId();
            navigate('/doctor/welcome')
          } else if (status === "VERIFIED") {
            //get and save doctorId
            await axios.get(env.api_Url + "getDoctorDetailsByPhoneNumber?mobileNo=" + phoneNumber)
              .then((response) => {
                console.log(response)
                if (response.data.data != null) {
                  localStorage.setItem("D-doctorId", response?.data?.data?.doctorId);
                  navigate('/doctor/dashboard')
                } else {
                  apiErrorHandler();
                }
              })
          } else if (!!status) {
            await getAndSetDoctorId();
            let path = "/doctor/welcome";
            switch (status) {
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
          } else {
            apiErrorHandler();
          }
        } else {
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
  function apiErrorHandler() {
    setApiError(true)
    setTimeout(() => {
      setApiError(false);
    }, 1500);
  }
  return (
    <main className='verifyOtp'>
      <img id='logo' src={Logo} alt="Carepay's Logo" />
      <h2 className='clr-purple'>Verify OTP</h2>
      <p>Enter the OTP sent to</p>
      <div className="number-group">
        <div className="viewAndChangeNumber">
          <div className="phoneNumber"><strong>+91 {phoneNumber}</strong></div>
          <a onClick={() => navigate(-1)} className="changeNumber">Change Number</a>
        </div>
        <div className="otpInputGroup">
          <input autoComplete="off" className="otpDigit" id="digit-1" onInput={handleOTP} onPaste={handlePaste} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
          <input autoComplete="off" className="otpDigit" id="digit-2" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
          <input autoComplete="off" className="otpDigit" id="digit-3" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
          <input autoComplete="off" className="otpDigit" id="digit-4" onInput={handleOTP} onKeyDown={handleOTP} type="text" maxLength={1} inputMode="numeric" placeholder="-" />
        </div>
        <p id="error">Please enter correct OTP</p>
        <p className={apiError ? "apiError" : "apiError hide"}>Incorrect OTP, please check.</p>
        <button onClick={() => login()} className="submit">Submit</button>
        {/* <div id="timer">00:{counter}</div> */}
      </div>
    </main>
  )
}

export default VerifyOTP