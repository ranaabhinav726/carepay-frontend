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

export default function ArthPrescriptionUpload(){

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

    let prescriptionList = uploadedFiles.map((file, idx)=>{
        return <UploadedPrescripton file={file} key={idx} idx={idx} showFileModal={showFileModal} removeFile={removeFileFromList} />
    })

    const [screenState, setScreenState] = useState("Submitted"); // NoFileSelected, FileInBuffer, Submitted

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
          renderer: "canvas"
        });

        // return ()=>{
        //     clearTimeout(timerId)
        // }
        
    }, []);

    useEffect(()=>{
        if(uploadedFiles.length > 0) setScreenState("FileInBuffer")
    },[uploadedFiles])

    return(
        <main style={{position:"relative"}}>
            {screenState === "NoFileSelected" &&
            <>
                <Header />
                <ScreenTitle title="Prescription upload" />
                <p style={{lineHeight:"150%"}}>Click and upload an image of your prescription, for verifying the purpose of your credit.</p>
                <div style={{width:"100%", display:"flex", justifyContent:"center", margin:"2.5rem 0"}}>
                    <img 
                        src={PrescriptionImg} 
                        alt="prescription" 
                    />
                </div>
                <h4>Upload file</h4>
                <p style={{margin:"1rem 0"}}>Allowed formats : PDF, Jpeg, Jpg</p>

                
                <button className="submit" onClick={()=>uploadClickHandler()}>Click to upload</button>
            </>
            }

            {screenState === "FileInBuffer" &&
            <>
                <Header />
                <ScreenTitle title="Prescription upload" />
                {prescriptionList}
                <button className="submit lite" onClick={()=>uploadClickHandler()}>+ Add more</button>
                <button className="submit">Submit</button>

                <div style={{width:"100%", display:"flex", justifyContent:"center", margin:"1.5rem 0", opacity:"0.4"}}>
                    <img 
                        src={PrescriptionImg} 
                        alt="prescription" 
                    />
                </div>
            </>
            }
            {screenState === "Submitted" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"15%"}} id="searchAnimation"></div>
                <p style={{color:"#514C9F", fontWeight:"bold", fontSize:"18px", textAlign:"center"}}>Prescription uploaded!</p>
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
            {fileModal && <FileViewerModal fileData={fileModal} showFileModal={showFileModal} />}
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

function FileViewerModal({fileData, showFileModal}){

    console.log(fileData)
    let type = fileData?.file?.type.split("/")[0];
    if(type !== "image") type = "pdf";

    let url = URL.createObjectURL(fileData?.file);
    return(
        <div style={{position:"absolute", top:"0", left:"0", height:"100%", width:"100%", background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{borderRadius:"12px", background:"white", maxWidth:"70%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div style={{width:"100%", padding:"10px", display:"flex", alignItems:"center", justifyContent:"space-between", textAlign:"center", gap:"1rem", borderBottom:"2px solid grey", marginBottom:"8px"}}>
                    <p style={{maxWidth:"80%", overflow:"clip"}}>{fileData?.fileName}</p>
                    <div style={{height:"34px", padding:"5px", background:"#ECEBFF", borderRadius:"4px", maxWidth:"20%", cursor:"pointer"}}>
                        <IoIosClose 
                            style={{
                                fontSize:"26px", 
                                color:"#514C9F"
                            }} 
                            onClick={()=>{showFileModal(null)}}
                        />
                    </div>
                </div>
                <div style={{maxWidth:"80%"}}>
                    {fileData && (type==="image" ?
                        <div style={{border:"2px solid black", height:"95%"}}>
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
        </div>
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