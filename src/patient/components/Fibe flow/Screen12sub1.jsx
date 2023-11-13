import { Header } from "./Comps/Header";
import Waiting from '../../assets/fibeWaiting.png'
import { Link, useLocation } from "react-router-dom";

export default function Screen12sub1(){

    const location = useLocation();
    console.log(location.state);

    return(
        <main>
            <Header progressBar="hidden" />
            <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
                <img src={Waiting} alt="" style={{maxWidth:"40%", marginTop:"3rem"}} />
            </div>
            <p style={{textAlign:"center", padding:"16px", fontSize:"16px", lineHeight:"22px"}}>Oho! Looks like the current information is not sufficient to approve your application. Sharing your <strong>bank statement</strong> may help increase your chances.</p>
            <button className="submit" style={{marginTop:"0"}}>Proceed to share</button>
            <Link to={"tel:+918069489655"}> <button className="submit" style={{color:"#514C9F", background:"#ECEBFF", marginTop:"12px"}}>Contact support</button> </Link>
        </main>
    )
}