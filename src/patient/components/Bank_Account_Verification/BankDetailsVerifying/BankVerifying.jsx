import Header from "../../Header/Header"
import './verifying.scss'
import { useNavigate } from "react-router-dom"
import VerifyingGif from '../../../assets/GIFs/Verifying document.gif'
import { useEffect } from "react"
import axios from "axios"
import { env } from "../../../environment/environment"


const BankVerifying = ({data = "Verifying Bank account details..."}) =>{

    const navigate = useNavigate();

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}`}
    // };

    // useEffect(()=>{
    //     axios
    //         .post(env.api_Url + "get_document_status", {
    //                 "type": "Bank_Account_Verification"
    //                 },
    //                 config
    //             )
    //         .then((response) => {
    //             let status = response.data.bank_details_verified;
    //             console.log(response)
    //             if(status == "VERIFIED"){
    //                 navigate('/BankDetailsVerified', {replace:true})
    //             }else{
    //                 navigate(-1)
    //             }
    //         }).catch(error => {
    //                 console.log(error);
    //         });
    // }
    // , [])
    
    let userId = localStorage.getItem("userId");
    useEffect(()=>{
        axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=bank_details_verified", {},)
        .then((response) => {
            console.log(response)
            if(response.data.status == "200"){
                let status = response.data.data;
                console.log(status)
                if(status === "NOT_VERIFIED"){
                    navigate(-1);
                }else{
                    navigate('/patient/BankDetailsVerified')
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

export default BankVerifying