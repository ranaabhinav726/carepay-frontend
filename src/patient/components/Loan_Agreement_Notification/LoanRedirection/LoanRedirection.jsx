import Header from "../../Header/Header"
import './Redirection.scss'
import { useNavigate } from "react-router-dom"
import RedirectionGif from '../../../assets/GIFs/Redirecting.gif'
import shield from '../../../assets/shield-s.png'
// import { useEffect } from "react"
import { useState, useEffect } from "react"
import { env } from "../../../environment/environment"
import axios from "axios"


const LoanRedirection = ({line1 = "Redirecting to ", line2 = "lending partner’s platform..."}) =>{
    const navigate = useNavigate();
    const [url, setURL] = useState("")
    const [canClick, setCanClick] = useState(false)

    // useEffect(
    //     setTimeout(()=>{
    //         navigate('/VerifyingLoan')
    //     },2000)
    // , [])

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    let userId = localStorage.getItem("userId");
    useEffect(()=>{
        axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=bank_details_verified", {},)
        .then((response) => {
            console.log(response)
            if(response.data.status == "200"){
                let link = response.data.data;
                console.log(link)
                setURL(link);
                setCanClick(true);
            }
        }).catch(error => {
                console.log(error);
        });
    }, [])

    // axios
    //     .post(env.api_Url + "loan_webview_url", {
    //             },
    //             config
    //         )
    //     .then((response) => {
    //         let responseCode = response.status+"";
    //         if(responseCode[0] == '2'){
    //             let link_url = response?.data?.data?.url;
    //             setURL(link_url);
    //             setCanClick(true);
    //         }
    //     }).catch(error => {
    //         console.log(error);
    //     });
    
   return(
    <>
    <main className="Redirection">
    <Header progressbarDisplay="none" />
        <div className="centerSection">
            <img src={RedirectionGif} alt="" />
            <p className="redirectionMsg">{line1}</p>
            <p className="redirectionMsg last">{line2}</p>
            <a href={url} target="_blank" id={canClick?"":"disabled"} onClick={()=>navigate('/patient/LoanAgreementUnderProcess', {replace:true})}>{canClick?"Click to proceed":"Please wait..."}</a>
        </div>

        {/* <div className="lowerSection">
            <img src={shield} alt="" />
            <p>100% Verified</p>
        </div> */}
    </main>
    </>
   )
}


export default LoanRedirection