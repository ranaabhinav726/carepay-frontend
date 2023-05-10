import Header from "../../Header/Header"
import './verifying.scss'
import { useNavigate } from "react-router-dom"
import VerifyingGif from '../../../assets/GIFs/Verifying document.gif'

import { env } from "../../../environment/environment"
import axios from "axios"
import { useEffect } from "react"


const KycVerifying = ({data = "Verifying KYC documents..."}) =>{
    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    // let url = localStorage.getItem('KYC_url') || ""

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}`}
    // };

    async function checkKYCandNavigate(){
        await axios
            .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=kyc_verified", {},)
            .then((response) => {
                console.log(response)
                if(response.data.status == "200"){
                    let kycStatus = response.data.data;
                    // console.log(kycStatus)
                    if(kycStatus === "VERIFIED"){
                        navigate('/patient/KycVerificationSuccesful', {replace:true});
                    }else if(kycStatus === "NOT_SUBMITTED"){
                        navigate('/patient/KycVerification');
                    }else{
                        navigate(-1);
                    }
                }else{
                    navigate(-1);
                }
            }).catch(error => {
                    console.log(error);
            });
    }

    useEffect(()=>{
        setTimeout(checkKYCandNavigate, 2000);
    },[])

   return(
    <>
    <main className="verifying">
    <Header progressbarDisplay="none" />
        <div className="centerSection">
            <img src={VerifyingGif} alt="" />
            <p className="redirectionMsg">{data}</p>
        </div>
    </main>
    </>
   )
}


export default KycVerifying