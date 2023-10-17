import Header from "../Header/Header"
import "./homepage.scss"

import homeImage from '../../assets/homePageHero.svg'
import { useNavigate } from "react-router-dom"
// import { useContext } from "react"
// import { DataContext } from "../../App"

import Justdial from '../../assets/justdial.png'
import Google from '../../assets/Google-my-business.png'
import Stars from '../../assets/stars.png'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { env } from "../../../doctor/environment"


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

    console.log("Last update - 16/10/2023 7:39 PM");

    useEffect(()=>{
        axios.get(env.api_Url+"getDoctorProfDetailsByDoctorId?doctorId=" + doctorId)
        .then((response)=>{
            console.log(response)
            setGoogleReviewLink(response?.data?.googleReviewLink)
            setJustdialReviewLink(response?.data?.justdialReviewLink)
        }).catch(()=>{

        })
    } ,[doctorId])

    // const data = useContext(DataContext);

    // An API call from homepage to check the stage of current user,
    // and redirect them to respective screen.

    const navigate = useNavigate();

    function navigateToNext(){
        // animateScreen();
        navigate('/patient/MobileNumberVerification')
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
        <Header progressbarDisplay="none" />

        <ReviewCard clinicName={clinicName} link1={googleReviewLink} link2={justdialReviewLink} link={"#"} />

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

        <div style={{padding:"10px", background:"#ECEBFF", marginTop:"1rem"}}>
            <h1 style={{fontSize:"24px", color:"#514C9F", marginBottom:"6px"}}>Instant medical finance</h1>
            <h2 style={{fontWeight:"400", fontSize:"14px", marginBottom:"10px"}}>Get credit in just 5 easy steps!</h2>
            <div style={{display:"flex", justifyContent:"center", padding:"10px", marginBottom:"16px"}}>
                <img src={homeImage} alt="hero banner" style={{borderBottom:"1px solid black"}} />
            </div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", color:"#514C9F", fontWeight:"700", fontSize:"13px"}}>
                <p>0% Interest</p>
                <div style={{height:"4px", width:"16px", borderRadius:"3px", background:"#514C9F"}}></div>
                <p>Flexible EMIs</p>
            </div>
            <button onClick={()=>navigateToNext()} className="submit" style={{marginTop:"12px"}}>Apply for credit</button>
        </div>

        </main>
        </>
    )
}
// onClick={()=> data.setData({...data.data, screen:1})}

export default Homepage

function ReviewCard({clinicName="", link1="", link2=""}){

    let nameArr = clinicName.split(' ');
    let minLength = Math.min(2, nameArr.length);
    let initials = "";
    for(let i=0; i<minLength; i++){
        initials += nameArr[i].charAt(0);
    }
    initials = initials.toUpperCase();
    return(
        <>
            <div style={{display:"flex", gap:"10px"}}>
                <div style={{color:"white", 
                    height: "max-content",
                    padding:"10px", 
                    fontSize:"50px", 
                    fontWeight:"700", 
                    borderRadius:"4px",
                    background:"#ECEBFF",
                }}>
                    {initials}
                </div>
                <div>
                    <h3 style={{fontSize:"14px", marginBottom:"4px"}}>Welcome to</h3>
                    <p style={{fontSize:"20px", maxWidth:"70%"}}>{clinicName}</p>
                </div>
            </div>
            <div className="reviewCardWrapper webkitScrollbar" style={{display:"flex", overflowX:"auto", scrollbarWidth: "thin", scrollbarColor:"#514C9F", scrollbarGutter:"stable"}}>
                {link1 && <div style={{display:"flex",minWidth:"85%", padding:"22px 10px 32px 10px", justifyContent:"space-between"}}>
                    <div style={{width:"", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                        <img src={Stars} alt="review us" style={{width:"60%", marginBottom:"10px"}} />
                        <p>Review us on</p>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <img 
                            src={Google} 
                            alt={"google my business logo"} 
                            style={{width:"70%"}}
                        />
                        <Link to={link1} style={{height:"48px", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"#0086F8", color:"white", fontWeight:"700", borderRadius:"4px"}}>Write your review</Link>
                    </div>
                </div>}
                {link2 && <div style={{display:"flex",minWidth:"85%", padding:"22px 10px 32px 10px", justifyContent:"space-between"}}>
                    <div style={{width:"", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                        <img src={Stars} alt="review us" style={{width:"60%", marginBottom:"10px"}} />
                        <p>Review us on</p>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <img 
                            src={Justdial} 
                            alt={"justdial logo"} 
                            style={{width:"70%"}}
                        />
                        <Link to={link2} style={{height:"48px", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"#0086F8", color:"white", fontWeight:"700", borderRadius:"4px"}}>Write your review</Link>
                    </div>
                </div>}
            </div>
        </>
    )
}