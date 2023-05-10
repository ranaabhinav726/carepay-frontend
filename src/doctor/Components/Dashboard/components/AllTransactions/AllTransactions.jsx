import { useEffect, useState } from 'react'
import './allTransactions.scss'
import { BsArrowLeft } from 'react-icons/bs'
import {SlOptionsVertical } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { env } from '../../environment'
const AllTransactions = () =>{
    const [loanType, setLoanType] = useState('all-Loans')

    const navigate = useNavigate();

    const [loanData, setLoanData] = useState([]);
    let doctorId = localStorage.getItem('doctorId') || "";

    useEffect(()=>{
        axios.get(env.api_Url + "getAllLoansByDoctorId?doctorId=" + doctorId + "&status=" + loanType + "&pageNo=1&noOfEntry=100")
        .then(response =>{
            if(response.data.status === 200){
                console.log(response);
                setLoanData(response.data.data);
            }
        })
    }, [loanType])

    let trsxns = loanData.map((loan)=>{
        let date = new Date(loan.apply_date);
        let loanDate = date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();
        return <Loan id={loan.user_id} date={loanDate} loanId={loan.loan_id} patientName={loan.first_name} amount={loan.loan_amount} status={loan.loan_sanction_status} purpose={loan.loan_reason} />
    })
    return(
        <main className="allTransactions">
            <div className="header">
                <BsArrowLeft onClick={()=>navigate(-1)} className='icon' />
                <span>All transactions</span>
            </div>
            <div className="loanType">
                <span onClick={()=>setLoanType('all-Loans')} className={loanType==="all-Loans"?"active":""}>All loans</span>
                <span onClick={()=>setLoanType('disbursed')} className={loanType==="disbursed"?"active":""}>Disbursed</span>
                <span onClick={()=>setLoanType('approved')} className={loanType==="approved"?"active":""}>Approved</span>
            </div>
            <hr />
            {/* <Loan date="14/04/2023" loanId="123456789" patientName="Deepak Joshi" amount={40000} status="Approval" purpose="R.C.T" />
            <Loan date="14/04/2023" loanId="123456789" patientName="Deepak Joshi" amount={40000} status="Approval" purpose="R.C.T" /> */}
            {trsxns}

        </main>
    )
}

export default AllTransactions

const Loan = ({date, loanId, patientName, amount, status, purpose}) =>{

    return(
        <div className="loan">
            <div className="head">
                <span className="timeStamp">{date}</span>
                <span className="loanId">Loan ID : {loanId} <SlOptionsVertical className='options' /></span>
            </div>
            <hr />
            <div className="loanDetail">
                <span className="title">Patient name</span>
                <span className="value">{patientName}</span>
            </div>
            <div className="loanDetail">
                <span className="title">Amount</span>
                <span className="value amount">{amount.toLocaleString('en-IN',{maximumFractionDigits: 2})}</span>
            </div>
            <div className="loanDetail">
                <span className="title">Loan status</span>
                <span className="value">{status}</span>
            </div>
            <div className="loanDetail">
                <span className="title">Loan purpose</span>
                <span className="value">{purpose}</span>
            </div>
        </div>
    )
}