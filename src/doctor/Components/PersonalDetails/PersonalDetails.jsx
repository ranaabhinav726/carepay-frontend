import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Header/Header"

import axios from "axios"
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../environment"

import './personalDetails.scss'

const DocPersonalDetails = () =>{

    const navigate = useNavigate();

    // let phoneNumber = ;
    const [phoneNumber, setPhoneNumber] = useState("");
    // const phoneNumber = useState(localStorage.getItem('D-phoneNumber'));

    const [number, setNumber] = useState('');
    const [isNumValid, setNumValid] = useState(false);
    const [isPanValid, setPanValid] = useState(false);

    const [fullName, setFullName] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    
    const [joiningDate, setJoiningDate] = useState('');
    const [doctorCode, setDoctorCode] = useState('');
    const [creatorId, setCreatorId] = useState('');
    const [scoutCode, setScoutCode] = useState('');
    const [important, setImportant] = useState('');
    const [appDownloadStatus, setAppDownloadStatus] = useState('');
    const [verified, setVerified] = useState('');
    const [mobileVerified, setMobileVerified] = useState('');

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    
    const [id, setId] = useState("");
    const[doctorId, setDoctorId] = useState(localStorage.getItem("D-doctorId"));

    const [scoutList, setScoutList] = useState([]);

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
        let num = localStorage.getItem('D-phoneNumber');
        if(num){
            setPhoneNumber(num);
        }
    },[])


    useEffect(()=>{
        if(phoneNumber){
            async function getCall(){
                showWrapper(ref.current);
                setNumber(phoneNumber);
                setNumValid(true)
                await axios.get(env.api_Url + "getDoctorDetailsByPhoneNumber?mobileNo=" + phoneNumber)
                .then((response) => {
                    console.log(response)
                    if(response.data.data != null){
                        setId(response?.data?.data?.id);
                        localStorage.setItem("D-doctorId", response?.data?.data?.doctorId);
                        let doctorId = response?.data?.data?.doctorId;
                        setDoctorId(doctorId);
                        let birthdate = response?.data?.data?.dob.split(" ")[0];
                        let doctorCode = response?.data?.data?.doctorCode;
                        setDoctorCode(doctorCode);
                        setCreatorId(response?.data?.data?.creatorId)
                        setScoutCode(response?.data?.data?.scoutCode)
                        setImportant(response?.data?.data?.important)
                        setAppDownloadStatus(response?.data?.data?.appDownloadStatus)
                        setVerified(response?.data?.data?.verified)
                        setMobileVerified(response?.data?.data?.mobileVerified)

                        birthdate = birthdate.split("-").reverse().join("-");
                        setDob(birthdate);
                        let emailId = response?.data?.data?.emailId;
                        // console.log(emailId)
                        setEmail(emailId);
                        let name = response?.data?.data?.name;
                        setFullName(name);
                        let pan = response?.data?.data?.pan;
                        setPanNumber(pan);
                        handlePan(pan);
                        setJoiningDate(response?.data?.data?.joiningDate ?? "");
                    }
                }).catch(error => {
                    console.log(error);
                });
                hideWrapper(ref.current)
            };
            getCall();
        }
        if(doctorId){
            axios.get(env.api_Url + "getDoctorDetailByDoctorId?doctorId=" + doctorId)
            .then((response)=>{
                if(response.data.message === "success"){
                    setPhoneNumber(response?.data?.data?.phone_number)
                }
            })
        }
    },[phoneNumber, doctorId]);

    useEffect(()=>{
        axios.get(env.api_Url + "getAllScoutCodes")
        .then(response => {
            console.log(response);
            if(response.data.status === 200){
                setScoutList(response.data.data);
            }
        })
    }, [])

    let scoutOptions = scoutList.map((scout, idx)=>{
        return <option className="scout-option" key={idx} value={scout.code}>{scout.code}</option>
    })

    //////////////////////////////// DOB restriction ///////////////////////////////////////
    ////// Below code is to calculate the maximum date the user can input as DOB.///////////
    const today = new Date();
    let day = today.getDate();
    day = (day<10? "0"+day : day);
    let month = today.getMonth() + 1;
    month = (month<10? "0"+month : month);
    let year = today.getFullYear();
    year = year-18; // to restrict the minimum age of user to 15 years.

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

    function numberChange(e){
        let val = e.target.value;
        // console.log(val)
        if(val.length > 10) return
        if(val.length <= 10){
            setNumber(val);
            if(val[0] < 6){
                document.getElementById('number-msg').style.display = "block";
                setNumValid(false);
            }else{
                document.getElementById('number-msg').style.display = "none";
                setNumValid(true);
            }
            if(val.length < 10) setNumValid(false)
        }
        // setNumber(val)
        // console.log(val)
    }

    function handlePan(val){
        val = val.toUpperCase();
        if(val.length == 10){
            setPanNumber(val);
            let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
            console.log(regex.test(val))
            if (regex.test(val) == false) {
                let errorMsg = document.getElementById('panFormat');
                errorMsg.style.display = "block";
                setPanValid(false);
            }else{
                let errorMsg = document.getElementById('panFormat');
                errorMsg.style.display = "none";
                setPanValid(true);
            }
        }
        else if(val.length > 10) return
        else{
            setPanNumber(val);
            setPanValid(false);
        }
    }

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

    async function submit(){
        if(! isNumValid){
            let elem = document.getElementById('number');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! fullName){
            let elem = document.getElementById('fullname');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! (isPanValid && Boolean(panNumber))){
            let elem = document.getElementById('pan');
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

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        localStorage.setItem("D-email", email);

        let birthdate = dob;
        birthdate = birthdate.split("-").reverse().join("-");

        let submitObj = {
            "id": id,
            "dob": birthdate,
            "phoneNumber": number,
            "emailId": email,
            "name": fullName,
            "pan": panNumber,
            "joiningDate": joiningDate,
            "doctorCode": doctorCode,
            "creatorId": creatorId,
            "scoutCode" : scoutCode,
            "important" : important,
            "appDownloadStatus" : appDownloadStatus,
            "verified" : verified,
            "mobileVerified" : mobileVerified
        };

        if(!! doctorId){
            submitObj.doctorId = doctorId;
        }

        if(!! scoutCode){
            submitObj.scoutCode = scoutCode;
        }

        // console.log(birthdate)
        await axios.post(env.api_Url + "saveOrUpdateDoctorDetails", submitObj ).then((response) => {
            // console.log(birthdate, panNumber)
            // console.log(response)
            if(response.data.status == 200){
                localStorage.setItem("D-doctorId", response.data.data.doctorId)
                localStorage.setItem("D-emailId", response.data.data.emailId)
                navigate('/doctor/PracticeDetails')
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
        <main id="personalDetails">
        <Header progressbarDisplay="block" progress={40} />
            <p className="heading">Personal details</p>

            <div className="inputGroup">
                <p className='group-title'>Phone Number</p>
                <input
                    className='group-input'
                    disabled={phoneNumber==="" ? false : true}
                    id="number"
                    type="number"
                    inputMode="numeric"
                    onChange={(e)=>numberChange(e)}
                    value={number}
                    placeholder="Enter your mobile number" 
                />
                <p id="number-msg">Please enter a correct mobile number</p>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Full name</p>
                <input
                    className='group-input'
                    id="fullname"
                    onChange={(e)=>setFullName(e.target.value)}
                    value={fullName}
                    placeholder="Enter full name as per PAN card" 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>
            <div className="inputGroup">
                <p className='group-title'>PAN</p>
                <input
                    id="pan"
                    className='group-input'
                    onChange={(e)=>handlePan(e.target.value)}
                    value={panNumber}
                    placeholder="Enter PAN" 
                    autoCapitalize="characters"
                />
                <span id="panFormat">Please enter correct PAN number</span>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Email</p>
                <input
                    type="email"
                    className='group-input'
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter your mail id" 
                />
                <span className="fieldError">Please enter a correct email ID.</span>
            </div>
            <div className="inputGroup">
                <p className='group-title'>Date of birth</p>
                <input 
                    className="group-input"
                    type="date" 
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Select Date"
                    max ={maxDateForDob}
                />
                <span className="fieldError">Please enter your date of birth</span>
            </div>
            <div className="inputGroup">
                <p className='group-title'>Scout code (optional)</p>
                <select 
                    className="group-input"
                    value={scoutCode}
                    onChange={(e) => setScoutCode(e.target.value)}
                    placeholder="Enter referral code here"
                >
                    {scoutOptions}
                </select>
            </div>
            <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
            <button onClick={()=>submit()} className="submit">Next</button>
        </main>
        </>
    )
}

export default DocPersonalDetails