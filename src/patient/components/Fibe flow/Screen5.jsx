import { useEffect, useState } from "react";
import { Header } from "./Comps/Header";
import InputBox from "./Comps/InputBox";
import InputBoxLabel from "./Comps/InputBoxLabel";
import ScreenTitle from "./Comps/ScreenTitle";
import { BiRupee } from 'react-icons/bi'
import NoteText from "./Comps/NoteText";
import { useNavigate } from "react-router-dom";
import { showErrorOnUI } from "../../environment/environment";
import axios from "axios";
import { env } from "../../environment/environment";

export default function Screen5(){

    const [creditAmt, setCreditAmount] = useState("");
    const [loanReason, setLoanReason] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [doctorId, setDoctorId] = useState(localStorage.getItem("doctorId"));
    const navigate = useNavigate();

    let userId = localStorage.getItem("userId");


    useEffect(()=>{
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.status === 200){
                    let data = response.data.data;
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
        if(! loanReason){
            let elem = document.getElementById("loanReason");
            showErrorOnUI(elem, false);
            return;
        }


        let submitObj = {
            "userId" : userId,
            "doctorId": doctorId,
            "loanReason": loanReason,
            "loanAmount": creditAmt,
            "doctorName": doctorName
        };


        axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(response => {
                console.log(response)
                if(response.data.message === "success"){
                    // await handleNavigation();
                    navigate('/patient/screen6');
                }else{
                    // setErrorMsg()
                }
            }).catch(error => {
                console.log(error);
            });
    }

    return(
        <main className="screenContainer">
            <Header progress={55} />
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

            <InputBoxLabel label='Treatment name' />
            <InputBox 
                id="loanReason"
                placeholder="What is the reason of your credit?" 
                value={loanReason}
                setValue={setLoanReason}
                styles={{
                    marginTop:"12px", 
                    border:"0"
                }}
            />
            <button onClick={()=>postDetails()} className="submit" style={{marginTop:"8rem"}}>Next</button>
        </main>
    )
}