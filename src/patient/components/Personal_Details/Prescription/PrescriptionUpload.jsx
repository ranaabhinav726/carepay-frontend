import Header from "../../Header/Header";
import { FaRegFileAlt } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import PrescriptionImg from '../../../assets/prescription.svg'
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import lottie from "lottie-web";
import animationData from '../../../assets/GIFs/Comp 1.json'
import axios from "axios";
import { env } from "../../../environment/environment";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function PrescriptionUpload(){

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

    function removeFileFromList(idx){
        if(idx >= uploadedFiles.length)return;

        let newTempArray = [...uploadedFiles];
        newTempArray.splice(idx, 1);
        setUploadedFiles([...newTempArray]);
    }

    // let prescriptionList = uploadedFiles.map((file, idx)=>{
    //     return <UploadedPrescripton file={file} key={idx} idx={idx} showFileModal={showFileModal} removeFile={removeFileFromList} />
    // })

    const [screenState, setScreenState] = useState("NoFileSelected"); // NoFileSelected, FileInBuffer, Submitted

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
          renderer: "canvas"
        });

        // return ()=>{
        //     clearTimeout(timerId)
        // }
        
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
                    navigate("/patient/PersonalDetails")
                }, 2000)
            }
        }).catch(e=>console.warn(e));
    }

    return(
        <main style={{position:"relative"}}>
            {screenState === "NoFileSelected" &&
            <>
                <Header progressbarDisplay="block" progress="22" />
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
                {/* <h4>Upload file</h4> */}
                <p style={{marginTop:"1.5rem"}}>Allowed formats : PDF, Jpeg, Jpg</p>

                
                <button className="submit" onClick={()=>uploadClickHandler()}>Share file</button>
            </>
            }

            {screenState === "FileInBuffer" &&
            <>
                <Header />
                <h3 style={{margin:"2rem 0 1rem 0"}}>Share prescription</h3>
                {/* {prescriptionList} */}
                <FileViewerModal fileData={fileModal} setUploadedFiles={setUploadedFiles} />
                {/* <button className="submit lite" onClick={()=>uploadClickHandler()}>+ Add more</button> */}
                <button className="submit" onClick={()=>savePrescripton()}>Submit</button>

                {/* <div style={{width:"100%", display:"flex", justifyContent:"center", margin:"1.5rem 0", opacity:"0.4"}}>
                    <img 
                        src={PrescriptionImg} 
                        alt="prescription" 
                    />
                </div> */}
            </>
            }
            {screenState === "Submitted" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"15%"}} id="searchAnimation"></div>
                <p style={{color:"#514C9F", fontWeight:"bold", fontSize:"18px", textAlign:"center"}}>Prescription shared successfully!</p>
            </>
            }
            <input 
                type="file" 
                id="prescription" 
                name="prescription" 
                ref={inputRef}
                style={{display:"none"}} 
                accept="image/jpg, image/png, application/pdf"
                onChange={(e)=>fileHandler(e)}
                multiple
            />
            {/* {fileModal && <FileViewerModal fileData={fileModal} showFileModal={showFileModal} />} */}
        </main>
    )
}


function UploadedPrescripton({file, idx, showFileModal, removeFile}){

    let fileName = file.name;
    if(fileName.length > 28){
        let [name, ext] = fileName.split(".");
        name = name.substring(0,24);
        fileName = name + "...." + ext;
    }

    function viewClickHandler(){
        let fileData = {
            "file" : file,
            "fileName" : fileName
        }
        showFileModal(fileData)
    }

    return(
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", margin:"1.5rem 4px"}}>
            <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
                <div style={{height:"36px", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"4px", background:"#ECEBFF", aspectRatio:"1/1", color:"#514C9F"}}>
                    <FaRegFileAlt style={{fontSize:"24px"}} />
                </div>
                <p style={{fontWeight:"500"}}>{fileName}</p>
            </div>
            <div style={{display:"flex", gap:"1rem"}}>
                <div 
                    style={{
                        height:"40px", 
                        display:"flex", 
                        alignItems:"center", 
                        justifyContent:"center", 
                        borderRadius:"4px", 
                        background:"#ECEBFF", 
                        aspectRatio:"1/1", 
                        color:"#514C9F",
                        cursor:"pointer"
                    }}
                    onClick={()=>viewClickHandler()}
                >
                    <MdRemoveRedEye style={{fontSize:"24px"}} />
                </div>
                <div 
                    style={{
                        height:"40px", 
                        display:"flex", 
                        alignItems:"center", 
                        justifyContent:"center", 
                        borderRadius:"4px", 
                        background:"#FAE1CD", 
                        aspectRatio:"1/1", 
                        color:"#DB4E4E",
                        cursor:"pointer"
                    }}
                    onClick={()=>removeFile(idx)}
                >
                    <MdDelete style={{fontSize:"24px"}} />
                </div>
            </div>
        </div>
    )
}

function FileViewerModal({fileData, setUploadedFiles}){

    console.log(fileData)
    let type = fileData?.file?.type.split("/")[0];
    if(type !== "image") type = "pdf";

    let url = URL.createObjectURL(fileData?.file);
    return(
        // <div style={{position:"absolute", top:"0", left:"0", height:"100%", width:"100%", background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:"5"}}>
            <div style={{borderRadius:"12px", background:"white", display:"flex", flexDirection:"column", alignItems:"center"}}>
                {/* <div style={{width:"100%", padding:"10px", display:"flex", alignItems:"center", justifyContent:"space-between", textAlign:"center", gap:"1rem", borderBottom:"2px solid grey", marginBottom:"8px"}}>
                    <p style={{maxWidth:"80%", overflow:"clip"}}>{fileData?.fileName}</p>
                    <div style={{height:"34px", padding:"5px", background:"#ECEBFF", borderRadius:"4px", maxWidth:"20%", cursor:"pointer"}}>
                        <IoIosClose 
                            style={{
                                fontSize:"26px", 
                                color:"#514C9F"
                            }} 
                            onClick={()=>{setUploadedFiles([])}}
                        />
                    </div>
                </div> */}
                <div onClick={()=>{setUploadedFiles([])}} style={{position:"absolute", margin:"5px", right:"18px", height:"48px", aspectRatio:"1/1", background:"#FAE1CD", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", padding:"5px", cursor:"pointer"}}>
                    <RiDeleteBin6Fill style={{fontSize:"20px", color:"#DB4E4E"}} />
                </div>
            <div style={{background:"#D9D9D9", borderRadius:"8px", overflow:"clip", padding:"0.5rem", width:"100%"}}>
                    {fileData && (type==="image" ?
                        <div style={{display:"flex", justifyContent:"center", height:"95%", borderRadius:"8px", overflow:"clip", padding:"1rem"}}>
                            <img src={url} style={{maxHeight:"100%", maxWidth:"100%"}} alt="API Image" />
                        </div>
                    :
                        <iframe
                            src={url}
                            title="PDF Preview"
                            width="100%"
                            height="500px"
                        />
                    )}
                </div>
            </div>
        // </div>
    )
}


// {document && (document.type==="image/png" ?
//     <div style={{border:"2px solid black", height:"95%"}}>
//         <img src={`data:image/jpeg;base64,${document.data}`} style={{maxHeight:"100%", maxWidth:"100%"}} alt="API Image" />
//     </div>
// :
//     <iframe
//     src={`data:application/pdf;base64,${document.data}`}
//     title="PDF Preview"
//     width="100%"
//     height="500px"
//     />
// )}