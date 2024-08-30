import React, { useState, useRef, useEffect } from 'react';
import Loadinggif from '../../../../../utils/loader/loadergif';
import Header from '../../../Header/Header';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StarIcon from '@mui/icons-material/Star';
import BottomPopOverModal from '../../comps/newpoup';
import { env, hideWrapper } from '../../../../environment/environment';
import routes from '../../../../../layout/Routes';
import { useNavigate } from 'react-router';
import axios from 'axios';
import CarepayLogo from '../../../../assets/Logo-carepay.svg'
const PayUCheckoutComponent = () => {
    const [loaderState, setLoaderState] = useState(false);
    const [showPopOver, setShowPopOver] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [orderData, setOrderData] = useState('');
    const [loanId, setLoanId] = useState('');

    const ref = useRef(0);
    const userId = localStorage.getItem('userId');
    const formRef = useRef(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoaderState(false);
    //     }, 1000);
    // }, []);

    // useEffect(() => {
    //     if (userId) {
    //         axios.get(`${env.api_Url}userDetails/getLoanDetailsByUserId?userId=${userId}`)
    //             .then((response) => {
    //                 console.log(response.data.data.loanId)
    //                 setLoanId(response.data.data.loanId)
    //                 if (response.data.data.loanId) {
    //                     axios.get(`${env.api_Url}getDataForCheckoutApi?loanId=${response.data.data.loanId}`)
    //                         .then(checkout => {
    //                             if (checkout.data.message==='success') {
    //                                 const data = checkout.data.data;
    //                                 console.log(data)
    //                                 setOrderData(data)
    //                             } else {
    //                                 axios.get(`${env.api_Url}razorPayCreateOrder?loanId=${response.data.data.loanId}`)
    //                                     .then(orderdata => {
    //                                         if (orderdata.data.status === 200) {
    //                                             const data = orderdata.data.data;
    //                                             if (data) {
    //                                                 axios.get(`${env.api_Url}getDataForCheckoutApi?loanId=${response.data.data.loanId}`)
    //                                                     .then(response => {
    //                                                         if (response.data.status === 200) {
    //                                                             const data = response.data.data;
    //                                                             if (data) {
    //                                                                 setOrderData(data)
    //                                                             }
    //                                                         }
    //                                                     }).catch(() => {
    //                                                     });
    //                                             }
    //                                         }
    //                                     }).catch(() => {
    //                                     });
    //                             }
    //                         })
    //                 }
    //             });

    //     }
    // }, [userId]);

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

        setLoaderState(false)

        if (!scriptLoaded) {
            console.error("Razorpay script not loaded yet.");
            return;
        }

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
                },
                config: {
                    display: {
                      hide: [
                        {
                          method: 'upi'
                        }
                      ],
                      preferences: {
                        show_default_blocks: true,
                      },
                    },
                  },
                
                
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
            // console.log(options)
        }
    };

    const exploreMore = () => {
        setShowPopOver(true);
    };

    const setShow = () => {
        setShowPopOver(false);
        hideWrapper(ref.current);
    };

    const navigateToPersonal = () => {
        navigate(routes.ARTH_PERSONAL_DETAILS);
    };
    const createorder = () => {
        if (userId) {
            setLoaderState(true)
            axios.get(`${env.api_Url}userDetails/getLoanDetailsByUserId?userId=${userId}`)
                .then((response) => {
                    console.log(response.data.data.loanId)
                    setLoanId(response.data.data.loanId)
                    if (response.data.data.loanId) {
                        axios.get(`${env.api_Url}getDataForCheckoutApi?loanId=${response.data.data.loanId}`)
                            .then(checkout => {
                                if (checkout.data.message === 'success') {
                                    const data = checkout.data.data;
                                    console.log(data)
                                    setOrderData(data)
                                    paymentHandler2(data)
                                } else {
                                    axios.get(`${env.api_Url}razorPayCreateOrder?loanId=${response.data.data.loanId}`)
                                        .then(orderdata => {
                                            if (orderdata.data.status === 200) {
                                                const data = orderdata.data.data;
                                                if (data) {
                                                    axios.get(`${env.api_Url}getDataForCheckoutApi?loanId=${response.data.data.loanId}`)
                                                        .then(response => {
                                                            if (response.data.status === 200) {
                                                                const data = response.data.data;
                                                                if (data) {
                                                                    setOrderData(data)
                                                                    paymentHandler2(data)

                                                                }
                                                            }
                                                        }).catch(() => {
                                                        });
                                                }
                                            }
                                        }).catch(() => {
                                        });
                                }
                            })
                    }
                });

        }
    }

    const popUpMsg = (
        <p style={{ color: "black", lineHeight: 'revert', marginBottom: '-25px', fontSize: '15px' }}>
            For more offers, we will have to check with<br /> other banks and NBFCs, <br />for which we require more data and <br />might require more time.
        </p>
    );

    return (
        <main className="mobileNumberVerification" style={{ position: "relative" }}>
            <Header progressbarDisplay="none" />
            <h3><b>Select application mode</b></h3>
            {loaderState ===false?
            <>
            <p style={{ marginTop: '30px', marginBottom: '10px', fontSize: '14px' }}>Select your preferred mode of credit application:</p>
            <div
                style={{ cursor: 'pointer', background: '#ECEBFF', padding: '10px', borderRadius: '5px', marginTop: '15px' }}
                onClick={createorder}
            >
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '95%', fontWeight: 'bold', color: '#514C9F' }}>Cardless EMI</div>
                    <div style={{ float: 'right', width: '5%' }}><KeyboardDoubleArrowRightIcon style={{ color: '#514C9F' }} /></div>
                </div>
                <p style={{ fontSize: '12px' }}>HDFC, ICICI, IDFC & more available</p>
            </div>
            <div style={{ color: '#149540', fontSize: '12px', display: 'flex' }}>
                {/* <StarIcon style={{ color: '#149540', width: '14px' }} /> &nbsp;&nbsp; */}
                <p style={{ marginTop: '5px', fontWeight: 'bold', color: '#FF8B2E' }}>Interest rates applicable. </p>
            </div>
            <div
                style={{ cursor: 'pointer', background: '#ECEBFF', padding: '10px', borderRadius: '5px', marginTop: '15px' }}
                onClick={createorder}
            >
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '95%', fontWeight: 'bold', color: '#514C9F' }}>Credit card EMI</div>
                    <div style={{ float: 'right', width: '5%' }}><KeyboardDoubleArrowRightIcon style={{ color: '#514C9F' }} /></div>
                </div>
                <p style={{ fontSize: '12px' }}>HDFC, ICICI, Axis & more available</p>
            </div>
            <div style={{ color: '#149540', fontSize: '12px', display: 'flex' }}>
                <StarIcon style={{ color: '#149540', width: '14px' }} /> &nbsp;&nbsp;
                <p style={{ marginTop: '5px', fontWeight: 'bold' }}>No-cost EMI available</p>
            </div>
            <div
                style={{ cursor: 'pointer', background: '#ECEBFF', padding: '10px', borderRadius: '5px', marginTop: '15px' }}
                onClick={createorder}
            >
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '95%', fontWeight: 'bold', color: '#514C9F' }}>Debit card EMI</div>
                    <div style={{ float: 'right', width: '5%' }}><KeyboardDoubleArrowRightIcon style={{ color: '#514C9F' }} /></div>
                </div>
                <p style={{ fontSize: '12px' }}>AU Bank, Axis, Bob, CANARA & more available</p>
            </div>
            <div style={{ color: '#149540', fontSize: '12px', display: 'flex' }}>
                <StarIcon style={{ color: '#149540', width: '14px' }} /> &nbsp;&nbsp;
                <p style={{ marginTop: '5px', fontWeight: 'bold' }}>No-cost EMI available</p>
            </div>
            <button
                onClick={exploreMore}
                style={{
                    width: '100%',
                    marginTop: '20px',
                    padding: '15px',
                    color: '#504c9a',
                    background: '#ecebfd',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '14px',
                    fontWeight: '700'
                }}
            >
                Explore other options
            </button>

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
            <BottomPopOverModal
                navigateToPersonal={navigateToPersonal}
                popUpMsg={popUpMsg}
                showPopOver={showPopOver}
                setShow={setShow}
                setShowPopOver={setShowPopOver}
            />
            </>
            :""}
            {loaderState && <Loadinggif />}
        </main>
    );
};

export default PayUCheckoutComponent;
