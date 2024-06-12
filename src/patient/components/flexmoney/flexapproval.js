// import '../../../patient/components/Income_Verification_Notification/Congratulation/congratulation.scss'
// // import CongratsImg from '../../../assets/congrats.png'
// import Confetti from '../../assets/GIFs/confetti.gif'
// import { useNavigate } from 'react-router-dom';
// import { BiRupee } from 'react-icons/bi';
// import { useEffect, useRef, useState } from 'react';

// import Header from '../Header/Header';
// import Loadinggif from '../../../utils/loader/loadergif';

// // let refID = localStorage.getItem("new_reference_id") || "FGDTH12345RR";


// const Congrats = () => {
//     const navigate = useNavigate()
//     const [amount,setAmount]=useState(30)
//     const [loaderState,setloaderState]=useState(30)



//     let ref = useRef(0);
//     useEffect(() => {
     
//     }, [])
//     const submit = () => {
     
        
//     }



//     return (
//         <>
//             <main className='congrats'>
//                 <Header progressbarDisplay="none" />
//                 {/* {loaderState ? <Loadinggif /> : ""} */}
//                 <>
//                     <div style={{ display: "flex", position: "relative", flexDirection: "row", alignItems: "baseline", justifyContent: "space-around", marginTop: "1rem" }}>
//                         <img src={Confetti} style={{ transform: "scaleX(-1)", maxWidth: "25%" }} alt="" />
//                         <p style={{ position: "absolute", fontSize: "24px", lineHeight: "26px", color: "#149540", fontWeight: "700", marginTop: "1rem" }}>Congratulations</p>
//                         <img src={Confetti} style={{ maxWidth: "25%" }} alt="" />
//                     </div>
//                     <p className='subtitle'>Your credit application is <span style={{ color: "#149540", fontWeight: "700" }}>approved</span> for</p>
//                     <div style={{ width: "90%", color: "#149540", height: "max-content", padding: "10px 16px", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700", borderRadius: "4px", background: "#EBFEED" }}>
//                         <BiRupee /> {amount}
//                     </div>
//                     <p style={{ textAlign: 'center', marginTop: '10px' }}>from your bank</p>

//                     <button className='submit' style={{marginTop:'100px'}} onClick={() => submit()}>Proceed with your bank</button>
//                     <button className='submit' style={{background:'#ECEBFF',color:'#504c9a',marginTop:'-2px'}} onClick={() => submit()}>Explore other offers</button>

//                 </>

//             </main>
//         </>
//     )
// }

// export default Congrats

///////////////////////////////////////////////////
import React, { useEffect } from 'react';

const CheckoutComponent = () => {
    window.onICMerchantSDKReady = () => {
        window.ICMerchantSDK.init({
            merchantKey: '91838b89-1634-4d44-866e-722995f4c5f0',
            onSDKInit: () => {
                console.log('InstaCred SDK initialized');
            }
        });
    };

    const handleCheckout =  () => {
     
        window.ICMerchantSDK.startPayment({
            orderToken: 'zJyicQmTffUXPlcwfa0wYpUYKKxarEdHuGiBvC8fYx75U7VIog+mcseSAfV5+6xwjGfv0IzuvfbChZPniK2Le+fDU/qu1lUZKmvusuK4oHjg6kzXJLqU8r/tI2JuAUMI7bn4EiGwXpS9jHzvL4f1FQzru0zz/ahPWSJX7WuizM4=',
            orderAmount: 1000,
            targetElementId: 'instaCredWidget',
            onTransactionComplete: (payload) => {
                console.log(payload,'payloadpayload');
            }
        });
    };
    
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://iccdn.in/web-merchant-sdk/v-1.0/static/instaCred-merchant-sdk.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <button onClick={handleCheckout}>Checkout with InstaCred</button>
            <div id="instaCredWidget"></div>
        </div>
    );
};

export default CheckoutComponent;
