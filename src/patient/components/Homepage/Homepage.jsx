import Header from "../Header/Header"
import "./homepage.scss"

import homeImage from '../../assets/heroMoneyImage.svg'
import CarepayLogo from '../../assets/Logo-carepay.svg'
import { useNavigate } from "react-router-dom"
// import { useContext } from "react"
// import { DataContext } from "../../App"

import Justdial from '../../assets/justdial.png'
import Google from '../../assets/Google-my-business.png'
import Stars from '../../assets/stars.svg'
import HospitalIcon from '../../assets/hospitalIcon.svg'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { env } from "../../../doctor/environment"
import { checkDoctorStatus } from "../../services"


const Homepage = () =>{

    let URL = window.location.href;
    let URLparts = URL.split('/');
    // http://www.carepay.one/GGN/CarePayHomeClinic/Nupur_Khandelwal/52aab48b-aa3e-4fa6-bcf4-ec344eefa126
    let cityCode = URLparts[4]
    let clinicName = URLparts[5]
    let doctorName = URLparts[6]
    let doctorId = URLparts[7]
    if(!!cityCode) localStorage.setItem("cityCode", cityCode);
    if(!!clinicName) localStorage.setItem("clinicName", clinicName);
    if(!!doctorName) localStorage.setItem("doctorName", doctorName);
    if(!!doctorId) localStorage.setItem("doctorId", doctorId);

    if(!! clinicName) clinicName = clinicName.split("_").join(" ");
  
    const [googleReviewLink, setGoogleReviewLink] = useState("");
    const [justdialReviewLink, setJustdialReviewLink] = useState("");

    const [nbfcId, setNbfcId] = useState("");

    const fibeNbfcId = "lYsPxk42bDzRgJVmHoNNcegqyC9ww1XK";

    // console.log("Last update - 16/10/2023 7:39 PM");

    // useEffect(()=>{
    //     if(doctorId){
    //         checkDoctorStatus(doctorId, res=>{
    //             if(res.message === "success" && res.data === "HOLD"){
    //                 navigate("/patient/DoctorNotAvailable");
    //             }
    //         })
    //         axios.get(env.api_Url+"getDoctorProfDetailsByDoctorId?doctorId=" + doctorId)
    //         .then((response)=>{
    //             // console.log(response)
    //             setGoogleReviewLink(response?.data?.data?.googleReviewLink)
    //             setJustdialReviewLink(response?.data?.data?.justdialReviewLink)
    //         }).catch((error)=>{
    //             console.warn(error)
    //         })
    //     }
    // } ,[doctorId])

    // useEffect(()=>{
    //     if(doctorId){
    //         axios.get(env.api_Url+"userDetails/getNbfcStatusForDoctor?doctorId=" + doctorId)
    //         .then((response)=>{
    //             // console.log(response);
    //             if(response){
    //                 let id = response?.data?.data[0];
    //                  if(id){
    //                     setNbfcId(id);
    //                     localStorage.setItem('nbfcId', id);
    //                  }
    //             }
    //         }).catch((error)=>{
    //             console.warn(error)
    //         })
    //     }
    // } ,[doctorId])
    // const data = useContext(DataContext);

    // An API call from homepage to check the stage of current user,
    // and redirect them to respective screen.

    const navigate = useNavigate();

    function navigateToNext(){
        // animateScreen();
        if(nbfcId === fibeNbfcId){
            navigate('/patient/fibeMobileNumberVerification')
        }else{
            navigate('/patient/MobileNumberVerification')
        }
    }

    // function animateScreen(){
    //     let wrapper = document.getElementById('animation-wrapper');

    //     wrapper.style.display = "block";
    //     wrapper.classList.add('animate');

    //     setTimeout(()=>{
            
    //         wrapper.classList.replace('animate', "unanimate");
    //     },500)

    //     setTimeout(()=>{
    //         wrapper.style.display = "none";
    //     }, 1000)
    // }
    
    return(
        <>
        <main>
        <header style={{padding:"10px 0"}}>
            <img style={{marginTop:"10px"}} src={CarepayLogo} alt="" />
        </header>

        <ReviewCard clinicName={clinicName} link1={googleReviewLink} link2={justdialReviewLink} link={"#"} doctorId={doctorId} />

        {/* <div className="upper-section">
            <h1 className="heading">Don't Postpone<br /> your Treatment</h1>
            <p className="subheading">Instant finance in just 4 easy steps!</p>
        </div>

        <div className="middle-section">
            <img className="main-image" src={homeImage}></img>
        </div>

        <div className="lower-section">
            <div className="line line1">Digital process with quick approvals</div>
            <div className="line line2">Starting from 0% Interest</div>
            <div className="line line3">Flexible EMI options</div>

            <button onClick={navigateToNext} className="submit">Apply for credit</button>
        </div> */}

        <div style={{padding:"16px", background:"#ECEBFF", marginTop:"1rem", borderRadius:"4px"}}>
            <h1 style={{fontSize:"32px", color:"#514C9F"}}>Instant<br /> medical finance</h1>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"4px"}}>
                <h2 style={{fontWeight:"400", fontSize:"16px", marginBottom:"10px"}}>Get credit in just<br /> 5 easy steps!</h2>
                <img src={homeImage} alt="hero banner" style={{width:"50%"}} />
            </div>
            {/* <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", color:"#514C9F", fontWeight:"700", fontSize:"13px"}}>
                <p>0% Interest</p>
                <div style={{height:"4px", width:"16px", borderRadius:"3px", background:"#514C9F"}}></div>
                <p>Flexible EMIs</p>
            </div> */}
            <div style={{padding:"10px", display:"flex", alignItems:"center", gap:"12px", background:"white", borderRadius:"4px", margin:"10px 0"}}>
                <div style={{height:"10px", width:"10px", borderRadius:"50%", background:"rgba(81, 76, 159, 0.5)"}}></div>
                <p>Starting from 0% Interest</p>
            </div>
            <div style={{padding:"10px", display:"flex", alignItems:"center", gap:"12px", background:"white", borderRadius:"4px", marginBottom:"10px"}}>
                <div style={{height:"10px", width:"10px", borderRadius:"50%", background:"rgba(81, 76, 159, 0.5)"}}></div>
                <p>Flexible EMI options</p>
            </div>
            <div style={{padding:"10px", display:"flex", alignItems:"center", gap:"12px", background:"white", borderRadius:"4px", marginBottom:"4px"}}>
                <div style={{height:"10px", width:"10px", borderRadius:"50%", background:"rgba(81, 76, 159, 0.5)"}}></div>
                <p>Fully digital process with quick approvals</p>
            </div>
            <button onClick={()=>navigateToNext()} className="submit" style={{marginTop:"12px", fontSize:"18px"}}>Apply for credit</button>
        </div>

        </main>
        </>
    )
}
// onClick={()=> data.setData({...data.data, screen:1})}

