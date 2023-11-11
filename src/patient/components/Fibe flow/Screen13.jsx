import { useNavigate } from "react-router-dom";
import { Header } from "./Comps/Header";

import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/loader simple.json'
import { useEffect } from "react";

export default function Screen13(){

    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/patient/screen14')
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
                <span style={{fontSize:"16px", lineHeight:"24px"}}>Redirecting to partner platform</span>
            </div>
        </main>
    )
}