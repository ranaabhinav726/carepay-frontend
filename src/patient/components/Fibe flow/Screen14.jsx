import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./Comps/Header";

import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/loader simple.json'
import { useEffect, useState } from "react";
import axios from "axios";
import { env } from "../../environment/environment";

export default function Screen14(){

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
            if(response.data.status == "200"){
                let data = response.data.data.firstName;
            }
        }).catch(error => {
            console.log(error);
        });
    }, [userId])

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