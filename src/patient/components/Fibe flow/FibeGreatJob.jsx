import { useNavigate } from "react-router-dom";
import { Header } from "./Comps/Header";

import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/Comp 1.json'
import { useEffect } from "react";
import ScreenTitle from "./Comps/ScreenTitle";

export default function FibeGreatJob(){

    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/patient/fibeCreateUser', {replace:"true"})
    }, 3000);

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
          renderer: "canvas"
        });
    }, []);

    return(
        <main className="screenContainer">
            <Header progressBar="hidden" />
            <div style={{marginTop:"25%"}} id="searchAnimation"></div>
            <ScreenTitle
                id="screen3Title"
                className="fadeInUpAnimate"
                title="Great Job!" 
                styles={{
                    color:"#514C9F",
                    textAlign:"center",
                    margin:"0",
                    opacity:"0"
                }}     
            />
        </main>
    )
}