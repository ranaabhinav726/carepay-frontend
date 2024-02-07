import Header from '../../Header/Header';
import '../../Income_Verification_Notification/Congratulation/congratulation.scss'
import Confetti from '../../../assets/GIFs/confetti.gif'
// import CongratsImg from '../../../assets/congrats.png'
import CongratsGIF from '../../../assets/GIFs/Congratulations.gif'
import { useNavigate } from 'react-router-dom';
import { showWrapper, hideWrapper } from "../../../environment/environment";
import { env } from '../../../environment/environment';
import { BiRupee } from 'react-icons/bi';
// import { MdOutlineElectricBolt } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IoIosStar } from "react-icons/io";
    // let refID = localStorage.getItem("new_reference_id") || "FGDTH12345RR";


const CfApproved = () =>{
    const navigate = useNavigate()
    // let amount = localStorage.getItem("new_limit") || "0";
    let userId = localStorage.getItem('userId');
    // let email = localStorage.getItem('email')
    const [number, ] = useState(localStorage.getItem('phoneNumber'))
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

    return(
    <>
        <main className='congrats'>
        <Header progressbarDisplay="none"/>
            <div style={{display:"flex", position:"relative", flexDirection:"row", alignItems:"baseline", justifyContent:"space-around", marginTop:"1rem"}}>
                <img src={Confetti} style={{transform:"scaleX(-1)", maxWidth:"25%"}} alt="" />
                <p style={{position:"absolute", fontSize:"24px", lineHeight:"26px", color:"#149540", fontWeight:"700", marginTop:"1rem"}}>Congratulations</p>
                <img src={Confetti} style={{maxWidth:"25%"}} alt="" />
            </div>

            <p className='subtitle'>You are <span style={{color:"#149540", fontWeight:"700"}}>eligible</span> for the loan amount of</p>
            <div style={{width:"90%", color: "#149540", height:"max-content", padding:"10px 16px", marginTop:"1rem", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", fontWeight:"700", borderRadius:"4px", border:"1px solid #000", background:"#EBFEED", boxShadow:"-4px 6px 0px 0px #514C9F"}}>
                <BiRupee /> {amount}
            </div>
            <div style={{width:"90%", background:"#EBFEED", padding:"10px", marginTop:"2rem"}}>
                <h3 style={{fontSize:"16px", textAlign:"center", lineHeight:"150%", marginBottom:"2rem"}}>We are doing final checks <br/>before the approval.</h3>
                <p style={{padding:"0 2.5rem", textAlign:"center", lineHeight:"150%"}}>In case we need anything from you, <br/>the support team will reach out on your<br/> registered number <strong>{number}</strong></p>
            </div>
            <p style={{textAlign:"center", marginTop:"1rem"}}>For any details and enquiries, reach out to us</p>
            <a href="tel:+918069489655" style={{color:"#514C9F", fontWeight:"700", textDecoration:"underline", margin:"1rem", width:"50%", padding:"10px 5px", textAlign:"center"}}>Contact Support</a>
        </main>
    </>
    )
}

export default CfApproved