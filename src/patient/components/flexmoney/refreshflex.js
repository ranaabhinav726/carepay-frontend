import React, { useEffect, useState } from "react";
import { getLogoApi } from "./actioncreator";
import Header from "../Header/Header";
import Loadinggif from "../../../utils/loader/Loading 3.gif";
import routes from "../../../layout/Routes";
import { useNavigate } from "react-router-dom";

const FlexRefresh = () => {
    const [userData, setUserData] = useState('')
    let navigate = useNavigate()
    useEffect(() => {

    }, [])
    const checkStatus = () => {
        getLogoApi(localStorage.getItem('userId'), callback => {
            console.log(callback.data.orderStatus)
            if (callback.message === 'success' && callback.data.data !== null) {
                setUserData(callback.data)
                if (callback.data.orderStatus === "FAILED") {
                    navigate(routes.FLEX_APPROVAL_SCREEN)
                }
                if (callback.data.orderStatus === "COMPLETE") {
                    navigate(routes.FIBE_CONGRATS_USER)
                }

            }
        })
    }
    return (
        <main className='congrats'>
            <Header progressbarDisplay="none" />

            <img src={Loadinggif} alt="Loading" />
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
export default FlexRefresh