import './userDashboard.scss'

import { NavLink, useNavigate } from 'react-router-dom'

import Logo from '../../../assets/Logo-carepay.svg'
import LogoWhite from '../../../assets/Carepay-white.png'
import supportIcon from '../../../assets/headphones.png'
import hamburgerIcon from '../../../assets/hamburger.png'

import { BiRupee } from 'react-icons/bi'
import { BsShareFill } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { MdFileDownload } from 'react-icons/md'

import { useEffect, useState } from 'react'
import { useAuth } from '../../auth'

import axios from 'axios'
import { env } from '../../../environment/environment'


const UserDashboard = () =>{

    const [username, setUsername] = useState('');
    const [totalLoanAmt, setTotalLoanAmt] = useState('');
    const [tenure, setTenure] = useState('');
    const [nextInstalment, setNextInstalment] = useState('');
    const [nextInstalmentDate, setNextInstalmentDate] = useState('');
    const [disbursedDate, setDisbursedDate] = useState('');
    const [totalDueAmount, setTotalDueAmount] = useState('');
    const [EMIsPaid, setEMIsPaid] = useState('');

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
//

    let userId = localStorage.getItem("userId");
    useEffect(()=>{
        axios
        .get(env.api_Url + "userDetails/getUserDetailsByUserId?userId=" + userId)
        .then((response) => {
            if(response.data.status == "200"){
                let data = response.data.data.firstName;
                setUsername(data)
            }
        }).catch(error => {
            console.log(error);
        });
})
    useEffect(()=>{
            axios
            .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
            .then((response) => {
                if(response.data.status == "200"){
                    let status = response.data.data[0];
                    console.log(status)
                    filterdate(status.tenure_date);
                    // setUsername(sanitizeName(status.username));
                    setTotalLoanAmt(status.amount);
                    nextInstalmentDetails(status.emi_details)
                    setTotalDueAmount(status.due_amount)
                    // balanceDue(status.emi_details)
                    setTenure((status.tenure==="E3") ? 3 : 6)
                }else{
                    // navigate(-1)
                }
            }).catch(error => {
                console.log(error);
                // navigate(-1)
            });
    })

    // function fetchDashboardDetails(){
        // useEffect(()=>{
        //     axios
        //     .post(env.api_Url + "dashboard_detail", {},
        //         config)
        //     .then((response) => {
        //         let responseCode = response.status+"";
        //         if(responseCode[0] == '2'){
        //             let status = response.data.data[0];
        //             console.log(status)
        //             filterdate(status.loan_applied_create_date);
        //             setUsername(sanitizeName(status.username));
        //             setTotalLoanAmt(status.total_credit_amount);
        //             nextInstalmentDetails(status.emi_details)
        //             balanceDue(status.emi_details)
        //             setTenure(status.tenure)
        //         }
        //     }).catch(error => {
        //         console.log(error);
        //     });
        // }, [])
    // }

    function filterdate(loanDate){
        let date = new Date(loanDate);
        let parts = [];
        parts.push(date.getDate()); parts.push(date.getMonth()+1); parts.push(date.getFullYear());
        let hours = date.getHours();
        let meridiem = "AM";

        if(hours > 12){
            meridiem = "PM";
            hours -= 12;
        }
        if(hours < 10) hours = "0" + hours;

        let time = hours + ":" + date.getMinutes() + " " + meridiem;
        date = parts.join("/");
        setDisbursedDate(date + ", " + time);
    }
    function nextInstalmentDetails(emis){
        let paidMonths = 1;
        for(let i=0; i<emis.length; i++){
            if(emis[i].status == "PAID") paidMonths++;

            if(emis[i].status == "UNPAID"){
                setNextInstalment(emis[i].repayment_amount);
                let date = emis[i].repayment_date;
                date = date.split("-").reverse().join("/");
                setNextInstalmentDate(date);
                // setTotalDueAmount(emis[i].balance_due);
                break;
            }
        }

        setEMIsPaid(paidMonths);
    }

    function balanceDue(emis){
        let balanceDue = 0;
        for(let i=0; i<emis.length; i++){
            if(emis[i].status == "UNPAID"){
                balanceDue += emis[i].balance_due;
            }
        }
        setTotalDueAmount(balanceDue);
    }

    function sanitizeName(name){
        name = name.split("-")[0];
        let parts = name.split(" ");
        parts.forEach((part, idx)=>{
            part = part.toLowerCase();
            let sanitized = part.charAt(0).toUpperCase() + part.slice(1);
            parts[idx] = sanitized;
        });
        // console.log(parts)
        return parts.join(" ");
    }

    const [menuState, setMenuState] = useState(false);

    function showMenu(){
        setMenuState(true);
    }
    function hideMenu(){
        setMenuState(false);
    }

    const auth = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () =>{
        auth.logout();
        localStorage.clear();
        navigate('/')
    }

    // let userName = "Vikas Gupta."
    

    return(
    <>
        <main className='userDashboard'>
            <div className='dashboard'>
                <img onClick={showMenu} className='hamburgerIcon' src={hamburgerIcon} alt="" />
                <img className="header-logo" src={Logo}></img>
                <div className="help">
                    Help
                    <img src={supportIcon} alt="" />
                </div>
            </div>

            <p className='username'>Hi! {username}.</p>
            <p>Your current credit plan:</p>

            <div className="currPlanCard">
                <div className="upper">
                    <div className="loanAmt">
                        <span><BiRupee /> {totalLoanAmt.toLocaleString('en-IN')}</span>
                        <p>Total credit amount</p>
                    </div>
                    <div className="tenure">
                        <span>{tenure} months</span>
                        <p>Tenure</p>
                    </div>
                </div>
                <div className="middle">
                    <div className="DueAmt">
                        <span><BiRupee /> {nextInstalment.toLocaleString('en-IN')}</span>
                        <p>Next instalment</p>
                    </div>
                    <div className="nextInst">
                        <span>{nextInstalmentDate}</span>
                        <p>Date</p>
                    </div>
                </div>
                <div className="lower">
                    <p className="emiPaid">{EMIsPaid}/{tenure} EMIs paid</p>
                    <TenureBar paid={EMIsPaid} total={tenure} />
                </div>

                <button className='payInst'>Pay next instalment</button>

                <div className='loanDetails'>
                    <span>Loan disbursed on</span><span className='bold'>{disbursedDate}</span>
                </div>
                <div className='loanDetails'>
                    <span>Total due amount</span><span className='bold'><BiRupee style={{margin:"0 -2px -3px 0"}} />{totalDueAmount}</span>
                </div>
            </div>

            <div className="myTransactions">
                <h3>My Transactions</h3>

                {/* <TrnsCard status="Paid"/>
                <TrnsCard status="Failed" />
                <TrnsCard status="Paid"/> */}
            </div>

            <div className="contactSupport">
                <span>Contact support</span>
            </div>

            <div className="loanAgreement">
                <span>Loan agreement download</span>
                <MdFileDownload className='download' />
            </div>

            <div className={menuState?"menu show" : "menu"}>
                <div className="top">
                    <img src={LogoWhite} alt="" />
                    <GrClose onClick={hideMenu} className='close' />
                </div>

                <nav>
                    {/* <NavLink to=''>Dashboard</NavLink>
                    <NavLink to=''>Pay Instalment</NavLink>
                    <NavLink to=''>Contact Support</NavLink> */}

                    <ul>
                        <li className='active'>Dashboard</li>
                        <li >Pay Instalment</li>
                        <li>Contact Support</li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>

                </nav>
            </div>
            
        </main>

        
    </>
    )
}

