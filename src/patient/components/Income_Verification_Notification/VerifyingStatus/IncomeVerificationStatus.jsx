import Header from "../../Header/Header"
import './verifying.scss'
import { useNavigate } from "react-router-dom"
import VerifyingGif from '../../../assets/GIFs/Verifying document.gif'

import { env } from "../../../environment/environment"
import axios from "axios"
import { useEffect } from "react"


const IncomeVerificationStatus = ({data = "Verifying bank account statement..."}) =>{
    const navigate = useNavigate();

    // let url = localStorage.getItem('KYC_url') || ""

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}`}
    // };

    // async function canApplyForLoan(){
    //     let canApply = false;
    //     axios
    //         .post(env.api_Url + "get_document_status", {
    //                 "type": "loan_approval"
    //                 },
    //                 config
    //             )
    //         .then((response) => {
    //             let status = response?.data?.can_apply_for_loan;
    //             canApply =  (status===true) || (status==="True");
    //             console.log(response, canApply)
    //         }).catch(error => {
    //                 console.log(error);
    //         });
    //         return canApply;
    // }

    // async function checkStatementVerificationStatus(){
    //     let status = false;
    //     await axios.post(env.api_Url + "get_document_status", {
    //             "type": "bank_statement_verified"
    //             }, config)
    //     .then((response) => {
    //         console.log(response)
    //         let statementStatus = response.data.bank_statement_verified;
    //         if(statementStatus === "VERIFIED"){
    //             //PENDING_VERIFICATION - uploaded but not verified
    //             //navigate('/StatementVerificationSuccesful', {replace:true})
    //             status = true;
    //         }else{
    //             // navigate(-1)
    //         }
    //     }).catch(error => {
    //             console.log(error);
    //             navigate(-1)
    //     });
    //     return status;
    // }

    // function getLimit(){
    //     axios.post(env.api_Url + "get_loan_limit", {},
    //         config )
    //         .then((response) => {
    //             let responseCode = response.status+"";
    //             console.log(response)
    //             if(responseCode[0] == '2'){
    //                 // console.log(response.data.data.credit_limit[0].paymeindia)
    //                 let refID = response.data.data.reference_id;
    //                 let limit = response.data.data.credit_limit[0].paymeindia;
    //                 // data.addData({"reference_id": refID})
    //                 // data.addData({"credit_limit": limit})
    //                 localStorage.setItem("new_reference_id", refID)
    //                 localStorage.setItem("new_limit", limit)
    //                 if(limit === null){
    //                     navigate('/ApprovedLoanLimitNeg');
    //                 }else{
    //                     navigate('/StatementVerificationSuccesful', {replace:true});
    //                 }
    //             }
    //         }).catch(error => {
    //             console.log(error);
    //         });
    // }



    // useEffect(()=>{
    //     setTimeout(async ()=>{
    //         let canApply = await canApplyForLoan();
    //         console.log(canApply)
    //         let statementVerified = await checkStatementVerificationStatus();
    //         console.log(statementVerified)
    //         if(canApply && statementVerified){
    //             getLimit();
    //         }else{
    //             navigate(-1)
    //         }
    //     },2000)
    // },[])
    let userId = localStorage.getItem("userId");
    useEffect(()=>{
        setTimeout(checkStatementStatus, 1000);
    }, [])

    async function checkStatementStatus(){
        await axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=bank_statement_verified", {},)
        .then((response) => {
            console.log(response)
            if(response.data.status == "200"){
                let loanStatus = response.data.data;
                console.log(loanStatus)
                if(loanStatus == "APPROVED" || loanStatus == "VERIFIED"){
                    navigate('/patient/BankDetailsUnderProcess');
                }else if(loanStatus == ""){ ////////// no. of emi reduction prompt
                    navigate('/patient/NewTenureConfirmation'); /////////new screen of EMI confirmation
                }else{
                    navigate(-1);
                }
            }else if(response.data.status == "500"){
                let loanStatus = response.data.data;
                if(loanStatus == "REJECTED"){
                    navigate('/patient/ApprovedLoanLimitNeg')
                }else if(loanStatus == "can_apply_for_loan value is false"){
                    navigate(-1);
                }else{
                    navigate(-1)
                }
            }
        }).catch(error => {
                console.log(error);
        });
    }

   return(
    <>
    <main className="verifying">
    <Header progressbarDisplay="none" />
        <div className="centerSection">
            <img src={VerifyingGif} alt="" />
            <p className="redirectionMsg">{data}</p>
        </div>
    </main>
    </>
   )
}

export default IncomeVerificationStatus