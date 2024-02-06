import { Header } from "./Comps/Header";
import SearchingDoc from '../../assets/GIFs/Document in process.gif'
import NoteText from "./Comps/NoteText";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../environment/environment";
import { useState } from "react";
import { showWaitingModal, hideWaitingModal } from "../../environment/environment";

export default function Screen10(){

    const navigate = useNavigate();

    let userId = localStorage.getItem('userId');
    let phoneNumber = localStorage.getItem('phoneNumber');

    const [errorMsg, setErrorMsg] = useState("");
    
    function checkLoanStatus(){
        axios.get(env.api_Url + "/userDetails/getLoanStatusByUserId?userId=" + userId)
        .then((response) => {
            console.log(response);
            let loanStatus = response?.data?.data;
            if(loanStatus === "disbursed"){
                navigate('/patient/screen15')
            }else if(loanStatus === "rejected"){
                navigate("/patient/screen12sub2"); // journey ends here
            }
        }).catch(error =>{
            console.warn(error)
        })
    }
    return(
        <main className="screenContainer">
            <Header progressBar="hidden" />
            <div style={{display:"flex", placeContent:"center", marginTop:"3rem"}}>
                <img src={SearchingDoc} alt="" style={{width:"50%"}} />
            </div>
            <NoteText text="We are assessing your credit application." styles={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}} />
            <NoteText text="This might take 15-20 minutes." styles={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}} />
            <div style={{background:"#FAE1CD", textAlign:"center", padding:"16px 12px", fontSize:"16px", lineHeight:"22px", borderRadius:"4px", marginTop:"1rem"}}>
                You will be notified on your registered contact number <strong style={{whiteSpace:"nowrap"}}>+91 {phoneNumber}</strong> once the application is reviewed.
            </div>
            {errorMsg && <p style={{marginTop:"1.7rem", color:"red", textAlign:"center"}}>{errorMsg}</p>}
            <button onClick={()=>checkLoanStatus()} className="submit" style={{margin:"2rem 0 12px 0"}}>Refresh status</button>
            <NoteText text="For more details and enquiries, reach out to us" styles={{textAlign:"center", color:"#000000C", fontSize:"16px", lineHeight:"20px", marginTop:"1.7rem"}} />
            <div style={{textAlign:"center", margin:"1rem 0 2rem 0"}}>
                <Link to={"tel:+918069489655"} style={{color:"#514C9F", fontWeight:"700", textDecoration:"underline", textAlign:"center"}}>Contact Support</Link>
            </div>
        </main>
    )
}