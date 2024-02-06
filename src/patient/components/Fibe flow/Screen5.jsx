import { useEffect, useState } from "react";
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

import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/loader simple.json'

export default function Screen5(){

    const [creditAmt, setCreditAmount] = useState("");
    const [loanReason, setLoanReason] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [doctorId, setDoctorId] = useState(localStorage.getItem("doctorId"));
    const [waiting, setWaiting] = useState(false);

    const navigate = useNavigate();

    let userId = localStorage.getItem("userId");

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
        //   renderer: "html"
        });
      }, [waiting]);

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
        if(! loanReason){
            let elem = document.getElementById("loanReason");
            showErrorOnUI(elem, false);
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


        axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(response => {
                console.log(response)
                if(response.data.message === "success"){
                    // await handleNavigation();
                    setWaiting(true);
                    setTimeout(() => {
                        navigate('/patient/screen6');
                        setWaiting(false);
                    }, 3000);
                }else{
                    // setErrorMsg()
                }
                hideWaitingModal();
            }).catch(error => {
                console.log(error);
                hideWaitingModal();
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
            <button onClick={()=>postDetails()} className="submit" style={{marginTop:"32px"}}>Next</button>
            {waiting && <div style={{display:"flex", alignItems:"center", justifyContent:"center", position:"absolute", top:"0", left:"0", height:"100%", width:"100%", background:"rgba(0,0,0,0.4)"}}>
                <div style={{width:"50vh", maxWidth:"90vw", padding:"16px", background:"white", borderRadius:"16px"}}>
                    <div id="searchAnimation"></div>
                    <p style={{textAlign:"center"}}>Fetching your details...</p>
                </div>
            </div>}
        </main>
    )
}