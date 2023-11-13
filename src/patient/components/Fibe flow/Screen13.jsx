import './styles.scss'
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "./Comps/Header";

import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/loader simple.json'
import { useEffect } from "react";

export default function Screen13(){

    const navigate = useNavigate();
    const location = useLocation();
    let redirectionLink = location?.state?.link;
    console.log(location?.state?.link);

    // setTimeout(() => {
    //     // navigate('/patient/screen14')
    //     navigate(redirectionLink);
    // }, 3000);

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
            <a href={redirectionLink} id={!redirectionLink ? "disabled" : ""}><button className="submit">Continue</button></a>
        </main>
    )
}