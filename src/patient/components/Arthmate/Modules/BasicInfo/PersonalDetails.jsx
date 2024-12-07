//PersonalDetails
import './styles/personalDetails.scss'

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import { useData } from "../../data";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../../environment/environment"
import { Header } from '../../comps/Header';
import { onlyNumbers } from '../../servicesAndUtility/utilityFunctions';
import { saveBasicDetails } from '../../servicesAndUtility/api';
import BottomPopOverModal from '../../../utility/BottomPopOverModal';

const ArthPersonalDetails = () => {

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

    const [aadhaarNo, setAadhaarNo] = useState('')
    const [panNumber, setPanNumber] = useState("")
    const [isPanValid, setPanValid] = useState(false)
    const [fatherName, setFatherName] = useState("")
    // const [nameOnPan, setNameOnPan] = useState("")
    const [number, setNumber] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [maritalStatus, setMaritalStatus] = useState("Unmarried")

    const [altNumber, setAltNumber] = useState("")

    const [refName, setRefName] = useState("");
    const [refNumber, setRefNumber] = useState("");
    const [refRelation, setRefRelation] = useState("");
    const [refErrorMsg, setRefErrorMsg] = useState("This field can't be empty.");
    const [motherName, setmotherName] = useState("")
    const [typeOfEmail, setTypeOfEmail] = useState("Professional")
    const [educationLevel, seteducationLevel] = useState("")


    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const [showPopOver, setShowPopOver] = useState(false);


    let ref = useRef(0);
    let userId = localStorage.getItem('userId');
    let name = localStorage.getItem('fullName');

    useEffect(() => {
        setNumber(localStorage.getItem('phoneNumber'))
        ref.current = document.getElementById('animation-wrapper');

        if (!!userId) {
            axios.get(env.api_Url + "userDetails/getUserDetailsByUserId?userId=" + userId)
                .then(response => {
                    if (response.data.message === "success") {
                        let data = response?.data?.data;
                        handlePan(data?.panNo);
                        if (data?.aadhaarNo != null) setAadhaarNo(data?.aadhaarNo);
                        // setFatherName(data?.fatherName);
                        // setNameOnPan(data?.panCardName)
                        setNumber(data?.mobileNumber)
                        setGender(data?.gender);
                        // let date = data?.dateOfBirth.split('-').reverse().join('-');
                        // console.log(data?.dateOfBirth)
                        setDob(data?.dateOfBirth)
                        setEmail(data?.emailId)
                        setFatherName(data?.fatherName)
                        setMaritalStatus(data.maritalStatus ?? "Unmarried");
                        setAltNumber(data?.alternateNumber ?? "");
                        setRefName(data?.referenceName ?? "");
                        setRefNumber(data?.referenceNumber ?? "");
                        setRefRelation(data?.referenceRelation ?? "");
                        setmotherName(data?.motherName)
                        seteducationLevel(data?.educationLevel)
                        setTypeOfEmail(data?.typeOfEmail)

                        


                        if (response.data.data.panNo === null) {
                            getDataFromDecentro();
                        }
                    } else {
                        getDataFromDecentro();
                    }
                }).catch(error => {
                    getDataFromDecentro();
                    console.log(error)
                })
        }
    }, [])


    function getDataFromDecentro() {
        axios.get(env.api_Url + "getCibilDataDecentro?consent=true&userId=" + userId + "&name=" + name)
            .then(response => {
                console.log(response);
                if (response.data.message === "success") {
                    const idandContactInfo = response?.data?.data?.data?.cCRResponse?.cirreportDataLst[0]?.cirreportData?.idandContactInfo;
                    let panCardData = idandContactInfo?.identityInfo?.panid[0]?.idNumber;
                    handlePan(panCardData);
                    let emailData = "";
                    if (idandContactInfo?.emailAddressInfo) {
                        emailData = idandContactInfo.emailAddressInfo[0]?.emailAddress
                    }
                    setEmail(emailData);
                    let dobData = idandContactInfo?.personalInfo?.dateOfBirth;
                    setDob(dobData);
                    let genderData = idandContactInfo?.personalInfo?.gender;
                    setGender(genderData);
                    // let fullNameData = idandContactInfo?.personalInfo?.name?.fullName;
                    // setAadhaarNo(fullNameData);
                }
            })
    }



    //////////////////////////////// DOB restriction ///////////////////////////////////////
    ////// Below code is to calculate the maximum date the user can input as DOB.///////////
    const today = new Date();
    let day = today.getDate();
    day = (day < 10 ? "0" + day : day);
    let month = today.getMonth() + 1;
    month = (month < 10 ? "0" + month : month);
    let year = today.getFullYear();
    year = year - 18; // to restrict the minimum age of user to 18 years.

    let maxDateForDob = `${year}-${month}-${day}`; // 'yyyy-mm-dd' - format compulsion
    ////////////////////////// DOB restriction code ended //////////////////////////////////


    ///////////// To validate Date of Birth & Email format ///////////////////
    function isDataValid(data, datatype) {
        switch (datatype) {
            case "dob":
                if (!data) return false;
                data = data.split('-')[0];
                data = data * 1; // to convert string to number
                year = year * 1;
                if (data <= year) return true;
                return false;

            case "email":
                if (data && data.match(
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
    function onlyCharacters(val, setter) {
        if (onlyCharRegex.test(val)) {
            setter(val);
        }
    }


    async function handleForm() {

        // if(!(panNumber && fullName && gender && email && dob)){ // All feilds must have something
        //     return;
        // }

        if (!isPanValid) {
            let elem = document.getElementById('pan');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (!aadhaarNo || aadhaarNo.length !== 12) {
            let elem = document.getElementById('aadhaarNumber');
            if (elem) showErrorOnUI(elem);
            return;
        }


        if (!isDataValid(email, "email")) { // validate Email
            let elem2 = document.querySelectorAll('[type="email"]')[0];
            if (elem2) showErrorOnUI(elem2);
            return;
        }
        if (!isDataValid(dob, "dob")) { // validate Date of Birth
            let elem1 = document.querySelectorAll('[type="date"]')[0];
            if (elem1) showErrorOnUI(elem1);
            return;
        }

        if (!gender) {
            let elem = document.getElementById('gender');
            if (elem) showErrorOnUI(elem);
            return;
        }
        // if (!motherName) {
        //     let elem = document.getElementById('motherName');
        //     if (elem) showErrorOnUI(elem);
        //     return;
        // }
        if (!educationLevel) {
            let elem = document.getElementById('educationLevel');
            if (elem) showErrorOnUI(elem);
            return;
        }

        // if (!typeOfEmail) {
        //     let elem = document.getElementById('typeOfEmail');
        //     if (elem) showErrorOnUI(elem);
        //     return;
        // }
        // if (!refName) {
        //     let elem = document.getElementById('refName');
        //     if (elem) showErrorOnUI(elem);
        //     return;
        // }

        // if (!refNumber) {
        //     let elem = document.getElementById('refNumber');
        //     if (elem) showErrorOnUI(elem);
        //     return;
        // }

        if (refNumber == number || refNumber == altNumber) {
            let elem = document.getElementById("refNumber");
            if (elem) {
                setRefErrorMsg("This can't be same as your number.");
                setTimeout(() => {
                    setRefErrorMsg("This field can't be empty.");
                }, 3000)
                showErrorOnUI(elem);
            }

            return;
        }

        // if (!refRelation) {
        //     let elem = document.getElementById('refRelation');
        //     if (elem) showErrorOnUI(elem);
        //     return;
        // }

        localStorage.setItem("email", email);

        if (!canSubmit) {
            return;
        }
        if (aadhaarNo) {
            setShowPopOver(true);
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        // Data validation is done, now we can send the data to the server

        let submitObj = {
            "panCard": panNumber,
            // "panCardName": nameOnPan,
            "aadhaarNo": aadhaarNo,
            "emailId": email,
            "fatherName": fatherName,
            "dateOfBirth": dob,
            "gender": gender,
            "mobileNumber": number,
            "maritalStatus": maritalStatus,
            "alternateNumber": altNumber,
            "referenceName": refName,
            "referenceNumber": refNumber,
            "referenceRelation": refRelation,
            "userId": localStorage.getItem('userId'),
            "formStatus": "",
            "firstName": localStorage.getItem('fullName'),
            "motherName": motherName,
            "educationLevel": educationLevel,
            "typeOfEmail": typeOfEmail

        };

        saveBasicDetails(submitObj, res => {
            console.log(res);
            if (res.data.message === "success") {
                let id = res.data.data.userId;
                localStorage.setItem("userId", id);
                navigate('/patient/ArthAddressDetails');
            }
        })

        // await axios.post(env.api_Url + "userDetails/basicDetail",
        //     submitObj)
        //     .then((response) => {
        //         console.log(response)
        //         if(response.data.message === "success"){
        //             let id = response.data.data.userId;
        //             localStorage.setItem("userId", id);
        //             navigate('/patient/AddressDetails');
        //         }else{
        //             apiErrorHandler();
        //         }
        //     }).catch(error => {
        //         console.log(error);
        //         apiErrorHandler();
        //     });
        setCanSubmit(true);
        hideWrapper(ref.current)
    }

    function apiErrorHandler() {
        setApiError(true)
        setTimeout(() => {
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
    function handlePan(val) {
        if (val === null || val === undefined) return;
        val = val.toUpperCase();
        if (val.length < 10) setPanValid(false);
        if (val.length === 10) {
            let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
            console.log(regex.test(val))
            if (regex.test(val) === false) {
                let errorMsg = document.getElementById('panFormat');
                errorMsg.style.display = "block";
                setPanValid(false);
            } else {
                let errorMsg = document.getElementById('panFormat');
                errorMsg.style.display = "none";
                setPanValid(true);
            }
        }
        if (val.length > 10) return
        setPanNumber(val);
    }

    const numericOnlyRegex = new RegExp('^[0-9]*$');
    function numberChange(e, name) {
        let val = e.target.value;
        if (!numericOnlyRegex.test(val)) return;
        if (val.length > 10) return;
        if (name === "altNumber") {
            setAltNumber(val);
        } else {
            setRefNumber(val);
        }
    }
    async function checkAndNavigate() {
        if (!canSubmit) {
            return;
        }
        let submitObj = {
            "panCard": panNumber,
            // "panCardName": nameOnPan,
            "aadhaarNo": aadhaarNo,
            "emailId": email,
            "fatherName": fatherName,
            "dateOfBirth": dob,
            "gender": gender,
            "mobileNumber": number,
            "maritalStatus": maritalStatus,
            "alternateNumber": altNumber,
            "referenceName": refName,
            "referenceNumber": refNumber,
            "referenceRelation": refRelation,
            "userId": localStorage.getItem('userId'),
            "formStatus": "",
            "firstName": localStorage.getItem('fullName'),
            "motherName": motherName,
            "educationLevel": educationLevel,
            "typeOfEmail": typeOfEmail

        };

        saveBasicDetails(submitObj, res => {
            console.log(res);
            if (res.data.message === "success") {
                let id = res.data.data.userId;
                localStorage.setItem("userId", id);
                navigate('/patient/ArthAddressDetails');
            }
        })
        setCanSubmit(true);
        hideWrapper(ref.current)


    }
    function salaryError() {
        let elem = document.getElementById('salary');
        if (elem) showErrorOnUI(elem);
        return;
    }
    let popUpMsg = <p style={{ color: "black", lineHeight: 'revert' }}>
        <b> {aadhaarNo}</b>
        <br />
        Please check your Aadhaar number again!
        This will be used for KYC verification.</p>;

    return (
        <>
            <main className="personalDetails" style={{ position: "relative" }}>
                {
                    <>
                        <Header />
                        <h3>Personal Details</h3>
                        <div style={{ width: "100%", background: "#FAE1CD", padding: "12px", borderRadius: "4px", textAlign: "center", marginBottom: "2rem" }}>
                            Please verify the following information.
                        </div>

                        <div className="PAN">
                            <p>PAN number</p>
                            <input type="text"
                                id="pan"
                                value={panNumber ?? ""}
                                onChange={(e) => handlePan(e.target.value)}
                                placeholder="Enter PAN"
                                autoCapitalize="characters"
                                required
                            />
                            <span id="panFormat">Please enter correct PAN number</span>
                        </div>

                        <div className="aadhaarNumber">
                            <p>Aadhaar number</p>
                            <input
                                type="number"
                                id="aadhaarNumber"
                                value={aadhaarNo ?? ""}
                                onChange={(e) => setAadhaarNo(e.target.value)}
                                placeholder="What is your aadhaar number?"
                                required
                            />
                            <span className="fieldError">Please enter a valid Aadhaar number.</span>
                        </div>



                        {/* <div className="fatherName">
                            <p>Father's name</p>
                            <input type="text"
                                id="fatherName"
                                value={fatherName ?? ""}
                                onChange={(e) => setFatherName(e.target.value)}
                                placeholder="Enter your father's name"
                                required
                            />
                            <span className="fieldError">This field can't be empty.</span>
                        </div> */}
                        {/* <div className="PAN">
                            <p>Mother's name</p>
                            <input type="text"
                                id="motherName"
                                value={motherName ?? ""}
                                onChange={(e) => setmotherName(e.target.value)}
                                placeholder="Enter your mother's name"
                                required
                            />
                            <span className="fieldError">This field can't be empty.</span>
                        </div> */}
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
                        {/* <div className="gender" id="gender">
                            <p>Select the type of your email</p>
                            <div className="radioOption">
                                <input type="radio" id="Professional" name="typeOfEmail" checked={typeOfEmail === "Professional"} onChange={(e) => setTypeOfEmail(e.target.value)} value="Professional" />
                                <label htmlFor="Professional">Professional</label><br />
                            </div>
                            <div className="radioOption">
                                <input type="radio" id="Personal" name="typeOfEmail" checked={typeOfEmail === "Personal"} onChange={(e) => setTypeOfEmail(e.target.value)} value="Personal" />
                                <label htmlFor="Personal">Personal</label><br />
                            </div>

                        </div> */}
                        <div className="marital-status">
                            <p>Education</p>
                            <select name="Education" value={educationLevel} onChange={(e) => seteducationLevel(e.target.value)}>
                                <option value="">Select Education </option>
                                <option value="LESS THAN 10TH">Less than 10th</option>
                                <option value="PASSED 10TH">Passed 10th</option>
                                <option value="PASSED 12TH">Passed 12th</option>
                                <option value="DIPLOMA">Diploma</option>
                                <option value="GRADUATION">Graduation</option>
                                <option value="POST GRADUATION">Post graduation</option>
                                <option value="PHD">P.H.D.</option>
                            </select>
                        </div>
                        <span className="fieldError">This field can't be empty.</span>
                        <div className="DOB">
                            <p>Date of birth</p>
                            <input type="date"
                                value={dob ?? ""}
                                onChange={(e) => setDob(e.target.value)}
                                placeholder="Select Date"
                                max={maxDateForDob}
                            />
                            <span className="fieldError">Please enter correct DOB.</span>
                        </div>

                        <div className="gender" id="gender">
                            <p>Gender</p>
                            <div className="radioOption">
                                <input type="radio" id="male" name="gender" checked={gender?.toLowerCase() === "male"} onChange={(e) => setGender(e.target.value)} value="male" />
                                <label htmlFor="male">Male</label><br />
                            </div>
                            <div className="radioOption">
                                <input type="radio" id="female" name="gender" checked={gender?.toLowerCase() === "female"} onChange={(e) => setGender(e.target.value)} value="female" />
                                <label htmlFor="female">Female</label><br />
                            </div>
                            <div className="radioOption">
                                <input type="radio" id="other" name="gender" checked={gender?.toLowerCase() === "other"} onChange={(e) => setGender(e.target.value)} value="other" />
                                <label htmlFor="other">Other</label><br />
                            </div>
                        </div>
                        <div className="marital-status">
                            <p>Marital status</p>
                            <select name="marital-status" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
                                <option value="Married">Married</option>
                                <option value="Unmarried">Unmarried</option>
                            </select>
                        </div>
                        <span className="fieldError">This field can't be empty.</span>
                        {/* <h3>Reference details</h3>
                        <p style={{ marginBottom: "1.5rem" }}>Note: The reference has to be your immediate relative.</p> */}

                        {/* <div className="referenceName">
                            <p>Reference name</p>
                            <input type="text"
                                id="refName"
                                value={refName ?? ""}
                                onChange={(e) => onlyCharacters(e.target.value, setRefName)}
                                placeholder="Who should we call if you are unavailable?"
                                required
                            />
                            <span className="fieldError">This field can't be empty.</span>
                        </div> */}

                        {/* <div className="referenceNumber">
                            <p>Reference contact number</p>
                            <input
                                id="refNumber"
                                type="text"
                                inputMode="numeric"
                                onChange={(e) => numberChange(e, "referenceNumber")}
                                value={refNumber ?? ""}
                                placeholder="Mobile number"
                            />
                            <span className="fieldError">{refErrorMsg}</span>
                        </div> */}

                        {/* <div className="referenceRelation">
                            <p>Relationship with the reference contact</p>
                      
                            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                <span style={{ minWidth: "max-content" }}>Reference is my:</span>
                                <select name="refRelation" id="refRelation" style={{ marginBottom: "0" }} value={refRelation} onChange={(e) => setRefRelation(e.target.value)}>
                                    <option value={""}>Select Option</option>

                                    <option value={"father"}>Father</option>
                                    <option value={"mother"}>Mother</option>
                                    <option value={"brother"}>Brother</option>
                                    <option value={"sister"}>Sister</option>
                                    <option value={"spouse"}>Spouse</option>
                                    <option value={"son"}>Son</option>
                                    <option value={"daughter"}>Daughter</option>
                                </select>
                            </div>
                            <span className="fieldError">This field can't be empty.</span>
                        </div> */}


                        <p className={apiError ? "apiError" : "apiError hide"}>An error has occured, please try again.</p>
                        <button onClick={() => handleForm()} className="submit">Confirm</button>
                    </>
                }
                <BottomPopOverModal
                    popUpMsg={popUpMsg}
                    showPopOver={showPopOver}
                    setShowPopOver={setShowPopOver}
                    checkAndNavigate={checkAndNavigate}
                    yesBtnText={"Yes, it is correct!"}
                    noBtnText={"No, edit Aadhaar number"}
                    noBtnClick={salaryError}
                />
            </main>
        </>
    )
}


export default ArthPersonalDetails
