import Header from "../../Header/Header";
import SearchingDoc from '../../../assets/GIFs/Document in process.gif'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../../environment/environment";

export default function ChechkingStatus(){

    let userId = localStorage.getItem('userId');
    const location = useLocation();
    let isFilesUploaded = location?.state?.isFilesUploaded;
    

    const navigate = useNavigate();
    setTimeout(async() => {
        if(! isFilesUploaded){
        await axios.get(env.api_Url + "/checkNTCUser?userId=" + userId)
            .then(res=>{
                let ntc = res?.data?.data;
                // console.log(ntc)
                    if(ntc === true){
                        navigate("/patient/FileUpload", {state : {"reVisitToUploadStatement" : true}})
                    }
                }).catch(e=>{

                })
        }
        await axios.get(env.api_Url + "checkCFApproval?userId=" + userId)
        .then(async(res)=>{
            if(res?.data?.data === true){
                navigate('/patient/congrats');
            }else{
                getLoanStatus();
            }
        }).catch(e=>{
            getLoanStatus();
        })
        
    }, 8000);

    async function getLoanStatus(){
        await axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
            .then(async(response) => {
                console.log(response)
                if(response.data.message === "success"){
                    // console.log(response)
                    let data = response?.data?.data;
                    if(data.loan_status === "105"){
                        navigate('/patient/congrats')
                    }else if(data.loan_status === "107"){
                        navigate('/patient/loanAppSuccessful')
                    }
                    else if(data.loan_status === "110"){            // if loan is rejected
                        let loanAmt = parseInt(data.amount);
                        if(loanAmt <= 300001){                       // if amount is less than 75k, then it means Bank details have not been collected yet.
                            navigate("/patient/BankDetails");       // Navigate to collect Bank details.
                        }else{                                      // if loan amount is greater than 75k then bank details have already been collected
                            navigate("/patient/LoanDetails");   // Enter Payms's flow
                        }
                    }else{
                        navigate(-1)
                    }
                }else{
                    navigate(-1)
                }
            }).catch(error =>{
                console.log(error)
                navigate(-1)
            })
    }
    return(
        <main className="screenContainer">
            <Header progressBar="hidden" />
            <div style={{display:"flex", placeContent:"center", marginTop:"3rem"}}>
                <img src={SearchingDoc} alt="" style={{width:"50%"}} />
            </div>
            <p style={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}}>Sit back and relax!</p>
            <p style={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}}>while we assess your credit application...</p>
        </main>
    )
}