import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import animationData from '../../../patient/assets/JSON animations/loader simple.json'
import Header from "../Header/Header";
import axios from "axios";
import { env, hideWrapper, showWrapper } from "../../environment";
import routes from "../../../layout/Routes";

const PayRefresh = () => {
    let ref = useRef(0);
    useEffect(() => {
        ref.current = document.getElementById('animation-wrapper');
    }, [])
    const [doctorId, setDoctorId] = useState(localStorage.getItem('D-doctorId'));
    const [userData, setUserData] = useState('')
    let navigate = useNavigate()
    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#searchAnimation"),
            animationData: animationData,
            //   renderer: "html"
        });
    }, [])
    const checkStatus = () => {
        if (doctorId) {
            showWrapper(ref.current);
            axios.get(env.api_Url + "getDoctorAggrementSignStatus?doctorId=" + doctorId)
                .then((response) => {
                    hideWrapper(ref.current)
                    if (response.data.data != null) {
                        console.log(response.data.data.contractStatus)
                        if (response.data.data.contractStatus === 'FAIL') {
                            navigate(routes.AGREEMENT_TRY_AGAIN)
                        }
                        if (response.data.data.contractStatus === 'SUCCESS' && response.data.data.signStatus === true) {
                            navigate(routes.DOCTOR_AGREEMENT_DONE)

                        }
                        if (response.data.data.contractStatus === 'COMPLETED' ) {
                            navigate(routes.DOCTOR_AGREEMENT_DONE)

                        }


                    }
                })
        }
    }
    return (
        <main className='congrats'>
            <Header progressbarDisplay="none" />

            {/* <img src={Loadinggif} alt="Loading" /> */}
            <div style={{ marginTop: "5%" }} id="searchAnimation"></div>

            <p className='text-center'>fetching agreement status...</p>



            {/* <button
                className=''
                onClick={checkStatus}
                style={{ marginTop: '20px', padding: '15px', color: '#504c9a', background: '#ecebfd', border: 'none', borderRadius: '5px', fontSize: '14px', fontWeight: '700' }}
            >
                Refresh
            </button> */}
            <button className="submit" onClick={checkStatus}>Check Status</button>


            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px', marginTop: '120px' }}>Need help? Reach out to us.</p>
            <a style={{ color: '#000', textDecoration: 'none', width: '100%' }} href={"tel:+91 806 948 9655"}>
                <button className="submit" style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}>
                    Contact Support
                </button>
            </a>

        </main>
    )
}
export default PayRefresh