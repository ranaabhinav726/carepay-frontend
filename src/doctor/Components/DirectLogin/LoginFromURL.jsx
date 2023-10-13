import { useNavigate, useParams } from "react-router-dom";
import carepayLogo from '../../assets/Logo-carepay.webp'
import Loader from '../../assets/loader.gif'
import { useEffect, useState } from "react";
import axios from "axios";
import { env } from "../../environment";

function LoginFromURL(){
    
    const navigate = useNavigate();
    const params = useParams();
    const [doctorId, ] = useState(params?.doctorId);

    useEffect(()=>{
        if(doctorId){
            axios.get(env.api_Url + "getDoctorVerificationStatus?doctorId=" + doctorId)
            .then(response =>{
                if(response.data.status === 200){
                    if(response.data.data === "VERIFIED"){
                        localStorage.setItem("D-doctorId", doctorId);
                        setTimeout(() => {
                            navigate('/doctor/dashboard')
                        }, 4000);
                    }
                }
            }).catch((e)=>{
                console.warn(e);
            })
        }
    }, [doctorId])

    
    return(
        <main style={{position:"relative"}}>
            {/* <Header /> */}
            <img src={carepayLogo} style={{position:"absolute", left:"50%", transform:"translate(-50%)", width:"25%", marginTop:"1rem"}} alt="" />
            <div style={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -60%)", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <img src={Loader} style={{width:"50%", marginBottom:"1rem"}} alt="loader" />
                <p>logging in...</p>
            </div>
        </main>
    )
}

export default LoginFromURL