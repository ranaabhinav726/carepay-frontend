import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Header/Header";
import lottie from "lottie-web";
import animationData from '../../../../assets/JSON animations/loader simple.json'

const PayRefresh = () => {
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
    
    }
    return (
        <main className='congrats'>
            <Header progressbarDisplay="none" />

            {/* <img src={Loadinggif} alt="Loading" /> */}
            <div style={{marginTop:"5%"}} id="searchAnimation"></div>

            <p className='text-center'>Fetching application status...</p>
            <p className='text-center'>This may take up to 5-10 minutes.</p>



            <button
                className=''
                onClick={checkStatus}
                style={{ marginTop: '20px', padding: '15px', color: '#504c9a', background: '#ecebfd', border: 'none', borderRadius: '5px', fontSize: '14px', fontWeight: '700' }}
            >
                Refresh
            </button>

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