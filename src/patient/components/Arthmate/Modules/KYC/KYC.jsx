import { Header } from "../../comps/Header";
import Fingerprint from '../../assets/fingerprint.png'
import { useEffect, useState } from "react";
import { getBasicDetails } from "../../servicesAndUtility/api";
import BottomPopOverModal from "../../comps/BottomPopOverModal";
import { useNavigate } from "react-router-dom";

export default function ArthKyc(){

    const navigate = useNavigate();
    const[consent, setConsent] = useState(false);
    const[showPopOver, setShowPopOver] = useState(false);
    const[aadhaarNo, setAadhaarNo] = useState("");
    const[userId, setUserId] = useState(localStorage.getItem("userId"));

    useEffect(()=>{
        getBasicDetails(userId, res=>{
            if(res.data.message === "success"){
                let data = res?.data?.data;
                if(data?.aadhaarNo != null) setAadhaarNo(data?.aadhaarNo);
                window.localStorage.setItem('aadhaarNo',data?.aadhaarNo)
            }
        })
    }, [userId])

    function navigator(data){
        if(data === "yes"){
            navigate("/patient/ArthAadhaarVerification")
        }else{
            navigate("/patient/ArthAadhaarPhoto")
        }
    }

    return(
        <main style={{position:"relative"}}>
            <Header />
            <h3 style={{margin:"1.5rem 0"}}>KYC</h3>
            <p>Verify your identity to proceed further with the credit application.</p>
            <div style={{padding:"12px", background:"#FAE1CD", borderRadius:"4px", marginTop:"1rem"}}>
                If your Aadhaar and PAN are not linked to your number then keep their physical copy ready.
            </div>
            <div style={{display:"flex"}}>
                <img style={{margin:"2rem auto", maxWidth:"25%"}} src={Fingerprint} alt="" />
            </div>
            <div style={{display:"flex", gap:"12px", marginTop:"1.8rem", marginBottom:"1rem"}}>
                <input 
                    value={consent} 
                    onChange={()=>setConsent(!consent)} 
                    type="checkbox" 
                    name="" 
                    id="kycConsent" 
                    style={{
                        accentColor:"#514C9F", 
                        alignSelf:"start", 
                        aspectRatio:"1/1", 
                        width:"36px", 
                        marginTop:"3px"
                    }} 
                />
                <label 
                    htmlFor='kycConsent'
                    style={{userSelect:"none"}}
                >
                    I hereby give my consent to Arthmatetech 
                    Private limited to collect, store and verify my KYC details for 
                    processing my loan application.
                </label>
            </div>
            <button 
                className={'submit' + (consent?"":" disabled")} 
                onClick={()=>{setShowPopOver(true)}}
            >
                Proceed
            </button>
            <BottomPopOverModal showPopOver={showPopOver} setShowPopOver={setShowPopOver} color="#FFF">
                <>
                    <p style={{textAlign:"center", fontWeight:"700", margin:"1rem 0"}}>{aadhaarNo}</p>
                    <p style={{textAlign:"center"}}>Is your Aadhaar card linked to your number?</p>
                    <div style={{display:"flex", gap:"12px"}}>
                        <button onClick={()=>navigator()} className="submit lite">No</button>
                        <button onClick={()=>navigator("yes")} className="submit">Yes</button>
                    </div>
                </>
            </BottomPopOverModal>
        </main>
    )
}