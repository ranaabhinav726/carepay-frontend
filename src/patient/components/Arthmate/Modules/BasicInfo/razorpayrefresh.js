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
        let params = new URL(window.location.href).searchParams;
        if (params.get('response') != undefined && params.get('response') != null) {
            let res = params.get('response').replace(/"/g, "")
            console.log(res)
        }
        lottie.loadAnimation({
            container: document.querySelector("#searchAnimation"),
            animationData: animationData,
            //   renderer: "html"
        });
    }, [])
    const checkStatus = () => {
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loanData) => {
                setLoanId(loanData.data.data.loanId)
                axios.get(env.api_Url + "getRazorPayStatus?loanId=" + loanData.data.data.loanId)
                    .then(response => {
                        if (response.data.data === 'created'||response.data.data === 'failed') {
                            navigate(routes.RAZORPAY_SCREEN_STATUS)
                            // axios.get(`${env.api_Url}getDataForCheckoutApi?loanId=${loanData.data.data.loanId}`)
                            //     .then(orderdata => {
                            //         // if (orderdata.data.status === 200) {
                            //             paymentHandler2(orderdata.data.data)
                            //         // }
                            //     })
                        }
                        if(response.data.data === 'captured'){
                            navigate(routes.FINAL_SCREEN_ARTH)
                        }
                    })

            })
    }
    useEffect(() => {
        const loadRazorpayScript = () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            script.onerror = () => console.error("Failed to load the Razorpay script.");
            document.body.appendChild(script);
        };

        loadRazorpayScript();
    }, []);
    const paymentHandler2 = (orderData) => {
        console.log(orderData)
        if (!scriptLoaded) {
            console.error("Razorpay script not loaded yet.");
            return;
        }
        console.log(orderData)
        if (orderData.key) {
            const options = {
                "key": orderData.key,
                "amount": orderData.amount,
                "currency": "INR",
                "name": orderData.userName,
                "description": "",
                "image": CarepayLogo,
                "order_id": orderData.orderId,
                "callback_url": orderData.callback_url + loanId,
                "redirect": "false",
                "prefill": {
                    "name": orderData.userName,
                    "email": "",
                    "contact": orderData.userMobileNo
                },
                "notes": {
                    "address": "Gurugram"
                },
                "theme": {
                    "color": "#514C9F"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
            // console.log(options)
        }
    };
    return (
        <main className='congrats'>
            <Header progressbarDisplay="none" />

            {/* <img src={Loadinggif} alt="Loading" /> */}
            <div style={{ marginTop: "5%" }} id="searchAnimation"></div>

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
export default RazorpayRefresh