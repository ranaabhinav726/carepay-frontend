import Header from '../../Header/Header';
import './firstPaymentScreen.scss'

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { env } from '../../../environment/environment';

import { BiRupee } from 'react-icons/bi';
import { MdArrowForwardIos } from 'react-icons/md'
import secured from '../../../assets/secured.png'

const FirstPaymentScreen = () =>{

    const navigate = useNavigate();

    const [today, setToday] = useState();
    const [tenure, setTenure] = useState();
    const [loanAmt, setLoanAmt] = useState();


    //////////////code to fetch date's date//////////////////
    

    // console.log(date);
    //////////////////////////////////////////////////////////

    let userId = localStorage.getItem("userId");
    useEffect(()=>{
        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        date = dd + '/' + mm + '/' + yyyy;
        setToday(date);

        axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
        .then(response =>{
            console.log(response);
            if(response.data.status == "200"){
                setLoanAmt(response.data.data.loanAmount)
                setTenure(response.data.data.loanEmi)
            }
        })
    }, [])

    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }

    let EmiAmt = loanAmt/tenure;
    // EmiAmt = Math.round((EmiAmt) * 100) / 100
    EmiAmt = roundToTwo(EmiAmt);
    console.log(EmiAmt)
    EmiAmt = EmiAmt.toLocaleString('en-IN',{maximumFractionDigits: 2});

    // function func(){
    //     console.log("hh")
    //     navigate('/PGRedirection')
    // }
    return(
        <>
        <main className='firstPayment'>
        <Header progressbarDisplay="block" progress="99" canGoBack='/patient/EmandateUnderProcess' />
            <h3>1st Instalment</h3>

            <p className='subheading'>Please pay the 1st instalment now, to proceed with disbursal of your loan of Rs. {loanAmt}</p>

            <div className="msgBox">
                <div className="line line1">
                    <p className="title">1st EMI pay date</p>
                    <p className="value">{today}</p>
                </div>
                <div className="line line2">
                    <p className="title">First EMI</p>
                    <p className="value"><BiRupee style={{marginBottom:"-2.5px"}} /><strong>{EmiAmt}</strong></p>
                </div>
                <div className="line line3">
                    <p className="title">Tenure</p>
                    <p className="value">{tenure} months</p>
                </div>
            </div>
            <img src={secured} alt="" />

            <div onClick={()=>navigate('/patient/PGRedirection')} className="paymentBar">
                <span>Rs. {EmiAmt}</span>
                <strong>MAKE PAYMENT <MdArrowForwardIos /></strong>
            </div>

        </main>
        </>
    )
}

export default FirstPaymentScreen