import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import animationData from '../../../../assets/JSON animations/Comp 1.json'
import { useEffect } from "react";
import routes from "../../../../../layout/Routes";
import ScreenTitle from "../../comps/ScreenTitle";
import { Header } from "../../comps/Header";


export default function DataVerified(){

    const navigate = useNavigate();
    let timerId = setTimeout(() => {
        
        navigate(routes.WAIT_FOR_PROCESSING, {replace:"true"})
    }, 2500);

    // setTimeout(()=>{
    //     let elem = document.getElementById('screen3Title');
    //     elem.classList.add('fadeInUpAnimate');
    // }, 2000)

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
          renderer: "canvas"
        });

        return ()=>{
            clearTimeout(timerId)
        }
        
    }, []);

    return(
        <main className="screenContainer">
            <Header progressBar="hidden" />
            {/* <div style={{display:"flex", minHeight:"70vh", alignItems:"center", justifyContent:"center"}}>
                <img src={Gratification} style={{maxWidth:"40%"}} alt="" />
            </div> */}
            <div style={{marginTop:"25%"}} id="searchAnimation"></div>
            <ScreenTitle
                id="screen3Title"
                className="fadeInUpAnimate"
                title="Account data received!" 
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