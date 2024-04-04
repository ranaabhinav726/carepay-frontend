import { useState } from 'react'
import Confetti from '../../assets/GIFs/confetti.gif'
// import LogoICICI from '../../assets/GIFs/ICICI_Bank_Logo.png'
// import { FiCheckCircle } from 'react-icons/fi'
import Header from '../Header/Header'
// import StepBar from './comps/StepBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { hideWaitingModal, showWaitingModal } from '../../environment/environment'
import { downloadKfs } from './apis'
const CongratsApprovedKotak = () =>{

    let userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const location = useLocation();
    let data = location?.state?.data;
    let amount = data.loanAmount;
    // const [amount, setAmount] = useState(54000);
    const [loanAmount, ] = useState(Number(amount));

    function downloadKfsAndHandleNavigation(){ // download and save KFS then navigate
        showWaitingModal();
        downloadKfs(userId, hideWaitingModal, ()=>{
            navigate("/patient/FinalConsent", {
                state:{
                    "data" : data,
                }
            })
        })
    }

    return(
        <main style={{display: "flex", flexDirection:"column", alignItems:"center", gap:"1rem"}}>
            <Header progressbarDisplay='none' />
            <div style={{display:"flex", position:"relative", flexDirection:"row", alignItems:"baseline", justifyContent:"space-around", marginTop:"1rem"}}>
                <img src={Confetti} style={{transform:"scaleX(-1)", maxWidth:"25%"}} alt="" />
                <p style={{position:"absolute", fontSize:"24px", lineHeight:"26px", color:"#149540", fontWeight:"700", marginTop:"1rem"}}>Congratulations</p>
                <img src={Confetti} style={{maxWidth:"25%"}} alt="" />
            </div>
            <p>Your credit is <strong style={{color:"#1C8769"}}>approved</strong> for amount</p>
            <div style={{width:'90%', padding:"22px", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"4px", fontSize:"32px", color:"#149540", fontWeight:"700", border:"1px solid #000", background:"#EBFEED", boxShadow:"-4px 6px 0px 0px #514C9F"}}>
                ₹ {loanAmount.toLocaleString('en-IN',{maximumFractionDigits: 2})}
            </div>
            {/* <p style={{textAlign:"center", marginTop:"1rem"}}>ICICI has sent an OTP on your registered mobile number. Enter that OTP in the next step as a final consent.</p> */}
            <p style={{textAlign:"center", marginTop:"1rem"}}>Please click on the button below to download the <strong>Key Fact Statement</strong> and proceed.</p>
            
            {/* <button className="submit" onClick={()=>downloadKfsAndHandleNavigation()}>Continue with OTP</button> */}
            <button className="submit" onClick={()=>downloadKfsAndHandleNavigation()}>
                Download Key Fact Statement
            </button>
        </main>
    )
}

export default CongratsApprovedKotak