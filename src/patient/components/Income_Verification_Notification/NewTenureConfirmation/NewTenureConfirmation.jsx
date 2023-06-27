import './newTenureConfirmation.scss'
import oops from '../../../assets/oops.png'

import Header from '../../Header/Header';
import { useNavigate } from 'react-router-dom';
import { env } from '../../../environment/environment';

import axios from 'axios';
import { useEffect, useState } from 'react';

const NewTenureConfirmation = () =>{

    const navigate = useNavigate();

    // let newTenure = 4;
    const [newTenure, setNewTenure] = useState(0);
    // let loanAmt = 10000;
    const [loanAmt, setLoanAmt] = useState(0);
    let emiAmout = loanAmt / newTenure;

    let userId = localStorage.getItem('userId')

    useEffect(()=>{
        async function getLoanAmount(){
            await axios
            .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=bank_statement_verified", {},)
            .then((response) => {
                console.log(response)
                if(response.data.status === 200){
                    let loanStatus = response.data.data;
                    console.log(loanStatus)
                    if(typeof(loanStatus) === 'object'){ ////////// no. of emi reduction prompt
                        setNewTenure(loanStatus.tenure);
                        setLoanAmt(loanStatus.loanAmount);
                    }else{
                        navigate(-1);
                    }
                }
            })
        }
        getLoanAmount();
    }, [])

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

        <main className="newTenureConfirmation">
        <Header progressbarDisplay="none" />
            <img className='oops' src={oops} alt="" />
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