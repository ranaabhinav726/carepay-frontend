import Header from "../../Header/Header"
import './Redirection.scss'
import { useNavigate } from "react-router-dom"
import RedirectionGif from '../../../assets/GIFs/Redirecting.gif'
// import shield from '../../../assets/shield-s.png'
import axios from "axios";
import { env } from "../../../environment/environment"
import { useEffect, useState } from "react"


const KycRedirection = ({line1 = "Redirecting to", line2 = "lending partner’s platform..."}) =>{

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    let userId = localStorage.getItem("userId");

    const navigate = useNavigate();
    const [url, setURL] = useState("")
    const [canClick, setCanClick] = useState(false)

    useEffect(()=>{
        // setTimeout(getKycStatusOrLink, 1000);
        getKycStatusOrLink();
    },[])

    async function getKycStatusOrLink(){
        await axios
            .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=customer", {},)
            .then(response =>{
                console.log(response)
                if(response.data.status == "200"){
                    let link = response.data.data;
                    if(link.length > 30){
                        setURL(link);
                        setCanClick(true);
                    }else{
                        navigate(-1);
                    }
                }else{
                    navigate(-1);
                    // apiErrorHandler();
                }
            }).catch(error =>{
                console.log(error)
                navigate(-1);
            })
    }

    // async function checkKYC(){
    //     let isKYCdone = false;
    //     await axios
    //         .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=kyc_verified", {},)
    //         .then((response) => {
    //             console.log(response)
    //             if(response.data.status == "200"){
    //                 let kycStatus = response.data.data;
    //                 // console.log(kycStatus)
    //                 if(kycStatus === "VERIFIED"){
    //                     isKYCdone = true
    //                 }else{
    //                     isKYCdone = false
    //                 }
    //             }
    //         }).catch(error => {
    //                 console.log(error);
    //         });
    //         console.log(isKYCdone)
    //         return isKYCdone;
    // }
    // function apiErrorHandler(){
    //     setApiError(true)
    //     setTimeout(()=>{
    //         setApiError(false);
    //     }, 1500);
    // }

    // axios
    //     .post(env.api_Url + "kyc_webview_url", {
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
            <a href={url} target="_blank" className={canClick==false?"disabled":""} onClick={()=>navigate('/patient/KycWebview', {replace:true})}>{canClick?"Click to proceed":"Please wait..."}</a>
        </div>

        {/* <div className="lowerSection">
            <img src={shield} alt="" />
            <p>100% Secured</p>
        </div> */}
    </main>
    </>
   )
}


export default KycRedirection