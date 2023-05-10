import './newTenureConfirmation.scss'
import oops from '../../../assets/oops.png'

import Header from '../../Header/Header';
import { useNavigate } from 'react-router-dom';
import { env } from '../../../environment/environment';

import axios from 'axios';

const NewTenureConfirmation = () =>{

    const navigate = useNavigate();

    let newTenure = 4;
    let loanAmt = 10000;
    let emiAmout = loanAmt / newTenure;

    let userId = localStorage.getItem('userId')

    function proceedAndNavigate(){
        axios.post(env.api_Url + "initiateFlow?userId=" + userId + "&type=approved_emi")
        .then(response =>{
            console.log(response)
            if(response.data.status == "200"){
                navigate('/patient/BankDetailsUnderProcess');
            }
        })
    }
    return(
    <>
        <Header progressbarDisplay="none" />

        <main className="newTenureConfirmation">
            <img src={oops} alt="" />
            <p className='line line1'>Looks like according to your credit history we can provide you a loan tenure of only <strong>{newTenure} months</strong>.</p>
            <p className='line line2'>Your new EMI Amount - <strong>Rs. {emiAmout}</strong></p>
            <p className='line line3'>Please confirm if you want to proceed with it.</p>

            <button onClick={()=>proceedAndNavigate()} className='submit'>Yes, proceed</button>
            <button onClick={()=>navigate('/patient/EndApplication')} className='submitOutlined'>Reject my application</button>
        </main>
    </>
    )
}

export default NewTenureConfirmation