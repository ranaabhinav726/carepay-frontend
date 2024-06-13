import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Loadinggif from '../../../utils/loader/Loading 3.gif';
import { createOrderApiFm } from './actioncreator';

const CheckoutComponent = () => {
    const [orderTokenData,setOrderTokenData]=useState('')
    window.onICMerchantSDKReady = () => {
        window.ICMerchantSDK.init({
            merchantKey: '91838b89-1634-4d44-866e-722995f4c5f0',
            onSDKInit: () => {
                console.log('InstaCred SDK initialized');
            }
        });
    };

    const handleCheckout = () => {
        console.log(orderTokenData)

        window.ICMerchantSDK.startPayment({
            orderToken: orderTokenData.orderToken,
            orderAmount: orderTokenData.orderAmount,
            targetElementId: 'instaCredWidget',
            onTransactionComplete: (payload) => {
                console.log(payload, 'payloadpayload');
            }
        });
    };

    useEffect(() => {
        createOrderApiFm(localStorage.getItem('userId'),callback=>{
            console.log(callback)
            setOrderTokenData(callback.data)
            handleCheckout()
        })
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://iccdn.in/web-merchant-sdk-uat/v-1.0/static/instaCred-merchant-sdk.js';
        document.body.appendChild(script);
        // setTimeout(() => {
        //     handleCheckout()
        // }, 10000);
        return () => {
            document.body.removeChild(script);
        };
       
    }, []);
    

    return (

        <main className='congrats'>
            <Header progressbarDisplay="none" />
            <div id="instaCredWidget"></div> 
            <img src={Loadinggif}/>
            <p className='text-center'>connecting with your bank...</p>
            {/* <button onClick={handleCheckout}>Checkout with InstaCred</button>
            <div id="instaCredWidget"></div> */}
            <button className='' style={{marginTop:'20px',padding:'15px',color:'#504c9a',background:'#ecebfd',border:'none',borderRadius:'5px',fontSize:'14px',fontWeight:'700'}}>Refresh</button>
            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px', marginTop: '120px' }}>Need help? Reach out to us.-</p>

            <a style={{ color: '#000',textDecoration:'none',width:'100%' }} href={"tel:+91 806 948 9655"}>  <button className="submit" style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}>Contact Support</button></a>
        </main>
    );
};

export default CheckoutComponent;
