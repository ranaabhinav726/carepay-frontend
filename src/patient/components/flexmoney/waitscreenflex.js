import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Loadinggif from '../../../utils/loader/Loading 3.gif';
import { createOrderApiFm, webHookCallApiFlexMoney } from './actioncreator';
import { useNavigate } from 'react-router-dom';
import routes from '../../../layout/Routes';

const BASE_URL = 'https://your-base-url.com/'; // Replace with your actual base URL

const CheckoutComponent = () => {
    let navigate=useNavigate()
    const [orderTokenData, setOrderTokenData] = useState('');
    const [loaderState, setLoaderState] = useState(true);
    const [pageStates, setPageStates] = useState({
        firstPopup: true,
        secondPopup: false,
        popupNextDisabled: true
    });
    const [pdfUrl, setPdfUrl] = useState('');

    window.onICMerchantSDKReady = () => {
        window.ICMerchantSDK.init({
            merchantKey: '91838b89-1634-4d44-866e-722995f4c5f0',
            onSDKInit: () => {
                console.log('InstaCred SDK initialized');
            }
        });
    };

    const handleCheckout = () => {
        console.log(orderTokenData);

        window.ICMerchantSDK.startPayment({
            orderToken: orderTokenData.orderToken,
            orderAmount: orderTokenData.orderAmount,
            targetElementId: 'instaCredWidget',
            onTransactionComplete: (payload) => {
                console.log(payload, 'payloadpayload');
            }
        });
    };

    const messageFromChildWindowCallback = (message) => {
        console.log(message, 'message')
        let originUrl = message.origin + '/';
        // if (originUrl === BASE_URL) {
        if (message != null) {
            if (message.data !== undefined) {
                webHookCallApiFlexMoney(message.data,callback=>{
                    console.log(callback)
                })
                const parsedMessage = JSON.parse(message.data);
                if (parsedMessage.actionName === "onTransactionComplete") {
                    // Decode the Base64 payload
                    const decodedPayload = atob(parsedMessage.payload);

                    // Parse the JSON
                    const transactionData = JSON.parse(decodedPayload);

                    console.log(transactionData, 'transactionData');

                    if (transactionData.orderStatus === "FAILED") {
                        // window.location.reload()
                        navigate(routes.FLEX_APPROVAL_SCREEN)
                    }
                    if (transactionData.orderStatus === "COMPLETE") {
                        navigate(routes.FIBE_CONGRATS_USER)
                    }
                    // You can handle the transaction data here, for example, update the state
                    // or perform any other necessary actions
                } else if (typeof message.data === 'string') {
                    const url = message.data.substr(1);
                    setPageStates((prevState) => ({
                        ...prevState,
                        firstPopup: false,
                        secondPopup: true,
                        popupNextDisabled: false
                    }));
                    setPdfUrl(url);
                }
            }
        }
        // }
    };

    useEffect(() => {
        window.addEventListener('message', messageFromChildWindowCallback);

        createOrderApiFm(localStorage.getItem('userId'), callback => {
            console.log(callback);
            setOrderTokenData(callback.data);
            setLoaderState(false);
        });

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://iccdn.in/web-merchant-sdk-uat/v-1.0/static/instaCred-merchant-sdk.js';
        document.body.appendChild(script);

        return () => {
            window.removeEventListener('message', messageFromChildWindowCallback);
            document.body.removeChild(script);
        };
    }, []);

    return (
        <main className='congrats'>
            <Header progressbarDisplay="none" />

            {loaderState ? <img src={Loadinggif} alt="Loading" /> : ""}
            {loaderState
                ? <p className='text-center'>connecting with your bank...</p>
                : <p className='text-center' style={{ marginTop: '150px' }}>You will be shown a popup to go ahead with your credit application. Press continue to start.</p>
            }
            <div id="instaCredWidget"></div>
            {orderTokenData !== '' ?
                <button
                    className=''
                    onClick={handleCheckout}
                    style={{ marginTop: '20px', padding: '15px', color: '#504c9a', background: '#ecebfd', border: 'none', borderRadius: '5px', fontSize: '14px', fontWeight: '700' }}
                >
                    Continue
                </button>
                : ""
            }
            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px', marginTop: '120px' }}>Need help? Reach out to us.</p>
            <a style={{ color: '#000', textDecoration: 'none', width: '100%' }} href={"tel:+91 806 948 9655"}>
                <button className="submit" style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}>
                    Contact Support
                </button>
            </a>
          
        </main>
    );
};

export default CheckoutComponent;
