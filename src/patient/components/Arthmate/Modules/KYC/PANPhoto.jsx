import { useRef, useState } from "react";
import { Header } from "../../comps/Header";
import { useCallback } from "react";
import WebcamCapture from "../../comps/WebCam";
import { BsFillCameraFill } from "react-icons/bs";

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
            <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <div 
                    style={{
                        borderRadius:"16px",
                        minHeight:"250px",
                        width:"max-content",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        margin:"0 auto",
                        padding:(imgSrc===null? "16px" : "4px"),
                        margin:(imgSrc===null? "4px" : "16px"),
                        transition:"all 0.3s ease-in-out",
                        overflow:"clip",
                        objectFit:"scale-down",
                        backgroundImage: " repeating-linear-gradient(0deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(90deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(180deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(270deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px)",
                        backgroundSize: "4px 100%, 100% 4px, 4px 100% , 100% 4px",
                        backgroundPosition: "0 0, 0 0, 100% 0, 0 100%",
                        backgroundRepeat: "no-repeat" 
                    }}
                >
                    {imgSrc === null ?
                        <WebcamCapture ref={webcamRef} width={370} height={250} />
                    :
                        <img src={imgSrc} alt="" />
                    }
                </div>
                
            </div>
            {imgSrc === null ?
                <div style={{display:"flex", justifyContent:"center"}}>
                    <button 
                        className="submit" 
                        style={{
                            width:"40%",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            gap:"12px"
                        }} 
                        onClick={()=>capture()}
                    >
                        Click
                        <BsFillCameraFill style={{fontSize:"24px"}} />
                    </button>
                </div>
                :
                <div style={{padding:"1rem 0"}}>
                    <p style={{textAlign:"center"}}>Are you sure you want to submit this picture?</p>
                    <button className="submit">Yes, submit</button>
                    <button className="submit lite" onClick={()=>setImgSrc(null)}>No, let’s retake</button>
                </div>
            }
        </main>
    )
}