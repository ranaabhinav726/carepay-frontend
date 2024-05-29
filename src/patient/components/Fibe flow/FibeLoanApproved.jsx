import { Header } from "./Comps/Header";
import { useEffect, useState } from "react";
import { MdOutlineElectricBolt } from 'react-icons/md'
import './styles.scss'
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from '../../assets/GIFs/confetti.gif'
import axios from "axios";
import { env } from "../../environment/environment";
export default function FibeLoanApproved() {


    const location = useLocation();
    // console.log(location?.state?.data?.bitlyUrl);
    let bitlyUrl = location?.state?.data?.bitlyUrl;
    let userId = localStorage.getItem('userId')
    const [amount, setAmount] = useState("0");
    const [fibeBitlyUrl, setbitlyUrl] = useState("0");

    const navigate = useNavigate();

    useEffect(() => {
        // if(location.state){
        //     setAmount(location?.state?.loanAmount);
        // }
        axios.get(env.api_Url + "getLoanApprovedDetailForUser?userId=" + userId + '&type=FIBE')
            .then(response => {
                console.log(response.data.data)
                if (response.data.message === "success") {
                    setbitlyUrl(response.data.data.fibeBitlyUrl)
                    setAmount(response.data.data.loanAmount)

                }


            })
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

    return (
        <main className="screenContainer" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Header progressBar="hidden" />
            {/* <img src={CongratsICICIImg} alt="Congratulations" style={{maxWidth:"80%"}} /> */}
            <div style={{ display: "flex", position: "relative", flexDirection: "row", alignItems: "baseline", justifyContent: "space-around", marginTop: "1rem" }}>
                <img src={Confetti} style={{ transform: "scaleX(-1)", maxWidth: "25%" }} alt="" />
                <p style={{ position: "absolute", fontSize: "24px", lineHeight: "26px", color: "#149540", fontWeight: "700", marginTop: "1rem" }}>Congratulations</p>
                <img src={Confetti} style={{ maxWidth: "25%" }} alt="" />
            </div>
            <p>Your credit application is <strong style={{ color: "#00A1A0" }}>approved</strong> for</p>
            <div style={{ width: '90%', padding: "22px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", fontSize: "32px", color: "#149540", fontWeight: "700", border: "1px solid #000", background: "#EBFEED", boxShadow: "-4px 6px 0px 0px #514C9F", margin: "1rem " }}>
                ₹ {amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </div>
            <div className='stepCard' style={{ background: "#DFEEEC", marginTop: '2rem' }}>
                <p style={{ fontWeight: "700" }}>You are now just 5 quick steps away from your treatment.</p>
                <ul>
                    <li><div style={{ padding: "3px 7px" }} className='encircle'>1</div><span className='v-line'></span><div className="stepName"><span className="step">Complete your profile </span><span><MdOutlineElectricBolt className='boltIcon' /> Takes 20 seconds</span></div></li>
                    <li><div className='encircle'>2</div><span className='v-line'></span><div className="stepName"><span className="step">Complete KYC </span><span><MdOutlineElectricBolt className='boltIcon' /> Takes 30 seconds</span></div></li>
                    <li><div className='encircle'>3</div><span className='v-line'></span><div className="stepName"><span className="step">Share bank details and setup auto-debit </span><span><MdOutlineElectricBolt className='boltIcon' /> Takes 40 seconds</span></div></li>
                    <li><div className='encircle'>4</div><span className='v-line'></span><div className="stepName"><span className="step">Select EMI plan </span><span><MdOutlineElectricBolt className='boltIcon' /> Takes 30 seconds</span></div></li>
                    <li><div className='encircle'>5</div><div className="stepName"><span className="step">Give consent to disburse </span><span><MdOutlineElectricBolt className='boltIcon' /> Takes 10 seconds</span></div></li>
                </ul>
                <p style={{ margin: "0" }}>No paperwork needed, this is completely a digital process.</p>
                {fibeBitlyUrl !== '' ? <a href={fibeBitlyUrl} target="_blank">
                    <button style={{ background: "#00A1A0" }} className="submit">Continue</button>
                </a> : ""}
            </div>
        </main>
    )
}