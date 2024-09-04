import React, { useEffect, useRef, useState } from "react";
import routes from "../../../layout/Routes";
import Header from "../Header/Header"
import Logo from './Frame 113447.svg'
import axios from "axios";
import { env, hideWrapper, showWrapper } from "../../environment";
import { useNavigate } from "react-router-dom";

const AgreementDoctor = () => {
    const [test, setTest] = useState('')
    const navigate = useNavigate()
    // const [doctorId, setDoctorId] = useState(localStorage.getItem('D-doctorId'));
    // let ref = useRef(0);
    // useEffect(()=>{
    //     ref.current = document.getElementById('animation-wrapper');
    // },[])
    // useEffect(() => {
    //     if (doctorId) {
    //         showWrapper(ref.current);
    //         axios.get(env.api_Url + "initiateContract?doctorId=" + doctorId)
    //             .then((response) => {
    //                 hideWrapper(ref.current)
    //                 if (response.data.data != null) {
    //                     console.log(response.data.data)


    //                 }
    //             })
    //     }
    // }, [doctorId])
    const submit = () => {
        console.log('jytfghuijhg')
        navigate(routes.SIGNZY_AGREEMENT)
        // window.open(routes.SIGNZY_AGREEMENT)
    }
    return (
        <main id="bankDetails">
            <Header progressbarDisplay="block" progress={95} canGoBack={routes.DOCTOR_UPLOAD_DOCUMENTS} />
            <p className="heading">Agreement signing</p>

            <p>You are now just one step closer to start our partnership.</p>
            <div style={{ textAlign: 'center' }}>  <img src={Logo} /></div>
            <div style={{ background: '#ECEBFF', padding: '5px', borderRadius: '5px' }}>
                <p style={{ textAlign: 'center', marginTop: '10px' }}>You will be redirected to our partner platform for <br />agreement e-signing.</p>
                <button style={{ marginTop: '10px' }} className="submit" onClick={() => submit()}>Continue to sign agreement</button>
            </div>
            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px', marginTop: '120px' }}>
                Need help? Reach out to us.
            </p>
            <a
                style={{ color: '#000', textDecoration: 'none', width: '100%' }}
                href={"tel:+91 806 948 9655"}
            >
                <button

                    className="submit"
                    style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}
                >
                    Contact Support
                </button>
            </a>
        </main>

    )
}
export default AgreementDoctor