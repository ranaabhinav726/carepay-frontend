import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Header/Header";
import lottie from "lottie-web";
import animationData from '../../../../assets/JSON animations/loader simple.json'
import axios from "axios";
import { env } from "../../../../environment/environment";
import CarepayLogo from '../../../../assets/Logo-carepay.svg'
import routes from "../../../../../layout/Routes";
const RazorpayRefresh = () => {
    const [userData, setUserData] = useState('')
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [loanId, setLoanId] = useState('');

    let navigate = useNavigate()
    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#searchAnimation"),
            animationData: animationData,
            //   renderer: "html"
        });
    }, [])

    const submit = () => {
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loanData) => {
                axios.get(env.api_Url + 'checkDrawDownStatus?loanId=' + loanData.data.data.loanId)
                    .then((res) => {
                        if (res.data.message === 'success') {
                            if (res.data.data === 'DISBURSED') {
                                navigate(routes.FINAL_SCREEN_ARTH)

                            } else {
                                navigate(routes.MVREFRESH_TRY_AGAIN)

                            }


                        } else {

                        }
                    })
            })
    }

    return (
        <main className='congrats'>
            <Header progressbarDisplay="none" />

            {/* <img src={Loadinggif} alt="Loading" /> */}
            <div style={{ marginTop: "5%" }} id="searchAnimation"></div>

            <p className='text-center'>Fetching application status...</p>
            <p className='text-center'>This may take a few minutes.</p>



            <button
                onClick={() => submit()}
                className=''
                style={{ marginTop: '20px', padding: '15px', color: '#ecebfd', background: '#504c9a', border: 'none', borderRadius: '5px', fontSize: '14px', fontWeight: '700', width: '100%' }}
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
export default RazorpayRefresh