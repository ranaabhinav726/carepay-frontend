import Header from "../../Header/Header"
import './employmentDetails.scss'

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// import { useData } from "../../data";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../environment/environment"
import { Link } from "react-router-dom";
import BottomPopOverModal from '../../utility/BottomPopOverModal'
import { BsFillInfoCircleFill } from "react-icons/bs";

const EmploymentDetails = () =>{
    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    
    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "Employment_Details"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, [])

    // const data = useData();
    const navigate = useNavigate();

    const [empType, setEmpType] = useState('SALARIED');
    const [salary, setSalary] = useState('');
    // const [salaryDate, setSalaryDate] = useState('1');
    const [familyIncome, setFamilyIncome] = useState("");
    const [companyName, setCompanyName] = useState('');
    const [businessType, setBusinessType] = useState('Public Limited Company');
    const [businessName, setBusinessName] = useState('');

    const [loanAmt, setLoanAmount] = useState('');
    
    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const [showPopOver, setShowPopOver] = useState(false);

    const [studentMsg, toggleStudentMsg] = useState(false);

    let userId = localStorage.getItem("userId");

    let ref = useRef(0);

    const [errorMsg, setErrorMsg] = useState("This field can't be empty.")

    let specialChars =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~]/;

    let popUpMsg  = <p style={{color:"black"}}>Are you sure <b>{salary}</b> is your <b>monthly</b> in-hand income?</p>;


    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.status === 200){
                    let data = response.data.data;
                    if(!! data){
                        setLoanAmount(data.loanAmount);
                    }
                }
            }).catch(()=>{
                console.log("Error fetching data");
            })
        }

    },[])

    // const list = ["Ecommerce","FMCG","Healthcare & Diagnostics","IT & ITeS",
    //                 "Oil and Gas","Railways","Telecommunications","Cement","Consumer Durables",
    //                 "Education and Training","Engineering & Infrastructure","Capital Goods",
    //                 "Auto Components","Automobiles","Gems and Jewellery","Aviation","Manufacturing",
    //                 "Media and Entertainment","Metals And Mining","Power","Real Estate","Retail",
    //                 "Textiles","Insurance (Life and health)","Pharmaceuticals","Dairy Products",
    //                 "Fertilisers & Seeds","Food & Food Products","Sugar, Tea, Coffee",
    //                 "Hotel, Restaurants & Tourism","Microfinance Institutions","Shipping",
    //                 "Ports & Port Services","Banking and Finance","Agriculture and Allied", "Other"
    //             ];

    // let options = list.map((item, idx)=>{
    //     return <option value={item} key={idx}>{item}</option>
    // })
            

    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getUserEmploymentByUserId?userId=" + userId)
            .then(response => {
                if(response.data.status === 200){
                    console.log(response)
                    let data = response.data.data;
                    if(!! data){
                        setSalary(data.monthlyInHandSalary);
                        setFamilyIncome(data.monthlyFamilyIncome ?? "0");
                        setCompanyName(data.currentCompanyName);
                        setEmpType(data.employmentType)
                        
                        setBusinessName(data.nameOfBusiness)
                        setBusinessType(data.typeOfBusiness)
                    }
                }
            }).catch(()=>{
                console.log("Error fetching data");
            })
        }
    },[])

    function salaryError(){
        let elem = document.getElementById('salary');
        if(elem) showErrorOnUI(elem);
        return;
    }

    async function checkAndNavigate(){
        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current);
        
        let submitObj = {
            "userId" : userId,
            "employmentType": empType,
            "netTakeHomeSalary": salary,
            "organizationName": companyName,
            "nameOfBusiness":businessName,
            "typeOfBusiness":businessType,
            "monthlyFamilyIncome": (familyIncome?familyIncome:0),
            "formStatus": ""
          };

        await axios.post(env.api_Url + "userDetails/employmentDetail", 
            submitObj)
            .then((response) => {
                console.log(response)
                if(response.data.message === "success"){

                    if(loanAmt <= 300001){
                        navigate('/patient/CreditFairOffers');
                    }else{
                        navigate('/patient/BankDetails');
                    }
                }else{
                    apiErrorHandler();
                }
            }).catch(error => {
                console.log(error);
                apiErrorHandler();
              });
        setCanSubmit(true);
        hideWrapper(ref.current)
    }
    
    async function handleSubmit(){
        if(!(empType && salary && companyName)){
            console.log(empType, businessType, salary, familyIncome, companyName)
            // return;
        }

        if(empType.toUpperCase() === "SALARIED"){
            if(!companyName){ 
                let elem = document.getElementById('companyName');
                if(elem) showErrorOnUI(elem);
                return;
            }
            if(specialChars.test(companyName)){
                let elem = document.getElementById('companyName');
                setErrorMsg("Special characters are not allowed.");
                setTimeout(() => {
                    setErrorMsg("This field can't be empty.");
                }, 3000);
                if(elem) showErrorOnUI(elem);
                return;
            }
        }else{
            if(!businessName){ 
                let elem = document.getElementById('businessName');
                if(elem) showErrorOnUI(elem);
                return;
            }
            if(specialChars.test(businessName)){
                let elem = document.getElementById('businessName');
                setErrorMsg("Special characters are not allowed.");
                setTimeout(() => {
                    setErrorMsg("This field can't be empty.");
                }, 3000);
                if(elem) showErrorOnUI(elem);
                return;
            }
        }

        if(!salary){
            let elem = document.getElementById('salary');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(salary >= 300000){
            setShowPopOver(true);
            return;
        }
        console.log("less than 3 lac")
        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current);
        
        let submitObj = {
            "userId" : userId,
            "employmentType": empType,
            "netTakeHomeSalary": salary,
            "organizationName": companyName,
            "nameOfBusiness":businessName,
            "typeOfBusiness":businessType,
            "monthlyFamilyIncome": (familyIncome?familyIncome:0),
            "formStatus": ""
          };

        await axios.post(env.api_Url + "userDetails/employmentDetail", 
            submitObj)
            .then((response) => {
                console.log(response)
                if(response.data.message === "success"){

                    if(loanAmt <= 300001){
                        navigate('/patient/CreditFairOffers');
                    }else{
                        navigate('/patient/BankDetails');
                    }
                }else{
                    apiErrorHandler();
                }
            }).catch(error => {
                console.log(error);
                apiErrorHandler();
              });
    setCanSubmit(true);
    hideWrapper(ref.current)
    }
    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 1500);
    }

    let dates =[];
    for(let i=1; i<32; i++){
        dates.push(<option value={i} key={i}>{i}</option>)
    }

    let expYears=[];
    for(let i=0; i<=20; i++){
        if(i==20){
            expYears.push(<option value={i} key={i}>{i}+</option>)
        }else{
            expYears.push(<option value={i} key={i}>{i}</option>)
        }
    }
    let expMonths=[];
    for(let i=0; i<=11; i++){
        expMonths.push(<option value={i} key={i}>{i}</option>)
    }


    const empTypes = ["SALARIED", "SELF_EMPLOYED"];
    const radios = empTypes.map((option, idx)=>{
        let label = option.toLowerCase().replace("_", " ");
        label = label.charAt(0).toUpperCase() + label.slice(1);
        return(
            <div style={{display:"flex", gap:"12px", alignItems:"center", padding:"12px 0", marginBottom:"0"}} key={idx} >
                <input 
                    id={option} 
                    name={"empType"} 
                    value={option}
                    type="radio"
                    checked={empType === option}
                    onChange={(e)=>setEmpType(e.target.value)}
                    style={{
                        height:"24px", 
                        width:"max-content",
                        aspectRatio:"1/1",
                        border:"2px solid #5E5E5E",
                        accentColor:"#514C9F"
                    }}
                />
                <label 
                htmlFor={option}
                style={{
                    fontSize:"16px",
                    lineHeight:"20px"
                }}
                >
                    {label}
                </label>
                <br/>
            </div>
            
        )
    })


   return(

    <>
    <main className="employmentDetails" style={{position:"relative"}}>
    <Header progressbarDisplay="block" progress="70" canGoBack="/patient/AddressDetails" />
        <h3>Employment Details</h3>

        <div id={"selectEmployementType"} style={{borderRadius:"4px", marginBottom:"0"}}>
            {radios}
        </div>
        <div 
            style={{
                display:"flex", 
                gap:"12px", 
                alignItems:"center", 
                padding:"12px 0", 
                margin:"0 0 14px 0", 
                cursor:"pointer", 
                opacity:"0.4", 
                position:"relative"
            }}
            onClick={()=>toggleStudentMsg(!studentMsg)}
        >
            <input 
                id={"student"} 
                disabled
                type="radio"
                style={{
                    height:"24px", 
                    width:"max-content",
                    aspectRatio:"1/1",
                    border:"2px solid #5E5E5E",
                    accentColor:"#514C9F"
                }}
            />
            <label 
            htmlFor={"student"}
            style={{
                fontSize:"16px",
                lineHeight:"20px",
                cursor:"pointer",
                userSelect:"none"
            }}
            >
                Student/Unemployed
            </label>
            <BsFillInfoCircleFill style={{position:"absolute", right:"0"}} />
        </div>

        {studentMsg &&
            <>
                <p 
                style={{
                    fontSize:"14px", 
                    lineHeight:"18px",
                    color:"#00000066",
                }}
                >
                    We currently don’t finance students or unemployed borrowers. In case you are in any of these two categories, you can have your blood relative apply for your credit.
                </p>
                <p style={{
                    fontSize:"14px", 
                    lineHeight:"18px",
                    color:"#00000066",
                    marginBottom:"1rem"
                }}>
                    Need assistance? <Link to={"tel:+918069489655"} style={{color:"#514C9F", fontWeight:"700", textDecoration:"underline"}}>Contact Support</Link>
                </p>
            </>
        }

        {empType === "SALARIED" ?
            <div className="companyName">
                <p>Current company name</p>
                <input 
                    id="companyName"
                    type="text" 
                    value={companyName}
                    onChange={(e)=>setCompanyName(e.target.value)}
                    placeholder="what is your company name?" 
                />
                <span className="fieldError">{errorMsg}</span>
            </div>
            :
            <>
                <div className="businessType">
                    <p>Type of business</p>
                    <select 
                        id="businessType"
                        onChange={(e)=>setBusinessType(e.target.value)}
                        value={businessType}
                        placeholder="Enter type of business" 
                    >
                        <option value="Public Limited Company">Public Limited Company</option>
                        <option value="Private Limited Company">Private Limited Company</option>
                        <option value="Limited Liability Partners">Limited Liability Partners</option>
                        <option value="Limited Liability Company">Limited Liability Company</option>
                        <option value="Partnership Firm">Partnership Firm</option>
                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                        <option value="One-person company">One-person company</option>
                    </select>
                </div>
                <div className="businessName">
                    <p>Name of business</p>
                    <input 
                        id="businessName"
                        type="text" 
                        value={businessName}
                        onChange={(e)=>setBusinessName(e.target.value)}
                        placeholder="What is the name of your business?" 
                    />
                    <span className="fieldError">{errorMsg}</span>
                </div>
            </>
        }

        <div className="income">
            <p>Monthly in-hand salary/income</p>
            <input 
                id="salary"
                type="number" 
                value={salary}
                onChange={(e)=>setSalary(e.target.value)}
                placeholder="Enter your monthly in-hand income" 
            />
            <span className="fieldError">Please enter your monthly in-hand income.</span>
        </div>

        <div className="familyIncome">
            <p>Monthly family income (optional)</p>
            <input 
                type="number" 
                value={familyIncome}
                onChange={(e)=>setFamilyIncome(e.target.value)}
                placeholder="Enter your family's monthly income" 
            />
        </div>
        
        <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
        <button onClick={handleSubmit} className="submit">Submit</button>
        <BottomPopOverModal 
            popUpMsg={popUpMsg} 
            showPopOver={showPopOver} 
            setShowPopOver={setShowPopOver} 
            checkAndNavigate={checkAndNavigate} 
            yesBtnText={"Yes"} 
            noBtnText={"No"} 
            noBtnClick={salaryError}
        />
    </main>
    </>
   )
}


export default EmploymentDetails
