import { useState } from 'react'
import Confetti from '../../assets/GIFs/confetti.gif'
import LogoICICI from '../../assets/GIFs/ICICI_Bank_Logo.png'
import { FiCheckCircle } from 'react-icons/fi'
import Header from '../Header/Header'
import StepBar from './comps/StepBar'
const CongratsApprovedICICI = () =>{

    const [amount, setAmount] = useState(54000);
    const [loanAmount, setLoanAmount] = useState(48000);

    return(
        <main style={{display: "flex", flexDirection:"column", alignItems:"center", gap:"1rem"}}>
            <Header progressbarDisplay='none' />
            <StepBar />
            <div style={{display:"flex", position:"relative", flexDirection:"row", alignItems:"baseline", justifyContent:"space-around", marginTop:"1rem"}}>
                <img src={Confetti} style={{transform:"scaleX(-1)", maxWidth:"25%"}} alt="" />
                <p style={{position:"absolute", fontSize:"24px", lineHeight:"26px", color:"#149540", fontWeight:"700", marginTop:"1rem"}}>Congratulations</p>
                <img src={Confetti} style={{maxWidth:"25%"}} alt="" />
            </div>
            <p>Your credit is <strong style={{color:"#1C8769"}}>approved</strong> of amount</p>
            <div style={{width:'90%', padding:"22px", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"4px", fontSize:"32px", color:"#149540", fontWeight:"700", border:"1px solid #000", background:"#EBFEED", boxShadow:"-4px 6px 0px 0px #514C9F"}}>
                ₹ {amount.toLocaleString('en-IN',{maximumFractionDigits: 2})}
            </div>
            <p style={{textAlign:"center"}}>We just need a final consent from you to disburse this amount to the doctor’s account</p>
            
            <button className="submit">Continue with final consent</button>
        </main>
    )
}

export default CongratsApprovedICICI