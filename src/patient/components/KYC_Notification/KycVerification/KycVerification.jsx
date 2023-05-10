import Header from '../../Header/Header';
import './kycVerification.scss'

import fingerprint from '../../../assets/fingerprint.png'
// import { env } from "../../../environment/environment"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { env } from '../../../environment/environment';

const KycVerification = () =>{

    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "KycVerification"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, [])

    async function checkStatusAndNavigate(){
        await axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=kyc_verified", {},)
        .then((response) => {
            console.log(response)
            if(response.data.status == "200"){
                let kycStatus = response.data.data;
                console.log(kycStatus)
                if(kycStatus === "VERIFIED"){
                    navigate('/patient/KycAlreadyVerified');
                }else if(kycStatus === "NOT_SUBMITTED"){
                    navigate('/patient/KycRedirection'); // redirection
                }else{
                    navigate('/patient/KycWebview') // under process
                }
            }else if(response.data.status == "404"){
                navigate('/patient/KycRedirection');
            }
        }).catch(error => {
                console.log(error);
        });
    }

    return(
    <>
    <main className='kycVerification'>
    <Header progressbarDisplay="block" progress="80" canGoBack='/patient/LoanDetails' />
        <h3>KYC Verification</h3>
        <div className="upperSection">                
            <p className="note">To process your loan application, you<br />will be redirected to our lending partner’s<br />platform for KYC verification.</p>
        </div>

        <img className='fingerPrint' src={fingerprint} alt="" />


        <div className="lowerSection">
            <div className="lowerCard">
                <p className="title">Before you proceed!</p>
                {/* <p className="note">Ready these documents to upload for the<br />Loan Application Process:</p> */}
                <p className="note">You might be required to upload the<br/>following documents for the credit<br/>application process if your mobile number<br/>is not linked with your Aadhaar Number.<br />Keep them ready before you proceed:</p>
                <ul>
                    <li>Aadhaar Card Image - Front</li>
                    <li>Aadhaar Card Image - Back</li>
                    <li>PAN Card Image - Front</li>
                    <li>Bank Statement - 3 months</li>
                </ul>
            </div>
            
            <button onClick={()=>checkStatusAndNavigate()} className='submit'>Proceed</button>
        </div>

    </main>
    </>
    )
}

export default KycVerification