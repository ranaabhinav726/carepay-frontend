import Header from '../../Header/Header';
import './kycVerification.scss'

import fingerprint from '../../../assets/fingerprint.png'
// import { env } from "../../../environment/environment"
import { useNavigate, Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs'
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
    <Header progressbarDisplay="block" progress="96" canGoBack='/patient/LoanDetails' />
        <h3>KYC Verification</h3>
        {/* <div className="skipMsg" style={{background:"#ECEBFF", padding:"10px", borderRadius:"4px"}}>
            <p style={{margin:"0"}}>You can skip this step if the required credit amount is less than ₹ 75,000</p>
            <div className="skippable" style={{display:"flex", justifyContent:"flex-end"}}>
                <p style={{fontWeight:"600", margin:"0", color:"rgba(0, 0, 0, 0.8"}}><Link to={'/patient/kycVerification'}>Skip this step <BsArrowRight style={{fontSize:"26px"}} /></Link></p>
            </div>
        </div> */}
        <div className="upperSection" style={{marginTop:"10px"}}>                
            <p className="note">Complete your KYC to process your credit application.</p>
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