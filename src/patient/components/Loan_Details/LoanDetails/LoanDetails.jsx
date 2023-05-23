import { useState, useEffect, useRef } from "react";
import Header from "../../Header/Header"
import './loanDetails.scss'

import axios from "axios";

import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../environment/environment"
import { useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";

const LoanDetails = () =>{

    // function handleError(){
    //     let elem = document.getElementsByClassName('warning')[0];
    //     elem.style.visibility = "visible";

    //     setTimeout(()=>{
    //         elem.style.visibility = "hidden";
    //     }, 1000)
    // }

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "LoanDetails"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, [])

    const navigate = useNavigate();

    let doctorName = localStorage.getItem('doctorName') || "";
    doctorName = doctorName.split('_').join(' ');
    let doctorId = localStorage.getItem('doctorId') || "";
    let clinicName = localStorage.getItem('clinicName') || "";
    clinicName = clinicName.split('_').join(' ');

    let userId = localStorage.getItem("userId");
    // let amount = localStorage.getItem("limit") * 1 || 1;

    const [loanAmt, setLoanAmount] = useState('');
    const [loanPurpose, setLoanPurpose] = useState('');

    const [EMIOption, setEMIOption] = useState(true);

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.status === 200){
                    let data = response.data.data;
                    if(!! data){
                        setLoanAmount(data.loanAmount);
                        setLoanPurpose(data.loanReason);
                    }
                }
            })
        }

    },[])
    // function handleAmount(e){
    //     let amt = e.target.value * 1;
    //     if(amt>amount){
    //         return
    //     }else{
    //         setLoanAmount(amt);
    //     }
    // }

    // function showErrorOnUI(elem){
    //     elem.classList.add('inputBoxError');

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    async function handleClick(){
        if(! doctorId){
            return;
        }

        if(!loanPurpose){
            let elem = document.getElementById('loanPurpose');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(!loanAmt){ 
            let elem = document.getElementById('loanAmt');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        localStorage.setItem("loanAmt", loanAmt);

        let loanEmi = (EMIOption == true ? "3" : "6");
        let submitObj = {
            "userId" : userId,
            "doctorName": doctorName,
            "doctorId": doctorId,
            "loanReason": loanPurpose,
            "loanAmount": loanAmt,
            "loanEmi" : loanEmi,
            "formStatus": ""
        };

        await axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(async(response) => {
                console.log(response)
                if(response.data.status == 200){
                    // await handleNavigation();
                    navigate('/patient/KycVerification');
                }else{
                    apiErrorHandler();
                }
            }).catch(error => {
                apiErrorHandler();
                console.log(error);
            });

    setCanSubmit(true);
    hideWrapper(ref.current);
    }

    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 1500);
    }
    
    // console.log(EMIOption)

    // async function checkKYC(){
    //     let isKYCdone;
    //     await axios
    //         .post(env.api_Url + "get_document_status", {
    //                 "type": "kyc_verification"
    //                 },
    //                 config
    //             )
    //         .then((response) => {
    //             let kycStatus = response.data.kyc_verified;
    //             // console.log(kycStatus)
    //             if(kycStatus == "VERIFIED"){
    //                 isKYCdone = true
    //             }else{
    //                 isKYCdone = false
    //             }
    //         }).catch(error => {
    //                 console.log(error);
    //         });
            
    //         // console.log(isKYCdone)
    //         return isKYCdone;
    // }


   return(
    <>
    <main className="loanDetails">
    <Header progressbarDisplay="block" progress="60" canGoBack="/patient/FileUpload" />
        <h3>Credit Details</h3>

        <div className="doctorName">
            <p>Doctor's name</p>
            <input type="text" value={doctorName} disabled placeholder="Enter name here" />
        </div>

        <div className="hospitalName">
            <p>Clinic name (Optional)</p>
            <input type="text" defaultValue={clinicName} />
        </div>

        <div className="purposeOfLoan">
            <p>Purpose of credit</p>
            <input 
                name="loanType" 
                value={loanPurpose}
                id="loanPurpose" 
                placeholder="Enter here"
                onChange={(e)=>setLoanPurpose(e.target.value)}
            />
        </div>

        <div className="loan">
            <p>Credit amount (in INR)</p>
            <input 
                id="loanAmt" 
                value={loanAmt} 
                type="number" 
                inputMode="numeric" 
                onChange={(e)=>setLoanAmount(e.target.value)}
                placeholder="Enter here"
            />
            {/* <p className="warning">Cannot be greater than your pre approved credit limit.</p> */}
        </div>

        <p className="subheading">Select EMI options</p>
        <div className="msgBox">
            <h4>Please note:</h4>
            <p>The first EMI will be collected in advance before processing your credit.</p>
            <p>Select options accordingly.</p>
        </div>

        <EMIcard
            EMIAmount={(loanAmt/3).toLocaleString('en-IN',{maximumFractionDigits: 2})} 
            NumOfEMIs="3" 
            checked={EMIOption}
            checkValue={true}
            setEMIOption={setEMIOption}
        />

        <EMIcard
            EMIAmount={(loanAmt/6).toLocaleString('en-IN',{maximumFractionDigits: 2})} 
            NumOfEMIs="6"  
            checked={!EMIOption}
            checkValue={false}
            setEMIOption={setEMIOption}
        />

        <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
        <button onClick={()=>handleClick()} className="submit">Apply for credit</button>
        {/* <a href="upi://pay?pa=8076341679@apl&amp;pn=Test user K&amp;cu=INR&amp;am=1000.00" class="upi-pay1">Pay Now !</a> */}
    </main>
    </>
   )
}

const EMIcard = ({EMIAmount, NumOfEMIs, checked, checkValue, setEMIOption}) =>{
    return(
        <div onClick={()=>setEMIOption(checkValue)} className="loan-card">
            <div className="whiteCircle"><div className={checked? "innercircle true" : "innercircle"}></div></div>
            <div className="cardLower">
                <div className="totalEMIs">
                    <p className="text">Tenure</p>
                    <p className="amt">{NumOfEMIs} months</p>
                </div>
                <div className="EMIAmount">
                    <p className="text">EMI amount</p>
                    <p className="amt"><BiRupee /> {EMIAmount}</p>
                </div>
            </div>

        </div>
    )
}


export default LoanDetails