import Header from "../../Header/Header"
import './PGRedirection.scss'
import { useNavigate } from "react-router-dom"
import RedirectionGif from '../../../assets/GIFs/Redirecting.gif'
import axios from "axios";
import { env } from "../../../environment/environment"
import { useState, useEffect } from "react"

const PGRedirection = ({line1 = "Redirecting to payment gateway..", line2 = ""}) =>{

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    const navigate = useNavigate();
    const [url, setURL] = useState("")
    const [canClick, setCanClick] = useState(false)

    let userId = localStorage.getItem("userId");
    useEffect(()=>{
        axios
        .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=emandate_verified", {},)
        .then((response) => {
            console.log(response)
            if(response.data.status == "200"){
                let link = response.data.data;
                if(link.length > 30){
                    console.log(link)
                    setURL(link);
                    setCanClick(true);
                }else{
                    navigate(-1)
                }
            }else{
                navigate(-1)
            }
        }).catch(error => {
                navigate(-1)
                console.log(error);
        });
    }, [])

    // axios
    //     .post(env.api_Url + "payment_gateway_url", {
    //             },
    //             config
    //         )
    //     .then((response) => {
    //         let responseCode = response.status+"";
    //         if(responseCode[0] == '2'){
    //             console.log(response)
    //             let link_url = response?.data?.data.data.url;
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
            <a href={url} target="_blank" id={canClick?"":"disabled"} onClick={()=>navigate('/patient/PaymentUnderProcess', {replace:true})}>{canClick?"Click to proceed":"Please wait..."}</a>
        </div>
    </main>
    </>
   )
}


export default PGRedirection