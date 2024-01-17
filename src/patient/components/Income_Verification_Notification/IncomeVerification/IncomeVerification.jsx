import Header from '../../Header/Header';
import './incomeVerification.scss'

// import { useEffect } from 'react';
// import axios from 'axios';
// import { env } from '../../../environment/environment';

import Statement from '../../../assets/statement.png'
import { useNavigate, useLocation } from 'react-router-dom';

// import { BsArrowRight } from 'react-icons/bs'

const IncomeVerification = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    let isReVisitToUploadStatement = location?.state?.reVisitToUploadStatement;
    let isNtc = location?.state?.isNtc;
    console.log(isReVisitToUploadStatement, isNtc);

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "IncomeVerification"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, [])

    // function clickHandler(){
    //     // console.log("hello")
    //     navigate('/FileUpload');
    // }
    return(
    <>
        <main className='incomeVerification'>
        <Header progressbarDisplay="block" progress="86" canGoBack='/patient/BankDetails' />
        <h3>Bank account statement upload</h3>

        {/* <div className="skipMsg" style={{background:"#ECEBFF", padding:"10px", borderRadius:"4px"}}>
            <p style={{margin:"0"}}>You can skip this step if the required credit amount is less than ₹ 75,000</p>
            <div className="skippable" style={{display:"flex", justifyContent:"flex-end"}}>
                <p style={{fontWeight:"600", margin:"0", color:"rgba(0, 0, 0, 0.8"}}><Link to={'/patient/kycVerification'}>Skip this step <BsArrowRight style={{fontSize:"26px"}} /></Link></p>
            </div>
        </div> */}
        <br />
        <div className="upperSection">
           {isNtc === true ? 
                <p className="note">Since we could not find your credit history, we need to access your bank statement for the latest 3 months.</p> 
                :
                <p className="note">To verify your income, we need to access your bank statement for the latest 3 months. This data sharing is completely secured and encrypted.</p>
           }
        </div>
        
        <div className="lowerSection">
            <img src={Statement} alt="" />
            <button onClick={()=>navigate('/patient/FileUpload', {state : {"reVisitToUploadStatement" : isReVisitToUploadStatement}})} className='submit'>Proceed with upload</button>
        </div>

        </main>
    </>
    )
}

export default IncomeVerification