import { Header } from "./Comps/Header";
import SearchingDoc from '../../assets/GIFs/Document in process.gif'
import NoteText from "./Comps/NoteText";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { env } from "../../environment/environment";
export default function Screen9(){

    const navigate = useNavigate();
    let timerId;
    let userId = localStorage.getItem("userId");

    useEffect(()=>{
        if(!! userId){
            axios.post(env.api_Url+"profileIngestionForFibe?userId=" + userId + "&type=customer")
        .then(response=>{
            console.log(response) //'/patient/screen11'
            if(response?.data?.data){
                let fibeData = response?.data?.data;
                let leadStatus = fibeData?.leadStatus;
                let statusMessage = fibeData?.statusMessage;
                let sanctionMaxLimit = fibeData?.sanctionData?.sanctionMaxLimit || 0;
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
                                        navigate("/patient/fibeLoanRejected", {state : {"data" : loanData}}); // journey ends here
                                    }
                                    // else if(leadStatus === "PENDING" || leadStatus === "IN_PROGRESS"){
                                    //     navigate("/patient/screen12sub1", {state : {"link" : bitlyUrl}}); // prompt user that bank statement will be collected in futher process
                                    // }
                                    else if(leadStatus === "CREATED"){
                                        navigate("/patient/fibeRedirecting", {state : {"link" : bitlyUrl}});     // directly sends to redirecting screen
                                    }else if(leadStatus === "APPROVED"){
                                        // console.log(sanctionMaxLimit, creditAmt)
                                        if(Number(creditAmt) > Number(sanctionMaxLimit)){
                                            navigate("/patient/fibeLoanRejected"); // journey ends here
                                        }else{
                                            navigate("/patient/fibeLoanApproved", { state: {"data" : fibeData, "loanAmount": creditAmt}});     // congrats and show sanction amount
                                        }
                                    }else if(leadStatus === "FAILURE" && statusMessage === "Unable to ingest lead."){
                                        navigate("/patient/fibeWaitingForApproval")
                                    }else{
                                        if(!! bitlyUrl){
                                            navigate("/patient/fibeBankStatementRequired", {state : {"link" : bitlyUrl}});
                                        }else{
                                            // navigate(-1)
                                            navigate("/patient/fibeWaitingForApproval")
                                        }
                                    }
                                }else{
                                    // navigate(-1)
                                    navigate("/patient/fibeWaitingForApproval")
                                }
                            }, 2000);
                        }else{
                            // navigate(-1)
                            navigate("/patient/fibeWaitingForApproval")
                        }
                    }else{
                        // navigate(-1)
                        navigate("/patient/fibeWaitingForApproval")
                    }
                }).catch(error=>{
                    navigate("/patient/fibeWaitingForApproval")
                    console.warn(error)
                })
            }else{
                // navigate(-1)
                navigate("/patient/fibeWaitingForApproval")
            }
            // hideWaitingModal();
        }).catch(err=>{
            console.warn(err);
            // hideWaitingModal();
        })
        }

        return ()=> clearTimeout(timerId);
    },[userId])

    // const navigate = useNavigate();
    // setTimeout(() => {
    //     navigate('/patient/screen10')
    // }, 3000);
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