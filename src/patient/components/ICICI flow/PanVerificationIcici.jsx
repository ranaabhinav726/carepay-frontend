import { useState } from "react";
import Header from "../Header/Header"
import StepBar from "./comps/StepBar"
import InputBox from "./comps/InputBox";

function PanVerificationIcici(){

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

            <button className="submit">Verify</button>

        </main>
    )
}

export default PanVerificationIcici