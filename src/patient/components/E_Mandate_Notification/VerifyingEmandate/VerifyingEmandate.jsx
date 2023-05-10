import Header from "../../Header/Header"
import './verifying.scss'
import { useNavigate } from "react-router-dom"

import VerifyingGif from '../../../assets/GIFs/Verifying document.gif'
import { useEffect } from "react"

import axios from "axios"
import { env } from "../../../environment/environment"


const VerifyingEmandate = ({data = "Verifying E-Mandate..."}) =>{
    const navigate = useNavigate();

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}`}
    // };

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         checkEmandateStatus();
    //     },3000)
    // }, [])

    // async function checkEmandateStatus(){
    //     await axios
    //         .post(env.api_Url + "get_document_status", {
    //                 "type": "e-mandate_signing"
    //             }, config
    //         )
    //         .then((response) => {
    //             let emandateStatus = response.data.emandate_verified;
    //             // console.log(kycStatus)
    //             if(emandateStatus == "S"){
    //                 navigate('/EmandateVerificationSuccesful', {replace:true})
    //             }else{
    //                 navigate(-1)
    //             }
    //         }).catch(error => {
    //                 console.log(error);
    //                 navigate(-1)
    //         });
            // console.log(isKYCdone)

    // }

    let userId = localStorage.getItem("userId");
    useEffect(()=>{
        axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=emandate_verified", {},)
        .then((response) => {
            console.log(response)
            if(response.data.status == "200"){
                let status = response.data.data;
                console.log(status)
                if(status.length > 30){
                    navigate('/patient/EmandateVerificationSuccesful')
                }else{
                    navigate(-1);
                }
            }else{
                navigate(-1);
            }
        }).catch(error => {
                console.log(error);
        });
    }, [])
    
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

export default VerifyingEmandate