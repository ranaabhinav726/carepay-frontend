import React, { useEffect, useState } from "react";
import Happyface from '../../assets/Group (6).svg'
import Header from "../../../Header/Header";
import axios from "axios";
import { env } from "../../../../environment/environment";
import routes from "../../../../../layout/Routes";
import CarepayLogo from '../../../../assets/Logo-carepay.svg'
import { useNavigate } from "react-router-dom";
const Payustatus = () => {
    let navigate = useNavigate()
    const [loanId, setLoanId] = useState('');
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const tryAgain = () => {

    }
    const checkStatus = () => {
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loanData) => {
                setLoanId(loanData.data.data.loanId)
                axios.get(env.api_Url + "getRazorPayStatus?loanId=" + loanData.data.data.loanId)
                    .then(response => {
                        navigate(routes.RAZORPAY_SCREEN_STATUS)
                        axios.get(`${env.api_Url}getDataForCheckoutApi?loanId=${loanData.data.data.loanId}`)
                            .then(orderdata => {
                                // if (orderdata.data.status === 200) {
                                paymentHandler2(orderdata.data.data)
                                // }
                            })


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
                "callback_url": orderData.callback_url ,
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
        <main className="personalDetails" style={{ position: "relative" }}>
            <>
                <Header progressbarDisplay="none" />

                <div style={{ textAlign: 'center' }}>
                    {/* <div style={{ width: '20%' }}> */}
                    <img src={Happyface} />
                    {/* </div> */}


                </div>
                <div style={{ textAlign: 'center', color: '#514C9F', marginTop: '40px' }}><b>Application failed!</b></div>

                <button className={'submit'} style={{ marginTop: '60px' }} onClick={() => checkStatus()}>Try Again</button>
                <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '80px', marginBottom: '10px', marginTop: '120px' }}>
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
            </>

        </main>
    )
}
export default Payustatus