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
        let timerId1 = setTimeout(() => {
            if(! redirectionLink){
                navigate(-1);
            }
        }, 1000);
        let timerId2 = setTimeout(()=>{
            let extLink = document.getElementById("extLink");
            if(extLink) extLink.click();
        }, 40000)

        return ()=> {
            clearTimeout(timerId1);
            clearTimeout(timerId2);
        }
      }, []);

    return(
        <main className="screenContainer">
            <Header progressBar="hidden" />
            <div style={{marginTop:"5%"}} id="searchAnimation"></div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"5rem"}}>
                <span style={{fontSize:"16px", lineHeight:"24px"}}>Redirecting to partner platform</span>
            </div>
            
            {redirectionLink && 
                <p style={{textAlign:"center"}}>
                    If you are not redirected automatically <br />in 15 seconds, <a href={redirectionLink} id="extLink" style={{color:"514C9F", fontWeight:"700", textDecoration:"underline"}}>click here</a>
                </p>}
        </main>
    )
}