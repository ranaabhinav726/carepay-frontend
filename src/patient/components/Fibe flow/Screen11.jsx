import { Header } from "./Comps/Header";
import SearchingDoc from '../../assets/GIFs/Document in process.gif'
import NoteText from "./Comps/NoteText";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { env } from "../../environment/environment";

export default function Screen11(){

    const navigate = useNavigate();
    // const location = useLocation();
    // console.log(location.state);
    // let leadStatus = location?.state?.data?.leadStatus;
    // let sanctionAmount = location?.state?.data?.sanctionData?.sanctionMaxLimit || 0;
    // let bitlyUrl = location?.state?.data?.bitlyUrl;

    let timerId;

    let userId = localStorage.getItem("userId");

    

    useEffect(()=>{
        if(!! userId){
            axios.post(env.api_Url+"testMoneyWideApi?userId=" + userId + "&type=customer")
        .then(response=>{
            console.log(response) //'/patient/screen11'
            if(response?.data?.data){
                let fibeData = response?.data?.data;
                let leadStatus = fibeData?.leadStatus;
                let statusMessage = fibeData?.statusMessage;
                let sanctionAmount = fibeData?.sanctionData?.sanctionAmount || 0;
                let bitlyUrl = fibeData?.bitlyUrl;

                // if(response.data.data.leadStatus === "FAILURE"){
                //     setErrorMsg(response.data.data.statusMessage);
                // }else{
                //     navigate('/patient/screen11', { state: {"data":response.data.data}})
                // }
                axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
                .then(response =>{
                    if(response?.data.message === "success"){
                        let loanData = response?.data?.data;
                        console.log(loanData)
                        if(!! loanData){
                            let creditAmt = loanData?.loanAmount;
                            timerId = setTimeout(() => {
                                if(!! (leadStatus && creditAmt)){
                                    if(leadStatus === "REJECTED"){
                                        navigate("/patient/screen12sub2", {state : {"data" : loanData}}); // journey ends here
                                    }
                                    // else if(leadStatus === "PENDING" || leadStatus === "IN_PROGRESS"){
                                    //     navigate("/patient/screen12sub1", {state : {"link" : bitlyUrl}}); // prompt user that bank statement will be collected in futher process
                                    // }
                                    else if(leadStatus === "CREATED"){
                                        navigate("/patient/screen13", {state : {"link" : bitlyUrl}});     // directly sends to redirecting screen
                                    }else if(leadStatus === "APPROVED"){
                                        console.log(sanctionAmount, creditAmt)
                                        if(Number(creditAmt) > Number(sanctionAmount)){
                                            navigate("/patient/screen12sub2"); // journey ends here
                                        }else{
                                            navigate("/patient/screen12", { state: {"data" : fibeData, "loanAmount": creditAmt}});     // congrats and show sanction amount
                                        }
                                    }else if(leadStatus === "FAILURE" && statusMessage === "Unable to ingest lead."){
                                        navigate("/patient/screen10")
                                    }else{
                                        if(!! bitlyUrl){
                                            navigate("/patient/screen12sub1", {state : {"link" : bitlyUrl}});
                                        }else{
                                            navigate(-1)
                                        }
                                    }
                                }else{
                                    navigate(-1)
                                }
                            }, 2000);
                        }else{
                            navigate(-1)
                        }
                    }else{
                        navigate(-1)
                    }
                }).catch(error=>{
                    navigate(-1)
                    console.warn(error)
                })
            }else{
                navigate(-1)
            }
            // hideWaitingModal();
        }).catch(err=>{
            console.warn(err);
            // hideWaitingModal();
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