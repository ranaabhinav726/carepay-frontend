import Header from "../../Header/Header"
import './verifying.scss'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import VerifyingGif from '../../../assets/GIFs/Verifying document.gif'
import axios from "axios"
import { env } from "../../../environment/environment"

const VerifyingLoan = ({data = "Verifying credit agreement..."}) =>{
    const navigate = useNavigate();
    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}`}
    // };
    let userId = localStorage.getItem("userId");
    useEffect(()=>{
        axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=esign_verified", {},)
        .then((response) => {
            console.log(response)
            if(response.data.status == "200"){
                let status = response.data.data;
                console.log(status)
                if(status.length >= 30){
                    navigate('/patient/LoanVerificationSuccesful')
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


export default VerifyingLoan