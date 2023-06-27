import Header from '../../Header/Header';
import './loanAgreement.scss'

import { useEffect } from 'react';
import axios from 'axios';
import { env } from '../../../environment/environment';

import Agreement from '../../../assets/Loan agreement.png'
import { useNavigate } from 'react-router-dom';


const LoanAgreement = () =>{

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "LoanAgreement"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, [])

    const navigate = useNavigate()
    return(
    <>
        <main className='loanAgreement'>
        <Header progressbarDisplay="block" progress="90" />
        <h3>Credit Agreement</h3>
        <div className="upperSection">                
            <p className="note">You will be redirected to our lending partner’s<br/>platform to sign the credit agreement.<br/><br/>Read the agreement carefully, scroll the<br />agreement till the end and then sign it via an OTP<br/>verification.</p>
        </div>

        <div className="lowerSection">
            <img src={Agreement} alt="" />
            
            <button onClick={()=>navigate('/patient/LoanRedirection')} className='submit'>Proceed</button>
        </div>

        </main>
    </>
    )
}

export default LoanAgreement