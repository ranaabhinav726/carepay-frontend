import { useEffect, useRef, useState } from "react";
import { Header } from "./Comps/Header";
import InputBox from "./Comps/InputBox";
import InputBoxLabel from "./Comps/InputBoxLabel";
import ScreenTitle from "./Comps/ScreenTitle";
import { BiRupee } from 'react-icons/bi'
import NoteText from "./Comps/NoteText";
import { useNavigate } from "react-router-dom";
import { hideWaitingModal, showErrorOnUI, showWaitingModal } from "../../environment/environment";
import axios from "axios";
import { env } from "../../environment/environment";

// import lottie from "lottie-web";
// import animationData from '../../assets/JSON animations/loader simple.json'
import AutocompleteInput from "../utility/SuggestionInputBox/SuggestionInputBox";
import './styles.scss'

export default function Screen5(){

    const [creditAmt, setCreditAmount] = useState("");
    const [loanReason, setLoanReason] = useState("");
    const [otherTreatment, setOtherTreatment] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [doctorId, setDoctorId] = useState(localStorage.getItem("doctorId"));
    // const [waiting, setWaiting] = useState(false);
    const otherTreatmentRef = useRef(null);

    const navigate = useNavigate();

    let userId = localStorage.getItem("userId");

    let serviceableTreatmentList = [
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

    // let serviceableTreatmentList = [
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

    let nonServiceableTreatments = ["Heart Attack ",
        "Stroke",
        "Kidney Failure ",
        "Multiple Sclerosis ",
        "Parkinson Dieses ",
        "Alzheimer’s Disease ",
        "Paralysis ",
        "Muscular Dystrophy",
        "Cardiomyopathy ",
        "Loss of Speech",
        "Chronic Aplastic Anemia ",
        "Organ Transplants(All Types)",
        "Hepatitis",
        "Coronary Artery, By-Pass Surgery Disease ",
        "Head Trauma ",
        "Angioplasty ",
        "BMT ",
        "Operable Cancers",
        "Early-Stage Cancers ",
        "Heart Valve Surgery",
        "Pediatric Cancers ",
        "Neurosurgeries ",
        "RTA ",
        "Brain Surgery",
        "Bacterial Meningitis ",
        "End Stage Renal Disease",
        "End Stage Liver Disease",
        "Sepsis ",
        "HIV ",
        "COMA ",
        "End Stage Lung and Liver Cancer ",
        "Blood Cancers Adults  ",
        "Third Degree Burns ",
        "Terminal Illness ",
        "Enchaphalitis"]

    let allTreatmentList = serviceableTreatmentList.concat(nonServiceableTreatments);


    // useEffect(() => {
    //     lottie.loadAnimation({
    //       container: document.querySelector("#searchAnimation"),
    //       animationData: animationData,
    //     //   renderer: "html"
    //     });
    //   }, [waiting]);

    useEffect(()=>{
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response?.data.status === 200){
                    let data = response?.data?.data;
                    if(!! data){
                        setCreditAmount(data?.loanAmount);
                        setLoanReason(data?.loanReason);
                        setDoctorName(data?.doctorName);
                        if(data?.doctorId) setDoctorId(data?.doctorId);
                    }
                }
            })
        }

    },[userId])

    function postDetails(){
        if(! creditAmt){
            let elem = document.getElementById("creditAmt");
            showErrorOnUI(elem, false);
            return;
        }
        // if(! loanReason){
        //     let elem = document.getElementById("loanReason");
        //     showErrorOnUI(elem, false);
        //     return;
        // }
        if(loanReason === "Other"){
            if(! otherTreatment){
                let elem = document.getElementById('otherTreatment');
                if(elem) showErrorOnUI(elem);
                return;
            }
        }else{
            if(!allTreatmentList.includes(loanReason)){
                let elem = document.getElementById('treatment');
                if(elem) showErrorOnUI(elem, false);
                return;
            }
        }

        if(nonServiceableTreatments.includes(loanReason)){
            navigate("/patient/NotServiceable");
            return;
        }

        showWaitingModal();


        let submitObj = {
            "userId" : userId,
            "doctorId": doctorId,
            "loanReason": loanReason,
            "loanAmount": creditAmt,
            "doctorName": doctorName
        };

        if(loanReason === "Other"){
            submitObj.loanReason = otherTreatment;
        }else{
            submitObj.loanReason = loanReason;
        }

        // console.log(submitObj); return;
        axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(response => {
                console.log(response)
                if(response.data.message === "success"){
                    // await handleNavigation();
                    // setWaiting(true);
                    // setTimeout(() => {
                    //     navigate('/patient/fibePrescriptionUpload');
                    //     setWaiting(false);
                    // }, 3000);

                    navigate('/patient/fibePrescriptionUpload');
                    
                    }else{
                    // setErrorMsg()
                }
                hideWaitingModal();
            }).catch(error => {
                console.log(error);
                hideWaitingModal();
            });
    }

    const onlyCharRegex = /^[a-zA-Z\s]*$/;
    function onlyCharacters(val, setter){
        if(onlyCharRegex.test(val)){
            setter(val);
        }
    }

    function otherTreatmentNameAndFocusSetter(otherTreatmentName){
        setOtherTreatment(otherTreatmentName);
    }
    
    useEffect(()=>{
        // console.log(otherTreatmentRef.current);
        if(otherTreatmentRef.current !== null){
            otherTreatmentRef.current.focus();
        }
    }, [loanReason])

    return(
        <main className="screenContainer">
            <Header progress={55} canGoBack={-1} />
            <ScreenTitle title="Tell us what you need" />
            <InputBoxLabel label='Credit amount' />
            <InputBox 
                id="creditAmt"
                Prefix={<BiRupee style={{fontSize:"20px", margin:"0 0 -4px 0"}} />} 
                placeholder="How much credit do you need?" 
                value={creditAmt}
                setValue={setCreditAmount}
                styles={{
                    marginTop:"12px", 
                    border:"0"
                }}
            />
            <NoteText text="Please keep the credit amount under Rs. 10,00,000 only." styles={{margin:"12px 0 24px 0"}} />

            {/* <InputBoxLabel label='Treatment name' />
            <InputBox 
                id="loanReason"
                placeholder="What is the reason of your credit?" 
                value={loanReason}
                setValue={setLoanReason}
                styles={{
                    marginTop:"12px", 
                    border:"0"
                }}
            /> */}
            <AutocompleteInput
                id="treatment"
                title="Treatment name"
                value={loanReason}
                setValue={setLoanReason}
                placeholder="Name of treatment"
                list={allTreatmentList}
                fieldError="Please enter your treatment name"
                otherValueSettter={otherTreatmentNameAndFocusSetter}
            />
            {loanReason === "Other" &&
                <div className="inputGroup">
                    <input 
                        id="otherTreatment"
                        type="text" 
                        value={otherTreatment} 
                        placeholder="Enter your treatment name"
                        // onChange={(e)=>setOtherTreatment(e.target.value)}  
                        onChange={(e)=> onlyCharacters(e.target.value, setOtherTreatment)}  
                        style={{marginBottom:"10px"}}
                        ref={otherTreatmentRef}
                    />
                    <span className="fieldError">Please enter your treatment name</span>
                </div>
            }
            <button onClick={()=>postDetails()} className="submit" style={{marginTop:"32px"}}>Next</button>
            {/* {waiting && 
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", position:"absolute", top:"0", left:"0", height:"100%", width:"100%", background:"rgba(0,0,0,0.4)"}}>
                    <div style={{width:"50vh", maxWidth:"90vw", padding:"16px", background:"white", borderRadius:"16px"}}>
                        <div id="searchAnimation"></div>
                        <p style={{textAlign:"center"}}>Fetching your details...</p>
                    </div>
                </div>
            } */}
        </main>
    )
}