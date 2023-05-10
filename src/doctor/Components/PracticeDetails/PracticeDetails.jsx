import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Header/Header"
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../environment"
import axios from "axios"

const PracticeDetails = () =>{

    const navigate = useNavigate()

    const [licenseNum, setLisenceNum] = useState("")
    const [speciality, setSpeciality] = useState("Dentistry")
    const [clinicName, setClinicName] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [entityType, setEntityType] = useState("Private Limited Company")
    const [LLpin, setLLpin] = useState("")
    const [GSTIN, setGSTIN] = useState("")

    const [id, setId] = useState("");
    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    let doctorId = localStorage.getItem('doctorId');

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
    },[])

    useEffect(()=>{
        if(doctorId){
            async function getCall(){
                showWrapper(ref.current);
                await axios.get(env.api_Url+"getDoctorProfDetailsByDoctorId?doctorId=" + doctorId)
                .then((response)=>{
                    console.log(response)
                    if(response.data.data != null){
                        setId(response?.data?.data?.id);
                        let license = response?.data?.data?.licenceNumber;
                        setLisenceNum(license);
                        let speciality = response?.data?.data?.speciality;
                        setSpeciality(speciality);
                        let clinicName = response?.data?.data?.clinicName;
                        setClinicName(clinicName);
                        let business = response?.data?.data?.businessEntityName;
                        setBusinessName(business);
                        let entity = response?.data?.data?.businessEntityType;
                        setEntityType(entity);
                        let llpin = response?.data?.data?.cinLlpin;
                        setLLpin(llpin);
                        let gst = response?.data?.data?.gstIn;
                        setGSTIN(gst);
                    }
                }).catch((error)=>{
                    console.log(error)
                })
                hideWrapper(ref.current)
            }
            getCall();
        }
    },[])

    // function showErrorOnUI(elem){
    //     elem.scrollIntoView({ behavior: "smooth", block: "center"});
    //     elem.classList.add('inputBoxError');
    //     navigator.vibrate(
    //         [100, 30, 100, 30]
    //     );

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    async function handleSubmit(){

        if(! licenseNum){
            let elem = document.getElementById('license');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! speciality){
            let elem = document.getElementById('speciality');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! clinicName){
            let elem = document.getElementById('clinicName');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! entityType){
            let elem = document.getElementById('entityType');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)
        
        await axios.post(env.api_Url+"saveOrUpdateDoctorProfessionalDetails",{
            "id": id,
            "doctorId" : doctorId,
            "licenceNumber": licenseNum,
            "clinicName": clinicName,
            "businessEntityName": businessName,
            "businessEntityType": entityType,
            "cinLlpin": LLpin,
            "gstIn": GSTIN,
            "speciality": speciality
        })
        .then(response =>{
            if(response.data.status == 200){
                console.log(response);
                navigate('/doctor/AddressDetails');
            }else{
                apiErrorHandler();
            }
        }).catch(error => {
            apiErrorHandler();
            console.log(error);
        });
        setCanSubmit(true);
        hideWrapper(ref.current);
    }
    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 1500);
    }

    return(
        <>
        <main id="practiceDetails">
        <Header progressbarDisplay="block" progress={60} canGoBack />
            <p className="heading">Practice details</p>

            <div className="inputGroup">
                <p className='group-title'>License number</p>
                <input
                    id="license"
                    className='group-input'
                    onChange={(e)=>setLisenceNum(e.target.value)}
                    value={licenseNum}
                    placeholder="Enter License number" 
                    autoCapitalize="characters"
                />
                <span className="fieldError">Please enter license number</span>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Speciality</p>
                <select 
                    name="" 
                    id="speciality"
                    className='group-input' 
                    onChange={(e)=>setSpeciality(e.target.value)} 
                    value={speciality} 
                    placeholder="Enter your Speciality"
                >
                    <option>Dentistry</option>
                    <option>Dental Surgery</option>
                    <option>Radiology</option>
                    <option>Immunology</option>
                    <option>Neurology</option>
                    <option>Gynecology and obstetrics</option>
                    <option>Pediatrics</option>
                    <option>Psychiatry</option>
                    <option>Internal medicine</option>
                    <option>General</option>
                    <option>Cardiology</option>
                    <option>Orthopedics</option>
                    <option>Emergency medicine</option>
                    <option>Endocrinology</option>
                    <option>Gastroenterology</option>
                    <option>Nephrology</option>
                    <option>Pulmonology</option>
                    <option>Dietetics</option>
                    <option>Urology</option>
                    <option>Cosmetology</option>
                    <option>Vascular Surgery</option>
                    <option>Anesthesiology</option>
                    <option>Genetics</option>
                    <option>Nuclear medicine</option>
                    <option>Forensic medicine</option>
                    <option>Dermatology</option>
                    <option>Oncology</option>
                    <option>Pathology</option>
                    <option>Physiotherapy</option>
                    <option>ENT</option>
                    <option>Plastic surgery</option>
                    <option>Rheumatology</option>
                    <option>Bariatric Surgery</option>
                    <option>Psychology</option>
                    <option>Diabetology</option>
                    <option>Neurosurgery</option>
                    <option>Others</option>
                </select>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Clinic name</p>
                <input
                    id="clinicName"
                    className='group-input'
                    onChange={(e)=>setClinicName(e.target.value)}
                    value={clinicName}
                    placeholder="Enter your clinic's name" 
                />
                <span className="fieldError">Please enter your clinic's name</span>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Full name of business entity</p>
                <input
                    id="businessName"
                    className='group-input'
                    onChange={(e)=>setBusinessName(e.target.value)}
                    value={businessName}
                    placeholder="Enter full name of business entity" 
                />
            </div>

            <div className="inputGroup">
                <p className='group-title'>Type of entity</p>
                <select 
                    name="" 
                    id="entityType" 
                    className='group-input'
                    onChange={(e)=>setEntityType(e.target.value)}
                    value={entityType}
                    placeholder="Enter type of business entity" 
                >
                    <option>Private Limited Company</option>
                    <option>Limited Liability Company (LLP)</option>
                    <option>Partnership Firm</option>
                    <option>Sole Proprietorship</option>
                </select>
            </div>

            <div className="inputGroup">
                <p className='group-title'>CIN/LLPIN</p>
                <input
                    id="LLpin"
                    className='group-input'
                    onChange={(e)=>setLLpin(e.target.value)}
                    value={LLpin}
                    placeholder="Enter CIN/LLPIN" 
                />
            </div>

            <div className="inputGroup">
                <p className='group-title'>GSTIN</p>
                <input
                    id="GSTIN"
                    className='group-input'
                    onChange={(e)=>setGSTIN(e.target.value)}
                    value={GSTIN}
                    placeholder="Enter GSTIN" 
                />
            </div>
            <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
            <button onClick={()=>handleSubmit()} className="submit">Next</button>
        </main>
        </>
    )
}

export default PracticeDetails