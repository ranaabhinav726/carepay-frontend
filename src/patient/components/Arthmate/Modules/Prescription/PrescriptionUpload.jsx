import { Header } from "../../comps/Header";
import { FaRegFileAlt } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ScreenTitle from "../../comps/ScreenTitle";
import PrescriptionImg from '../../assets/prescription.svg'
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import lottie from "lottie-web";
import animationData from '../../../../assets/GIFs/Comp 1.json'

import axios from "axios";
import { env } from "../../../../environment/environment";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


export default function ArthPrescriptionUpload(){

    let userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const inputRef = useRef(null);
    
    function uploadClickHandler(){
        if(inputRef.current !== null){
            inputRef.current.click();
        }
    }

    const [uploadedFiles, setUploadedFiles] = useState([]);

    function fileHandler(e){
        let files = e.target.files;
        setUploadedFiles((uploadedFiles)=>[...uploadedFiles, ...files]);
    }

    const[fileModal, showFileModal] = useState(false);

    const [screenState, setScreenState] = useState("NoFileSelected"); // NoFileSelected, FileInBuffer, Submitted

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
          renderer: "canvas"
        });
        
    }, [screenState]);

    useEffect(()=>{
        if(uploadedFiles.length === 0){
            setScreenState("NoFileSelected");
            return;
        }
        if(uploadedFiles.length > 0) setScreenState("FileInBuffer");

        let fileName = uploadedFiles[0].name;
        if(fileName.length > 28){
            let [name, ext] = fileName.split(".");
            name = name.substring(0,24);
            fileName = name + "...." + ext;
        }
        let fileData = {
            "file" : uploadedFiles[0],
            "fileName" : fileName
        }
        showFileModal(fileData)
    },[uploadedFiles])

    function savePrescripton(){
        if(uploadedFiles.length === 0) return;

        let data = new FormData();
        data.append("uploadfile", uploadedFiles[0]);
        data.append("userId", userId);
        data.append("type", "pdf");
        data.append("fileName", "prescription");

        axios.post(env.api_Url + "uploadpdf", data)
        .then(res=>{
            if(res.status === 200){
                setScreenState("Submitted");
                setTimeout(()=>{
                    navigate("/patient/ArthPersonalDetails")
                }, 2000)
            }
        }).catch(e=>console.warn(e));
    }

    return(
        <main style={{position:"relative"}}>
            {screenState === "NoFileSelected" &&
            <>
                <Header progressbarDisplay="block" progress="22" canGoBack="/patient/CreditDetails" />
                <h3 style={{margin:"2rem 0 1rem 0"}}>Share prescription</h3>
                {/* <p style={{lineHeight:"150%"}}>Click and upload an image of your prescription, for verifying the purpose of your credit.</p> */}
                <div style={{background:"#FAE1CD", borderRadius:"8px", padding:"12px 10px"}}>
                    <h4>Important:</h4>
                    <p style={{color:"rgba(0,0,0,0.8)"}}>Please ensure that the prescription is</p>
                    <ul style={{paddingLeft:"24px", color:"rgba(0,0,0,0.8)"}}>
                        <li>On doctor/clinic’s letterhead.</li>
                        <li>Signed by the doctor.</li>
                    </ul>
                </div>
                <div style={{width:"100%", display:"flex", justifyContent:"center", margin:"2.5rem 0"}}>
                    <img 
                        src={PrescriptionImg} 
                        alt="prescription" 
                    />
                </div>
                <p style={{marginTop:"1.5rem"}}>Allowed formats : PDF, Jpeg, Jpg</p>

                
                <button className="submit" onClick={()=>uploadClickHandler()}>Share file</button>
            </>
            }

            {screenState === "FileInBuffer" &&
            <>
                <Header progressbarDisplay="block" progress="22" canGoBack="/patient/CreditDetails" />
                <h3 style={{margin:"2rem 0 1rem 0"}}>Share prescription</h3>
                <FileViewerModal fileData={fileModal} setUploadedFiles={setUploadedFiles} />
                <button className="submit" onClick={()=>savePrescripton()}>Submit</button>
            </>
            }
            {screenState === "Submitted" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"15%"}} id="searchAnimation"></div>
                <p style={{color:"#514C9F", fontWeight:"bold", fontSize:"18px", textAlign:"center"}}>Prescription shared successfully!</p>
            </>
            }
            <input autoComplete="off" 
                type="file" 
                id="prescription" 
                name="prescription" 
                ref={inputRef}
                style={{display:"none"}} 
                accept="image/jpg, image/png, application/pdf"
                onChange={(e)=>fileHandler(e)}
                multiple
            />
        </main>
    )
}

function FileViewerModal({fileData, setUploadedFiles}){

    console.log(fileData)
    let type = fileData?.file?.type.split("/")[0];
    if(type !== "image") type = "pdf";

    let url = URL.createObjectURL(fileData?.file);
    return(
            <div style={{borderRadius:"12px", background:"white", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div onClick={()=>{setUploadedFiles([])}} style={{position:"absolute", margin:"5px", right:"18px", height:"48px", aspectRatio:"1/1", background:"#FAE1CD", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", padding:"5px", cursor:"pointer", zIndex:"1"}}>
                    <RiDeleteBin6Fill style={{fontSize:"20px", color:"#DB4E4E"}} />
                </div>
            <div style={{background:"#D9D9D9", borderRadius:"8px", overflow:"clip", padding:"0.5rem", width:"100%", height:"80vh"}}>
                    {fileData && (type==="image" ?
                        <div style={{display:"flex", justifyContent:"center", height:"95%", borderRadius:"8px", overflow:"clip", padding:"1rem"}}>
                            <img src={url} style={{maxHeight:"100%", maxWidth:"100%"}} alt="API Image" />
                        </div>
                    :
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                           <Viewer fileUrl={url} />
                        </Worker>
                    )}
                </div>
            </div>
        // </div>
    )
}

