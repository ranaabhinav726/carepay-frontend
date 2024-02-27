import { useState, useEffect } from "react"
import { Header } from "../../comps/Header";
import lottie from "lottie-web";
import animationData from '../../assets/loader simple.json'
import completeAnimation from '../../../../assets/GIFs/Comp 1.json'

import SorryEmoji from '../../assets/sorryEmoji.png'

export default function ArthAgreementStatus(){

    const[screenState, setScreenState] = useState("fetching"); // fetching, failed, completed

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
          renderer: "canvas"
        });

        lottie.loadAnimation({
          container: document.querySelector("#completeAnimation"),
          animationData: completeAnimation,
          renderer: "canvas"
        });

        // return ()=>{
        //     clearTimeout(timerId)
        // }
        
    }, []);

    return(
        <main>
        {screenState === "fetching" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"10%"}} id="searchAnimation"></div>
                <p style={{textAlign:"center", opacity:"0.8"}}>fetching agreement status...</p>
            </>
        }
        {screenState === "failed" &&
            <>
                <Header progressBar="hidden" />
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2rem"}}>
                    <img src={SorryEmoji} alt="" style={{maxWidth:"30%"}} />
                    <p style={{color:"#514C9F", fontSize:"20px", fontWeight:"700", margin:"2rem 0"}}>Sorry!</p>
                    <span style={{textAlign:"center", fontSize:"16px"}}>Seems like there was a failure in e-signing your credit agreement.</span>
                </div>
                <p style={{marginTop:"3rem", textAlign:"center"}}>Please try again to proceed</p>
                <button className="submit">Try again</button>
            </>
        }
        {screenState === "completed" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"15%"}} id="completeAnimation"></div>
                <p style={{color:"#514C9F", fontWeight:"bold", fontSize:"18px", textAlign:"center"}}>Agreement e-signing complete!</p>
            </>
        }
        </main>
    )
}