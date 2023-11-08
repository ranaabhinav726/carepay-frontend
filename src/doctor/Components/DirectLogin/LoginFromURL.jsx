import { useNavigate, useParams } from "react-router-dom";
import carepayLogo from '../../assets/Logo-carepay.webp'
import Loader from '../../assets/loader.gif'
import { useEffect, useState } from "react";
import axios from "axios";
import { env } from "../../environment";
// import { apiErrorHandler } from '../../environment'

function LoginFromURL(){
    
    const navigate = useNavigate();
    const params = useParams();
    const [doctorId, ] = useState(params?.doctorId);

    useEffect(()=>{
        if(doctorId){ 
            axios.get(env.api_Url + "getDoctorVerificationStatus?doctorId=" + doctorId)
            .then(response =>{
                if(response.data.status === 200){
                    localStorage.setItem("D-doctorId", doctorId);
                    let status = response?.data?.data;
                    if(status === "VERIFIED"){
                        setTimeout(() => {
                            navigate('/doctor/dashboard')
                        }, 4000);
                    }else if(status === "NOT_VERIFIED"){
                        navigate('/doctor/welcome')
                    }else if(!! status){
                        let path = "/doctor/welcome";
                        switch(status){
                            case "PERSONAL":
                                path = "/doctor/PracticeDetails";
                                break;
                            case "PRACTICE":
                                path = "/doctor/AddressDetails";
                                break;
                            case "ADDRESS":
                                path = "/doctor/BankDetails";
                                break;
                            case "BANK":
                                path = "/doctor/UploadDocuments";
                                break;
                            case "DOCUMENTS":
                                path = "/doctor/ThankYou";
                                break;
                        }
                        navigate(path);
                    }else{
                        // apiErrorHandler();
                    }
                }else{
                    navigate("/doctor")
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