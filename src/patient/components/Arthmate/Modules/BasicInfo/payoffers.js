import React, { useState, useRef, useEffect } from 'react';
import Loadinggif from '../../../../../utils/loader/loadergif';
import Header from '../../../Header/Header';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StarIcon from '@mui/icons-material/Star';
import BottomPopOverModal from '../../comps/newpoup';
import { env, hideWrapper, showWrapper } from '../../../../environment/environment';
import routes from '../../../../../layout/Routes';
import { useNavigate } from 'react-router';
import axios from 'axios';

const PayUCheckoutComponent = () => {
    const [loaderState, setLoaderState] = useState(true);
    const [showPopOver, setShowPopOver] = useState(false);
    const [payuData, setPayData] = useState({});

    let ref = useRef(0);
    let userId = localStorage.getItem('userId');
    const formRef = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        const deviceType = getDeviceType();

        axios
            .get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
            .then((loandata) => {
                const loanId = loandata?.data?.data?.loanId;
                if (loanId) {
                    axios
                        .post(env.api_Url + "getCheckoutDetails?loanId=" + loanId)
                        .then(response => {
                            console.log(JSON.parse(response.data.data), 'Checkout Details Response');
                            axios
                                .get(env.api_Url + "checkCustomerEligibility?loanId=" + loanId)
                                .then(eligibilityResponse => {
                                    console.log(eligibilityResponse.data, 'Customer Eligibility Response');
                                    if (eligibilityResponse.data.message === 'success') {
                                        showWrapper(ref.current)
                                        axios.get(env.api_Url + "getCollectPaymentData?loanId=" + loanId + '&deviceType=' + deviceType)
                                            .then(response => {
                                                if (response.data.status === 200) {
                                                    let data = response.data.data;
                                                    if (data) {
                                                        setPayData(JSON.parse(data));
                                                        hideWrapper(ref.current)
                                                    }
                                                }
                                            }).catch(err => {
                                                console.error('Error fetching collect payment data:', err);
                                            });
                                    }
                                })
                                .catch(err => {
                                    console.error('Error fetching customer eligibility:', err);
                                });
                        })
                        .catch(err => {
                            console.error('Error fetching checkout details:', err);
                        });
                } else {
                    console.error('Loan ID not found');
                }
            })
            .catch(err => {
                console.error('Error fetching loan details:', err);
            });

        setTimeout(() => {
            setLoaderState(false);
        }, 1000);
    }, [userId]);

    const getDeviceType = () => {
        const userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.includes("iphone")) return "iPhone";
        if (userAgent.includes("ipad")) return "iPad";
        if (userAgent.includes("android")) return "Android";
        if (userAgent.includes("windows phone")) return "Windows Phone";
        if (userAgent.includes("windows")) return "Windows";
        if (userAgent.includes("mac")) return "Mac";
        if (userAgent.includes("linux")) return "Linux";

        return "Unknown Device";
    };

    useEffect(() => {
        const deviceType = getDeviceType();
        if (userId) {
            showWrapper(ref.current)
            axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                .then(response => {
                    axios.get(env.api_Url + "getCollectPaymentData?loanId=" + response.data.data.loanId + '&deviceType=' + deviceType)
                        .then(response => {
                            if (response.data.status === 200) {
                                let data = response.data.data;
                                if (data) {
                                    setPayData(JSON.parse(data));
                                    hideWrapper(ref.current)

                                }
                            }
                        }).catch(err => {
                            console.error('Error fetching collect payment data:', err);
                        });
                }).catch(err => {
                    console.error('Error fetching loan details:', err);
                });
        }
    }, [userId]);

    const paycheckout = () => {
        if (formRef.current) {
            formRef.current.submit();
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

    let popUpMsg = <p style={{ color: "black", lineHeight: 'revert', marginBottom: '-25px', fontSize: '15px' }}>For more offers, we will have to check with<br /> other banks and NBFCs, <br />for which we require more data and <br />might require more time.</p>;

    return (
        <main className="mobileNumberVerification" style={{ position: "relative" }}>
            <Header progressbarDisplay="none" />
            <h3><b>Select application mode</b></h3>

            <p style={{ marginTop: '30px', marginBottom: '10px', fontSize: '14px' }}>Select your preferred mode of credit application:</p>
            <div
                style={{ cursor: 'pointer', background: '#ECEBFF', padding: '10px', borderRadius: '5px', marginTop: '15px' }}
                onClick={paycheckout}
            >
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '95%', fontWeight: 'bold', color: '#514C9F' }}>Cardless EMI</div>
                    <div style={{ float: 'right', width: '5%' }}><KeyboardDoubleArrowRightIcon style={{ color: '#514C9F' }} /></div>
                </div>
                <p style={{ fontSize: '12px' }}>HDFC, ICICI, IDFC & more available</p>
            </div>
            <div style={{ color: '#149540', fontSize: '12px', display: 'flex' }}>
                <StarIcon style={{ color: '#149540', width: '14px' }} /> &nbsp;&nbsp;
                <p style={{ marginTop: '5px', fontWeight: 'bold' }}>No-cost EMI available</p>
            </div>
            <div
                style={{ cursor: 'pointer', background: '#ECEBFF', padding: '10px', borderRadius: '5px', marginTop: '15px' }}
                onClick={paycheckout}
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
                onClick={paycheckout}
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

            {loaderState ? <img src={Loadinggif} alt="Loading" /> : ""}
            {console.log(payuData)}
            {!loaderState && (
                <form
                    action="https://test.payu.in/_payment"
                    method="POST"
                    target="_blank"
                    ref={formRef}
                >
                    <input type="hidden" name="key" value={payuData.key || ''} />
                    <input type="hidden" name="surl" value={payuData.surl || 'https://test-payment-middleware.payu.in/simulatorResponse'} />
                    <input type="hidden" name="furl" value={payuData.furl || 'https://test-payment-middleware.payu.in/simulatorResponse'} />
                    <input type="hidden" name="pg" value={payuData.pg || 'EMI'} />
                    <input type="hidden" name="txnid" value={payuData.txnid || '1234566'} />
                    <input type="hidden" name="amount" value={payuData.amount || '1234'} />
                    <input type="hidden" name="productinfo" value={payuData.productinfo || 'iPhone'} />
                    <input type="hidden" name="firstname" value={payuData.firstname || 'prachi'} />
                    <input type="hidden" name="email" value={payuData.email || 'prachibindal2925@gmail.com'} />
                    <input type="hidden" name="bankcode" value={payuData.bankcode || 'EMIAMEX12'} />
                    <input type="hidden" name="ccnum" value={payuData.ccnum || '1234'} />
                    <input type="hidden" name="ccvv" value={payuData.ccvv || '123'} />
                    <input type="hidden" name="ccname" value={payuData.ccname || '12'} />
                    <input type="hidden" name="ccexpmon" value={payuData.ccexpmon || '05'} />
                    <input type="hidden" name="ccexpyr" value={payuData.ccexpyr || '2023'} />
                    <input type="hidden" name="hash" value={payuData.hash || '3cb56876a882b88f2d7d6b3264977b00b829378f53e655873946faada995617f1922d2735799f5217504450e77025c76bcebb5fca6a4297718fb6be18ae130bc'} />
                </form>
            )}

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
                setShowPopOver={setShow}
                checkAndNavigate={exploreMore}
                yesBtnText={"Yes, continue."}
                noBtnText={"No, I want to change my name."}
            // noBtnClick={salaryError}
            />
        </main>
    );
};

export default PayUCheckoutComponent;
