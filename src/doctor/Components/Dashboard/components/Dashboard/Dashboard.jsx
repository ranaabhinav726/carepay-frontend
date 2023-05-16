import './dashboard.scss'
import Logo from '../../assets/Logo-carepay.webp'
import { RxHamburgerMenu } from 'react-icons/rx'
import { VscSettings } from 'react-icons/vsc'
import { useEffect, useRef, useState } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";

import axios from 'axios'
import knapsack from '../../assets/knapsack.png'
import bulb from '../../assets/bulb.png'

import Faq from '../Common/Faq'
import Help from '../Common/Help'
import Advice from '../Common/Advice'
import SideBar from './SideBar/SideBar'
import { useNavigate } from 'react-router-dom'

import { env } from '../../environment'

const Dashboard = () =>{
    const [section, setSection] = useState('insights');

    
    const navigate = useNavigate()
    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('overlay');
    },[])

    function handleSidebar(){
        if(ref.current) ref.current.classList.add('show');
    }
    return(
        <main className="dashboard">
            <SideBar />
            <div className='header'>
            <div className="header-upper">
                <div className="left">
                    <RxHamburgerMenu onClick={()=>handleSidebar()} className='hamIcon' />
                    <img src={Logo} alt="" />
                </div>
                <button onClick={()=>navigate('/doctor/dashboard/addPatient')}>Add patient</button>
            </div>
            <div className="header-lower">
                <div className="btn-group">
                    <div onClick={()=>setSection("insights")} className={section==="insights"?"insights active":"insights"}>Insights</div>
                    <div onClick={()=>setSection("transactions")} className={section==="transactions"?"transactions active":"transactions"}>Transactions</div>
                </div>
            </div>
        </div>
        {section === "insights"? <Insights /> : <Transactions />}
        <Faq />
        <Help />
        <Advice />
        </main>
    )
}

export default Dashboard

const Insights = () =>{
    const [graphSelector, setGraphSelector] = useState('disbursed')
    const [filter, setFilter] = useState('money');

    const [loans, setLoans] = useState(0);
    const [earnings, setEarnings] = useState(0);

    let doctorId = localStorage.getItem('doctorId') || "";

    useEffect(()=>{
        axios.get(env.api_Url + "loanSummary?doctorId=" + doctorId)
        .then(response => {
            if(response.data.status == "200"){
                console.log(response);
                setLoans(response.data.data.count);
                let earning = response.data.data.disbursed_amount ?? 0;
                setEarnings(earning.toLocaleString('en-IN',{maximumFractionDigits: 2}));
            }
        }).catch(error =>{
            console.log(error)
        })
    }, [])

    useEffect(()=>{
        axios.get(env.api_Url + "/loanCountTrend?doctorId="+ doctorId + "&base=monthly&status=" + graphSelector +"&resultType=" + ((filter==="money")?"sum":""))
        .then(response => {
           if(response.data.status === 200){
               console.log(response);
               setData(response.data.data)
           }
        }).catch(error =>{
           console.log(error);
        })
    }, [filter, graphSelector])

    const [data, setData] = useState([]);

    return(
        <section className="insights">
            <div className="heading">
                <img src={knapsack} alt="" />
                <p>Loan summary</p>
            </div>
            <div className="insights-card">
                <div className="loans">
                    <p className="value">{loans!=0? loans : "No data yet"}</p>
                    <p className="title">Loans</p>
                </div>
                <div className="earning">
                    <p className={earnings!=0? "rupee value" : "value"}>{earnings!=0? earnings : "No data yet"}</p>
                    <p className="title">Earnings</p>
                </div>
            </div>
            <div className="heading">
                <img src={bulb} alt="" />
                <p>Insights</p>
            </div>
            <div className="loanType">
                <span onClick={()=>setGraphSelector('disbursed')} className={graphSelector==="disbursed"?"active":""}>Disbursed</span>
                <span onClick={()=>setGraphSelector('attempted')} className={graphSelector==="attempted"?"active":""}>Attempted</span>
                <span onClick={()=>setGraphSelector('approved')} className={graphSelector==="approved"?"active":""}>Approved</span>
            </div>
            <div className="filters">
                <div className="btn-group">
                    <div onClick={()=>setFilter("money")} className={filter==="money"?"active":""}>Money</div>
                    <div onClick={()=>setFilter("count")} className={filter==="count"?"active":""}>Count</div>
                </div>
                {/* <VscSettings className='icon' /> */}
            </div>
            <div className="graph">
            <ResponsiveContainer width="100%" height={250}>
                <BarChart barCategoryGap={10} data={data} margin={{ top: 20, right: 0, left: -20, bottom: 45 }}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="20%" stopColor="#47438D" stopOpacity={0.9}/>
                            <stop offset="100%" stopColor="#ffffff" stopOpacity={0.6}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" interval={0} angle={-40} textAnchor='end' fontSize={12} />
                    <YAxis dataKey="count" fontSize={12} />
                    <Tooltip cursor={{fill: '#ECEBFF'}} />
                    {/* <Legend /> */}
                    <Bar dataKey="count" fill="url(#colorUv)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </div>
            <p className="note">This graph shows the number of loans <strong>{graphSelector}</strong> successfully each month.</p>

        </section>
    )
}

