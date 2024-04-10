import { useEffect, useState } from "react";
import { Header } from "./Comps/Header";
import InputBox from "./Comps/InputBox";
import InputBoxLabel from "./Comps/InputBoxLabel";
import ScreenTitle from "./Comps/ScreenTitle";
import RadioInput from "./Comps/RadioInput";
import axios from "axios";
import { env, hideWaitingModal, showWaitingModal } from "../../environment/environment";
import { useNavigate } from "react-router-dom";
import { showErrorOnUI } from "../../environment/environment";

import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/loader simple.json'


export default function Screen6(){
    const [pan, setPan] = useState("");
    const [isPanValid, setPanValid] = useState(false);

    const [email, setEmail] = useState("");
    const [isEmailValid, setEmailValid] = useState(false)

    const [dob, setDob] = useState("");
    const [pincode, setPincode] = useState("");

    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const [gender, setGender] = useState("")

    const [api1Status, setApi1Status] = useState(false);
    const [api2Status, setApi2Status] = useState(false);

    const [waiting, setWaiting] = useState(true);

    let userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    let name = localStorage.getItem('P_userName');

    // useEffect(()=>{
    //     getDataFromDecentro()
    // }, []);

    

    useEffect(()=>{
        if(!!userId){
            axios.get(env.api_Url + "userDetails/getUserDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.message === "success"){
                    let data = response?.data?.data;
                    handlePan(data?.panNo);
                    setEmail(data?.emailId)
                    setDob(data?.dateOfBirth)
                    setGender(data?.gender);

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

            axios.get(env.api_Url + "userDetails/getUserAddressByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.message === "success"){
                    let data = response?.data?.data;
                    if(data){
                        handlePincode(data.pincode);
                    }
                }
            }).catch(error =>{
                console.log(error)
            })
        }
    },[userId])


    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#searchAnimation"),
            animationData: animationData,
        //   renderer: "html"
        });
        setTimeout(() => {
            setWaiting(false);
        }, 3000);
    }, []);

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
                    handleEmail(emailData);
                    let dobData = idandContactInfo?.personalInfo?.dateOfBirth;
                    setDob(dobData);
                    let genderData = idandContactInfo?.personalInfo?.gender;
                    setGender(genderData);
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
    let maxYear = year-20; // to restrict the minimum age of user to 18 years.
    let minYear = year-60; // to restrict the minimum age of user to 18 years.

    let maxDateForDob = `${maxYear}-${month}-${day}`; // 'yyyy-mm-dd' - format compulsion
    let minDateForDob = `${minYear}-${month}-${day}`; // 'yyyy-mm-dd' - format compulsion
    ////////////////////////// DOB restriction code ended //////////////////////////////////

    function postDetails(){
        if(! isPanValid){
            let elem = document.getElementById('pan');
            if(elem) showErrorOnUI(elem);
            return;
        }
        if(! email){
            let elem = document.getElementById('email');
            if(elem) showErrorOnUI(elem);
            return;
        }
        if(! dob){
            let elem = document.getElementById('dob');
            if(elem) showErrorOnUI(elem);
            return;
        }
        if(! pincode){
            let elem = document.getElementById('pincode');
            if(elem) showErrorOnUI(elem);
            return;
        }
        if(! gender){
            let elem = document.getElementById('gender');
            if(elem) showErrorOnUI(elem);
            return;
        }

        showWaitingModal();

        let submitObj = {
            "firstName": localStorage.getItem("P_userName").trim(),
            "panCard": pan,
            "emailId": email,
            "dateOfBirth": dob,
            "gender": gender,
            "mobileNumber": localStorage.getItem('phoneNumber'),
            "userId" : localStorage.getItem('userId'),
            "formStatus": ""
        };

        axios.post(env.api_Url + "userDetails/basicDetail",
            submitObj)
            .then((response) => {
                // console.log(response)
                if(response.data.message === "success"){
                    setApi1Status(true);
                }else{
                    hideWaitingModal();
                }
            }).catch(error => {
                console.log(error);
                hideWaitingModal();
            });

        submitObj = {
            "userId": userId,
            "pincode": pincode
        };
        axios.post(env.api_Url + "userDetails/addressDetail",
            submitObj)
            .then((response) => {
                // console.log(response)
                if(response.data.message === "success"){
                    setApi2Status(true);
                }else{
                    hideWaitingModal();
                }
            }).catch(error => {
                console.warn(error)
                hideWaitingModal();
            });
    }

    if(api1Status && api2Status){
        hideWaitingModal();
        navigate('/patient/fibeEmploymentDetails');
    }

    function handlePan(val){
        if(val === null || val === undefined) return;
        if(val.length > 10) return
        val = val.toUpperCase();
        if(val.length<10) setPanValid(false);
        if(val.length === 10){
            let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
            console.log(regex.test(val))
            if (regex.test(val) === false) {
                // let errorMsg = document.getElementById('panFormat');
                // errorMsg.style.display = "block";
                setPanValid(false);
            }else{
                // let errorMsg = document.getElementById('panFormat');
                // errorMsg.style.display = "none";
                setPanValid(true);
            }
        }
        setPan(val);
    }

    function handleEmail(val){
        setEmail(val);
        if(val.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            setEmailValid(true);
        }else{
            setEmailValid(false);
        }
    }

    function handlePincode(pincode){
        setPincode(pincode);
        console.log()
        if(pincode.toString().length === 6){
            axios.get(env.api_Url+"userDetails/codeDetail?code=" + pincode +"&type=zip")
            .then(response =>{
                setCity(response?.data?.city)
                setState(response?.data?.state)
            }).catch(error=>{
                console.warn(error);
            })
        }
    }

    //this function ensures the calender opens when its placeholder is clicked
    function dateInputClickHandler(){
        let dateInput = document.getElementById("dob");
        if(dateInput) dateInput.click();
    }

    return(
        <main className="screenContainer">
            <Header progress={69} canGoBack={-1} />
            <ScreenTitle title="Kindly verify your details" />
            <InputBoxLabel label='PAN' />
            <InputBox
                id="pan"
                placeholder="What is your PAN number?" 
                value={pan}
                setValue={handlePan}
                styles={{
                    marginTop:"12px", 
                    border:"0"
                }}
            />
            {(!isPanValid && pan.length===10) && <InputBoxLabel label={"PAN is incorrect, please check."} styles={{color:"red", marginTop:"6px"}} />}
            
            <InputBoxLabel label='Mail ID' styles={{marginTop:"24px"}} />
            <InputBox
                id="email"
                placeholder="What is your email ID?"
                value={email}
                setValue={handleEmail}
                styles={{
                    marginTop:"12px", 
                    border:"0"
                }}
            />
            {/* {(!isEmailValid && email.length>0) && <InputBoxLabel label={"Please enter correct a email ID"} styles={{color:"red", marginTop:"6px"}} />} */}
            
            <InputBoxLabel label='Date of Birth' styles={{marginTop:"24px"}} />
            <InputBox
                id="dob"
                type="date"
                min={minDateForDob}
                max={maxDateForDob}
                placeholder="Select DOB"
                value={dob}
                setValue={setDob}
                styles={{
                    marginTop:"12px", 
                    border:"0",
                    position:"relative"
                }}
            />
            {!dob && <span onClick={dateInputClickHandler} style={{background:"#ECEBFF", position:"relative", top:"-38px", left:"10px", color:"#8B8B96", userSelect:"none"}}>Tap to select date</span>}


            <InputBoxLabel label='Address pincode' styles={{marginTop:"24px"}} />
            <InputBox
                id="pincode"
                type="number"
                length={6}
                placeholder="What is your pincode?"
                value={pincode}
                setValue={handlePincode}
                styles={{
                    marginTop:"12px", 
                    border:"0"
                }}
            />
            <InputBoxLabel label={`City: ${city}`} styles={{marginTop:"6px", fontSize:"14px"}} />

            <InputBoxLabel label='Gender' styles={{marginTop:"24px"}} />
            <RadioInput
                id={"gender"}
                name="gender" 
                value={gender}
                setValue={setGender}
                options={["male", "female", "other"]}
                styles={{
                    padding:"12px 12px 12px 0"
                }}
            />

            <button style={{marginTop:"32px"}} onClick={()=>postDetails()} className="submit">Next</button>
            {waiting && 
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", position:"absolute", top:"0", left:"0", height:"100%", width:"100%", background:"rgba(0,0,0,0.4)"}}>
                    <div style={{width:"50vh", maxWidth:"90vw", padding:"16px", background:"white", borderRadius:"16px"}}>
                        <div id="searchAnimation"></div>
                        <p style={{textAlign:"center"}}>Fetching your details...</p>
                    </div>
                </div>
            }
            
        </main>
    )
}