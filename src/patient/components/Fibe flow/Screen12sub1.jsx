import { Header } from "./Comps/Header";
import Waiting from '../../assets/fibeWaiting.svg'
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Screen12sub1(){

    const navigate = useNavigate();
    const location = useLocation();
    let bitlyUrl = location?.state?.link;
    console.log(location.state);

    function handleNavigation(){
        navigate("/patient/screen13", {state : {"link" : bitlyUrl}})
    }

    return(
        <main>
            <Header progressBar="hidden" />
            <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
                <img src={Waiting} alt="" style={{maxWidth:"40%", marginTop:"3rem"}} />
            </div>
            <div style={{background:"#DFEEEC", padding:"12px", marginTop:"1.5rem", borderRadius:"8px"}}>
                <p style={{textAlign:"center", padding:"16px", fontSize:"16px", lineHeight:"22px"}}>Oho! Looks like the current information is not sufficient to approve your application. <br /><br />Sharing some more information about you and your <strong>bank statement</strong> may help increase your chances.</p>
                <button className="submit" style={{marginTop:"0", background:"#00A1A0"}}  onClick={()=>handleNavigation()}>Proceed to share</button>
                <Link to={"tel:+918069489655"}> <button className="submit" style={{color:"#00A1A0", background:"#fff", marginTop:"4px"}}>Contact support</button> </Link>
            </div>
        </main>
    )
}