export default Homepage

function ReviewCard({clinicName="", link1="", link2="", doctorId}){

    let nameArr = clinicName.split(' ');
    let minLength = Math.min(2, nameArr.length);
    let initials = "";
    for(let i=0; i<minLength; i++){
        initials += nameArr[i].charAt(0);
    }
    initials = initials.toUpperCase();

    function registerClickCount(linkType){
        axios.get(env.api_Url + "reviewLinkHitsCounter?doctorId=" + doctorId + "&linkType=" + linkType)
        .then(res =>{
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
    }
    return(
        <>
        {clinicName && 
            <div style={{display:"flex", gap:"10px", marginBottom:"20px"}}>
                <div style={{color:"white", 
                    height: "80px",
                    width: "80px",
                    aspectRatio:"1/1",
                    // padding: "16px",
                    borderRadius: "4px",
                    background: "#ECEBFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <img src={HospitalIcon} alt="" style={{width:"50%"}} />
                </div>
                <div style={{width:"100%"}}>
                    <h3 style={{fontSize:"18px", marginBottom:"4px"}}>Welcome to</h3>
                    <p style={{fontSize:"24px", maxWidth:"70%"}}>{clinicName}</p>
                </div>
            </div>}
            <div className="reviewCardWrapper" style={{display:"flex", overflowX:"auto", scrollbarWidth: "thin", scrollbarColor:"#514C9F", scrollbarGutter:"stable", userSelect:"none"}}>
                {link1 && <div style={{display:"flex", minWidth:"85%", padding:"16px 0 16px 16px", justifyContent:"space-between", background:"#CBFFE1", borderRadius:"4px", margin:"5px 5px 10px 0"}}>
                    <div style={{display:"flex", width:"50%", flexDirection:"column", justifyContent:"center", gap:"12px"}}>
                        <p>Your opinion<br /> matters to us.</p>
                        <img src={Stars} alt="review us" style={{width:"110%"}} />
                        <Link to={link1} onClick={()=>registerClickCount("googleReviewLink")} target="_blank" style={{height:"48px", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", background:"linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),linear-gradient(0deg, #4FD889, #4FD889)", color:"white", fontWeight:"700", borderRadius:"4px"}}>Write your review</Link>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                        <img 
                            src={Google} 
                            alt={"google my business logo"} 
                            style={{width:"80%"}}
                        />
                    </div>
                </div>}
                {link2 && <div style={{display:"flex", minWidth:"85%", padding:"16px 0 16px 16px", justifyContent:"space-between", background:"#CBFFE1", borderRadius:"4px", margin:"5px 5px 10px 5px"}}>
                    <div style={{display:"flex", width:"50%", flexDirection:"column", justifyContent:"center", gap:"12px"}}>
                        <p>Your opinion<br /> matters to us.</p>
                        <img src={Stars} alt="review us" style={{width:"110%"}} />
                        <Link to={link2} onClick={()=>registerClickCount("justdialReviewLink")} target="_blank" style={{height:"48px", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", background:"linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),linear-gradient(0deg, #4FD889, #4FD889)", color:"white", fontWeight:"700", borderRadius:"4px"}}>Write your review</Link>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                        <img 
                            src={Justdial} 
                            alt={"justdial logo"} 
                            style={{width:"70%"}}
                        />
                    </div>
                </div>}
            </div>
        </>
    )
}
