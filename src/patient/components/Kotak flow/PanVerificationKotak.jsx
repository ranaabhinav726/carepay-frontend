import { useState } from "react";
import Header from "../Header/Header"
import StepBar from "./comps/StepBar"
import InputBox from "./comps/InputBox";
import { useLocation, useNavigate } from "react-router-dom";
import { eligibility } from "./apis";
import { showWaitingModal, hideWaitingModal } from "../../environment/environment";

function PanVerificationKotak(){

    const navigate = useNavigate();
    const location = useLocation();
    let offer = location?.state?.offer;
    let reqAmount = location?.state?.reqAmount;
    let loanTenure = location?.state?.loanTenure;
    console.log(location.state);

    const [panNumber, setPanNumber] = useState("")
    const [isPanValid, setPanValid] = useState(false)
    const [error, setError] = useState(false);

    function handlePan(val){
        if(val === null || val === undefined) return;
        val = val.toUpperCase();
        if(val.length<10) setPanValid(false);
        if(val.length === 10){
            let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
            console.log(regex.test(val))
            if (regex.test(val) === false) {
                // let errorMsg = document.getElementById('panFormat');
                // errorMsg.style.display = "block";
                setError(true);
                setPanValid(false);
            }else{
                // let errorMsg = document.getElementById('panFormat');
                // errorMsg.style.display = "none";
                setError(false);
                setPanValid(true);
            }
        }
        if(val.length > 10) return
        setPanNumber(val);
    }

    function showError(setError, time){
        setError(true);
        setTimeout(() => {
            setError(false)
        }, time);
    }

    function checkEligibilityAndNavigate(){
        if(! isPanValid){
            showError(setError, 3000)
            return;
        }

        let number = offer?.MOBILE;
        let txnId = offer?.TRANSACTION_ID
        showWaitingModal();
        eligibility(number, reqAmount, loanTenure, txnId, panNumber, (res)=>{
            console.log(res)
            if(res?.data?.data?.status === 1){
                let resData = res?.data?.data?.data;

                let forwardingData = {
                    "loanTenure" : loanTenure,
                    "loanAmount" : reqAmount,
                    "txnId" : txnId,
                    "pInstId" : resData?.PINSTID,
                    "number" : number
                }

                navigate("/patient/congratsApprovedIcici", {
                    state : {
                        "data" : forwardingData
                    }
                })
            }
        }, hideWaitingModal)
    }
    return(
        <main style={{display: "flex", flexDirection:"column", gap:"1rem"}}>
            <Header progressbarDisplay='none' />
            <StepBar currStep={2} />

            <h3 style={{margin:"1rem 0"}}>EMI options</h3>

            {/* <p>Confirm credit amount</p> */}

            <div className="PAN">
            <p style={{marginBottom:"12px"}}>What is your PAN number?</p>
            {/* <input type="text"
                id="pan"
                value={panNumber ?? ""} 
                onChange={(e)=> handlePan(e.target.value)}
                placeholder="Enter PAN" 
                autoCapitalize="characters"
                required
            /> */}
            <InputBox
                value={panNumber}
                setValue={handlePan}
                placeholder="Enter your PAN here"
                styles={{
                    marginBottom:"12px"
                }}
            />
            {error && <span style={{color:"red", fontSize:"14px"}}>Please enter correct PAN number</span>}
            </div>

            <button className="submit" onClick={()=>checkEligibilityAndNavigate()}>Verify</button>

        </main>
    )
}

export default PanVerificationKotak