import { useState, useEffect, useRef } from "react";
import Header from "../../Header/Header"
import './bankDetails.scss'

import axios from "axios";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../environment/environment"

import { useLocation, useNavigate } from "react-router-dom";

// let bankname = localStorage.getItem('bankName');

const BankDetails = () =>{

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    const location = useLocation();
    let isReVisitToUploadStatement = location?.state?.reVisitToUploadStatement;
    console.log(isReVisitToUploadStatement)

    let userId = localStorage.getItem('userId')
    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getAccountInfoByUserId?userId=" + userId)
            .then(response => {
                if(response.data.message === "success"){
                    let data = response.data.data;
                    if(!! data){
                        setBankName(data.bankName);
                        handleIFSC(data.ifscCode);
                        setAccountNumber(data.accountNumber);
                        setConfirmAccountNumber(data.accountNumber);
                    }
                }
            }).catch(()=>{
                console.log("Error fetching data");
            })
        }
    },[])

    const [bankName, setBankName] = useState('');
    const [IFSC, setIFSC] = useState('');
    const [isIFSCValid, setIsIFSCValid] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [branchName, setBranchName] = useState();
    const [branchAddress, setBranchAddress] = useState();

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const [focus, setFocus] = useState(false);

    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "BankDetails"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });

    //     setBankName(bankname);
    // }, [])

    

    const navigate = useNavigate();

    async function fetchBankDetailsFromIFSC(IFSC){
        // let isKYCdone;
        await axios
            .get("https://ifsc.razorpay.com/" + IFSC)
            .then((response) => {
                console.log(response)
                let bankName = response.data.BANK;
                setBankName(bankName);
                let branchName = response.data.BRANCH;
                setBranchName(branchName);
                let branchAddress = response.data.ADDRESS;
                setBranchAddress(branchAddress);
                setIsIFSCValid(true);

            }).catch(error => {
                    console.log(error);
            });
            // console.log(isKYCdone)
    }

    function handleIFSC(val){
        // let val = e.target.value;
        val = val.toUpperCase();
        if(val.length < 11){
            setIFSC(val);
            setIsIFSCValid(false)
        }else if(val.length == 11){
            setIFSC(val);
            fetchBankDetailsFromIFSC(val);
        }
    }
    // function showErrorOnUI(elem){
    //     elem.classList.add('inputBoxError');

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    async function onSubmit(){
        if(!(bankName && IFSC && accountNumber && (accountNumber === confirmAccountNumber) )){
            console.log(bankName, accountNumber, branchAddress, branchName, IFSC);
            // return;
        }
        // return;

        if(!accountNumber){ 
            let elem = document.getElementById('accountNumber');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(!confirmAccountNumber){ 
            let elem = document.getElementById('confirmAccountNumber');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(accountNumber !== confirmAccountNumber){
            let elem1 = document.getElementById('accountNumber');
            let elem2 = document.getElementById('confirmAccountNumber');
            if(elem1) showErrorOnUI(elem1, false);
            if(elem2) showErrorOnUI(elem2, false);
            let err = document.getElementById('error');
            if(err) err.style.display = "block";
            setTimeout(() => {
                let err = document.getElementById('error');
                if(err) err.style.display = "none";
            }, 3000);
            return;
        }

        if(!isIFSCValid || !IFSC){ 
            let elem = document.getElementById('IFSC');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(!bankName){ 
            let elem = document.getElementById('bankName');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)
        await axios
            .post(env.api_Url + "userDetails/addAccountDetails", {
                    "userId": userId,
                    "accountNumber": accountNumber,
                    // "account_type": "SA",
                    // "bank_address": branchAddress,
                    "bankBranch": branchName,
                    "bankName": bankName,
                    "ifscCode": IFSC,
                    "formStatus": ""
                })
            .then((response) => {
                console.log(response)
                if(response.data.message === "success"){
                    localStorage.setItem("bankName", bankName);
                    navigate('/patient/IncomeVerification', {state : {"reVisitToUploadStatement" : isReVisitToUploadStatement}});
                }
            }).catch(error => {
                console.log(error);
                if(error.response.status == 406 && error.response.data.msg.error == "Bank Details already verified"){
                    navigate('/patient/IncomeVerification', {state : {"reVisitToUploadStatement" : isReVisitToUploadStatement}});
                }
            });
        setCanSubmit(true);
        hideWrapper(ref.current);
    }

   return(
    <>
    <main className="bankDetails">
    <Header progressbarDisplay="block" progress="80" canGoBack="/patient/EmploymentDetails" />
        <h3>Bank Details</h3>

        <div style={{background:"#FAE1CD", padding:"16px", borderRadius:"8px", color:"#514C9F", textAlign:"center", wordSpacing:"1px", letterSpacing:"0.5px"}}>
            Please enter details of your <strong>salary bank account</strong> only and make sure it has an active debit card or net banking.
        </div>

        {/* <p className="note"><b>NOTE:</b> Please add bank details of the same account as the bank statement submitted.</p> */}
        <div className="accountName">
            <p>Account number</p>
            <input 
                type={focus ? "number" : "password"}
                id="accountNumber"
                value={accountNumber ?? ""}
                onChange={(e)=>setAccountNumber(e.target.value)}
                onFocus={()=>setFocus(true)}
                placeholder="Enter account number here" 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div>
        <div className="confirmAccountName">
            <p>Confirm account number</p>
            <input 
                type={focus ? "password" : "number"}
                id="confirmAccountNumber"
                value={confirmAccountNumber ?? ""}
                onChange={(e)=> setConfirmAccountNumber(e.target.value)}
                onFocus={()=>setFocus(false)}
                
                placeholder="Re-enter account number here" 
            />
            <span className="fieldError">This field can't be empty.</span>
            <p id="error" className="apiError hide">Account numbers don't match.</p>
        </div>
        <div className="IFScode">
            <p>IFSC code</p>
            <input 
                type="text" 
                id="IFSC"
                value={IFSC ?? ""}
                onChange={(e)=>handleIFSC(e.target.value)}
                placeholder="Enter IFSC here" 
                autoCapitalize="characters" 
            />
            <span className="fieldError">Please enter a correct IFSC</span>
        </div>
        <div className="bankName">
            <p>Bank name</p>
            <input disabled
                id="bankName"
                defaultValue={bankName ?? ""}
                onChange={(e)=>setBankName(e.target.value)}
                type="text"
                placeholder="Enter your bank name here" 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div>

        <button onClick={()=>onSubmit()} className="submit">Next</button>
    </main>
    </>
   )
}

export default BankDetails