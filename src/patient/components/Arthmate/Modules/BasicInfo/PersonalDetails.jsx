//PersonalDetails
import './styles/personalDetails.scss'

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import { useData } from "../../data";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../../environment/environment"
import { Header } from '../../comps/Header';

const ArthPersonalDetails = () =>{

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    
    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "Personal_Details"
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
    
    const [aadhaarNumber, setAadhaarNumber] = useState("")
    const [panNumber, setPanNumber] = useState("")
    const [isPanValid, setPanValid] = useState(false)
    const [fatherName, setFatherName] = useState("")
    const [nameOnPan, setNameOnPan] = useState("")
    const [number, setNumber] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [maritalStatus, setMaritalStatus] = useState("Unmarried")
    
    const [altNumber, setAltNumber] = useState("")

    const [refName, setRefName] = useState("");
    const [refNumber, setRefNumber] = useState("");
    const [refRelation, setRefRelation] = useState("");

    
    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    
    let ref = useRef(0);
    let userId = localStorage.getItem('userId');
    let name = localStorage.getItem('fullName');

    useEffect(()=>{
        setNumber(localStorage.getItem('phoneNumber'))
        ref.current = document.getElementById('animation-wrapper');

        if(!!userId){
            axios.get(env.api_Url + "userDetails/getUserDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.message === "success"){
                    let data = response?.data?.data;
                    handlePan(data?.panNo);
                    if(data?.firstName != null) setAadhaarNumber(data?.firstName);
                    // setFatherName(data?.fatherName);
                    setNameOnPan(data?.panCardName)
                    setNumber(data?.mobileNumber)
                    setGender(data?.gender);
                    // let date = data?.dateOfBirth.split('-').reverse().join('-');
                    // console.log(data?.dateOfBirth)
                    setDob(data?.dateOfBirth)
                    setEmail(data?.emailId)
                    setMaritalStatus(data.maritalStatus ?? "Unmarried");
                    setAltNumber(data?.alternateNumber ?? "");
                    setRefName(data?.referenceName ?? "");
                    setRefNumber(data?.referenceNumber ?? "");
                    setRefRelation(data?.referenceRelation ?? "");
                    if(response.data.data.panNo === null){
                        getDataFromDecentro();
                    }
                }else{
                    getDataFromDecentro();
                }
            }).catch(error =>{
                getDataFromDecentro();
                console.log(error)
            })
        }
    },[])


    function getDataFromDecentro(){
        axios.get(env.api_Url+"getCibilDataDecentro?consent=true&userId="+ userId +"&name=" + name)
        .then(response=>{
            console.log(response);
            if(response.data.message === "success"){
                const idandContactInfo = response?.data?.data?.data?.cCRResponse?.cirreportDataLst[0]?.cirreportData?.idandContactInfo;
                let panCardData = idandContactInfo?.identityInfo?.panid[0]?.idNumber;
                handlePan(panCardData);
                let emailData = "";
                if(idandContactInfo?.emailAddressInfo){
                    emailData = idandContactInfo.emailAddressInfo[0]?.emailAddress
                }
                setEmail(emailData);
                let dobData = idandContactInfo?.personalInfo?.dateOfBirth;
                setDob(dobData);
                let genderData = idandContactInfo?.personalInfo?.gender;
                setGender(genderData);
                let fullNameData = idandContactInfo?.personalInfo?.name?.fullName;
                setAadhaarNumber(fullNameData);
            }
        })
    }



    //////////////////////////////// DOB restriction ///////////////////////////////////////
    ////// Below code is to calculate the maximum date the user can input as DOB.///////////
    const today = new Date();
    let day = today.getDate();
    day = (day<10? "0"+day : day);
    let month = today.getMonth() + 1;
    month = (month<10? "0"+month : month);
    let year = today.getFullYear();
    year = year-18; // to restrict the minimum age of user to 18 years.

    let maxDateForDob = `${year}-${month}-${day}`; // 'yyyy-mm-dd' - format compulsion
    ////////////////////////// DOB restriction code ended //////////////////////////////////


    ///////////// To validate Date of Birth & Email format ///////////////////
    function isDataValid(data, datatype){
        switch(datatype){
            case "dob":
                if(!data) return false;
                data = data.split('-')[0];
                data = data * 1; // to convert string to number
                year = year * 1;
                if(data <= year) return true;
                return false;

            case "email":
                if(data.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )) return true;
                return false;
        }
    }

    //////////// To alert the user about wrong formatted input ////////////////////
    // function showErrorOnUI(elem){
    //     elem.scrollIntoView({ behavior: "smooth", block: "center"});
    //     elem.classList.add('inputBoxError');

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    // const onlyCharRegex = new RegExp("^[a-zA-Z\\s]*$");
    const onlyCharRegex = /^[a-zA-Z\s]*$/;
    function onlyCharacters(val, setter){
        if(onlyCharRegex.test(val)){
            setter(val);
        }
    }


    async function handleForm(){
        // if(!(panNumber && fullName && gender && email && dob)){ // All feilds must have something
        //     return;
        // }

        if(! isPanValid){
            let elem = document.getElementById('pan');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(!aadhaarNumber || aadhaarNumber.length<12){
            let elem = document.getElementById('aadhaarNumber');
            if(elem) showErrorOnUI(elem);
            return;
        }
       

        if(!isDataValid(email, "email")){ // validate Email
            let elem2 = document.querySelectorAll('[type="email"]')[0];
            if(elem2) showErrorOnUI(elem2);
            return;
        }
        if(!isDataValid(dob, "dob")){ // validate Date of Birth
            let elem1 = document.querySelectorAll('[type="date"]')[0];
            if(elem1) showErrorOnUI(elem1);
            return;
        }

        if(! gender){
            let elem = document.getElementById('gender');
            if(elem) showErrorOnUI(elem);
            return;
        }


        localStorage.setItem("email", email);

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        // Data validation is done, now we can send the data to the server

        let submitObj = {
            "panCard": panNumber,
            "panCardName": nameOnPan,
            "gender": gender,
            "emailId": email,
            "dateOfBirth": dob,
            "mobileNumber": number,
            "maritalStatus": maritalStatus,
            "alternateNumber":altNumber,
            // "fatherName": fatherName,
            "referenceName": refName,
            "referenceNumber": refNumber,
            "referenceRelation": refRelation,
            "userId" : localStorage.getItem('userId'),
            "formStatus": ""
        };

        await axios.post(env.api_Url + "userDetails/basicDetail",
            submitObj)
            .then((response) => {
                console.log(response)
                if(response.data.message === "success"){
                    let id = response.data.data.userId;
                    localStorage.setItem("userId", id);
                    navigate('/patient/AddressDetails');
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

    // function handlePan(e){
    //     let val = e.target.value;
    //     if(val.length == 10){
    //         let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
    //         console.log(regex.test(val))
    //         if (regex.test(val) == false) {
    //             let errorMsg = document.getElementById('panFormat');
    //             errorMsg.style.visibility = "visible";
    //         }else{
    //             let errorMsg = document.getElementById('panFormat');
    //             errorMsg.style.visibility = "hidden";
    //         }
    //     }
    //     if(val.length > 10) return
    //     setPanNumber(val);
    //     // console.log(val)
    // }
    function handlePan(val){
        if(val === null || val === undefined) return;
        val = val.toUpperCase();
        if(val.length<10) setPanValid(false);
        if(val.length === 10){
            let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
            console.log(regex.test(val))
            if (regex.test(val) === false) {
                let errorMsg = document.getElementById('panFormat');
                errorMsg.style.display = "block";
                setPanValid(false);
            }else{
                let errorMsg = document.getElementById('panFormat');
                errorMsg.style.display = "none";
                setPanValid(true);
            }
        }
        if(val.length > 10) return
        setPanNumber(val);
    }
    const numericOnlyRegex = new RegExp('^[0-9]*$');
    function numberChange(val){
        if(! numericOnlyRegex.test(val)) return;
        if(val.length > 12) return;
        setAadhaarNumber(val)
    }
    

   return(
    <>
    <main className="personalDetails">
    {
    <>
        <Header />
        <h3>Personal Details</h3>
        <div style={{width:"100%", background:"#FAE1CD", padding:"12px", borderRadius:"4px", textAlign:"center", marginBottom:"2rem"}}>
            Please verify the following information.
        </div>

            <div className="PAN">
                <p>PAN number</p>
                <input type="text"
                    id="pan"
                    value={panNumber ?? ""} 
                    onChange={(e)=> handlePan(e.target.value)}
                    placeholder="Enter PAN" 
                    autoCapitalize="characters"
                    required
                    />
                <span id="panFormat">Please enter correct PAN number</span>
            </div>

            <div className="aadhaarNumber">
                <p>Aadhaar number</p>
                <input type="text" 
                    id="aadhaarNumber"
                    value={aadhaarNumber ?? ""} 
                    onChange={(e)=> numberChange(e.target.value)}  
                    placeholder="What is your aadhaar number?" 
                    required 
                    />
                <span className="fieldError">This field can't be empty.</span>
            </div>

            <div className="email">
                <p>Mail ID</p>
                <input type="email"
                    value={email ?? ""} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter E-mail ID" 
                    required 
                    />
                <span className="fieldError">This field can't be empty.</span>
            </div>

            <div className="fatherName">
                <p>Father's name</p>
                <input type="text" 
                    id="fatherName"
                    value={fatherName ?? ""} 
                    onChange={(e)=> setFatherName(e.target.value)} 
                    placeholder="Enter your father's name" 
                    required 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>

            <div className="DOB">
                <p>Date of birth</p>
                <input type="date" 
                    value={dob ?? ""}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Select Date"
                    max ={maxDateForDob}
                    />
                <span className="fieldError">Please enter correct DOB.</span>
            </div>

            <div className="gender" id="gender">
                <p>Gender</p>
                <div className="radioOption">
                    <input type="radio" id="male" name="gender" checked={gender?.toLowerCase() === "male"} onChange={(e)=> setGender(e.target.value)} value="male" />
                    <label htmlFor="male">Male</label><br />
                </div>
                <div className="radioOption">
                    <input type="radio" id="female" name="gender" checked={gender?.toLowerCase() === "female"} onChange={(e)=> setGender(e.target.value)} value="female" />
                    <label htmlFor="female">Female</label><br />
                </div>
                <div className="radioOption">
                    <input type="radio" id="other" name="gender" checked={gender?.toLowerCase() === "other"} onChange={(e)=> setGender(e.target.value)} value="other" />
                    <label htmlFor="other">Other</label><br />
                </div>
            </div>
            <span className="fieldError">This field can't be empty.</span>

        
            <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
            <button onClick={()=>handleForm()} className="submit">Confirm</button>
        </>
        }
    </main>
    </>
   )
}


export default ArthPersonalDetails
