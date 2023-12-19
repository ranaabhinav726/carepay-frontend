import Header from '../../Header/Header';
import './congratulation.scss'

// import CongratsImg from '../../../assets/congrats.png'
import CongratsGIF from '../../../assets/GIFs/Congratulations.gif'
import CreditFair from '../../../assets/creditFair.png'
import { useNavigate } from 'react-router-dom';
import { showWrapper, hideWrapper } from "../../../environment/environment";
import { env } from '../../../environment/environment';
import { BiRupee } from 'react-icons/bi';
import { MdOutlineElectricBolt } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

    // let refID = localStorage.getItem("new_reference_id") || "FGDTH12345RR";


const Congrats = () =>{
    const navigate = useNavigate()
    // let amount = localStorage.getItem("new_limit") || "0";
    let userId = localStorage.getItem('userId');
    let email = localStorage.getItem('email')
    let number = localStorage.getItem('phoneNumber');
    const [amount, setAmount] = useState("0");
    // amount = parseInt(amount).toLocaleString('en-IN');

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');

        axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
            .then(async(response) => {
                console.log(response)
                if(response.data.message === "success"){
                    // console.log(response)
                    let data = response?.data?.data;
                    let amt = parseInt(data.amount).toLocaleString('en-IN');
                    setAmount(amt);
                }
            }).catch(error =>{
                console.log(error)
            })
    },[])

    async function checkStatus(){
        showWrapper(ref.current)
        await axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
            .then(async(response) => {
                console.log(response)
                if(response.data.message === "success"){
                    // console.log(response)
                    let data = response?.data?.data;
                    let amt = parseInt(data.amount).toLocaleString('en-IN');
                    setAmount(amt);
                    if(data.loan_status === "107"){
                        navigate('/patient/loanAppSuccessful')
                    }
                }
            }).catch(error =>{
                console.log(error)
            })
            hideWrapper(ref.current)
    }

    return(
    <>
        <main className='congrats'>
        <Header progressbarDisplay="none"/>
            <p className='title'>Congratulations!</p>
            <img src={CongratsGIF} alt="" />
            {/* <div className="card">
                    <p className="referenceID">Reference ID : {refID}</p>
                    <p className="congrats">Congratulations!<br />Your approved credit limit* is</p>
                    <div className="amount"><BiRupee />{amount}</div>
            </div> */}
            <p className='subtitle'>Your credit application is <span style={{color:"#149540"}}>approved</span> for</p>
            <div style={{width:"90%", color: "#149540", height:"max-content", padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", fontWeight:"700", borderRadius:"4px", border:"1px solid #000", background:"#EBFEED", boxShadow:"-4px 6px 0px 0px #514C9F"}}>
                <BiRupee /> {amount}
            </div>
            <div style={{padding:"10px 16px", lineHeight:"150%", textAlign:"center", background:"#ECEBFF", margin:"2rem 0"}}>
                <p>Our lending partner CreditFair</p> 
                <img src={CreditFair} style={{maxWidth:"40%", margin:"12px 0"}} alt="" />
                <p>has sent an SMS and email to your registered 
                contact number <strong>{number}</strong>.
                </p>
                <p>Please check the message to complete 
                your credit application process.</p>
            </div>
            <div className='stepCard' style={{background:"#FAE1CD"}}>
                <p style={{fontWeight:"700"}}>You are now just 4 quick steps away from your treatment.</p>
                <ul>
                    <li><div className='encircle'>1</div><span className='v-line'></span><div className="stepName">KYC <span><MdOutlineElectricBolt className='boltIcon' /> Takes 30 seconds</span></div></li>
                    <li><div className='encircle'>2</div><span className='v-line'></span><div className="stepName">Agreement e-signing <span><MdOutlineElectricBolt className='boltIcon' /> Takes 20 seconds</span></div></li>
                    <li><div className='encircle'>3</div><span className='v-line'></span><div className="stepName">Advance EMI payment <span><MdOutlineElectricBolt className='boltIcon' /> Takes 40 seconds</span></div></li>
                    <li><div className='encircle'>4</div><div className="stepName">e-NACH Mandate <span><MdOutlineElectricBolt className='boltIcon' /> Takes 40 seconds</span></div></li>
                </ul>
                <p>No paperwork needed, this is completely a digital process.</p>
            </div>
            <button onClick={()=>checkStatus()} className='submit'>Proceed</button>
        </main>
    </>
    )
}

export default Congrats