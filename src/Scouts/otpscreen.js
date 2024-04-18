import React, { useEffect, useState } from "react";
import CarepayLogo from '../patient/assets/Logo-carepay.svg'
import LoanImage from './imagesscouts/loanimage.png'
import OtpInput from 'react-otp-input';
import routes from "../layout/Routes";
import { getScoutRole, verifyOtpApi } from "./actioncreator";
import { useNavigate } from "react-router-dom";
import Loader from '../doctor/assets/loader.gif'

const LoginScout = () => {
    const [otp, setOtp] = useState('');
    const [loaderState, setLoaderState] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');

    let navigate = useNavigate()
    const Submit = () => {
        setLoaderState(true)
        seterrorMsg('')
        verifyOtpApi(window.sessionStorage.getItem('scoutMobile'), otp, callback => {
            console.log(callback)
            if (callback.message === 'success') {
                setLoaderState(false)
                navigate(routes.SCOUTES_DASHBOARD)
            } else {
                seterrorMsg('Invalid OTP !')
            }
        })
    }
    useEffect(() => {
        if (window.sessionStorage.getItem('scoutMobile') === 'null' || window.sessionStorage.getItem('scoutMobile') === null) {
            navigate(routes.SCOUTS_MAIN)

        } else {
            getScoutRole(window.sessionStorage.getItem('scoutMobile'), callback => {
                console.log(callback)
                if (callback.message === 'success' && callback.data !== 'NOT_FOUND') {
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
                    <div className="text-center scout-login-body">
                        <h1>Instant Loan<br />
                            to Patients</h1>
                        <img src={LoanImage} style={{ width: '60%', marginTop: '-20px' }} />
                        <p>Flexible EMI options and real-time <br />loan approval
                        </p>
                    </div>
                    <div className="scout-second-div otp-enter ">
                        <p>Enter the OTP sent to </p>
                        <div className="d-flex" style={{ width: '100%',display:'flex' ,marginBottom:'15px'}}>
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
                            <button onClick={() => Submit()} className={otp.length === 4 ? "carepay-button-purple" : 'carepay-button-purple-disable'} disabled={otp.length === 4 ? false : true}>Send OTP</button>
                        </div>
                    </div>
                </>}
        </div>
    )
}
export default LoginScout