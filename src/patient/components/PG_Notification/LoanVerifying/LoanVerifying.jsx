import Header from "../../Header/Header"
import './verifying.scss'
import { useNavigate } from "react-router-dom"
import VerifyingGif from '../../../assets/GIFs/Verifying document.gif'

import axios from "axios"
import { env } from "../../../environment/environment"
import { useEffect } from "react"

const LoanVerifying = ({data = "Verifying loan status..."}) =>{
    const navigate = useNavigate();

    let userId = localStorage.getItem("userId");

    useEffect(()=>{
        setTimeout(() => {
            axios
            .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
            .then((response) => {
                if(response.data.status == "200"){
                    if(response.data.data == null){
                        navigate(-1)
                    }else{
                        let status = response?.data?.data[0]?.loan_status;
                        if(status == "DISBURSED"){
                            navigate('/patient/LoanAppSuccessful');
                        }else if(status == "PASSED"){
                            navigate(-1)
                        }else if(status == "FAILED"){
                            navigate('/patient/EndApplication')
                        }
                    }
                }else{
                    navigate(-1)
                }
            }).catch(error => {
                console.log(error);
                navigate(-1)
            });
        }, 1500);
    })

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


export default LoanVerifying