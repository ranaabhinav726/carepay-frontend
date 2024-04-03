import { useRef, useState } from "react";
import { Header } from "../../comps/Header";
import { useCallback } from "react";
import WebcamCapture from "../../comps/WebCam";
import CameraCapture from "../../comps/CameraCapture";
import { uploadDoc } from "../../servicesAndUtility/api";
import { useNavigate } from "react-router-dom";

export default function ArthAadhaarPhoto(){

    let userId = localStorage.getItem("userId");
    let navigate = useNavigate();
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

    function uploadAadhaar(){
        let data = new FormData();
            data.append("file", []);
            data.append("type", "pdf");
            data.append("userId", userId);
            data.append("type", "pdf");  
            data.append("fileName", "prescription");

            uploadDoc(userId, data, res=>{
                if(res.status === 200){
                    navigate("/patient/")
                }
            })
    }
    return(
        <main>
            <Header />
            <h3 style={{margin:"1.5rem 0"}}>Aadhaar card photo</h3>
            <p>Click an image of your Aadhaar card's front side. Please don't let the image go outside the box.</p>
            <p style={{color:"#514C9F", fontWeight:"700", opacity:"0.6", textAlign:"center", margin:"2rem 0", fontSize:"18px"}}>Front side of Aadhaar</p>
            <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                {imgSrc === null ?
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
                            backgroundImage: "repeating-linear-gradient(0deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(90deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(180deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(270deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px)",
                            backgroundSize: "4px 100%, 100% 4px, 4px 100% , 100% 4px",
                            backgroundPosition: "0 0, 0 0, 100% 0, 0 100%",
                            backgroundRepeat: "no-repeat" 
                        }}
                    >
                        <WebcamCapture ref={webcamRef} width={370} height={250} />
                    </div>
                :
                    <img src={imgSrc} alt="" />
                }
            </div>
            {/* <div 
                style={{
                    // border:"6px dashed #514C9F",
                    borderRadius:"16px",
                    minHeight:"250px",
                    width:"max-content",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    margin:"0 auto",
                    padding:(imgSrc===null? "16px" : "4px"),
                    transition:"all 0.3s ease-in-out",
                    overflow:"clip",
                    objectFit:"scale-down",
                    backgroundImage: " repeating-linear-gradient(0deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(90deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(180deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(270deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px)",
                    backgroundSize: "4px 100%, 100% 4px, 4px 100% , 100% 4px",
                    backgroundPosition: "0 0, 0 0, 100% 0, 0 100%",
                    backgroundRepeat: "no-repeat" 
                }}
            >
                <WebcamCapture ref={webcamRef} width={370} height={250} />
            </div> */}
            <button className="submit" onClick={()=>capture()}>Click</button>
        </main>
    )
}