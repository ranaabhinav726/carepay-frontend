import Header from "../../Header/Header";

import { env } from "../../../environment/environment";
import Waiting from '../../../assets/waiting.png'
import Statement from '../../../assets/statement.png' 
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import SearchingDoc from '../../../assets/GIFs/Document in process.gif'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { showWrapper, hideWrapper } from "../../../environment/environment";

function WaitingForApproval(){

    let email = localStorage.getItem('email');
    let number = localStorage.getItem('phoneNumber');

    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false)
    }, 5000);

    const [uploadedFiles, setUploadedFiles] = useState(null);

    let ref = useRef(0);
    useEffect(()=>{
        chechForUploadedDocuments();
        ref.current = document.getElementById('animation-wrapper');
    },[])

    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    function chechForUploadedDocuments(){
        axios.get(env.api_Url + "getDocumentsByUserId?userId=" + userId)
        .then(response =>{
            if(response.data.status === 200){
                console.log(response)
                let uploadedFiles = response?.data?.data?.multipleBankStatements?.split(',');
                console.log(uploadedFiles)
                setUploadedFiles(uploadedFiles);
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    

    function navigateBackToFileUpload(){
        navigate("/patient/FileUpload", {state : {"reVisitToUploadStatement" : true}})
    }
    return(
        <main className="waitingForApproval">
            {loading === true ?
            <>
                <Header progressBar="hidden" />
                <div style={{display:"flex", placeContent:"center", marginTop:"3rem"}}>
                    <img src={SearchingDoc} alt="" style={{width:"50%"}} />
                </div>
                <p style={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}}>Sit back and relax!</p>
                <p style={{textAlign:"center", color:"#000000CC", fontSize:"16px", lineHeight:"20px"}}>while we assess your credit application...</p>
            </>
            :
            <>
                <Header />
                <div className="reviewPageContent" style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem", marginTop:"2rem"}}>
                    <img src={Waiting} alt="waiting" style={{maxWidth:"30%"}} />
                    <h3 style={{color:"#1C8769", fontWeight:"700"}}>Under Review</h3>
                    <p style={{textAlign:"center"}}>We are assessing your credit application.<br />This might take 15-20 minutes.</p>
                    <div className="msgBox" style={{background:"#FAE1CD", borderRadius:"4px", padding:"16px 32px", textAlign:"center", lineHeight:"150%", letterSpacing:"0.5px", wordSpacing:"0.5px"}}>
                        You will be notified on your registered contact number <strong>+91 {number} </strong> once the application is reviewed.
                    </div>
                </div>
                {!uploadedFiles && 
                    <div style={{
                        background:"#ECEBFF",
                        padding:"10px 16px",
                        borderRadius:"4px",
                        color:"#514c9f",
                        marginTop:"1rem",
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        cursor:"pointer"
                    }}
                    onClick={()=>navigateBackToFileUpload()}
                    >
                        <img src={Statement} alt="" style={{height:"48px", marginRight:"10px"}} />
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <span style={{fontWeight:"700"}}>Share Bank Statement</span>
                            <span>To increase your chance of credit approval</span>
                        </div>
                        <MdOutlineKeyboardDoubleArrowRight style={{fontSize:"36px"}} />
                        {/* <span style={{textDecoration:"underline", fontWeight:"700", cursor:"pointer"}} onClick={()=>navigateBack()}>click here</span> */}
                    </div>
                }
                <button className="submit" onClick={()=>navigate('/patient/ChechkingStatus')}>Check Status</button>
                <a href="tel:+918069489655"><button className="submit" style={{color:"#514C9F", background:"#ECEBFF", marginTop:"0px"}}>Contact Support</button></a>
            </>
            }
        </main>
    )
}

export default WaitingForApproval