import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Header/Header"
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../environment"
import axios from "axios"

const PracticeDetails = () => {

    const navigate = useNavigate()

    const [licenseNum, setLisenceNum] = useState("")
    const [speciality, setSpeciality] = useState("Dentistry")
    const [specialityOther, setSpecialityOther] = useState("")
    const [clinicName, setClinicName] = useState("")
    const [doe, setDoe] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [entityType, setEntityType] = useState("Private Limited Company")
    const [LLpin, setLLpin] = useState("")
    const [GSTIN, setGSTIN] = useState("")

    const [id, setId] = useState("");
    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const [doctorId, setDoctorId] = useState(localStorage.getItem('D-doctorId'));

    // let doctorId = 

    let ref = useRef(0);
    useEffect(() => {
        setDoctorId(localStorage.getItem('D-doctorId'));
        ref.current = document.getElementById('animation-wrapper');
    }, [])

    // let branches = ["Dentistry", "Dental Surgery", "Radiology", "Immunology", 
    //                 "Neurology", "Gynecology and obstetrics", "Pediatrics", "Psychiatry", 
    //                 "Internal medicine", "General", "Cardiology", "Orthopedics", "Emergency medicine", 
    //                 "Endocrinology", "Gastroenterology", "Nephrology", "Pulmonology", "Dietetics", 
    //                 "Urology", "Cosmetology", "Vascular Surgery", "Anesthesiology", "Genetics", 
    //                 "Nuclear medicine", "Forensic medicine", "Dermatology", "Oncology", "Pathology", 
    //                 "Physiotherapy", "ENT", "Plastic surgery", "Rheumatology", "Bariatric Surgery", 
    //                 "Psychology", "Diabetology", "Neurosurgery", "Other"]

    let branches = [
        'Anesthesiology',
        'Bariatric Surgery',
        'Cardiology',
        'Cosmetology',
        'Dental Surgery',
        'Dentistry',
        'Dermatology',
        'Diabetology',
        'Dietetics',
        'ENT',
        'Emergency medicine',
        'Endocrinology',
        'Forensic medicine',
        'Gastroenterology',
        'General',
        'Genetics',
        'Gym',
        'Gynecology and obstetrics',
        'IVF',
        'Immunology',
        'Internal medicine',
        'Nephrology',
        'Neurology',
        'Neurosurgery',
        'Nuclear medicine',
        'Oncology',
        'Orthopedics',
        'Pathology',
        'Pediatrics',
        'Physiotherapy',
        'Plastic surgery',
        'Psychiatry',
        'Psychology',
        'Pulmonology',
        'Radiology',
        'Rheumatology',
        'Salon',
        'Urology',
        'Vascular Surgery',
        'Wellness',
        'Other'
    ]

    useEffect(() => {
        if (doctorId) {
            async function getCall() {
                showWrapper(ref.current);
                await axios.get(env.api_Url + "getDoctorProfDetailsByDoctorId?doctorId=" + doctorId)
                    .then((response) => {
                        // console.log(response)
                        if (response.data.data != null) {
                            setId(response?.data?.data?.id);
                            let license = response?.data?.data?.licenceNumber;
                            setLisenceNum(license);
                            let speciality = response?.data?.data?.speciality;
                            if (branches.includes(speciality)) {
                                setSpeciality(speciality);
                            } else {
                                setSpeciality("Other");
                                setSpecialityOther(speciality);
                            }
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
                    }).catch((error) => {
                        console.log(error)
                    })
                hideWrapper(ref.current)
            }
            getCall();
        }
    }, [doctorId])



    let branchOptions = branches.map((branch, idx) => {
        return <option value={branch} key={idx}>{branch}</option>
    })

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

    async function handleSubmit() {

        if (!licenseNum) {
            let elem = document.getElementById('license');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (!speciality) {
            let elem = document.getElementById('speciality');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (speciality === "Other" && (!specialityOther)) {
            let elem = document.getElementById('specialityOther');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (!clinicName) {
            let elem = document.getElementById('clinicName');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (!doe) {
            let elem = document.getElementById('doe');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (!entityType) {
            let elem = document.getElementById('entityType');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (!canSubmit) {
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        let date = doe;
        date = date.split("-").reverse().join("-");

        let submitObj = {
            "id": id,
            "doctorId": doctorId,
            "licenceNumber": licenseNum,
            "clinicName": clinicName,
            "incorporationDate": date,
            "businessEntityName": businessName,
            "businessEntityType": entityType,
            "cinLlpin": LLpin,
            "gstIn": GSTIN,
        }

        if (speciality === "Other") {
            submitObj.speciality = specialityOther;
        } else {
            submitObj.speciality = speciality;
        }

        await axios.post(env.api_Url + "saveOrUpdateDoctorProfessionalDetails", submitObj)
            .then(response => {
                if (response.data.status == 200) {
                    console.log(response);
                    navigate('/doctor/AddressDetails');
                } else {
                    apiErrorHandler();
                }
            }).catch(error => {
                apiErrorHandler();
                console.log(error);
            });
        setCanSubmit(true);
        hideWrapper(ref.current);
    }
    function apiErrorHandler() {
        setApiError(true)
        setTimeout(() => {
            setApiError(false);
        }, 1500);
    }

    return (
        <>
            <main id="practiceDetails">
                <Header progressbarDisplay="block" progress={60} canGoBack={"/doctor/PersonalDetails"} />
                <p className="heading">Practice details</p>

                <div className="inputGroup">
                    <p className='group-title'>License number</p>
                    <input
                        id="license"
                        className='group-input'
                        onChange={(e) => setLisenceNum(e.target.value)}
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
                        onChange={(e) => setSpeciality(e.target.value)}
                        value={speciality}
                        placeholder="Enter your Speciality"
                    >
                        {branchOptions}
                    </select>
                </div>

                {speciality === "Other" &&
                    <div className="inputGroup">
                        <p className='group-title'>Kindly tell us your speciality</p>
                        <input
                            id="specialityOther"
                            className='group-input'
                            onChange={(e) => setSpecialityOther(e.target.value)}
                            value={specialityOther}
                            placeholder="Enter your speciality"
                        />
                        <span className="fieldError">Please type-in your speciality</span>
                    </div>
                }

                <div className="inputGroup">
                    <p className='group-title'>Clinic name</p>
                    <input
                        id="clinicName"
                        className='group-input'
                        onChange={(e) => setClinicName(e.target.value)}
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
                        onChange={(e) => setBusinessName(e.target.value)}
                        value={businessName}
                        placeholder="Enter full name of business entity"
                    />
                </div>
                <div className="inputGroup">
                    <p className='group-title'>Date of establishment of clinic/hospital</p>
                    <input
                        id="doe"
                        className="group-input"
                        type="date"
                        value={doe}
                        onChange={(e) => setDoe(e.target.value)}
                        placeholder="Select Date"
                    />
                    <span className="fieldError">Please enter date of establishment</span>
                </div>
                <div className="inputGroup">
                    <p className='group-title'>Type of entity</p>
                    <select
                        name=""
                        id="entityType"
                        className='group-input'
                        onChange={(e) => setEntityType(e.target.value)}
                        value={entityType}
                        placeholder="Enter type of business entity"
                    >
                        <option value="Private Limited Company">Private Limited Company</option>
                        <option value="Limited Liability Company (LLP)">Limited Liability Company (LLP)</option>
                        <option value="Partnership Firm">Partnership Firm</option>
                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                        <option value="Multispeciality/Charitable Trust">Multispeciality/Charitable Trust</option>
                        <option value="HUF/ Joint Hindu Undivided Family">HUF/ Joint Hindu Undivided Family</option>
                    </select>
                </div>

                <div className="inputGroup">
                    <p className='group-title'>CIN/LLPIN</p>
                    <input
                        id="LLpin"
                        className='group-input'
                        onChange={(e) => setLLpin(e.target.value)}
                        value={LLpin}
                        placeholder="Enter CIN/LLPIN"
                    />
                </div>

                <div className="inputGroup">
                    <p className='group-title'>GSTIN</p>
                    <input
                        id="GSTIN"
                        className='group-input'
                        onChange={(e) => setGSTIN(e.target.value)}
                        value={GSTIN}
                        placeholder="Enter GSTIN"
                    />
                </div>
                <p className={apiError ? "apiError" : "apiError hide"}>An error has occured, please try again.</p>
                <button onClick={() => handleSubmit()} className="submit">Next</button>
            </main>
        </>
    )
}

export default PracticeDetails