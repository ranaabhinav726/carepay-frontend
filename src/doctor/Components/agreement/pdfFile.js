import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { hideWrapper, showWrapper } from "../../environment";
import { env } from "../../environment";
import Header from "../Header/Header"
import routes from "../../../layout/Routes";
import { useNavigate } from "react-router-dom";

const PDFfile = () => {
    let navigate=useNavigate()
    const [doctorId, setDoctorId] = useState(localStorage.getItem('D-doctorId'));
    const [signingData, setSigningData] = useState('')
    let ref = useRef(0);
    useEffect(() => {
        ref.current = document.getElementById('animation-wrapper');
    }, [])
    useEffect(() => {
        if (doctorId) {
            showWrapper(ref.current);
            axios.get(env.api_Url + "initiateContract?doctorId=" + doctorId)
                .then((response) => {
                    hideWrapper(ref.current)
                    if (response.data.data != null) {
                        setSigningData(response.data.data)

                    }
                })
        }
    }, [doctorId])
    const complete=()=>{
        navigate(routes.AGREEMENT_REFRESH)
        window.open(signingData.esignUrl)
    }
    return (
        <main id="bankDetails">
            <Header progressbarDisplay="block" progress={95} canGoBack={routes.DOCTOR_AGREEMENT} />
            <p className="heading">Signzy
                Agreement signing</p>

            <iframe style={{width:'100%',height:'400px'}} src={signingData.pdfUrl} />
            <button onClick={()=>complete()} className="submit">Complete signing</button>
        </main>
    )
}
export default PDFfile
