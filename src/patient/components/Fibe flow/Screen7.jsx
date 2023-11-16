import { useEffect, useState } from "react";
import { Header } from "./Comps/Header";
import NoteText from "./Comps/NoteText";
import { Link, useNavigate } from "react-router-dom";
import ScreenTitle from "./Comps/ScreenTitle";
import InputBoxLabel from "./Comps/InputBoxLabel";
import RadioInput from "./Comps/RadioInput";
import InputBox from "./Comps/InputBox";
// import { getPincodeDetails } from "./Comps/Utility functions/getPincodeDetails";
import axios from "axios";
import { env, hideWaitingModal, showWaitingModal } from "../../environment/environment";
import { showErrorOnUI } from "../../environment/environment";

export default function Screen7(){
//79 , 86, 90, 93, 95, 97, 

    const [empType, setEmpType] = useState("");
    const [salary, setSalary] = useState("");
    const [officePincode, setOfficePincode] = useState("");
    const [city, setCity] = useState("");

    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    useEffect(()=>{
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getUserEmploymentDetailsByUserId?userId=" + userId)
            .then(response => {
                if(response.data.status === 200){
                    console.log(response)
                    let data = response.data.data;
                    if(!! data){
                        setEmpType(data.employmentType)
                        setSalary(data.nettakehomesalary);
                        handlePincode(data.workplacePincode);
                    }
                }
            }).catch(()=>{
                console.log("Error fetching data");
            })
        }
    },[])



    function handlePincode(pincode){
        setOfficePincode(pincode);
        if(pincode.toString().length === 6){
            axios.get(env.api_Url+"userDetails/codeDetail?code=" + pincode +"&type=zip")
            .then(response =>{
                setCity(response?.data?.city)
            }).catch(error=>{
                console.warn(error);
            })
        }
    }

    function postDetails(){
        if(! empType){ 
            let elem = document.getElementById('empType');
            if(elem) showErrorOnUI(elem);
            return;
        }
        if(!salary){ 
            let elem = document.getElementById('salary');
            if(elem) showErrorOnUI(elem);
            return;
        }
        if(!officePincode){ 
            let elem = document.getElementById('officePincode');
            if(elem) showErrorOnUI(elem);
            return;
        }
        showWaitingModal();

        let submitObj = {
            "userId" : userId,
            "employmentType": empType,
            "netTakeHomeSalary": salary,
            "workplacePincode": officePincode,
          };


        axios.post(env.api_Url + "userDetails/employmentDetail", 
            submitObj)
            .then((response) => {
                console.log(response)
                if(response.data.message === "success"){
                    navigate('/patient/screen8');
                }else{
                    // apiErrorHandler();
                }
                hideWaitingModal();
            }).catch(error => {
                console.log(error);
                hideWaitingModal();
                // apiErrorHandler();
            });
    }
    
    return(
        <main className="screenContainer">
            <Header progress={79} />
            <ScreenTitle title="Employment details" />
            <InputBoxLabel label='Select employment type' />
            <RadioInput
                id={"empType"}
                name="empType" 
                value={empType}
                setValue={setEmpType}
                options={["salaried", "self employed"]}
                styles={{
                    padding:"12px 0"
                }}
            />
            <NoteText text="We currently don’t finance students or unemployed borrowers. In case you are in any of these two categories, you can have your blood relative apply for your credit." />
            <p style={{
                fontSize:"14px", 
                lineHeight:"18px",
                color:"#00000066"
            }}>
                Need assistance? <Link to={"tel:+918069489655"} style={{color:"#514C9F", fontWeight:"700", textDecoration:"underline"}}>Contact Support</Link>
            </p>

            <InputBoxLabel label='Monthly salary/income' styles={{marginTop:"24px"}} />
            <InputBox
                id="salary"
                type="number"
                placeholder="How much do you earn monthly?"
                value={salary}
                setValue={setSalary}
                styles={{
                    marginTop:"12px", 
                    border:"0"
                }}
            />

            <InputBoxLabel label='Workplace pincode' styles={{marginTop:"24px"}} />
            <InputBox
                id="officePincode"
                type="number"
                length={6}
                placeholder="Pincode of your work place"
                value={officePincode}
                setValue={handlePincode}
                styles={{
                    marginTop:"12px", 
                    border:"0"
                }}
            />
            <InputBoxLabel label={`City: ${city}`} styles={{marginTop:"6px", marginBottom:"0"}} />

            <button onClick={()=>postDetails()} className="submit"  style={{marginTop:"32px"}}>Next</button>
        </main>
    )
}