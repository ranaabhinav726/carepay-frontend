import Header from '../../Header/Header';
import './incomeVerification.scss'

// import { useEffect } from 'react';
// import axios from 'axios';
// import { env } from '../../../environment/environment';

import Statement from '../../../assets/statement.png'
import { useNavigate } from 'react-router-dom';

const IncomeVerification = () =>{
    const navigate = useNavigate();

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
        <div className="upperSection">                
            <p className="note">To verify your income, we need to access your bank statement for the latest 3 months. This data sharing is completely secured and encrypted.</p>
        </div>
        
        <div className="lowerSection">
            <img src={Statement} alt="" />
            <button onClick={()=>navigate('/patient/FileUpload')} className='submit'>Proceed with upload</button>
        </div>

        </main>
    </>
    )
}

export default IncomeVerification