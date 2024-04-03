import { useState } from "react";
import { Header } from "./Comps/Header";
import InputBox from "./Comps/InputBox";
import InputBoxLabel from "./Comps/InputBoxLabel";
import NoteText from "./Comps/NoteText";
import ScreenTitle from "./Comps/ScreenTitle";
import RadioInput from "./Comps/RadioInput";
import { useNavigate } from "react-router-dom";
import { env, hideWaitingModal, showErrorOnUI, showWaitingModal } from "../../environment/environment";
import axios from "axios";

export default function Screen4(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [borrower, setBorrower] = useState("");

    const [patientName, setPatientName] = useState("")
    const [patientEmailId, setPatientEmailId] = useState("")
    const [patientPhoneNumber, setPatientPhoneNumber] = useState("")
    const [relationToPatient, setRelationToPatient] = useState("father")

    let doctorId = localStorage.getItem("doctorId")
    let doctorName = localStorage.getItem("doctorName")
    let userId = localStorage.getItem("userId");

    function postDetails(){
        if(! firstName){
            let elem = document.getElementById("firstName");
            showErrorOnUI(elem, false);
            return;
        }
        if(! lastName){
            let elem = document.getElementById("lastName");
            showErrorOnUI(elem, false);
            return;
        }

        if(! borrower){
            let elem = document.getElementById("borrower");
            showErrorOnUI(elem, false);
            return;
        }

        if(borrower === "someone else"){
            if(! patientName){
                let elem = document.getElementById("patientName");
                showErrorOnUI(elem, false);
                return;
            }
            if(! patientPhoneNumber){
                let elem = document.getElementById("patientPhoneNumber");
                showErrorOnUI(elem, false);
                return;
            }
            if(! patientEmailId){
                let elem = document.getElementById("patientEmailId");
                showErrorOnUI(elem, false);
                return;
            }
            
        }

        showWaitingModal();

        let submitObj = {
            "userId" : userId,
            "doctorName": doctorName,
            "doctorId": doctorId
        };

        let nbfcId = localStorage.getItem('nbfcId');
        if(!! nbfcId){
            submitObj.nbfcId = nbfcId;
        }
        if(borrower === "someone else"){
            submitObj.patientName = patientName;
            submitObj.relationshipWithPatient = relationToPatient;
            submitObj.patientPhoneNumber = patientPhoneNumber;
            submitObj.patientEmailId = patientEmailId;
        }

        axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(async(response) => {
                console.log(response)
                if(response.data.message === "success"){
                    // await handleNavigation();
                    localStorage.setItem('P_userName', `${firstName} ${lastName}`)
                    navigate('/patient/fibeCreditDetails');
                }else{
                    // setErrorMsg()
                }
                hideWaitingModal();
            }).catch(error => {
                console.log(error);
                hideWaitingModal();
            });
    }

    const navigate = useNavigate();

    return(
        <main className="screenContainer">
            <Header progress={33} />
            <ScreenTitle 
                title="Welcome!"
                styles={{
                    marginBottom:"8px"
                }}
            />
            <NoteText 
                text="Kindly help us with these details"
                styles={{marginBottom:"32px"}}
            />
            <InputBoxLabel
                label="Enter your full name (exactly as on your PAN card)"
            />
            <InputBox
                id="firstName"
                styles={{
                    marginTop:"12px", 
                    border:"0"
                }}
                placeholder="Enter your first and middle name here"
                value={firstName}
                setValue={(val)=>{setFirstName(val.toUpperCase())}}
            />
            <InputBox
                id="lastName"
                styles={{
                    marginTop:"9px", 
                    border:"0"
                }}
                placeholder="Enter your last name here"
                value={lastName}
                setValue={(val)=>{setLastName(val.toUpperCase())}}
            />
            <NoteText 
                text="If not sure, please check your PAN and then enter the name accordingly."
                styles={{margin:"12px 0 24px 0"}}
            />
            <InputBoxLabel
                label="Who are you borrowing for?"
            />
            <RadioInput 
                id="borrower" 
                name="borrower" 
                value={borrower}
                setValue={setBorrower}
                options={["myself", "someone else"]}
                styles={{
                    padding:"10px 0 10px 0",
                    height:"48px"
                }}
            />
            {
                borrower==="someone else" && 
                <>
                    <InputBoxLabel
                        label="Name of the patient"
                        styles={{
                            marginTop:"16px"
                        }}
                    />
                    <InputBox
                        id="patientName"
                        styles={{
                            marginTop:"12px", 
                            border:"0"
                        }}
                        placeholder="Enter name of the patient here"
                        value={patientName}
                        setValue={setPatientName}
                    />

                    <InputBoxLabel
                        label="Patient's phone number"
                        styles={{
                            marginTop:"16px"
                        }}
                    />
                    <InputBox
                        id="patientPhoneNumber"
                        styles={{
                            marginTop:"12px", 
                            border:"0"
                        }}
                        placeholder="Enter number of the patient here"
                        value={patientPhoneNumber}
                        setValue={setPatientPhoneNumber}
                    />

                    <InputBoxLabel
                        label="Patient's email ID"
                        styles={{
                            marginTop:"16px"
                        }}
                    />
                    <InputBox
                        id="patientEmailId"
                        styles={{
                            marginTop:"12px", 
                            border:"0"
                        }}
                        placeholder="Enter email of the patient here"
                        value={patientEmailId}
                        setValue={setPatientEmailId}
                    />

                    <InputBoxLabel
                        label="Your relationship to the patient"
                        styles={{
                            marginTop:"24px"
                        }}
                    />
                    <select 
                        name="relation" 
                        id="relation" 
                        value={relationToPatient} 
                        onChange={(e)=>setRelationToPatient(e.target.value)}
                        style={{
                            width:"100%",
                            height:"48px",
                            padding:"14px 10px", 
                            fontSize:"inherit", 
                            lineHeight:"inherit",
                            background:"#ECEEFF",
                            border:"0",
                            borderRadius:"4px"
                        }}
                    >
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="brother">Brother</option>
                        <option value="sister">Sister</option>
                        <option value="spouse">Spouse</option>
                    </select>
                </>
            }
            <button onClick={()=>postDetails()} className="submit" style={{marginTop:"32px"}}>Next</button>
        </main>
    )
}