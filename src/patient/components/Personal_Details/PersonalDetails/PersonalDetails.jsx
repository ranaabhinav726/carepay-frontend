import Header from "../../Header/Header"
import './personalDetails.scss'

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import { useData } from "../../data";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../environment/environment"
import SelectAndVerify from '../../utility/SelectAndVerify'

const PersonalDetails = () =>{

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
    
    
    const [panNumber, setPanNumber] = useState("")
    const [isPanValid, setPanValid] = useState(false)
    const [fullName, setFullName] = useState("")
    // const [fatherName, setFatherName] = useState("")
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

    const [refErrorMsg, setRefErrorMsg] = useState("This field can't be empty.");
    
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
                    setFullName(data?.firstName);
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
                setFullName(fullNameData);
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

    async function handleForm(){
        // if(!(panNumber && fullName && gender && email && dob)){ // All feilds must have something
        //     return;
        // }

        if(! isPanValid){
            let elem = document.getElementById('pan');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! fullName){
            let elem = document.getElementById('fullName');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! gender){
            let elem = document.getElementById('gender');
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

        //fatherName
        // if(! fatherName){
        //     let elem = document.getElementById('fatherName');
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }

        // if(altNumber && )

        if(! refNumber){
            let elem = document.getElementById('refNumber');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(refNumber == number || refNumber == altNumber){
            let elem = document.getElementById("refNumber");
            if(elem){
                setRefErrorMsg("This can't be same as your number.");
                setTimeout(()=>{
                    setRefErrorMsg("This field can't be empty.");
                }, 3000)
                showErrorOnUI(elem);  
            }

            return;
        }

        if(! refName){
            let elem = document.getElementById('refName');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! refRelation){
            let elem = document.getElementById('refRelation');
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
            "firstName": fullName,
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
                    localStorage.setItem("username", fullName);
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

    function numberChange(e, name){
        let val = e.target.value;
        if(val.length > 10) return;
        if(name === "altNumber"){
            setAltNumber(val);
        }else{
            setRefNumber(val);
        }
    }
    

   return(
    <>
    <main className="personalDetails">
    <Header progressbarDisplay="block" progress="32" />
    <SelectAndVerify text={"Please verify your details"} />
        <h3>Personal Details</h3>

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

        <div className="fullName">
            <p>Full name (as per PAN)</p>
            <input type="text" 
                id="fullName"
                value={fullName ?? ""} 
                onChange={(e)=> setFullName(e.target.value)} 
                placeholder="Enter your full name" 
                required 
            />
            <p style={{marginTop:"10px", marginBottom:"20px", fontSize:"14px"}}>If not sure, please check your PAN and then enter the name accordingly.</p>
            <span className="fieldError">This field can't be empty.</span>
        </div>

        <div className="gender" id="gender">
            <p>Gender</p>
            <div className="radioOption">
                <input type="radio" id="male" name="gender" checked={gender === "Male"} onChange={(e)=> setGender(e.target.value)} value="Male" />
                <label htmlFor="male">Male</label><br />
            </div>
            <div className="radioOption">
                <input type="radio" id="female" name="gender" checked={gender === "Female"} onChange={(e)=> setGender(e.target.value)} value="Female" />
                <label htmlFor="female">Female</label><br />
            </div>
            <div className="radioOption">
                <input type="radio" id="other" name="gender" checked={gender === "Other"} onChange={(e)=> setGender(e.target.value)} value="Other" />
                <label htmlFor="other">Other</label><br />
            </div>
            <div className="radioOption">
                <input type="radio" id="preferNotToSay" name="gender" checked={gender === "Prefer not to say"} onChange={(e)=> setGender(e.target.value)} value="Prefer not to say" />
                <label htmlFor="preferNotToSay">Prefer not to say</label>
            </div>
        </div>
        <span className="fieldError">This field can't be empty.</span>

        <div className="email">
            <p>E-mail ID</p>
            <input type="email"
                value={email ?? ""} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter E-mail ID" 
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

        {/* <div className="fatherName">
            <p>Father's name</p>
            <input type="text" 
                id="fatherName"
                value={fatherName ?? ""} 
                onChange={(e)=> setFatherName(e.target.value)} 
                placeholder="Enter your father's name" 
                required 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div> */}

        <div className="marital-status">
            <p>Marital status</p>
            <select name="marital-status" value={maritalStatus} onChange={(e)=>setMaritalStatus(e.target.value)}>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
            </select>            
        </div>

        <div className="altNumber">
            <p>Alternate number (optional)</p>
            <input 
                type="number" 
                inputMode="numeric" 
                onChange={(e)=> numberChange(e, "altNumber")} 
                value={altNumber ?? ""} 
                placeholder="Enter your alternate mobile number" 
             />
        </div>
        
        <h3>Reference details</h3>
        <p style={{marginBottom:"1.5rem"}}>NOTE: The reference has to be your blood relation</p>

        <div className="referenceNumber">
            <p>Reference contact number</p>
            <input 
                id="refNumber"
                type="number" 
                inputMode="numeric" 
                onChange={(e)=> numberChange(e, "referenceNumber")} 
                value={refNumber ?? ""} 
                placeholder="Enter reference contact number" 
             />
             <span className="fieldError">{refErrorMsg}</span>
        </div>

        <div className="referenceName">
            <p>Name of owner of number</p>
            <input type="text" 
                id="refName"
                value={refName ?? ""} 
                onChange={(e)=> setRefName(e.target.value)} 
                placeholder="Enter name of owner of the number" 
                required 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div>

        <div className="referenceRelation">
            <p>Relation to owner of number</p>
            <input type="text" 
                id="refRelation"
                value={refRelation ?? ""} 
                onChange={(e)=> setRefRelation(e.target.value)} 
                placeholder="Enter relation to owner of the number" 
                required 
            />
            <span className="fieldError">This field can't be empty.</span>
        </div>

        <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
        <button onClick={()=>handleForm()} className="submit">Submit</button>
    </main>
    </>
   )
}


export default PersonalDetails
