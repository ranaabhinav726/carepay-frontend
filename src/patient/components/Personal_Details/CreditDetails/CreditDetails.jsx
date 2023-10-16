import { useEffect, useRef, useState } from "react"
import axios from "axios";
import Header from "../../Header/Header"
import "../../MobileNumberVerification/mobileNumberVerification.scss"

import rupeeIcon from '../../../assets/rupee.svg'

import { useNavigate } from "react-router-dom";
// import { useContext } from "react"
// import { DataContext } from "../../App"

import { env, showErrorOnUI, showWrapper, hideWrapper } from '../../../environment/environment'
// import { useData } from "../data";

const CreditDetails = () => {
    const [number, setNumber] = useState('')
    const [fullName, setFullName] = useState("");
    const [amount, setAmount] = useState("");
    const [treatment, setTreatment] = useState("");

    const [isPatient, setIsPatient] = useState(true);
    const [patientName, setPatientName] = useState("");
    const [relation, setRelation] = useState("");

    const [apiError, setApiError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("An error has occured, please try again.");
    const [canSubmit, setCanSubmit] = useState(true);

    // const [doctorId, setDoctorId] = useState("");
    // const [doctorName, setDoctorName] = useState("");

    const navigate = useNavigate();
    // const data = useData();
    // const data = useContext(DataContext);
    
    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
    },[])

    let doctorId = localStorage.getItem("doctorId")
    let doctorName = localStorage.getItem("doctorName")
    let userId = localStorage.getItem("userId");

    useEffect(()=>{
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.status === 200){
                    let data = response.data.data;
                    if(!! data){
                        setAmount(data.loanAmount);
                        setTreatment(data.loanReason);
                    }
                }
            }).catch(()=>{

            });
        }
    }, [])
    
    async function verifyAndNavigate(){
        if(! canSubmit){
            return;
        }

        if(! amount){
            let elem = document.getElementById('loanAmount');
            if(elem) showErrorOnUI(elem);
            return;
        }
        if(! treatment){
            let elem = document.getElementById('treatment');
            if(elem) showErrorOnUI(elem);
            return;
        }
        if(! isPatient){
            if(! patientName){
                let elem = document.getElementById('patientName');
                if(elem) showErrorOnUI(elem);
                return;
            }
            if(! relation){
                let elem = document.getElementById('relation');
                if(elem) showErrorOnUI(elem);
                return;
            }
        }
        if(! fullName){
            let elem = document.getElementById('fullName');
            if(elem) showErrorOnUI(elem);
            return;
        }
        if(! (doctorId && doctorName && userId)){
            setErrorMsg("Couldn't find your doctor details, please scan the QR again.");
            apiErrorHandler();
            setTimeout(() => {
                setErrorMsg("Something went wrong, please try again.")
            }, 3000);
            return;
        }

        setCanSubmit(false);
        showWrapper(ref.current)

        let submitObj = {
            "userId" : userId,
            "doctorName": doctorName,
            "doctorId": doctorId,
            "loanReason": treatment,
            "loanAmount": amount,
            "formStatus": ""
        };

        if(! isPatient){
            submitObj.patientName = patientName;
            submitObj.relationshipWithPatient = relation;
        }

        await axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(async(response) => {
                console.log(response)
                if(response.data.message === "success"){
                    // await handleNavigation();
                    localStorage.setItem("fullName", fullName);
                    navigate('/patient/PersonalDetails');
                }else{
                    // setErrorMsg()
                    apiErrorHandler();
                }
            }).catch(error => {
                apiErrorHandler();
                console.log(error);
            });

        // await axios
        //     .post(env.api_Url + "userDetails/sendOtpToMobile?mobile="+number, {}, )
        //     .then((response) => {
        //         console.log(response)
        //         if(response.data.status == 200){
        //             navigate('/patient/EnterOTP');
        //         }else{
        //             apiErrorHandler();
        //         }
        //     }).catch(error => {
        //     apiErrorHandler();
        //     console.log(error);
        // });
        setCanSubmit(true);
        hideWrapper(ref.current)
    }

    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 3000);
    }

    function amountHandler(val){
        // console.log(val)
        if(val === ""){
            setAmount("");
            return;
        }
        val = parseInt(val);
        if(val >= 0 && val <= 1000000){
            setAmount(val);
        }
    }

   return(
    <>
    <main className="mobileNumberVerification">
    <Header progressbarDisplay="none" />
        <h3 className="mobileVerificationHeading">Credit Details</h3>
        
        <div className="inputGroup">
            <p>Credit amount</p>
            <div className="inputBoxWithSymbol" style={{display:"flex", alignItems:"baseline"}}>
                <div className="rupeeSymbol" style={{padding: "0 16px"}}><img src={rupeeIcon} alt="" /></div>
                <input 
                    id="loanAmount"
                    type="text" 
                    value={amount} 
                    placeholder="Enter credit amount"
                    onChange={(e)=>amountHandler(e.target.value)}  
                />
            </div>
            <p style={{marginTop:"-8px", marginBottom:"20px", fontSize:"14px"}}>Please keep the credit amount under Rs 10,00,000</p>
            <span className="fieldError">Please enter your treatment cost</span>
        </div>

        <div className="inputGroup">
            <p>Treatment name</p>
            <input 
                id="treatment"
                type="text" 
                value={treatment} 
                placeholder="Name of treatment"
                onChange={(e)=>setTreatment(e.target.value)}  
            />
            <span className="fieldError">Please fill name of your treatment</span>
        </div>

        <div style={{marginBottom: "16px"}}>
            <input 
                id="isPatient"
                type="checkbox" 
                checked={isPatient} 
                placeholder="Name of treatment"
                onChange={(e)=>setIsPatient(! isPatient)}
            />
            <label htmlFor="isPatient" style={{paddingLeft:"10px", fontSize:"inherit"}}>I am the patient</label>
        </div>

        {! isPatient && 
        <>
            <div className="inputGroup">
                <p>Name of the patient</p>
                <input 
                    id="patientName"
                    type="text" 
                    value={patientName} 
                    placeholder="Enter name of the patient here"
                    onChange={(e)=>setPatientName(e.target.value)}  
                />
                <span className="fieldError">Please fill name of the patient</span>
            </div>
            <div className="inputGroup">
                <p>Your relationship to the patient</p>
                <input 
                    id="relation"
                    type="text" 
                    value={relation} 
                    placeholder="Enter your relation here"
                    onChange={(e)=>setRelation(e.target.value)}  
                />
                <span className="fieldError">Please tell your relation to the patient</span>
            </div>
        </>
    }

        <div className="inputGroup">
            <p>Full name (as per PAN)</p>
            <input 
                id="fullName"
                type="text" 
                value={fullName} 
                placeholder="Enter your name"
                onChange={(e)=>setFullName(e.target.value)}  
            />
            <span className="fieldError">Please enter your full name</span>
            <p style={{fontSize:"12.5px"}}>If not sure, please check your PAN and then enter the name accordingly.</p>
        </div>
        <p className={apiError?"apiError": "apiError hide"}>{errorMsg}</p>
        <button onClick={()=> verifyAndNavigate()} className="submit">Submit</button>
    </main>
    </>
   )

}

export default CreditDetails