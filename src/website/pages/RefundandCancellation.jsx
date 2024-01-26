// import './css/privacyPolicy.scss';
import './css/section.scss';
import '../../App.scss';


import CustomNavbar from "../Components/Navbar";
import { Footer } from "./Homepage";
import { useEffect } from "react";

function RefundandCancellation(){


    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    return(
        <div className="website-container">
            <CustomNavbar  />
            <RefundandCancellationContent />
            <Footer />
        </div>
    )
}

export default RefundandCancellation


function RefundandCancellationContent(){

    return(
        <div className="custom-container">
            <h2 style={{fontFamily:"DM sans"}}>Refund and Cancellation</h2>


            <p>The MSP shall be liable to initiate a full refund of the Relevant Invoice Amount to the Lending Partner in the event that any of the following conditions are fulfilled in the Company’s sole discretion:</p>
            <ul>
                <li>The Patient is not contactable by the Company for a period of 24 hours from the time the Invoice was raised.</li>
                <li>The Patient raises a dispute with respect to the Invoice which is not resolved within 72 hours.</li>
                <li>The Patient raises a dispute with respect to the MSP Product/Services offered by the MSP through its Platform.</li>
            </ul>

        </div>
    )
}