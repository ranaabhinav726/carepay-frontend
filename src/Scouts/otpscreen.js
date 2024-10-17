import React, { useEffect, useState } from "react";
import CarepayLogo from './imagesscouts/logosvg.svg'
import LoanImage from './imagesscouts/scoutmain.svg'
import OtpInput from 'react-otp-input';
import routes from "../layout/Routes";
import { getScoutRole, sendOtpApi, verifyOtpApi } from "./actioncreator";
import { useNavigate } from "react-router-dom";
import Loader from '../doctor/assets/loader.gif'
import Timer from "../patient/components/EnterOTP/Timer";

const LoginScout = () => {
    const [otp, setOtp] = useState('');
    const [loaderState, setLoaderState] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');
    const [roleData, setRolData] = useState('');
    const [canResendOtp, setCanResendOtp] = useState(false);

    let navigate = useNavigate()
    const Submit = () => {
        setLoaderState(true)
        seterrorMsg('')
        verifyOtpApi(window.sessionStorage.getItem('scoutMobile'), otp, callback => {
            console.log(callback)

            if (callback.message === 'success') {
                setLoaderState(false)
                navigate(routes.SCOUTES_LOANS)
            } else {
                seterrorMsg('Invalid OTP !')
                setLoaderState(false)
            }
        })
    }
    useEffect(() => {
        if (window.sessionStorage.getItem('scoutMobile') === 'null' || window.sessionStorage.getItem('scoutMobile') === null) {
            navigate(routes.SCOUTS_MAIN)

        } else {
            getScoutRole(window.sessionStorage.getItem('scoutMobile'), callback => {
                if (callback.message === 'success' && callback.data !== 'NOT_FOUND') {
                    setRolData(callback.data)

                    if (callback.data.role === 'SCOUT') {
                        window.sessionStorage.setItem('scoutId', callback.data.id)
                        window.sessionStorage.setItem('role', callback.data.role)
                    }
                    if (callback.data.role === 'DOCTOR') {
                        window.sessionStorage.setItem('doctorId', callback.data.id)
                        window.sessionStorage.setItem('role', callback.data.role)
                    }
                    if (callback.data.role === 'PARENT_DOCTOR') {
                        window.sessionStorage.setItem('parentDoctorId', callback.data.id)
                        window.sessionStorage.setItem('role', callback.data.role)
                    }
                    if (callback.data.role === 'PARENT_SCOUT') {
                        window.sessionStorage.setItem('parentScoutId', callback.data.id)
                        window.sessionStorage.setItem('role', callback.data.role)
                    }

                } else {
                    alert('Not Data Found !')
                    navigate(routes.SCOUTS_MAIN)

                }
            })
        }
    }, [])
    const Submitpaas = () => {
        setLoaderState(false)
        navigate(routes.SCOUTES_LOANS)
    }
    const reSendOtp = () => {
        setLoaderState(true)
        sendOtpApi(window.sessionStorage.getItem('scoutMobile'), callback => {
            console.log(callback)
            if (callback.message === 'success') {
                setLoaderState(false)
                setCanResendOtp(false)

            }
        })
    }
    const allowOtpResend = () => {
        setCanResendOtp(true);
    }
    return (
        <div className="screen-width-max">
            <div className="header-scouts">
                <img src={CarepayLogo} />
            </div>
            {loaderState ?
                <div className="text-center ">
                    <img src={Loader} style={{ marginTop: '50px', width: '150px' }} />
                </div>
                :
                <>
                    {/* <div className="text-center scout-login-body">
                        <h1>Instant Loan<br />
                            to Patients</h1>
                        <img src={LoanImage} style={{ width: '60%', marginTop: '-20px' }} />
                        <p>Flexible EMI options and real-time <br />loan approval
                        </p>
                    </div> */}
                    <div className="scout-second-div otp-enter ">
                        <p style={{ marginBottom: '20px' }}>Enter the OTP sent to </p>
                        <div className="d-flex" style={{ width: '100%', display: 'flex', marginBottom: '15px' }}>
                            <div style={{ width: '50%' }}>
                                <p><b>+91 {window.sessionStorage.getItem('scoutMobile')}</b></p>
                            </div>
                            <div style={{ width: '50%', textAlign: 'right' }}>
                                <a style={{ textDecoration: 'underline' }} href={routes.SCOUTS_LOGIN}><b>Change number</b></a>
                            </div>
                        </div>

                        <OtpInput
                            inputType="number"
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input placeholder="-" type="number"  {...props} />}
                        />
                        <span className="text-danger">{errorMsg}</span>
                        <div>
                            {/* <button onClick={() => Submitpaas()} className={roleData !== '' ? "carepay-button-purple" : 'carepay-button-purple-disable'} disabled={roleData!=='' ? false : true}>Submit OTP</button> */}

                            <button onClick={() => Submit()} className={otp.length === 4 ? "carepay-button-purple" : 'carepay-button-purple-disable'} disabled={otp.length === 4 ? false : true}>Submit OTP</button>
                        </div>
                        {canResendOtp ?
                            <div className="text-center" onClick={() => reSendOtp()} style={{ color: "#514C9F", fontWeight: "700", cursor: "pointer", marginTop: '10px' }}>Resend OTP</div>
                            :
                            <div className="text-center" style={{ marginTop: '10px' }}><Timer seconds={45} onTimerEnd={allowOtpResend} /></div>
                        }
                    </div>
                    <img src={LoanImage} style={{width:'100%'}}/>
                </>}
        </div>
    )
}
export default LoginScout