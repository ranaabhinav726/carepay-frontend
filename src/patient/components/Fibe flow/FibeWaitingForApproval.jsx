import { Header } from "./Comps/Header";
import SearchingDoc from '../../assets/GIFs/Document in process.gif'
import NoteText from "./Comps/NoteText";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../environment/environment";
import { useState } from "react";
import { showWaitingModal, hideWaitingModal } from "../../environment/environment";

export default function FibeWaitingForApproval(){

    const navigate = useNavigate();

    // let userId = localStorage.getItem('userId');
    let phoneNumber = localStorage.getItem('phoneNumber');

    const [errorMsg, setErrorMsg] = useState("");

    // let timerId;

    // function checkStatus(){
    //     if(!! userId){
    //     showWaitingModal()
    //     axios.post(env.api_Url+"profileIngestionForFibe?userId=" + userId + "&type=customer")
    //     .then(response=>{
    //         console.log(response) //'/patient/screen11'
    //         if(response?.data?.data){
    //             let fibeData = response?.data?.data;
    //             let leadStatus = fibeData?.leadStatus;
    //             let statusMessage = fibeData?.statusMessage;
    //             let sanctionAmount = fibeData?.sanctionData?.sanctionAmount || 0;
    //             let bitlyUrl = fibeData?.bitlyUrl;

    //             // if(response.data.data.leadStatus === "FAILURE"){
    //             //     setErrorMsg(response.data.data.statusMessage);
    //             // }else{
    //             //     navigate('/patient/screen11', { state: {"data":response.data.data}})
    //             // }
    //             axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
    //             .then(response =>{
    //                 if(response?.data.message === "success"){
    //                     let loanData = response?.data?.data;
    //                     console.log(loanData)
    //                     if(!! loanData){
    //                         let creditAmt = loanData?.loanAmount;
    //                         timerId = setTimeout(() => {
    //                             if(!! (leadStatus && creditAmt)){
    //                                 if(leadStatus === "REJECTED"){
    //                                     navigate("/patient/screen12sub2", {state : {"data" : loanData}}); // journey ends here
    //                                 }
    //                                 // else if(leadStatus === "PENDING" || leadStatus === "IN_PROGRESS"){
    //                                 //     navigate("/patient/screen12sub1", {state : {"link" : bitlyUrl}}); // prompt user that bank statement will be collected in futher process
    //                                 // }
    //                                 else if(leadStatus === "CREATED"){
    //                                     navigate("/patient/screen13", {state : {"link" : bitlyUrl}});     // directly sends to redirecting screen
    //                                 }else if(leadStatus === "APPROVED"){
    //                                     console.log(sanctionAmount, creditAmt)
    //                                     if(Number(creditAmt) > Number(sanctionAmount)){
    //                                         navigate("/patient/screen12sub2"); // journey ends here
    //                                     }else{
    //                                         navigate("/patient/screen12", { state: {"data" : fibeData, "loanAmount": creditAmt}});     // congrats and show sanction amount
    //                                     }
    //                                 }else if(leadStatus === "FAILURE" && statusMessage === "Unable to ingest lead."){
    //                                     navigate("/patient/screen10")
    //                                 }else{
    //                                     if(!! bitlyUrl){
    //                                         navigate("/patient/screen12sub1", {state : {"link" : bitlyUrl}});
    //                                     }else{
    //                                         // navigate(-1)
    //                                         navigate("/patient/screen10")
    //                                     }
    //                                 }

    //                                 hideWaitingModal();
    //                             }else{
    //                                 // navigate(-1)
    //                                 navigate("/patient/screen10")
    //                             }
    //                         }, 2000);
    //                     }else{
    //                         // navigate(-1)
    //                         navigate("/patient/screen10")
    //                     }
    //                 }else{
    //                     // navigate(-1)
    //                     navigate("/patient/screen10")
    //                 }
    //             }).catch(error=>{
    //                 navigate(-1)
    //                 console.warn(error)
    //             })
    //         }else{
    //             // navigate(-1)
    //             navigate("/patient/screen10")
    //         }
    //         hideWaitingModal();
    //     }).catch(err=>{
    //         console.warn(err);
    //         hideWaitingModal();
    //     })
    //     }

    //     return ()=> clearTimeout(timerId);
    // }

    function checkStatus(){
        navigate("/patient/screen11");
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
            <button onClick={()=>checkStatus()} className="submit" style={{margin:"2rem 0 12px 0"}}>Refresh status</button>
            <NoteText text="For more details and enquiries, reach out to us" styles={{textAlign:"center", color:"#000000C", fontSize:"16px", lineHeight:"20px", marginTop:"1.7rem"}} />
            <div style={{textAlign:"center", margin:"1rem 0 2rem 0"}}>
                <Link to={"tel:+918069489655"} style={{color:"#514C9F", fontWeight:"700", textDecoration:"underline", textAlign:"center"}}>Contact Support</Link>
            </div>
        </main>
    )
}