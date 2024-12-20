import Header from "../Header/Header"
import "./homepage.scss"

import homeImage from '../../assets/homeImage.png'
import { useNavigate } from "react-router-dom"
// import { useContext } from "react"
// import { DataContext } from "../../App"

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
    console.log("Last update - 7/28/2023 11:05AM");

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

        <div className="upper-section">
            <h1 className="heading">Don't Postpone<br /> your Treatment</h1>
            <p className="subheading">Get an instant medical credit<br/>in just 3 easy steps!</p>
        </div>

        <div className="middle-section">
            <img className="main-image" src={homeImage}></img>
        </div>

        <div className="lower-section">
            <div className="line line1">Instant credit for your treatment</div>
            <div className="line line2">0% Interest</div>
            <div className="line line3">3 or 6 EMIs</div>

            {/* <Link to='/MobileNumberVerification'> */}
                <button onClick={navigateToNext} className="submit">Check Eligibility</button>
            {/* </Link> */}
        </div>
        </main>
        </>
    )
}
// onClick={()=> data.setData({...data.data, screen:1})}

export default Homepage