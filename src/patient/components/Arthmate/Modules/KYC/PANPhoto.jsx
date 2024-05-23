import { useEffect, useRef, useState } from "react";
import { Header } from "../../comps/Header";
import { useCallback } from "react";
import WebcamCapture from "../../comps/WebCam";
import { BsFillCameraFill } from "react-icons/bs";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import { env } from "../../../../environment/environment";
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";
import Lottie from "lottie-web";
import loaderAnimData from '../../assets/loader simple.json'
import { getKycStatusApi } from "../../servicesAndUtility/api";
import Loadinggif from '../../../../../utils/loader/loadergif';

export default function ArthPANPhoto() {
    let userId = localStorage.getItem("userId");
    let navigate = useNavigate()
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null)
    const [panCard, setpanCard] = useState('')
    const [panCardType, setpanCardType] = useState('')
    const [screen, setScreen] = useState('fetching')
    const [loaderState, setLoader] = useState(false);

    const capture = useCallback(() => {
        console.log(webcamRef);
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    function reCaptureImage() {
        setImgSrc(null);
    }
    const imageHanlder = (event) => {
        let file = event.target.files[0];
        // console.log(event.target.files[0])
        if (file) {
            if (file.type == "application/pdf") {
                setpanCardType('pdf')
            } else {
                setpanCardType('img')

            }
            if (!(file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")) {
                let elem = document.getElementsByClassName('fileTypeError')[1];
                elem.style.display = "block";
                setTimeout(() => {
                    elem.style.display = "none";
                }, 3000)
                return;
            }
        }
        setpanCard(file)
    }
    function savefiles() {
        console.log(panCardType, 'panCardType')
        if (panCardType !== '') {
            setLoader(true)
            let data = new FormData();
            data.append("uploadfile", panCard);
            data.append("userId", userId);
            data.append("type", panCardType);
            data.append("fileName", "panCard");
            axios.post(env.api_Url + "uploadpdf", data)
                .then(res => {
                    if (res.status === 200) {
                        // 
                        axios.post(env.api_Url + "loanDocumentApi?userId=" + userId + '&documentName=' + 'pan_card' + '&url=' + res.data)
                        .then(res => {
                            if (res.status === 200) {
                                if (res.data.message === 'success') {
                                    setLoader(false)

                                    // setUpload2(true)
                                    navigate(routes.ARTH_SELFIE)

                                }
                            }
                        }).catch(e => console.warn(e));

                    }
                }).catch(e => console.warn(e));
        }
    }
    useEffect(() => {
        Lottie.loadAnimation({
            container: document.querySelector("#loadAnim2"),
            animationData: loaderAnimData,
            renderer: "canvas"
        });
        getKycStatusApi(userId, 'pan', callback => {
            if (callback.data === true) {
                navigate(routes.ARTH_SELFIE)
            } else {
                axios.post(env.api_Url + "panValidationApi?userId=" + userId)
                    .then((response) => {
                        console.log(response)
                        if (response.data.message === "success") {
                            // setScreenState('verified')
                            axios.post(env.api_Url + "validateDoc?userId=" + userId + "&type=" + 'pan')
                                .then((response) => {
                                    console.log(response)
                                    if (response.data.message === "success") {
                                        // setScreenState('verified')
                                        navigate(routes.ARTH_SELFIE)

                                    } else {
                                        setScreen('upload')

                                    }
                                })

                        } else {
                            setScreen('upload')
                        }
                    })
            }
        })

    }, [])
    return (
        <main id='uploadDocuments'>
              
            <Header />
            {loaderState ?
                <>
                   <Loadinggif/>
                </>
                : ""}
            {screen === "fetching"&&loaderState===false ?
                <>
                    <div style={{ marginTop: "12%" }} id="loadAnim2"></div>
                    <p style={{ textAlign: "center" }}>Fetching your PAN details...</p>
                </>
                : ""}
            {screen === 'upload' &&loaderState===false?
                <>
                    <h3 style={{ margin: "1.5rem 0" }}>PAN card photo</h3>
                    <p>Please upload an image/PDF of your PAN card’s front</p>
                    <div className="inputGroup">
                        <p className='group-title'>PAN card front</p>
                        <label className={(panCard) ? "uploaded" : ""} htmlFor="PAN">
                            {panCard == "" && <MdCloudUpload className="upload-icon" />}
                            {panCard == "" && "Click to " + (Boolean(panCard) ? "re-" : "") + "upload PAN front"}
                            {panCard && panCard.name}
                            <input id="PAN" type="file" onChange={(e) => imageHanlder(e)} />
                        </label>
                        <p className="fileTypeError">Only .pdf, .png, .jpg and .jpeg files are allowed</p>
                    </div>
                    <div className=''>
                        <button className={panCard ? "carepay-button-purple" : 'carepay-button-purple-disable'} onClick={() => savefiles()}>Submit</button>
                    </div>
                </>
                : ""}
            {/* <p style={{color:"#514C9F", fontWeight:"700", opacity:"0.6", textAlign:"center", margin:"2rem 0", fontSize:"18px"}}>Front side of PAN</p>
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
            } */}
        </main>
    )
}