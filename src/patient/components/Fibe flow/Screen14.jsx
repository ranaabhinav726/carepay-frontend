import { useNavigate } from "react-router-dom";
import { Header } from "./Comps/Header";

import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/loader simple.json'
import { useEffect } from "react";

export default function Screen14(){

    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/patient/screen15')
    }, 3000);

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
        //   renderer: "html"
        });
      }, []);

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