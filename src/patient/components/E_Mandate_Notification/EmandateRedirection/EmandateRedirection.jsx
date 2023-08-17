import Header from "../../Header/Header"
import './Redirection.scss'
import { useState, useEffect } from "react"
import RedirectionGif from '../../../assets/GIFs/Redirecting.gif'
import shield from '../../../assets/shield-s.png'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { env } from "../../../environment/environment"
// EmandateWebview

const EmandateRedirection = ({line1 = "Redirecting to partner’s platform...", line2 = ""}) =>{
    const navigate = useNavigate();
    const [url, setURL] = useState("")
    const [canClick, setCanClick] = useState(false)

    let userId = localStorage.getItem("userId");
    useEffect(()=>{
        axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=esign_verified", {},)

        .then((response) => {
            console.log(response)
            if(response.data.status == "200"){
                let link = response.data.data;
                if(link.length > 30){
                    console.log(link)
                    setURL(link);
                    setCanClick(true);
                }else{
                    navigate(-1);
                }
            }else{
                navigate(-1);
            }
        }).catch(error => {
                navigate(-1);
                console.log(error);
        });
    }, [])
    
   return(
    <>
    <main className="Redirection">
    <Header progressbarDisplay="none" />
        <div className="centerSection">
            <img src={RedirectionGif} alt="" />
            <p className="redirectionMsg">{line1}</p>
            <p className="redirectionMsg last">{line2}</p>
            <a href={url} target="_blank" id={canClick?"":"disabled"} onClick={()=>navigate('/patient/EmandateUnderProcess', {replace:true})}>{canClick?"Click to proceed":"Please wait..."}</a>
        </div>

        {/* <div className="lowerSection">
            <img src={shield} alt="" />
            <p>100% Verified</p>
        </div> */}
    </main>
    </>
   )
}


export default EmandateRedirection