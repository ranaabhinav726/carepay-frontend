import Header from '../../Header/Header';
import './emandate.scss'

import { useEffect } from 'react';
import axios from 'axios';
import { env } from '../../../environment/environment';

import EmandateIcon from '../../../assets/emandate.png'
import { useNavigate } from 'react-router-dom';


const Emandate = () =>{
    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "Emandate"
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
        <main className='emandate'>
        <Header progressbarDisplay="block" progress="98" />
        <h3>E- Mandate</h3>
        <div className="upperSection">   
        <p className="note">E-Mandate allows the lender to auto-debit the EMI amount from your bank account. This will ensure timely repayment of your credit and improve your credit score.</p>             
        <br/>
        <p className="note">You will be redirected to our partner’s platform<br/>for E-mandate.</p>
        </div>

        <div className="lowerSection">
            <img src={EmandateIcon} alt="" />
            <button onClick={()=>navigate('/patient/EmandateRedirection')} className='submit'>Proceed</button>
        </div>

        </main>
    </>
    )
}

export default Emandate