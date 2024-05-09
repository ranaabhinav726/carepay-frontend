import { useEffect, useRef, useState } from "react"
import axios from "axios";
import Header from "../../Header/Header"
import "../../MobileNumberVerification/mobileNumberVerification.scss"

import rupeeIcon from '../../../assets/rupee.svg'

import { useNavigate } from "react-router-dom";
// import { useContext } from "react"
// import { DataContext } from "../../App"

import { env, showErrorOnUI, showWrapper, hideWrapper } from '../../../environment/environment'
import RadioInput from "../../utility/RadioInput/RadioInput";
import { preEligibility } from "../../ICICI flow/apis";
import AutocompleteInput from "../../utility/SuggestionInputBox/SuggestionInputBox";
import BottomPopOverModal from "../../utility/BottomPopOverModal";
// import { useData } from "../data";

var convertRupeesIntoWords = require('convert-rupees-into-words');

const CreditDetails = () => {
    // const [number, setNumber] = useState('')
    const [fullName, setFullName] = useState("");
    const [amount, setAmount] = useState("");
    const [amountInWords, setAmountInWords] = useState("");
    const [treatment, setTreatment] = useState("");
    const [otherTreatment, setOtherTreatment] = useState("");

    const [borrower, setBorrower] = useState("");
    let isPatient = true;
    const [patientName, setPatientName] = useState("");
    const [relation, setRelation] = useState("MOTHER");

    const [apiError, setApiError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("An error has occured, please try again.");
    const [canSubmit, setCanSubmit] = useState(true);
    const [number,] = useState(localStorage.getItem("phoneNumber"));

    const [popUpMsg, setPopUpMsg] = useState("");
    const [showPopOver, setShowPopOver] = useState("");
    const [amountError, setAmountError] = useState(false);

    // const [doctorId, setDoctorId] = useState("");
    // const [doctorName, setDoctorName] = useState("");

    const navigate = useNavigate();
    // const data = useData();
    // const data = useContext(DataContext);

    let ref = useRef(0);
    const otherTreatmentRef = useRef(null);
    useEffect(() => {
        ref.current = document.getElementById('animation-wrapper');
    }, [])

    useEffect(() => {
        let localizedAmount = <span
            style={{ whiteSpace: "pre" }}
        >
            (₹ {amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })})
        </span>
        let elem = <p style={{ color: "black" }}>
            Are you sure you want to apply for a loan of
            <strong> {amountInWords} {localizedAmount}?</strong>
        </p>
        setPopUpMsg(elem);
    }, [showPopOver])

    let doctorId = localStorage.getItem("doctorId")
    let doctorName = localStorage.getItem("doctorName")
    let userId = localStorage.getItem("userId");

    // let treatmentList = [
    //     "Infertility Treatment (inc IVF and other treatments)",
    //     "MTP's",
    //     "Diagnostic Laproscopy",
    //     "Minor Surgeries like Polyp, Fibroid etc.",
    //     "Therapeutic Curettage",
    //     "Other small operations of Uterus, Cervix, Fallopian tube, Vagina etc.",
    //     "Lithotripsy",
    //     "Hydrocele",
    //     "Piles / Fistula",
    //     "Prostate",
    //     "Varicose Veins",
    //     "Colonoscopy / Gastroscopy",
    //     "Appendectomy",
    //     "Cystoscopic removal of stones",
    //     "Ultrasound guided aspirations",
    //     "Hernia",
    //     "Hair transplant",
    //     "Stretch mark removal",
    //     "Facelift",
    //     "Rhinoplasty",
    //     "Liposuction",
    //     "Tummy tuck",
    //     "Breast Augmentation",
    //     "Breast Reduction and Breast Lift",
    //     "Gynecomastia (Male Breast Reduction)",
    //     "Vulvovaginal",
    //     "Buttock Augmentation",
    //     "Buttock Lift",
    //     "Blepharoplasty (Eyelid surgery)",
    //     "Rhinoplasty (Nose Surgery)",
    //     "Otoplasty (Ear Pinning)",
    //     "Brow lift",
    //     "Chin Augmentation",
    //     "Malar or Cheek Augmentation",
    //     "Chemical Peel",
    //     "Botulinum toxin or Botox",
    //     "Soft Tissue Fillers",
    //     "Stem Cell Enriched Fat Graft",
    //     "Fat Injection/Fat Grafting",
    //     "Cleft Lip and Cleft Palate",
    //     "Dental Implants / Crowns & Bridges",
    //     "Removable Partial Dentures (Imported)",
    //     "Removable Partial Denture (Flexible)",
    //     "Upper and Lower Complete Denture (Imported)",
    //     "E-Max Metal Free Crown / Veneer – Metal Free",
    //     "Ceramil / Azir ( Zirconia Crowns) – Metal Free",
    //     "Zoom Advanced Whitening (3 Cycles) – Including Maintenance Kit",
    //     "Ant.RCT/ Post.RCT or Re-RCT",
    //     "Ceramic Fillings/Inlay (Per Tooth)",
    //     "Dental Jewellery (Dental Crystal)",
    //     "Composite Bonding",
    //     "Componeers",
    //     "Night Guard",
    //     "Dental Diode Laser",
    //     "Diode Laser Frenectomy",
    //     "Laser Gum Contouring",
    //     "Laser Depigmentation",
    //     "Full Mouth Scaling & Polishing",
    //     "Deep Scaling (Curretage)",
    //     "Gum- Flap Surgery",
    //     "Bone Grafting",
    //     "Gum Graft",
    //     "Extraction",
    //     "Impaction / Wisdom Tooth Removal",
    //     "Biopsy",
    //     "Apicectomy",
    //     "Sinuslift",
    //     "Braces (Metallic) Full Mouth",
    //     "Metallic- Self Ligating (Damon)",
    //     "Clear Aligners Invisible Braces (K Line/ Clear Path)",
    //     "Braces (Ceramic) Full Mouth",
    //     "Invisalign",
    //     "Cataract operation",
    //     "Removal of foreign body",
    //     "Corneal transplant",
    //     "Tear duct operations",
    //     "Ptosis",
    //     "Lasik Surgery",
    //     "Glaucoma",
    //     "Squint",
    //     "Viterectomy",
    //     "Retinal Detachment",
    //     "Ossiculoplasty",
    //     "Functional Endoscopic Sinus Surgery",
    //     "Stapedectomy",
    //     "Microlaryngeal surgery",
    //     "Foreign body removal",
    //     "Tympanoplasty",
    //     "Glossectomy",
    //     "Frenuloplasty",
    //     "Reconstruction of the tongue",
    //     "Closed reduction of fractures",
    //     "Operations of tendons / Tendon sheath",
    //     "Arthroscopic Knee Aspiration",
    //     "Reduction of dislocations",
    //     "Dialysis",
    //     "Angiography"
    // ];
    let treatmentList = [
        "Infertility Treatment (Other than IVF)",
        "In vitro fertilization (IVF)",
        "MTPs ",
        "Diagnostic Laproscopy",
        "Minor Surgeries like Polyp, Fibroid etc.",
        "Therapeutic Curettage",
        "Small operations of Uterus, Cervix etc.",
        "Small operations of Fallopian tube, Vagina etc.",
        "Lithotripsy",
        "Hydrocele",
        "Piles / Fistula",
        "Prostate",
        "Varicose Veins",
        "Colonoscopy / Gastroscopy",
        "Appendectomy",
        "Cystoscopic removal of stones",
        "Ultrasound guided aspirations",
        "Hernia",
        "Hair transplant",
        "Stretch mark removal",
        "Facelift",
        "Rhinoplasty",
        "Liposuction",
        "Tummy tuck",
        "Breast Augmentation",
        "Breast Reduction and Breast Lift",
        "Gynecomastia (Male Breast Reduction)",
        "Vulvovaginal",
        "Buttock Augmentation",
        "Buttock Lift",
        "Blepharoplasty (Eyelid surgery)",
        "Rhinoplasty (Nose Surgery)",
        "Otoplasty (Ear Pinning)",
        "Brow lift",
        "Chin Augmentation",
        "Malar or Cheek Augmentation",
        "Chemical Peel",
        "Botulinum toxin or Botox",
        "Soft Tissue Fillers",
        "Stem Cell Enriched Fat Graft",
        "Fat Injection/Fat Grafting",
        "Cleft Lip and Cleft Palate",
        "Dental Implants / Crowns & Bridges",
        "Removable Partial Dentures (Imported)",
        "Removable Partial Denture (Flexible)",
        "Upper and Lower Complete Denture (Imported)",
        "E-Max Metal Free Crown / Veneer - Metal Free",
        "Ceramil / Azir ( Zirconia Crowns) - Metal Free",
        "Zoom Advanced Whitening (3 Cycles) ",
        "Ant.RCT/ Post.RCT or Re-RCT",
        "Ceramic Fillings/Inlay (Per Tooth)",
        "Dental Jewellery (Dental Crystal)",
        "Composite Bonding",
        "Componeers",
        "Night Guard",
        "Dental Diode Laser",
        "Diode Laser Frenectomy",
        "Laser Gum Contouring",
        "Laser Depigmentation",
        "Full Mouth Scaling & Polishing",
        "Deep Scaling (Curretage)",
        "Gum- Flap Surgery",
        "Bone Grafting",
        "Gum Graft",
        "Extraction",
        "Impaction / Wisdom Tooth Removal",
        "Biopsy",
        "Apicectomy",
        "Sinuslift",
        "Braces (Metallic) Full Mouth",
        "Metallic- Self Ligating (Damon)",
        "ORTHODONTI - BRACES TREATEMENT",
        "Clear Aligners Invisible Braces (Clear Path)",
        "Clear Aligners Invisible Braces (Invisalign)",
        "Clear Aligners Invisible Braces (Others)",
        "Braces (Ceramic) Full Mouth",
        "Invisalign",
        "Cataract operation.",
        "Removal of foreign body.",
        "Corneal transplant",
        "Tear duct operations.",
        "Ptosis",
        "Lasik Surgery",
        "Glaucoma",
        "Squint",
        "Viterectomy",
        "Retinal Detachment",
        "Ossiculoplasty",
        "Functional Endoscopic Sinus Surgery",
        "Stapedectomy.",
        "Microlaryngeal surgery",
        "Foreign body removal.",
        "Tympanoplasty.",
        "Glossectomy",
        "Frenuloplasty",
        "Reconstruction of the tongue.",
        "Closed reduction of fractures",
        "Operations of tendons / Tendon sheath",
        "Arthroscopic Knee Aspiration",
        "Reduction of dislocations",
        "Dialysis",
        "Angiography"
    ]



    useEffect(() => {
        if (!!userId) {
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
                .then(response => {
                    if (response.data.status === 200) {
                        let data = response.data.data;
                        if (!!data) {
                            amountHandler(data.loanAmount);
                            let treatmentName = data?.loanReason;
                            if (treatmentName) {
                                if (treatmentList.includes(treatmentName)) {
                                    setTreatment(data.loanReason);
                                } else {
                                    console.log("other treatment")
                                    setTreatment("Other");
                                    setOtherTreatment(treatmentName)
                                }
                            }
                        }
                    }
                }).catch(() => {

                });
        }
    }, [])

    const onlyCharRegex = /^[a-zA-Z\s]*$/;
    function onlyCharacters(val, setter) {
        if (onlyCharRegex.test(val)) {
            setter(val);
        }
    }

    function creditAmountError() {
        let elem = document.getElementById('loanAmount');
        if (elem) showErrorOnUI(elem);
        setAmountError(true);
        setTimeout(() => {
            setAmountError(false);
        }, 3000);
        return;
    }

    async function verifyAndNavigate() {
        setShowPopOver(null);
        if (!canSubmit) {
            return;
        }

        if (!amount) {
            let elem = document.getElementById('loanAmount');
            if (elem) showErrorOnUI(elem);
            return;
        }
        if (!treatment) {
            let elem = document.getElementById('treatment');
            if (elem) showErrorOnUI(elem);
            return;
        }
        if (treatment === "Other") {
            if (!otherTreatment) {
                let elem = document.getElementById('otherTreatment');
                if (elem) showErrorOnUI(elem);
                return;
            }
        } else {
            if (!treatmentList.includes(treatment)) {
                let elem = document.getElementById('treatment');
                if (elem) showErrorOnUI(elem, false);
                return;
            }
        }
        if (!fullName) {
            let elem = document.getElementById('fullName');
            if (elem) showErrorOnUI(elem);
            return;
        }
        if (!borrower) {
            let elem = document.getElementById('borrower');
            if (elem) showErrorOnUI(elem);
            return;
        }
        if (borrower === "someone else") {
            if (!patientName) {
                let elem = document.getElementById('patientName');
                if (elem) showErrorOnUI(elem);
                return;
            }
            if (!relation) {
                let elem = document.getElementById('relation');
                if (elem) showErrorOnUI(elem);
                return;
            }
        }

        if (!(doctorId && doctorName && userId)) {
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
            "userId": userId,
            "doctorName": doctorName,
            "doctorId": doctorId,
            "loanAmount": amount,
            "formStatus": ""
        };

        if (treatment === "Other") {
            submitObj.loanReason = otherTreatment;
        } else {
            submitObj.loanReason = treatment;
        }

        if (borrower === "someone else") {
            submitObj.patientName = patientName;
            submitObj.relationshipWithPatient = relation;
        }

        // console.log(submitObj); return
        // console.log(submitObj); return;
        await axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(async (response) => {
                console.log(response)
                if (response.data.message === "success") {
                    // await handleNavigation();
                    localStorage.setItem("fullName", fullName);
                    if (!number) return;

                    navigate('/patient/PersonalDetails');

                    // if(amount > 100000){
                    //     navigate('/patient/PrescriptionUpload');
                    // }else{
                    //     navigate('/patient/PersonalDetails');
                    // }

                    // Below code belongs to ICICI flow, if below API responds ok, then user enter the ICICI flow.
                    preEligibility(number, res => {
                        if (res?.data?.data?.status === 1) {
                            let offerData = res?.data?.data?.data;
                            // console.log(offerData);

                            navigate("/patient/congratsPreApprovedIcici", { state: { "offer": offerData } })
                        } else {
                            navigate('/patient/PersonalDetails');
                            // if(amount > 100000){
                            //     navigate('/patient/PrescriptionUpload');
                            // }else{
                            //     navigate('/patient/PersonalDetails');
                            // }
                        }
                    })
                } else {
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

    function apiErrorHandler() {
        setApiError(true)
        setTimeout(() => {
            setApiError(false);
        }, 3000);
    }

    function amountHandler(val) {
        // console.log(val)
        if (val === "") {
            setAmount("");
            setAmountInWords("");
            return;
        }
        if (!val) return;
        val = val.split("").filter(letter => letter !== ",").join("");
        val = parseInt(val);
        if (val >= 0 && val <= 1000000) {
            setAmount(val);
            let amtInWords = convertRupeesIntoWords(val);
            setAmountInWords(amtInWords);
        }
    }

    function otherTreatmentNameAndFocusSetter(otherTreatmentName) {
        setOtherTreatment(otherTreatmentName);
    }

    useEffect(() => {
        // console.log(otherTreatmentRef.current);
        if (otherTreatmentRef.current !== null) {
            otherTreatmentRef.current.focus();
        }
    }, [treatment])
    return (
        <>
            <main className="mobileNumberVerification" style={{ position: "relative" }}>
                <Header progressbarDisplay="none" />
                <h3 className="mobileVerificationHeading">Credit Details</h3>

                <div className="inputGroup">
                    <p>Credit amount</p>
                    <div className="inputBoxWithSymbol" style={{ display: "flex", alignItems: "baseline" }}>
                        <div className="rupeeSymbol" style={{ padding: "0 16px" }}><img src={rupeeIcon} alt="" /></div>
                        <input
                            id="loanAmount"
                            type="text"
                            value={amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                            placeholder="How much credit do you need?"
                            onChange={(e) => amountHandler(e.target.value)}
                            style={{ marginBottom: "16px" }}
                        />
                    </div>
                    {amountError && <p style={{ margin: "-8px 0 14px 42px", fontSize: "14px", color: "red" }}>Please enter the correct credit amount.</p>}
                    {amountInWords && <p style={{ margin: "-8px 0 16px 42px", fontSize: "14px" }}>{amountInWords}</p>}
                    {/* <p style={{marginTop:"-5px", marginBottom:"20px", fontSize:"14px"}}>Please keep the credit amount under Rs 10,00,000</p> */}
                </div>

                {/* <div className="inputGroup">
            <p>Treatment name</p>
            <input 
                id="treatment"
                type="text" 
                value={treatment} 
                placeholder="Name of treatment"
                onChange={(e)=>setTreatment(e.target.value)}  
                au
            />
            <span className="fieldError">Please fill name of your treatment</span>
        </div> */}

                <AutocompleteInput
                    id="treatment"
                    title="Treatment name"
                    value={treatment}
                    setValue={setTreatment}
                    placeholder="What is the name of the treatment?"
                    list={treatmentList}
                    fieldError="Please enter your treatment name"
                    otherValueSettter={otherTreatmentNameAndFocusSetter}
                />
                {treatment === "Other" &&
                    <div className="inputGroup">
                        <input
                            id="otherTreatment"
                            type="text"
                            value={otherTreatment}
                            placeholder="What is the name of the treatment?"
                            // onChange={(e)=>setOtherTreatment(e.target.value)}  
                            onChange={(e) => onlyCharacters(e.target.value, setOtherTreatment)}
                            style={{ marginBottom: "10px" }}
                            ref={otherTreatmentRef}
                        />
                        <span className="fieldError">Please enter your treatment name</span>
                    </div>
                }

                <div className="inputGroup" style={{ marginTop: "1.5rem" }}>
                    <p>Full name (as per PAN)</p>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        placeholder="What is your name as per your PAN?"
                        // onChange={(e)=>setFullName(e.target.value)}  
                        onChange={(e) => onlyCharacters(e.target.value, setFullName)}
                        style={{ marginBottom: "10px" }}
                    />
                    <span className="fieldError">Please enter your full name</span>
                    <p style={{ fontSize: "14px" }}>If not sure, please check your PAN and then enter the name accordingly.</p>
                </div>

                {/* <div style={{marginBottom: "26px", display:"flex", alignItems:"center"}}>
            <input 
                id="isPatient"
                type="checkbox" 
                checked={isPatient} 
                placeholder="Name of treatment"
                onChange={(e)=>setIsPatient(! isPatient)}
            />
            <label htmlFor="isPatient" style={{paddingLeft:"10px", fontSize:"inherit"}}>I am the patient</label>
        </div> */}


                <p style={{ marginTop: "1.5rem" }}>Who are you borrowing for?</p>
                <RadioInput
                    id="borrower"
                    name="borrower"
                    selected={borrower}
                    setSelected={setBorrower}
                    values={["myself", "someone else"]}
                    options={["Myself", "Someone else"]}
                    styles={{
                        padding: "12px 12px 8px 0",
                        width: "30%"
                    }}
                />

                {borrower === "someone else" &&
                    <>
                        <div className="inputGroup">
                            <p>Name of the patient</p>
                            <input
                                id="patientName"
                                type="text"
                                value={patientName}
                                placeholder="Enter name of the patient here"
                                // onChange={(e)=>setPatientName(e.target.value)}  
                                onChange={(e) => onlyCharacters(e.target.value, setPatientName)}
                            />
                            <span className="fieldError">Please fill name of the patient</span>
                        </div>
                        <div className="inputGroup">
                            <p>Relationship with patient</p>
                            {/* <input 
                    id="relation"
                    type="text" 
                    value={relation} 
                    placeholder="Enter your relation here"
                    onChange={(e)=>setRelation(e.target.value)}  
                /> */}
                            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                <span style={{ minWidth: "max-content" }}>Patient is my:</span>
                                <select name="relation" id="relation" style={{ marginBottom: "0" }} value={relation} onChange={(e) => setRelation(e.target.value)}>
                                    <option value="" disabled style={{ opacity: "0.4" }}>Tap to select</option>
                                    <option value={"MOTHER"}>Mother</option>
                                    <option value={"FATHER"}>Father</option>
                                    <option value={"BROTHER"}>Brother</option>
                                    <option value={"SISTER"}>Sister</option>
                                    <option value={"HUSBAND"}>Husband</option>
                                    <option value={"WIFE"}>Wife</option>
                                    <option value={"SON"}>Son</option>
                                    <option value={"DAUGHTER"}>Daughter</option>
                                    <option value={"GRANDMOTHER"}>Grandmother</option>
                                    <option value={"GRANDFATHER"}>Grandfather</option>
                                    <option value={"GRANDSON"}>Grandson</option>
                                    <option value={"GRANDDAUGHTER"}>Granddaughter</option>
                                </select>
                            </div>
                            <span className="fieldError">Please tell your relation to the patient</span>
                        </div>
                    </>
                }


                <p className={apiError ? "apiError" : "apiError hide"}>{errorMsg}</p>
                <button onClick={() => setShowPopOver(true)} className="submit">Submit</button>

                <BottomPopOverModal
                    popUpMsg={popUpMsg}
                    showPopOver={showPopOver}
                    setShowPopOver={setShowPopOver}
                    checkAndNavigate={verifyAndNavigate}
                    yesBtnText={"Yes"}
                    noBtnText={"No"}
                    noBtnClick={creditAmountError}
                />
            </main>
        </>
    )

}

export default CreditDetails