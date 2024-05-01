import './addPatient.scss'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { useState } from 'react';

import axios from 'axios';
import { env, showErrorOnUI } from '../../environment';

const AddPatient = () =>{
    const navigate = useNavigate();

    const [patientName, setPatientName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    // const [clinicName, setClinicName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [loanAmount, setLoanAmount] = useState('');

    const [tenure, setTenure] = useState(3);

    const[doctorId, setDoctorId] = useState(localStorage.getItem('D-doctorId'));
    // useEffect(()=>{
    //     if(doctorId){
    //         async function getCall(){
    //             await axios.get(env.api_Url+"getDoctorProfDetailsByDoctorId?doctorId=" + doctorId)
    //             .then((response)=>{
    //                 console.log(response)
    //                 if(response.data.data != null){
    //                     let clinicName = response?.data?.data?.clinicName;
    //                     setClinicName(clinicName);
    //                 }
    //             }).catch((error)=>{
    //                 console.log(error)
    //             })
    //         }
    //         getCall();
    //     }else{
    //         navigate('/doctor/')
    //     }
    // },[doctorId])

    function handleSubmit(){
        if(! patientName){
            let elem = document.getElementById('patientName');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! contactNumber){
            let elem = document.getElementById('contactNumber');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! email){
            let elem = document.getElementById('email');
            if(elem) showErrorOnUI(elem);
            return;
        }

        // if(! clinicName){
        //     let elem = document.getElementById('clinicName');
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }

        if(! purpose){
            let elem = document.getElementById('purpose');
            if(elem) showErrorOnUI(elem);
            return;
        }

        if(! loanAmount){
            let elem = document.getElementById('loanAmount');
            if(elem) showErrorOnUI(elem);
            return;
        }

    // private String firstName;
    // private String phoneNumber;
    // private String emailId;
    // private String doctorId;
    // private String doctorCode;
    // private String licenseNumber;

    // private BigInteger loanAmount;
    // private String purposeOfLoan;

        let submitObj = {
            "firstName" : patientName,
            "phoneNumber" : contactNumber,
            "emailId" : email,
            "doctorId" : doctorId,
            "loanAmount" : loanAmount,
            "purposeOfLoan" : purpose,
            "loanEmi": tenure
        }

        axios.post(env.api_Url + "addLead", submitObj)
        .then(response =>{
            if(response.data.status === 200){
                console.log(response)
                let elem = document.getElementById('successMsg');
                if(elem) elem.style.display = "block";

                setTimeout(() => {
                    if(elem) elem.style.display = "none";
                    navigate(-1)
                }, 2000);
            }
        }).catch(error => {
            console.log(error)
        })
    }
    return(
        <main className="addPatient">
            <div className="header">
                <BsArrowLeft onClick={()=>navigate(-1)} className='icon' />
                <span>Add patient</span>
            </div>
            <hr />
            <div className="inputGroup">
                <p className="group-title">Patient name</p>
                <input autoComplete="off" 
                    id='patientName'
                    type="text" 
                    className="group-input" 
                    placeholder='Enter your name here'
                    value={patientName ?? ""}
                    onChange={(e)=>setPatientName(e.target.value)} 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>
            <div className="inputGroup">
                <p className="group-title">Contact number</p>
                <input autoComplete="off" 
                    id='contactNumber'
                    type="number" 
                    className="group-input" 
                    placeholder='Enter your number here'
                    value={contactNumber ?? ""}
                    onChange={(e)=>setContactNumber(e.target.value)} 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>
            <div className="inputGroup">
                <p className="group-title">Email ID</p>
                <input autoComplete="off" 
                    id='email'
                    type="text" 
                    className="group-input" 
                    placeholder='Enter Email ID here'
                    value={email ?? ""}
                    onChange={(e)=>setEmail(e.target.value)} 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>
            {/* <div className="inputGroup">
                <p className="group-title">Clinic name</p>
                <input autoComplete="off" 
                    id='clinicName'
                    type="text" 
                    className="group-input" 
                    placeholder='Enter your clinic name'
                    value={clinicName ?? ""}
                    onChange={(e)=>setClinicName(e.target.value)} 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div> */}
            <div className="inputGroup">
                <p className="group-title">Purpose of loan</p>
                <input autoComplete="off" 
                    id='purpose'
                    type="text" 
                    className="group-input" 
                    placeholder='Enter purpose of loan'
                    value={purpose ?? ""}
                    onChange={(e)=>setPurpose(e.target.value)} 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>
            <div className="inputGroup">
                <p className="group-title">Loan amount</p>
                <input autoComplete="off" 
                    id='loanAmount'
                    type="text" 
                    className="group-input" 
                    placeholder='Enter loan amount here'
                    value={loanAmount ?? ""}
                    onChange={(e)=>setLoanAmount(e.target.value)} 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>

            <div className="inputGroup">
                <p className="group-title">Tenure</p>
                <select value={tenure ?? ""} onChange={(e)=>setTenure(e.target.value)}>
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                </select>
            </div>

            <p id="successMsg">Patient added successfully</p>

            <button onClick={()=>handleSubmit()} className="submit">Submit</button>
        </main>
    )
}
export default AddPatient