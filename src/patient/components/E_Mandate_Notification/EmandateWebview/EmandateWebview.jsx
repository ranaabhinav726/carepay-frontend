import './emandateWebview.scss'
import Header from '../../Header/Header'
import { useState, useEffect } from 'react'

import { RxCheckCircled, RxCrossCircled } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

// import { env } from "../../../environment/environment"
// import axios from "axios"

const EmandateWebview = () =>{

    let url = localStorage.getItem('Emandate_url') || ""

    const [emandateStatus, setEmandateStatus] = useState("Not verified");
    const [timeLeft, setTimeLeft] = useState(null);

    const navigate = useNavigate();
    let token = localStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    };



    

    useEffect(()=>{
        let elem = document.getElementsByClassName('tryAgain')[0];
        elem.click();
        // console.log("hhii")
    },[])

    async function handleRefresh(){
        let status = false;
        // let status = await checkEmandateStatus();
        console.log(status)
        if(status){
            let elem = document.getElementById('redirect');
            elem.style.visibility = "visible";
            let elem2 = document.getElementsByClassName('refreshKycStatus')[0];
            elem2.style.pointerEvents = "none";
            setTimeLeft(4);
        }
    }

    return(
        <>
            <Header progressbarDisplay="none" progress="80" />
            <main className='emandateWebview'>
                {/* <iframe src={url} frameborder="0"></iframe> */}
                <div className="symbol">
                    {emandateStatus=="Not verified"?<RxCrossCircled className='icon red'/>:<RxCheckCircled className='icon green'/>}
                </div>
                <div className='kycStatus'>Your Emandate status is: <span className={emandateStatus=="Not verified"?"kycStatusValue red":"kycStatusValue green"}>{emandateStatus}</span></div>
                <div id="redirect">Redirecting you to next step in {timeLeft} seconds...</div>
                <div onClick={handleRefresh} className="refreshKycStatus">
                    Refresh Status
                </div>
                <a className='tryAgain' href={url} target="_blank">Click here to sign your E-mandate</a>
            </main>
        </>
    )
}

export default EmandateWebview