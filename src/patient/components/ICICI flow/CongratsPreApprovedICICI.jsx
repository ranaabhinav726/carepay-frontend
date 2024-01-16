import { useState } from 'react'
import Confetti from '../../assets/GIFs/confetti.gif'
import LogoICICI from '../../assets/GIFs/ICICI_Bank_Logo.png'
import { FiCheckCircle } from 'react-icons/fi'
import Header from '../Header/Header'
const CongratsPreApprovedICICI = () =>{

    const [amount, setAmount] = useState(54000);
    const [loanAmount, setLoanAmount] = useState(48000);

    return(
        <main style={{display: "flex", flexDirection:"column", alignItems:"center", gap:"1rem"}}>
            <Header progressbarDisplay='none' />
            <div style={{display:"flex", position:"relative", flexDirection:"row", alignItems:"baseline", justifyContent:"space-around", marginTop:"1rem"}}>
                <img src={Confetti} style={{transform:"scaleX(-1)", maxWidth:"25%"}} alt="" />
                <p style={{position:"absolute", fontSize:"24px", lineHeight:"26px", color:"#149540", fontWeight:"700", marginTop:"1rem"}}>Congratulations</p>
                <img src={Confetti} style={{maxWidth:"25%"}} alt="" />
            </div>
            <p>You have a pre-approved credit limit of</p>
            <div style={{width:'90%', padding:"22px", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"4px", fontSize:"32px", color:"#149540", fontWeight:"700", border:"1px solid #000", background:"#EBFEED", boxShadow:"-4px 6px 0px 0px #514C9F"}}>
                ₹ {amount.toLocaleString('en-IN',{maximumFractionDigits: 2})}
            </div>
            <p>by</p>
            <img src={LogoICICI} alt="ICICI Logo" />
            <div style={{width:'100%',display:"flex", alignItems:"row", justifyContent:"center", gap:"1rem", padding:"10px", borderRadius:"8px", background:"#ECEBFF", color:"#514C9F"}}>
                <FiCheckCircle style={{fontSize:"30px", margin:"auto"}} />
                <p>Your required credit amount <strong>₹{loanAmount.toLocaleString('en-IN',{maximumFractionDigits: 2})}</strong> is in the approved limit</p>
            </div>
            <button className="submit">Continue with ICICI bank</button>
        </main>
    )
}

export default CongratsPreApprovedICICI