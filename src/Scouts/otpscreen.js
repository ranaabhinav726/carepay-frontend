import React, { useState } from "react";
import CarepayLogo from '../patient/assets/Logo-carepay.svg'
import LoanImage from './imagesscouts/loanimage.png'
import OtpInput from 'react-otp-input';
import routes from "../layout/Routes";

const LoginScout = () => {
    const [otp, setOtp] = useState('');

    return (
        <div className="screen-width-max">
            <div className="header-scouts">
                <img src={CarepayLogo} />
            </div>
            <div className="text-center scout-login-body">
                <h1>Instant Loan<br />
                    to Patients</h1>
                <img src={LoanImage} style={{ width: '60%', marginTop: '-20px' }} />
                <p>Flexible EMI options and real-time <br />loan approval
                </p>
            </div>
            <div className="scout-second-div otp-enter ">
                <p>Enter the OTP sent to </p>
                <div className="d-flex" style={{ width: '100%' }}>
                    <div style={{ width: '50%' }}>
                        <p><b>+91 772 182 3857</b></p>
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
                <div>
                    <button className={otp.length === 4 ? "carepay-button-purple" : 'carepay-button-purple-disable'} disabled={otp.length === 4 ? false : true}>Send OTP</button>
                </div>
            </div>
        </div>
    )
}
export default LoginScout