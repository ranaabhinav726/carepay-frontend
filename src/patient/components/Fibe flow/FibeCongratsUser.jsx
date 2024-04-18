import { Header } from "./Comps/Header";
import CongratsICICIImg from '../../assets/GIFs/CongratsICICI.png'
import { useState } from "react";
import { MdOutlineElectricBolt } from 'react-icons/md'
import './styles.scss'
import { useNavigate } from "react-router-dom";
import Confetti from '../../assets/GIFs/confetti.gif'
export default function FibeCongratsUser(){

    // const [amount, setAmount] = useState(55000);
    // const [creditId, setCreditId] = useState("XXXXXXXXXX")
    // const navigate = useNavigate();

    return(
        <main className="screenContainer" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Header progressBar="hidden" />
            {/* <img src={CongratsICICIImg} alt="Congratulations" style={{maxWidth:"80%"}} /> */}
            <div style={{display:"flex", position:"relative", flexDirection:"row", alignItems:"baseline", justifyContent:"space-around", margin:"1rem 0"}}>
                <img src={Confetti} style={{transform:"scaleX(-1)", maxWidth:"25%"}} alt="" />
                <p style={{position:"absolute", fontSize:"24px", lineHeight:"26px", color:"#149540", fontWeight:"700", marginTop:"1rem"}}>Congratulations</p>
                <img src={Confetti} style={{maxWidth:"25%"}} alt="" />
            </div>
            <p style={{marginTop:"2rem", padding:"0 2rem", textAlign:"center"}}>Your credit has been processed successfully. The amount will be credited to the doctor’s bank account shortly.</p>
            <div style={{background:"#EBFEED", padding:"16px 2rem", textAlign:"center", marginTop:"1rem"}}>
                {/* <p style={{margin:"1rem 0"}}>Credit ID : {creditId}</p> */}
                <p>Our executive will call you to take a final confirmation for disbursal of your credit to the doctor’s account</p>
            </div>
            {/* <p style={{fontSize:"16px", color:"#000000CC", fontWeight:"700", marginTop:"2rem"}}>To track your EMIs</p>
            <button style={{marginTop:"32px"}} onClick={()=>navigate('/patient/UserDashboard')} className="submit">Go to Dashboard</button> */}
        </main>
    )
}