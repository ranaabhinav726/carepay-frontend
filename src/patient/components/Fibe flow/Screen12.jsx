import { Header } from "./Comps/Header";
import CongratsICICIImg from '../../assets/GIFs/CongratsICICI.png'
import { useEffect, useState } from "react";
import { MdOutlineElectricBolt } from 'react-icons/md'
import './styles.scss'
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from '../../assets/GIFs/confetti.gif'
import axios from "axios";
export default function Screen12(){


    const location = useLocation();
    // console.log(location?.state?.data?.bitlyUrl);
    let bitlyUrl = location?.state?.data?.bitlyUrl;
    
    const [amount, setAmount] = useState("0");
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(location.state){
            setAmount(location?.state?.loanAmount);
        }
    }, [])

    // useEffect(()=>{
    //     if(!! userId){
    //         axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
    //         .then(response =>{
    //             if(response?.data.status === 200){
    //                 let data = response?.data?.data;
    //                 if(!! data){
    //                     setAmount(data?.loanAmount);
    //                 }
    //             }
    //         })
    //     }

    // },[userId])

    return(
        <main className="screenContainer" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Header progressBar="hidden" />
            {/* <img src={CongratsICICIImg} alt="Congratulations" style={{maxWidth:"80%"}} /> */}
            <div style={{display:"flex", position:"relative", flexDirection:"row", alignItems:"baseline", justifyContent:"space-around", marginTop:"1rem"}}>
                <img src={Confetti} style={{transform:"scaleX(-1)", maxWidth:"25%"}} alt="" />
                <p style={{position:"absolute", fontSize:"24px", lineHeight:"26px", color:"#149540", fontWeight:"700", marginTop:"1rem"}}>Congratulations</p>
                <img src={Confetti} style={{maxWidth:"25%"}} alt="" />
            </div>
            <p>Your credit application is <strong style={{color:"#1C8769"}}>approved</strong> for</p>
            <div style={{width:'90%', padding:"22px", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"4px", fontSize:"32px", color:"#149540", fontWeight:"700", border:"1px solid #000", background:"#EBFEED", boxShadow:"-4px 6px 0px 0px #514C9F", margin:"1rem "}}>
                ₹ {amount.toLocaleString('en-IN',{maximumFractionDigits: 2})}
            </div>
            <div className='stepCard' style={{background:"#FAE1CD", marginTop:'2rem'}}>
                <p style={{fontWeight:"700"}}>You are now just 4 quick steps away from your treatment.</p>
                <ul>
                    <li><div style={{padding: "3px 7px"}} className='encircle'>1</div><span className='v-line'></span><div className="stepName">KYC <span><MdOutlineElectricBolt className='boltIcon' /> Takes 30 seconds</span></div></li>
                    <li><div className='encircle'>2</div><span className='v-line'></span><div className="stepName">Agreement e-signing <span><MdOutlineElectricBolt className='boltIcon' /> Takes 20 seconds</span></div></li>
                    <li><div className='encircle'>3</div><span className='v-line'></span><div className="stepName">Advance EMI payment <span><MdOutlineElectricBolt className='boltIcon' /> Takes 40 seconds</span></div></li>
                    <li><div className='encircle'>4</div><div className="stepName">e-NACH Mandate <span><MdOutlineElectricBolt className='boltIcon' /> Takes 40 seconds</span></div></li>
                </ul>
                <p>No paperwork needed, this is completely a digital process.</p>
            </div>
            <button style={{marginTop:"32px"}} onClick={()=>navigate("/patient/screen13", {state : {"link" : bitlyUrl}})} className="submit">Continue</button>
        </main>
    )
}