import React, { useState } from "react";
import CarepayLogo from '../patient/assets/Logo-carepay.svg';
import LoanImage from './imagesscouts/loanimage.png';
import { sendOtpApi } from "./actioncreator";
import routes from "../layout/Routes";
import { useNavigate } from "react-router-dom";
import Loader from '../doctor/assets/loader.gif'
const LoginScout = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorData, seterror] = useState('');
    const [loaderState, setLoaderState] = useState(false);

    let navigate = useNavigate()

    const handlePhoneNumberChange = (event) => {
        const enteredNumber = event.target.value.replace(/\D/g, '');
        if (enteredNumber.length <= 10) {
            setPhoneNumber(enteredNumber);
        }
    };

    const handleSendOTP = () => {
        if (phoneNumber.length === 10) {
            window.sessionStorage.setItem('scoutMobile', phoneNumber)
            setLoaderState(true)
            sendOtpApi(phoneNumber, callback => {
                console.log(callback)
                if (callback.message === 'success') {
                    setLoaderState(false)

                    navigate(routes.SCOUTS_OTP)
                }
            })
            seterror('')

        } else {
            seterror('Please enter a valid 10-digit phone number.')
        }
    };

    return (
        <div className="screen-width-max">
            <div className="header-scouts">
                <img src={CarepayLogo} alt="Carepay Logo" />
            </div>
            {loaderState ?
                <div className="text-center ">
                    <img src={Loader} style={{ marginTop: '50px', width: '150px' }} />
                </div>
                :
                <>
                    <div className="text-center scout-login-body">
                        <h1>Instant Loan<br />to Patients</h1>
                        <img src={LoanImage} style={{ width: '60%', marginTop: '-20px' }} alt="Loan Image" />
                        <p>Flexible EMI options and real-time <br />loan approval</p>
                    </div>
                    <div className="scout-second-div">
                        <h4 style={{marginBottom:'10px'}}>Log in</h4>
                        <label >Mobile Number</label>
                        <div className="d-flex" style={{ width: '100%', display: 'flex' }}>
                            <div style={{ width: '10%', marginTop: '15px' }}>+91</div>
                            <div style={{ width: '90%' }}>
                                <input
                                    className="input-number"
                                    style={{ width: '100%', marginTop: '5px' }}
                                    placeholder="Enter number here"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                />
                                <span className="text-danger">{errorData}</span>
                            </div>
                        </div>
                        <div>
                            <button className="carepay-button-purple" onClick={handleSendOTP}>Send OTP</button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default LoginScout;