const Transactions = () =>{
    const navigate = useNavigate();
    const [loanType, setLoanType] = useState('all-Loans')

    const [loanData, setLoanData] = useState([]);

    let doctorId = localStorage.getItem('doctorId') || "";

    useEffect(()=>{
        axios.get(env.api_Url + "getAllLoansByDoctorId?doctorId=" + doctorId + "&status=" + loanType +"&pageNo=1&noOfEntry=3")
        .then(response =>{
            if(response.data.status === 200){
                console.log(response);
                setLoanData(response.data.data);
            }
        })
    }, [loanType])

    let trsxns = loanData.map((loan, idx)=>{
        let date = new Date(loan.apply_date);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return <TrxnCard key={idx} day={date.getDate()} month={months[date.getMonth()]} amount={loan.loan_amount} status={loan.loan_sanction_status} name={loan.first_name} purpose={loan.loan_reason} />
    })
    return(
        <section className="transactions">
            <div className="loanType">
                <span onClick={()=>setLoanType('all-Loans')} className={loanType==="all-Loans"?"active":""}>All loans</span>
                <span onClick={()=>setLoanType('disbursed')} className={loanType==="disbursed"?"active":""}>Disbursed</span>
                <span onClick={()=>setLoanType('approved')} className={loanType==="approved"?"active":""}>Approved</span>
            </div>

            {/* <TrxnCard day={"14"} month={"Apr"} amount={80000} status={"In Approval"} name={"Vikas Gupta"} purpose={"R.C.T"} />
            <TrxnCard day={"14"} month={"Apr"} amount={80000} status={"In Approval"} name={"Vikas Gupta"} purpose={"R.C.T"} />
            <TrxnCard day={"14"} month={"Apr"} amount={80000} status={"In Approval"} name={"Vikas Gupta"} purpose={"R.C.T"} /> */}
        
        {trsxns}
            
        {(loanData.length >= 3) && <div onClick={()=>navigate('/doctor/dashboard/AllTransactions')} className="viewAll">View all</div>}        </section>
    )
}

const TrxnCard = ({day, month, amount, status, name, purpose}) =>{

    return(
        <div className="transaction">
                <div className="date"><p className='day'>{day}</p><p className='month'>{month}</p></div>
                <div className="transactionCard">
                    <div className="upper">
                        <div className="left">
                            <p className="amount">{amount.toLocaleString('en-IN',{maximumFractionDigits: 2})}</p>
                            <p className="title">Loan amount</p>
                        </div>
                        <div className="right">
                            <p className="badge">{status}</p>
                            <p className="title">Loan status</p>
                        </div>
                    </div>
                    <div className="lower">
                        <div className="left">
                            <p className="userName">{name}</p>
                            <p className="title">Patient name</p>
                        </div>
                        <div className="right">
                            <p className="purpose">{purpose}</p>
                            <p className="title">Purpose</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}