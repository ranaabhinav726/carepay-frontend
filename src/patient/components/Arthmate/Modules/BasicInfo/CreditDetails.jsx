import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { Header } from '../../comps/Header';
import "../../../MobileNumberVerification/mobileNumberVerification.scss"

import rupeeIcon from '../../../../assets/rupee.svg'

import { useNavigate } from "react-router-dom";
// import { useContext } from "react"
// import { DataContext } from "../../App"

import { env, showErrorOnUI, showWrapper, hideWrapper } from '../../../../environment/environment'
import RadioInput from "../../../utility/RadioInput/RadioInput";
import { preEligibility } from "../../../ICICI flow/apis";
import AutocompleteInput from "../../../utility/SuggestionInputBox/SuggestionInputBox";
import routes from "../../../../../layout/Routes";
import { onlyNumbers } from "../../servicesAndUtility/utilityFunctions";
import { validateEmail } from "../../../Fibe flow/Comps/Utility functions/helper";
import BottomPopOverModal from "../../../utility/pannamepopup";
// import { useData } from "../data";

const ArthCreditDetails = () => {
    // const [number, setNumber] = useState('')
    const [fullName, setFullName] = useState("");
    const [amount, setAmount] = useState("");
    const [treatment, setTreatment] = useState("");
    const [otherTreatment, setOtherTreatment] = useState("");

    const [borrower, setBorrower] = useState("myself");
    let isPatient = true;
    const [patientName, setPatientName] = useState("");
    const [relation, setRelation] = useState("MOTHER");

    const [apiError, setApiError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("An error has occured, please try again.");
    const [canSubmit, setCanSubmit] = useState(true);
    const [number,] = useState(localStorage.getItem("phoneNumber"));
    const [patientPhoneNumber, setpatientPhoneNumber] = useState("");
    const [patientEmailId, setpatientEmailId] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [onlyLastName, setOnlyLastName] = useState(false);
    const [showPopOver, setShowPopOver] = useState(false);

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

    let doctorId = localStorage.getItem("doctorId")
    let doctorName = localStorage.getItem("doctorName")
    let userId = localStorage.getItem("userId");

    let treatmentList = [
        "Infertility Treatment (Other than IVF)",
        "In vitro fertilization (IVF)",
        "MTPs",
        "Diagnostic Laparoscopy",
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
        "E-Max Metal Free Crown / Veneer – Metal Free",
        "Ceramil / Azir (Zirconia Crowns) – Metal Free",
        "Zoom Advanced Whitening (3 Cycles)",
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
        "Deep Scaling (Curettage)",
        "Gum-Flap Surgery",
        "Bone Grafting",
        "Gum Graft",
        "Extraction",
        "Impaction / Wisdom Tooth Removal",
        "Biopsy",
        "Apicectomy",
        "Sinuslift",
        "Braces (Metallic) Full Mouth",
        "Metallic- Self Ligating (Damon)",
        "ORTHODONTI - BRACES TREATMENT",
        "Clear Aligners Invisible Braces (Clear Path)",
        "Clear Aligners Invisible Braces (Invisalign)",
        "Clear Aligners Invisible Braces (Others)",
        "Braces (Ceramic) Full Mouth",
        "Invisalign",
        "Cataract operation",
        "Removal of foreign body",
        "Corneal transplant",
        "Tear duct operations",
        "Ptosis",
        "Lasik Surgery",
        "Glaucoma",
        "Squint",
        "Vitreous surgery",
        "Retinal Detachment",
        "Ossiculoplasty",
        "Functional Endoscopic Sinus Surgery",
        "Stapedectomy",
        "Microlaryngeal surgery",
        "Foreign body removal",
        "Tympanoplasty",
        "Glossectomy",
        "Frenuloplasty",
        "Reconstruction of the tongue",
        "Closed reduction of fractures",
        "Operations of tendons / Tendon sheath",
        "Arthroscopic Knee Aspiration",
        "Reduction of dislocations",
        "Dialysis",
        "Angiography",
        "Heart Attack",
        "Stroke",
        "Kidney Failure",
        "Multiple Sclerosis",
        "Parkinson Disease",
        "Alzheimer’s Disease",
        "Paralysis",
        "Muscular Dystrophy",
        "Cardiomyopathy",
        "Loss of Speech",
        "Chronic Aplastic Anemia",
        "Organ Transplants (All Types)",
        "Hepatitis",
        "Coronary Artery, By-Pass Surgery Disease",
        "Head Trauma",
        "Angioplasty",
        "Bone Marrow Transplant (BMT)",
        "Operable Cancers",
        "Early-Stage Cancers",
        "Heart Valve Surgery",
        "Pediatric Cancers",
        "Neurosurgeries",
        "Road Traffic Accidents (RTA)",
        "Brain Surgery",
        "Bacterial Meningitis",
        "End Stage Renal Disease",
        "End Stage Liver Disease",
        "Sepsis",
        "HIV",
        "COMA",
        "End Stage Lung and Liver Cancer",
        "Blood Cancers Adults",
        "Third Degree Burns",
        "Terminal Illness",
        "Encephalitis"
    ];
    // const notsercicable = [
    //     "Bacterial Meningitis",
    //     "End Stage Renal Disease",
    //     "End Stage Liver Disease",
    //     "Sepsis",
    //     "HIV",
    //     "COMA",
    //     "End Stage Lung and Liver Cancer",
    //     "Blood Cancers in Adults",
    //     "Third Degree Burns",
    //     "Terminal Illness",
    //     "Encephalitis"
    // ]
    // const servicableForSomeoneElse = [
    //     "Heart Attack",
    //     "Stroke",
    //     "Kidney Failure",
    //     "Multiple Sclerosis",
    //     "Parkinson's Disease",
    //     "Alzheimer’s Disease",
    //     "Paralysis",
    //     "Muscular Dystrophy",
    //     "Cardiomyopathy",
    //     "Loss of Speech",
    //     "Chronic Aplastic Anemia",
    //     "Organ Transplants (All Types)",
    //     "Hepatitis",
    //     "Coronary Artery Bypass Surgery Disease",
    //     "Head Trauma",
    //     "Angioplasty",
    //     "Bone Marrow Transplant (BMT)",
    //     "Operable Cancers",
    //     "Early-Stage Cancers",
    //     "Heart Valve Surgery",
    //     "Pediatric Cancers",
    //     "Neurosurgeries",
    //     "Road Traffic Accidents (RTA)",
    //     "Brain Surgery"
    // ]
    const servicableForMyself = [
        "Infertility Treatment (Other than IVF)", "In vitro fertilization (IVF)", "MTPs",
        "Diagnostic Laparoscopy", "Minor Surgeries like Polyp, Fibroid etc.", "Therapeutic Curettage",
        "Small operations of Uterus, Cervix etc.", "Small operations of Fallopian tube, Vagina etc.",
        "Lithotripsy", "Hydrocele", "Piles / Fistula", "Prostate", "Varicose Veins",
        "Colonoscopy / Gastroscopy", "Appendectomy", "Cystoscopic removal of stones",
        "Ultrasound guided aspirations", "Hernia", "Hair transplant", "Stretch mark removal",
        "Facelift", "Rhinoplasty", "Liposuction", "Tummy tuck", "Breast Augmentation",
        "Breast Reduction and Breast Lift", "Gynecomastia (Male Breast Reduction)",
        "Vulvovaginal", "Buttock Augmentation", "Buttock Lift", "Blepharoplasty (Eyelid surgery)",
        "Rhinoplasty (Nose Surgery)", "Otoplasty (Ear Pinning)", "Brow lift",
        "Chin Augmentation", "Malar or Cheek Augmentation", "Chemical Peel", "Botulinum toxin or Botox",
        "Soft Tissue Fillers", "Stem Cell Enriched Fat Graft", "Fat Injection/Fat Grafting",
        "Cleft Lip and Cleft Palate", "Dental Implants / Crowns & Bridges",
        "Removable Partial Dentures (Imported)", "Removable Partial Denture (Flexible)",
        "Upper and Lower Complete Denture (Imported)", "E-Max Metal Free Crown / Veneer – Metal Free",
        "Ceramil / Azir (Zirconia Crowns) – Metal Free", "Zoom Advanced Whitening (3 Cycles)",
        "Ant.RCT/ Post.RCT or Re-RCT", "Ceramic Fillings/Inlay (Per Tooth)", "Dental Jewellery (Dental Crystal)",
        "Composite Bonding", "Componeers", "Night Guard", "Dental Diode Laser", "Diode Laser Frenectomy",
        "Laser Gum Contouring", "Laser Depigmentation", "Full Mouth Scaling & Polishing", "Deep Scaling (Curretage)",
        "Gum- Flap Surgery", "Bone Grafting", "Gum Graft", "Extraction", "Impaction / Wisdom Tooth Removal",
        "Biopsy", "Apicectomy", "Sinuslift", "Braces (Metallic) Full Mouth", "Metallic- Self Ligating (Damon)",
        "ORTHODONTI - BRACES TREATEMENT", "Clear Aligners Invisible Braces (Clear Path)",
        "Clear Aligners Invisible Braces (Invisalign)", "Clear Aligners Invisible Braces (Others)",
        "Braces (Ceramic) Full Mouth", "Invisalign", "Cataract operation.", "Removal of foreign body.",
        "Corneal transplant", "Tear duct operations.", "Ptosis", "Lasik Surgery", "Glaucoma",
        "Squint", "Vitreous surgery (Vitreoretinal surgery)", "Retinal Detachment", "Ossiculoplasty",
        "Functional Endoscopic Sinus Surgery", "Stapedectomy.", "Microlaryngeal surgery",
        "Foreign body removal.", "Tympanoplasty.", "Glossectomy", "Frenuloplasty", "Reconstruction of the tongue.",
        "Closed reduction of fractures", "Operations of tendons / Tendon sheath", "Arthroscopic Knee Aspiration",
        "Reduction of dislocations", "Dialysis", "Angiography"
    ];

    const servicableForSomeoneElse = servicableForMyself.concat([
        "Heart Attack", "Stroke", "Kidney Failure", "Multiple Sclerosis",
        "Parkinson Disease", "Alzheimer’s Disease", "Paralysis", "Muscular Dystrophy",
        "Cardiomyopathy", "Loss of Speech", "Chronic Aplastic Anemia", "Organ Transplants(All Types)",
        "Hepatitis", "Coronary Artery, By-Pass Surgery Disease", "Head Trauma", "Angioplasty",
        "BMT", "Operable Cancers", "Early-Stage Cancers", "Heart Valve Surgery",
        "Pediatric Cancers", "Neurosurgeries", "RTA", "Brain Surgery"
    ]);

    const notServiceable = [
        "Bacterial Meningitis", "End Stage Renal Disease", "End Stage Liver Disease",
        "Sepsis", "HIV", "COMA", "End Stage Lung and Liver Cancer", "Blood Cancers Adults",
        "Third Degree Burns", "Terminal Illness", "Encephalitis"
    ];


    useEffect(() => {
        if (!!userId) {
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
                .then(response => {
                    if (response.data.status === 200) {
                        let data = response.data.data;
                        if (!!data) {
                            setAmount(data.loanAmount);
                            setTreatment(data.loanReason);
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

    async function verifyAndNavigate() {
        console.log('ggggg', canSubmit)

        // if (!canSubmit) {
        //     return;
        // }

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
        if (borrower === "someone else") {
            if (!patientName) {
                let elem = document.getElementById('patientName');
                if (elem) showErrorOnUI(elem);
                return;
            }

            if (!patientPhoneNumber) {
                let elem = document.getElementById('patientPhoneNumber');
                if (elem) showErrorOnUI(elem);
                return;
            }
            if (!patientEmailId) {
                let elem = document.getElementById('patientEmailId');
                if (elem) showErrorOnUI(elem);
                return;
            } else if (!validateEmail(patientEmailId)) {
                let elem = document.getElementById('patientEmailId');
                if (elem) showErrorOnUI(elem);
                return;
            }

            if (!relation) {
                let elem = document.getElementById('relation');
                if (elem) showErrorOnUI(elem);
                return;
            }
        }
        // if (!fullName) {
        //     let elem = document.getElementById('fullName');
        //     if (elem) showErrorOnUI(elem);
        //     return;
        // }
        if (!firstName) {
            let elem = document.getElementById('firstName');
            if (elem) showErrorOnUI(elem);
            return;
        }
        if (!lastName && onlyLastName === false) {
            let elem = document.getElementById('lastName');
            if (elem) showErrorOnUI(elem);
            return;
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
            "formStatus": "",
            "name": firstName + ' ' + lastName
        };

        if (treatment === "Other") {
            submitObj.loanReason = otherTreatment;
        } else {
            submitObj.loanReason = treatment;
        }

        if (borrower === "someone else") {
            submitObj.patientName = patientName;
            submitObj.relationshipWithPatient = relation;
            submitObj.patientPhoneNumber = patientPhoneNumber;
            submitObj.patientEmailId = patientEmailId;
        }
        // if (!canSubmit) {
        //     return;
        // }
        if (onlyLastName === true) {
            setShowPopOver(true);
            return;
        }

        // console.log(submitObj); return
        // console.log(submitObj); return;
        await axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(async (response) => {
                console.log(response)
                if (response.data.message === "success") {
                    // await handleNavigation();
                    localStorage.setItem("fullName", firstName + ' ' + lastName);
                    if (!number) return;
                    console.log(borrower)
                    console.log(treatment)
                    if (treatment !== 'Other') {
                        if (borrower === 'myself') {
                            if (servicableForMyself.includes(treatment)) {
                                // navigate(routes.ARTH_PERSONAL_DETAILS);
                                axios.get(env.api_Url + "checkDoctorMappedByNbfc?doctorId=" + doctorId + '&nbfc=FM')
                                    .then(response => {
                                        if (response.data.data === 'true' && response.data.message === 'success') {
                                            navigate(routes.FLEX_WAIT_SCREEN)
                                        } else {
                                            // navigate(routes.RAZORPAY_OFFERS);
                                            axios.get(env.api_Url + 'getActiveFlow')
                                                .then((response) => {
                                                    if (response.data.data === 'PAYU') {
                                                        axios .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                                                        .then((loandata) => {
                                                            const loanId = loandata?.data?.data?.loanId;
                                                            if (loanId) {
                                                                axios
                                                                    .post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                                                                    .then(response => {
                                                                        console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                                                                        axios
                                                                            .get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                                                            .then(eligibilityResponse => {
                                                                                console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                                                                if (eligibilityResponse.data.message === 'success') {
                                                                                    navigate(routes.PAY_SCREEN)
                                                                                }
                                                                            })
                                                                            .catch(err => {
                                                                                console.error('Error fetching customer eligibility:', err);
                                                                            });
                                                                    })
                                                                    .catch(err => {
                                                                        console.error('Error fetching checkout details:', err);
                                                                    });
                                                            } else {
                                                                console.error('Loan ID not found');
                                                            }
                                                        })
                                                        .catch(err => {
                                                            console.error('Error fetching loan details:', err);
                                                        });
                                                    }
                                                    if (response.data.data === 'RAZORPAY') {
                                                        navigate(routes.RAZORPAY_OFFERS)
                                                    }
                                                    if (response.data.data === 'MASTER') {
                                                        navigate(routes.ARTH_PERSONAL_DETAILS)


                                                    }
                                                }
                                                )
                                        }


                                    }).catch(() => {

                                    });
                                // navigate(routes.FLEX_WAIT_SCREEN)
                            } else if (notServiceable.includes(treatment)) {
                                navigate(routes.NOT_SERVICEABLE);
                            } else {
                                navigate(routes.NOT_SERVICEABLE);
                            }
                        } else if (borrower === 'someone else') {
                            if (servicableForSomeoneElse.includes(treatment)) {
                                if (!notServiceable.includes(treatment)) {
                                    // navigate(routes.ARTH_PERSONAL_DETAILS);
                                    // navigate(routes.FLEX_WAIT_SCREEN)
                                    axios.get(env.api_Url + "checkDoctorMappedByNbfc?doctorId=" + doctorId + '&nbfc=FM')
                                        .then(response => {
                                            console.log(response.data)
                                            if (response.data.data === 'true' && response.data.message === 'success') {
                                                navigate(routes.FLEX_WAIT_SCREEN)
                                            } else {
                                                axios.get(env.api_Url + 'getActiveFlow')
                                                    .then((response) => {
                                                        if (response.data.data === 'PAYU') {
                                                            axios .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                                                                .then((loandata) => {
                                                                    const loanId = loandata?.data?.data?.loanId;
                                                                    if (loanId) {
                                                                        axios
                                                                            .post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                                                                            .then(response => {
                                                                                console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                                                                                axios
                                                                                    .get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                                                                    .then(eligibilityResponse => {
                                                                                        console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                                                                        if (eligibilityResponse.data.message === 'success') {
                                                                                            navigate(routes.PAY_SCREEN)
                                                                                        }
                                                                                    })
                                                                                    .catch(err => {
                                                                                        console.error('Error fetching customer eligibility:', err);
                                                                                    });
                                                                            })
                                                                            .catch(err => {
                                                                                console.error('Error fetching checkout details:', err);
                                                                            });
                                                                    } else {
                                                                        console.error('Loan ID not found');
                                                                    }
                                                                })
                                                                .catch(err => {
                                                                    console.error('Error fetching loan details:', err);
                                                                });
                                                        }
                                                        if (response.data.data === 'RAZORPAY') {
                                                            navigate(routes.RAZORPAY_OFFERS)
                                                        }
                                                        if (response.data.data === 'MASTER') {
                                                            navigate(routes.ARTH_PERSONAL_DETAILS)


                                                        }
                                                    }
                                                    )
                                                // navigate(routes.ARTH_PERSONAL_DETAILS);
                                                // navigate(routes.RAZORPAY_OFFERS);
                                                axios.get(env.api_Url + 'getActiveFlow')
                                                    .then((response) => {
                                                        if (response.data.data === 'PAYU') {
                                                            axios .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                                                            .then((loandata) => {
                                                                const loanId = loandata?.data?.data?.loanId;
                                                                if (loanId) {
                                                                    axios
                                                                        .post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                                                                        .then(response => {
                                                                            console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                                                                            axios
                                                                                .get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                                                                .then(eligibilityResponse => {
                                                                                    console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                                                                    if (eligibilityResponse.data.message === 'success') {
                                                                                        navigate(routes.PAY_SCREEN)
                                                                                    }
                                                                                })
                                                                                .catch(err => {
                                                                                    console.error('Error fetching customer eligibility:', err);
                                                                                });
                                                                        })
                                                                        .catch(err => {
                                                                            console.error('Error fetching checkout details:', err);
                                                                        });
                                                                } else {
                                                                    console.error('Loan ID not found');
                                                                }
                                                            })
                                                            .catch(err => {
                                                                console.error('Error fetching loan details:', err);
                                                            });
                                                        }
                                                        if (response.data.data === 'RAZORPAY') {
                                                            navigate(routes.RAZORPAY_OFFERS)
                                                        }
                                                        if (response.data.data === 'MASTER') {
                                                            navigate(routes.ARTH_PERSONAL_DETAILS)


                                                        }
                                                    }
                                                    )
                                            }


                                        }).catch(() => {

                                        });
                                } else {
                                    navigate(routes.NOT_SERVICEABLE);
                                }
                            } else {
                                navigate(routes.NOT_SERVICEABLE);
                            }
                        }
                    } else if (treatment === 'Other') {
                        navigate(routes.ARTH_PERSONAL_DETAILS);
                        // navigate(routes.FLEX_WAIT_SCREEN)

                    }
                    // if (treatment !== 'Other') {
                    //     if (borrower === 'myself') {
                    //         if (!notsercicable.includes(treatment) && !servicableForSomeoneElse.includes(treatment)) {
                    //             navigate(routes.ARTH_PERSONAL_DETAILS);
                    //             // navigate(routes.FLEX_WAIT_SCREEN)
                    //         } else {
                    //             navigate(routes.NOT_SERVICEABLE);
                    //         }
                    //     }
                    //     if (borrower === 'someone else') {
                    //         if (servicableForSomeoneElse.includes(treatment)) {

                    //             if (!notsercicable.includes(treatment)) {
                    //                 // navigate(routes.FLEX_WAIT_SCREEN)
                    //                 navigate(routes.ARTH_PERSONAL_DETAILS);
                    //             } else {
                    //                 navigate(routes.NOT_SERVICEABLE);
                    //             }
                    //         } else {
                    //             navigate(routes.NOT_SERVICEABLE);
                    //         }

                    //     }
                    // }
                    // if(treatment==='Other'){
                    //     // navigate(routes.FLEX_WAIT_SCREEN)
                    //     navigate(routes.ARTH_PERSONAL_DETAILS);
                    // }





                    // if(amount > 100000){
                    //     navigate('/patient/ArthPresciptionUpload');
                    // }else{
                    //     navigate('/patient/PersonalDetails');
                    // }
                    // preEligibility(number, res=>{
                    // if(res?.data?.data?.status === 1){
                    //     let data = res?.data?.data?.data;
                    //     console.log(data);

                    //     navigate("/patient/congratsPreApprovedIcici", {state : {"offer":data}})
                    // }else{
                    //     if(amount > 100000){
                    //         navigate('/patient/PrescriptionUpload');
                    //     }else{
                    //         navigate('/patient/PersonalDetails');
                    //     }
                    // }
                    // })
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
            return;
        }
        val = parseInt(val);
        if (val >= 0 && val <= 1000000) {
            setAmount(val);
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
    function numberChange(val) {
        if (val.length > 10) return;
        onlyNumbers(val, setpatientPhoneNumber)
    }
    async function checkAndNavigate() {
        console.log('ggggg', canSubmit)

        // if (!canSubmit) {
        //     return;
        // }


        let submitObj = {
            "userId": userId,
            "doctorName": doctorName,
            "doctorId": doctorId,
            "loanAmount": amount,
            "formStatus": "",
            "name": firstName + ' ' + lastName
        };

        if (treatment === "Other") {
            submitObj.loanReason = otherTreatment;
        } else {
            submitObj.loanReason = treatment;
        }

        if (borrower === "someone else") {
            submitObj.patientName = patientName;
            submitObj.relationshipWithPatient = relation;
            submitObj.patientPhoneNumber = patientPhoneNumber;
            submitObj.patientEmailId = patientEmailId;
        }

        await axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(async (response) => {
                console.log(response)
                if (response.data.message === "success") {
                    // await handleNavigation();
                    localStorage.setItem("fullName", firstName + ' ' + lastName);
                    if (!number) return;
                    console.log(borrower)
                    console.log(treatment)
                    if (treatment !== 'Other') {
                        if (borrower === 'myself') {
                            if (servicableForMyself.includes(treatment)) {
                                // navigate(routes.ARTH_PERSONAL_DETAILS);
                                axios.get(env.api_Url + "checkDoctorMappedByNbfc?doctorId=" + doctorId + '&nbfc=FM')
                                    .then(response => {
                                        if (response.data.data === 'true' && response.data.message === 'success') {
                                            navigate(routes.FLEX_WAIT_SCREEN)
                                        } else {
                                            // navigate(routes.ARTH_PERSONAL_DETAILS);
                                            // navigate(routes.RAZORPAY_OFFERS);
                                            axios.get(env.api_Url + 'getActiveFlow')
                                                .then((response) => {
                                                    if (response.data.data === 'PAYU') {
                                                        axios .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                                                        .then((loandata) => {
                                                            const loanId = loandata?.data?.data?.loanId;
                                                            if (loanId) {
                                                                axios
                                                                    .post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                                                                    .then(response => {
                                                                        console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                                                                        axios
                                                                            .get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                                                            .then(eligibilityResponse => {
                                                                                console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                                                                if (eligibilityResponse.data.message === 'success') {
                                                                                    navigate(routes.PAY_SCREEN)
                                                                                }
                                                                            })
                                                                            .catch(err => {
                                                                                console.error('Error fetching customer eligibility:', err);
                                                                            });
                                                                    })
                                                                    .catch(err => {
                                                                        console.error('Error fetching checkout details:', err);
                                                                    });
                                                            } else {
                                                                console.error('Loan ID not found');
                                                            }
                                                        })
                                                        .catch(err => {
                                                            console.error('Error fetching loan details:', err);
                                                        });
                                                    }
                                                    if (response.data.data === 'RAZORPAY') {
                                                        navigate(routes.RAZORPAY_OFFERS)
                                                    }
                                                    if (response.data.data === 'MASTER') {
                                                        navigate(routes.ARTH_PERSONAL_DETAILS)


                                                    }
                                                }
                                                )
                                        }


                                    }).catch(() => {

                                    });
                                // navigate(routes.FLEX_WAIT_SCREEN)
                            } else if (notServiceable.includes(treatment)) {
                                navigate(routes.NOT_SERVICEABLE);
                            } else {
                                navigate(routes.NOT_SERVICEABLE);
                            }
                        } else if (borrower === 'someone else') {
                            if (servicableForSomeoneElse.includes(treatment)) {
                                if (!notServiceable.includes(treatment)) {
                                    axios.get(env.api_Url + "checkDoctorMappedByNbfc?doctorId=" + doctorId + '&nbfc=FM')
                                        .then(response => {
                                            console.log(response.data)
                                            if (response.data.data === 'true' && response.data.message === 'success') {
                                                navigate(routes.FLEX_WAIT_SCREEN)
                                            } else {
                                                axios.get(env.api_Url + 'getActiveFlow')
                                                    .then((response) => {
                                                        if (response.data.data === 'PAYU') {
                                                            axios .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                                                            .then((loandata) => {
                                                                const loanId = loandata?.data?.data?.loanId;
                                                                if (loanId) {
                                                                    axios
                                                                        .post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                                                                        .then(response => {
                                                                            console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                                                                            axios
                                                                                .get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                                                                .then(eligibilityResponse => {
                                                                                    console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                                                                    if (eligibilityResponse.data.message === 'success') {
                                                                                        navigate(routes.PAY_SCREEN)
                                                                                    }
                                                                                })
                                                                                .catch(err => {
                                                                                    console.error('Error fetching customer eligibility:', err);
                                                                                });
                                                                        })
                                                                        .catch(err => {
                                                                            console.error('Error fetching checkout details:', err);
                                                                        });
                                                                } else {
                                                                    console.error('Loan ID not found');
                                                                }
                                                            })
                                                            .catch(err => {
                                                                console.error('Error fetching loan details:', err);
                                                            });
                                                        }
                                                        if (response.data.data === 'RAZORPAY') {
                                                            navigate(routes.RAZORPAY_OFFERS)
                                                        }
                                                        if (response.data.data === 'MASTER') {
                                                            navigate(routes.ARTH_PERSONAL_DETAILS)


                                                        }
                                                    }
                                                    )
                                                // navigate(routes.RAZORPAY_OFFERS);
                                                ////check pay or razorpay active
                                                //// if pay active  the pay eligibility api call

                                                // navigate(routes.ARTH_PERSONAL_DETAILS);
                                            }


                                        }).catch(() => {

                                        });
                                } else {
                                    navigate(routes.NOT_SERVICEABLE);
                                }
                            } else {
                                navigate(routes.NOT_SERVICEABLE);
                            }
                        }
                    } else if (treatment === 'Other') {
                        navigate(routes.ARTH_PERSONAL_DETAILS);

                    }

                } else {
                    apiErrorHandler();
                }
            }).catch(error => {
                apiErrorHandler();
                console.log(error);
            });

        setCanSubmit(true);
        hideWrapper(ref.current)

    }
    const setShow = () => {
        setShowPopOver(false)
        hideWrapper(ref.current)
    }
    let popUpMsg = <p style={{ color: "black", lineHeight: 'revert', marginBottom: '-25px', fontSize: '15px' }}> <b>Does your name looks like this on your PAN?</b><br />
        You must enter your name according to your PAN,<br /> this is necessary for assessment of your loan.</p>;

    return (
        <>
            {/* <main className="mobileNumberVerification" > */}
            <main className="mobileNumberVerification" style={{ position: "relative" }}>

                <Header progressBar="hidden" />
                <h3 className="mobileVerificationHeading">Credit Details</h3>

                <div className="inputGroup">
                    <p>Credit amount</p>
                    <div className="inputBoxWithSymbol" style={{ display: "flex", alignItems: "baseline" }}>
                        <div className="rupeeSymbol" style={{ padding: "0 16px" }}><img src={rupeeIcon} alt="" /></div>
                        <input
                            id="loanAmount"
                            type="text"
                            value={amount}
                            placeholder="Enter credit amount"
                            onChange={(e) => amountHandler(e.target.value)}
                        />
                    </div>
                    <p style={{ marginTop: "-5px", marginBottom: "20px", fontSize: "14px" }}>Please keep the credit amount under Rs 10,00,000</p>
                    <span className="fieldError">Please enter your treatment cost</span>
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
                    placeholder="Name of treatment"
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
                            placeholder="Enter your treatment name"
                            // onChange={(e)=>setOtherTreatment(e.target.value)}  
                            onChange={(e) => onlyCharacters(e.target.value, setOtherTreatment)}
                            style={{ marginBottom: "10px" }}
                            ref={otherTreatmentRef}
                        />
                        <span className="fieldError">Please enter your treatment name</span>
                    </div>
                }

                <div className="inputGroup" style={{ marginTop: "1.5rem" }}>
                    <p>First name (as per PAN)</p>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        placeholder="Enter your first name"
                        // onChange={(e)=>setfirstName(e.target.value)}  
                        onChange={(e) => onlyCharacters(e.target.value, setfirstName)}
                        style={{ marginBottom: "10px" }}
                    />
                    <span className="fieldError">Please enter your first name</span>
                    <p style={{ fontSize: "14px" }}>If not sure, please check your PAN and then enter the name accordingly.</p>
                </div>
                <div className="inputGroup" style={{ marginTop: "1.5rem" }}>
                    <p>Middle & Last name (as per PAN)</p>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        placeholder="Enter your middle & last name"
                        // onChange={(e)=>setlastName(e.target.value)}  
                        onChange={(e) => onlyCharacters(e.target.value, setlastName)}
                        style={{ marginBottom: "10px" }}
                    />
                    <span className="fieldError">Please enter your middle and last name.<br />
                        If your PAN does not have your middle and last name<br /> mentioned on it, then click the tickbox below.</span>
                    <div style={{ marginBottom: "26px", display: "flex", alignItems: "center" }}>
                        <input
                            style={{ width: '20px' }}
                            type="checkbox"
                            placeholder=""
                            onChange={(e) => setOnlyLastName(!onlyLastName)}
                        />
                        <label htmlFor="isPatient" style={{ paddingLeft: "10px", fontSize: "inherit", marginTop: '-20px' }}>My PAN card only has my first name.</label>
                    </div>
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
                            <p>Patient's mobile number</p>
                            <input
                                id="patientPhoneNumber"
                                type="number"
                                value={patientPhoneNumber}
                                placeholder="Enter mobile no. of patient here"
                                // onChange={(e)=>setPatientName(e.target.value)}  
                                maxLength={10}
                                onChange={(e) => numberChange(e.target.value)}
                            />
                            <span className="fieldError">Please fill number of the patient</span>
                        </div>

                        <div className="inputGroup">
                            <p>Patient's email-ID </p>
                            <input
                                id="patientEmailId"
                                type="email"
                                value={patientEmailId}
                                placeholder="Enter email-ID of patient here"
                                // onChange={(e)=>setPatientName(e.target.value)}  
                                onChange={(e) => setpatientEmailId(e.target.value)}
                            />
                            <span className="fieldError">Please fill Email-Id of the patient</span>
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
                                    <option value={""}>Select Relationship</option>
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
                {/* {onlyLastName === false ? */}
                <button onClick={() => verifyAndNavigate()} className="submit">Submit</button>
                {/* : ""} */}
                <BottomPopOverModal
                    firstName={firstName}
                    popUpMsg={popUpMsg}
                    showPopOver={showPopOver}
                    setShowPopOver={setShow}
                    checkAndNavigate={checkAndNavigate}
                    yesBtnText={"Yes, continue."}
                    noBtnText={"No, I want to change my name."}
                // noBtnClick={salaryError}
                />
            </main>
        </>
    )

}

export default ArthCreditDetails