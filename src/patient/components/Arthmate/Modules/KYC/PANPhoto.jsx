import { useRef, useState } from "react";
import { Header } from "../../comps/Header";
import { useCallback } from "react";
import WebcamCapture from "../../comps/WebCam";

export default function ArthPANPhoto(){

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null)

    const capture = useCallback(() => {
        console.log(webcamRef);
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    function reCaptureImage(){
        setImgSrc(null);
    }
    return(
        <main>
            <Header />
            <h3 style={{margin:"1.5rem 0"}}>PAN card photo</h3>
            <p>Click an image of your PAN card's front side. Please don't let the image go outside hte box.</p>
            <p style={{color:"#514C9F", fontWeight:"700", opacity:"0.6", textAlign:"center", margin:"2rem 0", fontSize:"18px"}}>Front side of PAN</p>
            <div 
                style={{
                    border:"6px dashed #514C9F",
                    borderRadius:"16px",
                    height:"250px",
                    width:"80%",
                    display:"flex",
                    justifyContent:"center",
                    margin:"0 auto",
                    padding:(imgSrc===null? "16px" : "0px"),
                    transition:"all 1s ease-in-out",
                    overflow:"clip",
                    objectFit:"scale-down"
                }}
            >
                <WebcamCapture ref={webcamRef} height={250} />
            </div>
            <button className="submit" onClick={()=>setImgSrc("nfnds")}>Click</button>
        </main>
    )
}