const TenureBar = ({paid, total}) =>{
    // const [Paid, setPaid] = useState(0);
    return(
        <div className="tenureBar">
            <div className={paid > 0 ? 'bar f' : "bar"}></div>
            <div className={paid > 1 ? 'bar f' : "bar"}></div>
            <div className={paid > 2 ? 'bar f' : "bar"}></div>
            
            {total>3 && 
                <>
                    <div className={paid > 3 ? 'bar f' : "bar"}></div>
                    <div className={paid > 4 ? 'bar f' : "bar"}></div>
                    <div className={paid > 5 ? 'bar f' : "bar"}></div>
                </>
            }

            
        </div>
    )
}
const TrnsCard = ({status}) =>{
    let trxnDate = "12/05/22";
    let trxnTime = "04:55";
    let trxnStatus = status;

    let trxnID = "TRSC675423AA";
    let trxnAmt = "30,000";

    let statusStyle = {
        color:"#1C8769",
        background:"#CFE5DF"
    };

    if(status == "Failed"){
        statusStyle.color = "#DF4759";
        statusStyle.background = "#FFE8EA";
    }
    return(
        <div className="transxCard">
            <div className="head">
                <div className="timestamp">{trxnDate} {trxnTime} <span className='status' style={statusStyle}>{trxnStatus}</span></div>
                <span className='share-btn'>Share <BsShareFill /></span>
            </div>
            <div className="transaction">
                <div className="trxnID">
                    <span>{trxnID}</span>
                    <p>Transaction ID</p>
                </div>
                <div className="trxnAmt">
                    <span>{trxnAmt}</span>
                    <p>Amount</p>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard