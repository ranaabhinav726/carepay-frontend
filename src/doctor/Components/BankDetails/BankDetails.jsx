import { useEffect, useState, useRef } from "react"
import Header from "../Header/Header"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../environment"

const DocBankDetails = () =>{

    const navigate = useNavigate()

    const [accountNum, setAccountNum] = useState("")
    const [confirmAccountNum, setConfirmAccountNum] = useState("")
    const [accountHolderName, setAccountHolderName] = useState("")
    const [IFSC, setIFSC] = useState("")
    const [isIfscValid, setIfscValid] = useState(false)
    const [accType, setAccType] = useState("CA");
    const [bankName, setBankName] = useState("")
    const [branchName, setBranchName] = useState("")
    const [bankAddress, setBankAddress] = useState("")

    const [id, setId] = useState("");
    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    let doctorId = localStorage.getItem('doctorId');

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
    },[])

    useEffect(()=>{
        async function getCall(){
            showWrapper(ref.current);
            await axios.get(env.api_Url+"getBankDetailsByDoctorId?doctorId=" + doctorId)
            .then((response)=>{
                console.log(response)
                if(response.data.data != null){
                    setId(response?.data?.data?.id);
                    let accountHolderName = response?.data?.data?.accountHolderName;
                    setAccountHolderName(accountHolderName);
                    let accountNumber = response?.data?.data?.accountNumber;
                    setAccountNum(accountNumber);
                    setConfirmAccountNum(accountNumber);
                    let accountType = response?.data?.data?.accountType;
                    setAccType(accountType);
                    let bankAddress = response?.data?.data?.bankAddress;
                    setBankAddress(bankAddress);
                    let bankName = response?.data?.data?.bankName;
                    setBankName(bankName);
                    let branchName = response?.data?.data?.branchName;
                    setBranchName(branchName);
                    let ifscCode = response?.data?.data?.ifscCode;
                    setIFSC(ifscCode);
                    setIfscValid(true)
                }
            }).catch((error)=>{
                console.log(error)
            })
            hideWrapper(ref.current)
        }
        getCall();
    },[])

    // function showErrorOnUI(elem){
    //     elem.scrollIntoView({ behavior: "smooth", block: "center"});
    //     elem.classList.add('inputBoxError');
    //     navigator.vibrate(
    //         [100, 30, 100, 30]
    //     );

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    function handleIFSC(e){
        let val = e.target.value;
        val = val.toUpperCase();
        if(val.length < 11){
            setIFSC(val);
        }else if(val.length == 11){
            setIFSC(val);
            fetchBankDetailsFromIFSC(val);
        }
    }

    async function fetchBankDetailsFromIFSC(IFSC){
        await axios
            .get( env.api_Url + "userDetails/codeDetail?code="+ IFSC +"&type=branch")
            .then((response) => {
                console.log(response)
                let bankName = response?.data.branchName;
                setBankName(bankName);
                let branchName = response?.data?.branchCode;
                setBranchName(branchName)
                let branchAddress = response?.data?.bankAddress;
                setBankAddress(branchAddress);
                setIfscValid(true);
            }).catch(error => {
                    console.log(error);
                    setIfscValid(false)
                    let elem = document.getElementById('IFSC');
                    if(elem) showErrorOnUI(elem)
            });
    }

    async function onSubmit(){

        if(! accountNum){
            let elem = document.getElementById('accountNum');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! confirmAccountNum){
            let elem = document.getElementById('confirmAccountNum');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(accountNum !== confirmAccountNum){
            let elem1 = document.getElementById('accountNum');
            let elem2 = document.getElementById('confirmAccountNum');
            let elem3 = document.getElementById('accountError');
            if(elem3) elem3.style.display = "block";
            setTimeout(() => {
                if(elem3) elem3.style.display = "none";
            }, 2500);
            if(elem1) showErrorOnUI(elem1, false)
            if(elem2) showErrorOnUI(elem2, false)
            return;
        }

        if(! accountHolderName){
            let elem = document.getElementById('accountHolderName');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! IFSC || ! isIfscValid){
            let elem = document.getElementById('IFSC');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        await axios.post(env.api_Url+"saveOrUpdateBankDetails", {
            "id": id,
            "doctorId" : doctorId,
            "accountHolderName": accountHolderName,
            "accountNumber": accountNum,
            "accountType": accType,
            "bankAddress": bankAddress,
            "bankName": bankName,
            "branchName": branchName,
            "ifscCode": IFSC
        })
        .then(response =>{
            console.log(response);
            if(response.data.status == 200){
                navigate('/doctor/UploadDocuments');
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

    return(
        <>
        <main id="bankDetails">
        <Header progressbarDisplay="block" progress={95} canGoBack />
            <p className="heading">Bank details</p>

            <div className="inputGroup">
                <p className='group-title'>Account Number</p>
                <input
                    id="accountNum"
                    type="number"
                    className='group-input'
                    onChange={(e)=>setAccountNum(e.target.value)}
                    value={accountNum}
                    placeholder="Enter your account number" 
                />
                <span className="fieldError">Please enter your account number.</span>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Confirm account Number</p>
                <input
                    id="confirmAccountNum"
                    type="number"
                    className='group-input'
                    onPaste={(e)=> {e.preventDefault()}}
                    onChange={(e)=>setConfirmAccountNum(e.target.value)}
                    value={confirmAccountNum}
                    placeholder="Confirm your account number" 
                />
                <span className="fieldError">Please re-enter your account number.</span>
                <span id="accountError" className="fieldError">Account numbers didn't match</span>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Account holder’s name</p>
                <input
                    id="accountHolderName"
                    className='group-input'
                    onChange={(e)=>setAccountHolderName(e.target.value)}
                    value={accountHolderName}
                    placeholder="Enter account holder’s name" 
                />
            </div>

            <div className="inputGroup">
                <p className='group-title'>IFSC Code</p>
                <input
                    id="IFSC"
                    className='group-input'
                    onChange={(e)=>handleIFSC(e)}
                    value={IFSC}
                    autoCapitalize="characters"
                    placeholder="Enter IFSC" 
                />
                <span className="fieldError">Please enter a correct IFSC</span>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Account type</p>
                <select 
                    id="accountType"
                    className='group-input'
                    onChange={(e)=>setAccType(e.target.value)}
                    value={accType}
                >
                    <option value="CA">Current Account</option>
                    <option value="SA" >Savings Account</option>
                </select>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Bank name</p>
                <input
                    disabled
                    className='group-input'
                    value={bankName}
                    placeholder="Bank name" 
                />
            </div>

            <div className="inputGroup">
                <p className='group-title'>Branch name</p>
                <input
                    disabled
                    className='group-input'
                    value={branchName}
                    placeholder="Bank name" 
                />
            </div>
            <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
            <button onClick={()=>onSubmit()} className="submit">Next</button>
        </main>
        </>
    )
}

export default DocBankDetails