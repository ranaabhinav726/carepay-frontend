import { Header } from "./Comps/Header";
import SearchingDoc from '../../assets/GIFs/Document in process.gif'
import NoteText from "./Comps/NoteText";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { env } from "../../environment/environment";

export default function Screen11(){

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state);
    let leadStatus = location?.state?.data?.leadStatus;
    let sanctionAmount = location?.state?.data?.sanctionData?.sanctionMaxLimit || 0;
    let bitlyUrl = location?.state?.data?.bitlyUrl;

    let timerId;

    let userId = localStorage.getItem("userId");

    useEffect(()=>{
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response?.data.status === 200){
                    let data = response?.data?.data;
                    console.log(data)
                    if(!! data){
                        let creditAmt = data?.loanAmount;
                        timerId = setTimeout(() => {
                            if(!! creditAmt){
                                if(!! leadStatus){
                                    if(leadStatus === "REJECTED"){
                                        navigate("/patient/screen12sub2"); // journey ends here
                                    }else if(leadStatus === "PENDING"){
                                        navigate("/patient/screen12sub1", {state : {"link" : bitlyUrl}}); // prompt user that bank statement will be collected in futher process
                                    }else if(leadStatus === "CREATED"){
                                        navigate("/patient/screen13", {state : {"link" : bitlyUrl}});     // directly sends to redirecting screen
                                    }else if(leadStatus === "APPROVED"){
                                        console.log(sanctionAmount, creditAmt)
                                        if(Number(creditAmt) > Number(sanctionAmount)){
                                            navigate("/patient/screen12sub2"); // journey ends here
                                        }else{
                                            navigate("/patient/screen12", { state: {"data" : location.state.data}});     // congrats and show sanction amount
                                        }
                                    }
                                }
                            }
                        }, 2000);
                    }
                }
            }).catch(error=>{
                console.warn(error)
            })
        }

        return ()=> clearTimeout(timerId);
    },[userId])

    

    return(
        <main className="screenContainer">
            <Header progressBar="hidden" />
            <div style={{display:"flex", placeContent:"center", marginTop:"3rem"}}>
                <img src={SearchingDoc} alt="" style={{width:"50%"}} />
            </div>
            <NoteText text="Sit back and relax!" styles={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}} />
            <NoteText text="while we assess your credit application..." styles={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}} />
        </main>
    )
}