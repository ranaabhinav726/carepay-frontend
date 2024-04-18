import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./Comps/Header";

import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/loader simple.json'
import { useEffect, useState } from "react";
import axios from "axios";
import { env } from "../../environment/environment";

export default function FibeUserFallback(){

    const navigate = useNavigate();
    const params = useParams();
    const [userId, ] = useState(params?.userId);
    console.log(params?.userId);

    // setTimeout(() => {
    //     navigate('/patient/screen15')
    // }, 3000);

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
        //   renderer: "html"
        });
      }, []);

    useEffect(()=>{
        axios.get(env.api_Url + "userDetails/getUserDetailsByUserId?userId=" + userId)
        .then((response) => {
            console.log("0")
            if(response.data.message === "success"){
                console.log("1")
                getLoanDetails();
            }
        }).catch(error => {
            console.log(error);
        });
    }, [userId])

    function getLoanDetails(){
        console.log("2")
        axios.get(env.api_Url + "userDetails/getLoanStatusByUserId?userId=" + userId)
        .then(response =>{
            console.log(response)
            let status = response.data.data;
            if(status === "Disbursed" || status === "Approved"){ // Pending, Approved , Disbursed, Rejected
                navigate("/patient/fibeCongratsUser")
            }
        }).catch(err=>{
            console.warn(err)
        })
    }

    return(
        <main className="screenContainer">
            <Header progressBar="hidden" />
            <div style={{marginTop:"20%"}} id="searchAnimation"></div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <span style={{fontSize:"16px", lineHeight:"24px"}}>finalizing your credit application...</span>
            </div>
        </main>
    )
}