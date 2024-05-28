import { Header } from '../../comps/Header';
import './styles/employmentDetails.scss'

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// import { useData } from "../../data";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../../environment/environment"
import { Link } from "react-router-dom";
import { saveEmploymentDetails } from '../../servicesAndUtility/api';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import BottomPopOverModal from '../../../utility/BottomPopOverModal';

const ArthEmploymentDetails = () => {
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
    // const [companyAddL1, setCompanyAddL1] = useState('');
    // const [companyAddL2, setCompanyAddL2] = useState('');
    // const [pincode, setPincode] = useState('');
    // const [IndustryType, setIndustryType] = useState('Ecommerce');
    // const [IndustryTypeOther, setIndustryTypeOther] = useState('');

    const [totalExpYear, setTotalExpYear] = useState(0);
    const [totalExpMonth, setTotalExpMonth] = useState(0);
    // const [jobExpYear, setJobExpYear] = useState(0);
    // const [jobExpMonth, setJobExpMonth] = useState(0);

    const [loanAmt, setLoanAmount] = useState('');

    // const [cityName, setCityName] = useState("");
    // const [consent, setConsent] = useState(false);

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const [studentMsg, toggleStudentMsg] = useState(false);
    const [showPopOver, setShowPopOver] = useState(false);
    const [pincode, setPincode] = useState('');


    let userId = localStorage.getItem("userId");
    let doctorId = localStorage.getItem("doctorId");

    let ref = useRef(0);

    const [errorMsg, setErrorMsg] = useState("This field can't be empty.")

    let specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~]/;


    useEffect(() => {
        ref.current = document.getElementById('animation-wrapper');
        if (!!userId) {
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
                .then(response => {
                    if (response.data.status === 200) {
                        let data = response.data.data;
                        if (!!data) {
                            setLoanAmount(data.loanAmount);
                        }
                    }
                }).catch(() => {
                    console.log("Error fetching data");
                })
        }
        if (!!userId) {
            // axios.get(env.api_Url + "findSuitableNbfc?userId=" + userId + '&doctorId=' + doctorId)
            //     .then(response => {
            //         if (response.data.status === 200) {
            //             console.log(response.data.data)
            //             let data = response.data.data;
            //             if (!!data) {
            //                 window.localStorage.setItem('flowRedirect', data)
            //             }
            //         }
            //     }).catch(() => {
            //         console.log("Error fetching data");
            //     })
            // axios.post(env.api_Url + "leadAPI?userId=" + userId)
            //     .then((response) => {
            //         console.log(response)
            //         if (response.data.data.message === 'success') {
            //             axios.post(env.api_Url + "requestAScore?userId=" + userId)
            //                 .then((response) => {
            //                     console.log(response)
            //                 }).catch(error => {
            //                     console.log(error);
            //                 });
            //         }
            //     }).catch(error => {
            //         console.log(error);
            //     });

        }


    }, [])

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


    useEffect(() => {
        ref.current = document.getElementById('animation-wrapper');
        if (!!userId) {
            axios.get(env.api_Url + "userDetails/getUserEmploymentByUserId?userId=" + userId)
                .then(response => {
                    if (response.data.status === 200) {
                        console.log(response)
                        let data = response.data.data;
                        if (!!data) {
                            setSalary(data.monthlyInHandSalary);
                            // setSalaryDate(data.salaryDay);
                            setFamilyIncome(data.monthlyFamilyIncome ?? "0");
                            setCompanyName(data.currentCompanyName);
                            setEmpType(data.employmentType)

                            setBusinessName(data.nameOfBusiness)
                            setBusinessType(data.typeOfBusiness)

                            // setCompanyAddL1(data.workplaceAddress1);
                            // setCompanyAddL2(data.workplaceAddress2);
                            // handlePincode(data.workplacePincode);
                            // let industry = data.industry;
                            // if(list.includes(industry)){
                            //     setIndustryType(industry);
                            //     // console.log(industry)
                            // }else{
                            //     setIndustryType("Other");
                            //     setIndustryTypeOther(industry);
                            // }
                            // setTotalExpYear(data.totalJobExpInYears);
                            // setTotalExpMonth(data.totalJobExpInMonth);
                            // setJobExpMonth(data.currentJobExpInMonth);
                            // setJobExpYear(data.currentJobExpInYears)
                        }
                    }
                }).catch(() => {
                    console.log("Error fetching data");
                })
        }
    }, [])

    // function handleCompanyName(companyName){
    //     let filteredCompanyName = companyName.replaceAll("&", "and");
    //     setCompanyName(filteredCompanyName);
    // }

    // function handlePincode(val){
    //     if(val.length < 6){
    //         setPincode(val);
    //     }else if(val.length == 6){
    //         setPincode(val);
    //         axios.get(env.api_Url+"userDetails/codeDetail?code=" + val +"&type=zip")
    //         .then(response =>{
    //             console.log(response)
    //             let city = response?.data?.city;
    //             setCityName(city);
    //         }).catch(()=>{
    //             setCityName("Error fetching city name");
    //         })
    //     }
    // }

    // const today = new Date();
    // let year = today.getFullYear();
    // let month = today.getMonth()+1;

    // function showErrorOnUI(elem){
    //     elem.classList.add('inputBoxError');

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    // function expError(){
    //     let elem = document.getElementById('expError');
    //     if(elem) elem.style.display = "block";

    //     setTimeout(()=>{
    //         if(elem) elem.style.display = "none";
    //     }, 3000)
    // }

    async function handleSubmit() {
        // && totalExpYear && totalExpMonth && jobExpYear && jobExpMonth

        if (!(empType && salary && companyName)) {
            console.log(empType, businessType, salary, familyIncome, companyName)
            // return;
        }

        if (empType.toUpperCase() === "SALARIED") {
            if (!companyName) {
                let elem = document.getElementById('companyName');
                if (elem) showErrorOnUI(elem);
                return;
            }
            if (specialChars.test(companyName)) {
                let elem = document.getElementById('companyName');
                setErrorMsg("Special characters are not allowed.");
                setTimeout(() => {
                    setErrorMsg("This field can't be empty.");
                }, 3000);
                if (elem) showErrorOnUI(elem);
                return;
            }
        } else {
            if (!businessName) {
                let elem = document.getElementById('businessName');
                if (elem) showErrorOnUI(elem);
                return;
            }
            if (specialChars.test(businessName)) {
                let elem = document.getElementById('businessName');
                setErrorMsg("Special characters are not allowed.");
                setTimeout(() => {
                    setErrorMsg("This field can't be empty.");
                }, 3000);
                if (elem) showErrorOnUI(elem);
                return;
            }
        }

        if (!salary) {
            let elem = document.getElementById('salary');
            if (elem) showErrorOnUI(elem);
            return;
        }
        if (salary >= 300000) {
            setShowPopOver(true);
            return;
        }
        console.log("less than 3 lac")
        if (!canSubmit) {
            return;
        }
        // setCanSubmit(false);

        // if(!companyAddL1){ 
        //     let elem = document.getElementById('companyAddL1');
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }
        // if(specialChars.test(companyAddL1)){
        //     let elem = document.getElementById('companyAddL1');
        //     setErrorMsg("Special characters are not allowed.");
        //     setTimeout(() => {
        //         setErrorMsg("This field can't be empty.");
        //     }, 3000);
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }
        // if(!companyAddL2){ 
        //     let elem = document.getElementById('companyAddL2');
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }
        // if(specialChars.test(companyAddL2)){
        //     let elem = document.getElementById('companyAddL2');
        //     setErrorMsg("Special characters are not allowed.");
        //     setTimeout(() => {
        //         setErrorMsg("This field can't be empty.");
        //     }, 3000);
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }

        if(!pincode){
            let elem = document.getElementById('pincode');
            if(elem) showErrorOnUI(elem);
            return;
        }

        // if(IndustryType==="Other" && (! IndustryTypeOther)){
        //     let elem = document.getElementById('IndustryTypeOther');
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }

        // if(totalExpYear < jobExpYear){
        //     expError();
        //     return;
        // }else if(totalExpYear === jobExpYear && totalExpMonth < jobExpMonth){
        //     expError();
        //     return;
        // }

        // if(!consent){
        //     let elem = document.getElementById('consent');
        //     if(elem) showErrorOnUI(elem, false);
        //     return;
        // }

        if (!canSubmit) {
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current);

        let submitObj = {
            "userId": userId,
            "employmentType": empType,
            "netTakeHomeSalary": salary,
            // "salaryDay": salaryDate,
            "organizationName": companyName,
            "nameOfBusiness": businessName,
            "typeOfBusiness": businessType,
            // "workplaceAddress1": companyAddL1,
            // "workplaceAddress2":companyAddL2,
            "workplacePincode": pincode,
            "totalJobExpInYears": parseInt(totalExpYear),
            "totalJobExpInMonth": parseInt(totalExpMonth),
            // "currentJobExpInYears": parseInt(jobExpYear),
            // "currentJobExpInMonth": parseInt(jobExpMonth),
            "monthlyFamilyIncome": (familyIncome ? familyIncome : 0),
            "formStatus": ""
        };

        // if(IndustryType === "Other"){
        //     submitObj.industry = IndustryTypeOther;
        // }else{
        //     submitObj.industry = IndustryType;
        // }

        //   if(!!familyIncome){
        //     submitObj.monthlyFamilyIncome = familyIncome;
        //   }

        //   if(!!companyAddL2){
        //     submitObj.workplaceAddress2 = companyAddL2;
        //   }

        saveEmploymentDetails(submitObj, res => {
            if (res.data.message === "success") {
                navigate("/patient/ArthCurrentEMIExpenses");
            }
        })
        // await axios.post(env.api_Url + "userDetails/employmentDetail", 
        //     submitObj)
        //     .then((response) => {
        //         console.log(response)
        //         if(response.data.message === "success"){

        //             if(loanAmt <= 300001){
        //                 navigate('/patient/CreditFairOffers');
        //             }else{
        //                 navigate('/patient/BankDetails');
        //             }
        //             // navigate('/patient/LoanDetails');
        //         }else{
        //             apiErrorHandler();
        //         }
        //     }).catch(error => {
        //         console.log(error);
        //         apiErrorHandler();
        //       });
        setCanSubmit(true);
        hideWrapper(ref.current)
    }
    function apiErrorHandler() {
        setApiError(true)
        setTimeout(() => {
            setApiError(false);
        }, 1500);
    }

    async function checkAndNavigate() {
        if (!canSubmit) {
            return;
        }
        let submitObj = {
            "userId": userId,
            "employmentType": empType,
            "netTakeHomeSalary": salary,
            // "salaryDay": salaryDate,
            "organizationName": companyName,
            "nameOfBusiness": businessName,
            "typeOfBusiness": businessType,
            // "workplaceAddress1": companyAddL1,
            // "workplaceAddress2":companyAddL2,
            "workplacePincode": pincode,
            "totalJobExpInYears": parseInt(totalExpYear),
            "totalJobExpInMonth": parseInt(totalExpMonth),
            // "currentJobExpInYears": parseInt(jobExpYear),
            // "currentJobExpInMonth": parseInt(jobExpMonth),
            "monthlyFamilyIncome": (familyIncome ? familyIncome : 0),
            "formStatus": ""
        };

        // if(IndustryType === "Other"){
        //     submitObj.industry = IndustryTypeOther;
        // }else{
        //     submitObj.industry = IndustryType;
        // }

        //   if(!!familyIncome){
        //     submitObj.monthlyFamilyIncome = familyIncome;
        //   }

        //   if(!!companyAddL2){
        //     submitObj.workplaceAddress2 = companyAddL2;
        //   }

        saveEmploymentDetails(submitObj, res => {
            if (res.data.message === "success") {
                navigate("/patient/ArthCurrentEMIExpenses");
            }
        })
        // await axios.post(env.api_Url + "userDetails/employmentDetail", 
        //     submitObj)
        //     .then((response) => {
        //         console.log(response)
        //         if(response.data.message === "success"){

        //             if(loanAmt <= 300001){
        //                 navigate('/patient/CreditFairOffers');
        //             }else{
        //                 navigate('/patient/BankDetails');
        //             }
        //             // navigate('/patient/LoanDetails');
        //         }else{
        //             apiErrorHandler();
        //         }
        //     }).catch(error => {
        //         console.log(error);
        //         apiErrorHandler();
        //       });
        setCanSubmit(true);
        hideWrapper(ref.current)


    }




    // useEffect(()=>{
    //     axios.post(env.login_api_Url + "industry_list", {
    //             }, config )
    //         .then((response) => {
    //             console.log(response)
    //             if(response.status == '200'){
    //                 setList(response.data.industry_list);
    //             }
    //         }).catch(error => {
    //             console.log(error);
    //             });
    // }, []);


    let dates = [];
    for (let i = 1; i < 32; i++) {
        dates.push(<option value={i} key={i}>{i}</option>)
    }

    let expYears = [];
    for (let i = 0; i <= 20; i++) {
        if (i == 20) {
            expYears.push(<option value={i} key={i}>{i}+</option>)
        } else {
            expYears.push(<option value={i} key={i}>{i}</option>)
        }
    }
    let expMonths = [];
    for (let i = 0; i <= 11; i++) {
        expMonths.push(<option value={i} key={i}>{i}</option>)
    }


    const empTypes = ["SALARIED", "SELF_EMPLOYED"];
    const radios = empTypes.map((option, idx) => {
        let label = option.toLowerCase().replace("_", " ");
        label = label.charAt(0).toUpperCase() + label.slice(1);
        return (
            <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px 0", marginBottom: "0" }} key={idx} >
                <input
                    id={option}
                    name={"empType"}
                    value={option}
                    type="radio"
                    checked={empType === option}
                    onChange={(e) => setEmpType(e.target.value)}
                    style={{
                        height: "24px",
                        width: "max-content",
                        aspectRatio: "1/1",
                        border: "2px solid #5E5E5E",
                        accentColor: "#514C9F"
                    }}
                />
                <label
                    htmlFor={option}
                    style={{
                        fontSize: "16px",
                        lineHeight: "20px"
                    }}
                >
                    {label}
                </label>
                <br />
            </div>

        )
    })
    function handlePincode(val){
        if(val.length < 6){
            setPincode(val);
        }else if(val.length == 6){
            setPincode(val);
            // axios.get(env.api_Url+"userDetails/codeDetail?code=" + val +"&type=zip")
            // .then(response =>{
            //     console.log(response)
            //     let city = response?.data?.city;
            //     setCity(city);
            //     let state = response?.data?.state;
            //     setState(state);
            //     console.log()
            // })
        }
    }
    function salaryError() {
        let elem = document.getElementById('salary');
        if (elem) showErrorOnUI(elem);
        return;
    }
    let popUpMsg = <p style={{ color: "black", lineHeight: 'revert' }}>Are you sure <b>{Number(salary).toLocaleString("en-IN")}</b> is your <b>monthly</b> in-hand  income?</p>;

    return (

        <>
            <main className="employmentDetails" style={{ position: "relative" }}>
                <Header progressbarDisplay="block" progress="70" canGoBack="/patient/AddressDetails" />
                <h3>Employment Details</h3>

                {/* <div className="employementType">
            <p>Employment type</p>
            <select 
                onChange={(e)=>setEmpType(e.target.value)}
                name="empType" 
                id="selectEmployementType"
            >
                <option value="SALARIED">Salaried</option>
                <option value="SELF_EMPLOYED">Self employed</option>
                <option value="UNEMPLOYED">Unemployed</option>
                <option value="STUDENT">Student</option>
            </select>
        </div> */}

                <div id={"selectEmployementType"} style={{ borderRadius: "4px" }}>
                    {radios}
                </div>

                {/* <p 
        style={{
            fontSize:"14px", 
            lineHeight:"18px",
            color:"#00000066"
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
        </p> */}
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        // padding:"12px 0", 
                        margin: "0 0 14px 0",
                        cursor: "pointer",
                        opacity: "0.4",
                        position: "relative"
                    }}
                    onClick={() => toggleStudentMsg(!studentMsg)}
                >
                    <input
                        id={"student"}
                        disabled
                        type="radio"
                        style={{
                            height: "24px",
                            width: "max-content",
                            aspectRatio: "1/1",
                            border: "2px solid #5E5E5E",
                            accentColor: "#514C9F"
                        }}
                    />
                    <label
                        htmlFor={"student"}
                        style={{
                            fontSize: "16px",
                            lineHeight: "20px",
                            cursor: "pointer",
                            userSelect: "none"
                        }}
                    >
                        Student/Unemployed
                    </label>
                    <BsFillInfoCircleFill style={{ position: "absolute", right: "1px" }} />
                </div>

                {studentMsg &&
                    <>
                        <p
                            style={{
                                fontSize: "14px",
                                lineHeight: "18px",
                                color: "#00000066",
                            }}
                        >
                            We currently don’t finance students or unemployed borrowers. In case you are in any of these two categories, you can have your blood relative apply for your credit.
                        </p>
                        <p style={{
                            fontSize: "14px",
                            lineHeight: "18px",
                            color: "#00000066",
                            marginBottom: "1rem"
                        }}>
                            Need assistance? <Link to={"tel:+918069489655"} style={{ color: "#514C9F", fontWeight: "700", textDecoration: "underline" }}>Contact Support</Link>
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
                            onChange={(e) => setCompanyName(e.target.value)}
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
                                onChange={(e) => setBusinessType(e.target.value)}
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
                                onChange={(e) => setBusinessName(e.target.value)}
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

                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="Enter your monthly in-hand income"
                    />
                    <span className="fieldError">Please enter your monthly in-hand income.</span>
                </div>

                {/* <div className="salaryDate">
            <p>Salary credit date</p>
            <select 
                onChange={(e)=>setSalaryDate(e.target.value)}
                name="salaryDateSelection" 
                id="selectSalaryDate"
            >
                {dates}
            </select>
        </div> */}

                {/* <div className="familyIncome">
            <p>Monthly family income (optional)</p>
            <input 
                type="number" 
                value={familyIncome}
                onChange={(e)=>setFamilyIncome(e.target.value)}
                placeholder="Enter your family's monthly income" 
            />
        </div> */}


                {/* <div className="companyAddress-line1">
            <p>Current workplace address (line 1)</p>
            <input 
                id="companyAddL1"
                type="text" 
                value={companyAddL1 ?? ""}
                onChange={(e)=>setCompanyAddL1(e.target.value)}
                placeholder="Enter here" 
            />
            <span className="fieldError">{errorMsg}</span>
        </div> */}
                {/* <div className="companyAddress-line2">
            <p>Current workplace address (line 2)</p>
            <input 
                id="companyAddL2"
                type="text" 
                value={companyAddL2 ?? ""}
                onChange={(e)=>setCompanyAddL2(e.target.value)}
                placeholder="Enter here" 
            />
            <span className="fieldError">{errorMsg}</span>
        </div> */}
                <div className="companyPincode">
            <p>Current workplace Pincode</p>
            <input 
                id="pincode"
                type="number" 
                value={pincode ?? ""}
                onChange={(e)=>handlePincode(e.target.value)}
                placeholder="Enter here" 
                inputMode="numeric" 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div>
        {/* <p style={{marginTop:"-8px", marginBottom:"20px", color:"rgba(0,0,0,0.4)"}}>City : {cityName}</p> */}

                {/* <div className="IndustryType">
            <p>Industry</p>
            <select 
                id="selectIndustryType"
                onChange={(e)=>setIndustryType(e.target.value)} 
                name="IndType" 
                value={IndustryType}
            >
            {options}
            </select>
        </div>

        {IndustryType==="Other" &&
            <div className="IndustryTypeOther">
                <p>Type-In your industry</p>
                <input 
                    id="IndustryTypeOther"
                    type="text" 
                    value={IndustryTypeOther ?? ""}
                    onChange={(e)=>setIndustryTypeOther(e.target.value)}
                    placeholder="Please enter your working Industry" 
                />
            </div>} */}

                {/* <div className="timeInJob">
            <p>Time in this job</p>
            <div className="inputGroup">
                <select name=""
                    id=""
                    value={jobExpYear ?? 0}
                    onChange={(e)=>setJobExpYear(parseInt(e.target.value))}
                >
                    {expYears}
                </select>
                <p>Years</p>
                <select name=""
                    id=""
                    value={jobExpMonth ?? 0}
                    onChange={(e)=>setJobExpMonth(parseInt(e.target.value))}
                >
                    {expMonths}
                </select>
                <p>Months</p>
            </div>
        </div> */}

                <div className="totalExp">
                    <p>Experience in this company/business</p>
                    <div className="inputGroup">
                        <select name=""
                            id=""
                            value={totalExpYear ?? 0}
                            onChange={(e) => setTotalExpYear(parseInt(e.target.value))}
                        >
                            {expYears}
                        </select>
                        <p>Years</p>
                        <select name=""
                            id=""
                            value={totalExpMonth ?? 0}
                            onChange={(e) => setTotalExpMonth(parseInt(e.target.value))}
                        >
                            {expMonths}
                        </select>
                        <p>Months</p>
                    </div>
                    <span id="expError" className="fieldError">Time in current job can't be more than total experience</span>
                </div>

                {/* <div id="consent" className="consentBox">
            <input
            onClick={(e)=>setConsent(e.target.checked)} type="checkbox" />
            <label htmlFor="consent">I declare the above information is true and correct. I allow CareCoin Technologies Pvt Ltd and its lending partners to be my authorised representative and fetch my credit information from CIBIL/ Experian/ Equifax.</label><br />
        </div> */}

                <p className={apiError ? "apiError" : "apiError hide"}>An error has occured, please try again.</p>
                <button onClick={handleSubmit} className="submit">Next</button>

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


export default ArthEmploymentDetails
