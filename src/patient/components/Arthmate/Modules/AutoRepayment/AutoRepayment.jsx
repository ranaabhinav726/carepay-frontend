import { useState, useEffect } from "react"
import { Header } from "../../comps/Header";
import EmandateImg from '../../assets/emandate.png'
import Paytm from '../../assets/paytm.png'
import Apl from '../../assets/apl.png'
import Bhim from '../../assets/bhim.png'
import Gpay from '../../assets/gPay.png'
import { BsInfoCircleFill } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import BottomPopOverModal from "../../comps/BottomPopOverModal";
import lottie from "lottie-web";
import animationData from '../../../../assets/GIFs/Comp 1.json'
import { createAuthRequest, createCashfreeSubscription, getNachDetails, getPaymentStatusApi, verifyUpiAPi } from "./autopaycreator";
import PaymentImg from '../../assets/payment.svg'
import Logo from '../../../../assets/Logo-carepay.svg'
import Happyface from '../../assets/happyface.svg'
export default function ArthAutoRepayment() {

    const [screenState, setScreenState] = useState("successQrCollect"); // landing, methodSelection, summary, upiId
    const [isUpiApp, setIsUpiApp] = useState(true);
    const [consent, setConsent] = useState(false);

    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const [showPopOver, setShowPopOver] = useState(true);
    const [proceedButton, setProceedButton] = useState(true);
    const [cashFreeData, setCashfreeData] = useState('');
    const [authData, setAuthData] = useState('');
    const [paymentType, setPaymentType] = useState('UPI_QR');
    const [vpa, setVpa] = useState('');
    const [nachData, setNachData] = useState('');

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#doneAnimation"),
            animationData: animationData,
            renderer: "canvas"
        });
        createCashfreeSubscription(localStorage.getItem('userId'), callback => {
            console.log(callback)
            setCashfreeData(callback)
            if (callback.data.loanId !== undefined) {
                getNach(callback.data.loanId)
            }
            if (callback.message === 'success') {
                setProceedButton(false)
            }
        })

        // return ()=>{
        //     clearTimeout(timerId)
        // }

    }, []);
    const verifyUpi = () => {
        let handelToCheck = vpa.includes('@')
        let datatosend = handelToCheck ? vpa.split('@') : ''
        console.log(datatosend)
        verifyUpiAPi(window.localStorage.getItem('userId'), datatosend[1], callback => {
            console.log(callback)
            if (callback.data === true) {
                setVerified(true)
            } else {
                setError('Please check your UPI ID')
            }
        })

    }
    const getNach = (loanId) => {
        getNachDetails(loanId, callback => {
            setNachData(callback.data)
        })
    }
    const handleNext = (type) => {
        if (type === 'first') {
            console.log(cashFreeData.data.loanId)

            createAuthRequest(localStorage.getItem('userId'), cashFreeData.data.loanId, paymentType, vpa, callback => {
                console.log(callback)
                setScreenState('methodSelection')
                setAuthData(callback.data)
            })

        }
        if (type === 'second') {
            console.log(cashFreeData.data.loanId)
            createAuthRequest(localStorage.getItem('userId'), cashFreeData.data.loanId, paymentType, vpa, callback => {
                console.log(callback)
                setAuthData(callback.data)
            })

        }
    }
    const refreshStatus = () => {
        getPaymentStatusApi(cashFreeData.data.loanId, paymentType, callback => {
            console.log(callback)
        })
    }
    const selectHandler = (type) => {
        setIsUpiApp(type)
        if (type === true) {
            setPaymentType('UPI_QR')
        }
        if (type === false) {
            setPaymentType('UPI_COLLECT')
        }
    }
    const vpaHandler = (value) => {
        setVpa(value)
        setError('')
    }

    return (
        <main style={{ position: "relative" }}>
            {screenState === "landing" &&
                <>
                    <Header />
                    <h3 style={{ margin: "1.5rem 0" }}>Auto-repayment of EMIs</h3>
                    <p style={{ lineHeight: "150%" }}>E-Mandate registration will allow us to auto-debit the EMI amount from your bank account. This will ensure timely repayment of your EMIs and improve your credit score.</p>
                    <div style={{ display: "flex" }}>
                        <img src={EmandateImg} alt="" style={{ maxWidth: "30%", margin: "2rem auto" }} />
                    </div>
                    <button disabled={proceedButton} onClick={() => handleNext('first')} className={'submit' + (!proceedButton ? "" : " disabled")}>Proceed</button>
                    {proceedButton ? <h5 className="text-center" style={{ color: 'red' }}>{cashFreeData !== '' && cashFreeData.data ? cashFreeData.data : ''}</h5> : ""}
                </>
            }
            {screenState === "methodSelection" &&
                <>
                    <Header />
                    <h3 style={{ margin: "1.5rem 0" }}>Auto-repayment of EMIs</h3>
                    <div style={{ padding: "16px 12px", borderRadius: "8px", background: "#ECEBFF", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                        <p>Supported payment apps:</p>
                        <div style={{ padding: "10px", display: "flex", gap: "16px" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                                <img src={Paytm} alt="" style={{ width: "65px" }} />
                                <span style={{ fontSize: "14px" }}>Paytm</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                                <img src={Apl} alt="" style={{ width: "65px" }} />
                                <span style={{ fontSize: "14px" }}>Amazon Pay</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                                <img src={Bhim} alt="" style={{ width: "65px" }} />
                                <span style={{ fontSize: "14px" }}>BHMI UPI</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                                <img src={Gpay} alt="" style={{ width: "65px" }} />
                                <span style={{ fontSize: "14px" }}>Google Pay</span>
                            </div>
                        </div>
                    </div>

                    <p>Do you have these payment apps in your phone?</p>
                    <div style={{ padding: "14px 12px", display: "flex", flexDirection: "column", gap: "1rem", margin: "0.6rem 0" }}>
                        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                            <input checked={isUpiApp} onChange={() => selectHandler(true)} style={{ height: "24px", aspectRatio: "1/1", accentColor: "#514C9F" }} type="radio" name="upiApps" id="yesApp" />
                            <label htmlFor="yesApp">Yes! I have one of these apps in my phone</label>
                        </div>
                        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                            <input checked={!isUpiApp} onChange={() => selectHandler(false)} style={{ height: "24px", aspectRatio: "1/1", accentColor: "#514C9F" }} type="radio" name="upiApps" id="noApp" />
                            <label htmlFor="noApp">No. I don’t have any of these apps in my phone.</label>
                        </div>
                    </div>

                    <div style={{ background: "#FAE1CD", padding: "12px", borderRadius: "8px", textAlign: "center", marginTop: "1.5rem" }}>
                        You will be asked to pay ₹1 to <br />complete the mandate registration
                    </div>

                    <button className="submit" onClick={() => setScreenState('summary')}>Next</button>
                </>
            }
            {screenState === "summary" &&
                <>
                    <Header />
                    <h3 style={{ margin: "1.5rem 0" }}>Auto-repayment of EMIs</h3>
                    <div style={{ background: "#FAE1CD", padding: "10px 12px", textAlign: "center", borderRadius: "4px", marginBottom: "1.5rem" }}>
                        Please check these details before proceeding.
                    </div>

                    <p>Setup recurring payments to</p>
                    <p style={{ fontWeight: "700", marginTop: "4px" }}>Arthmatetech Private Limited</p>

                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0" }}>
                        <p>
                            Mandate registration amount
                            <BsInfoCircleFill style={{
                                opacity: "0.4",
                                margin: "0 0 -3px 12px",
                                fontSize: "18px",
                                transform: "rotate(10deg)"
                            }} />
                        </p>
                        <p style={{ alignSelf: "end", whiteSpace: "pre" }}>-   ₹ {nachData !== '' ? nachData.maxMandateAmount : ""}</p>
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0" }}>
                        <p>
                            EMI amount (actually deductible)
                        </p>
                        <p style={{ alignSelf: "end", whiteSpace: "pre" }}>-    ₹ {nachData !== '' ? nachData.recurringAmount : ""}</p>
                    </div>

                    <p style={{ margin: "1.5rem 0" }}>Automatic EMI payments will happen on 5th of every month starting from Feb 2024 to Jun 2024</p>

                    <p style={{ opacity: "0.4", margin: "1.5rem 0" }}>Payments will be processed by CASHFREE PAYMENTS INDIA PVT LTD.</p>

                    <div style={{ display: "flex", gap: "12px", marginTop: "1.8rem", marginBottom: "1rem" }}>
                        <input
                            value={consent}
                            onChange={() => setConsent(!consent)}
                            type="checkbox"
                            name=""
                            id="bankConsent"
                            style={{
                                accentColor: "#514C9F",
                                alignSelf: "start",
                                aspectRatio: "1/1",
                                width: "36px",
                                marginTop: "3px"
                            }}
                        />
                        <label
                            htmlFor='bankConsent'
                            style={{ userSelect: "none" }}
                        >
                            I allow Arthmatetech Private Limited to debit the
                            amount mentioned above from by bank account as
                            per the payment instructions stated.
                        </label>
                    </div>
                    <button className={'submit' + (consent ? "" : " disabled")} onClick={() => setScreenState(isUpiApp ? 'QrCode' : 'upiId')}>Proceed</button>
                </>
            }
            {screenState === "upiId" &&
                <>
                    <Header />
                    <h3 style={{ margin: "1.5rem 0" }}>Auto-repayment of EMIs</h3>

                    <p>Enter your UPI ID</p>
                    <input
                        type="text"
                        name=""
                        id=""
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "none",
                            background: "#ECEBFF",
                            height: "58px",
                            marginTop: "12px"
                        }}
                        placeholder="What is your UPI ID?"
                        onChange={(e) => vpaHandler(e.target.value)}
                    />
                    {verified === false ?
                        <>
                            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
                            <p style={{ textAlign: "center", opacity: "0.6", marginTop: "1rem", fontSize: "14px", fontWeight: "500" }}>
                                UPI ID should be in this format only<br />-  username@upihandle
                            </p>
                            <button className="submit lite" onClick={() => verifyUpi()}>Verify my UPI ID</button>
                        </>
                        :
                        <>
                            <p style={{ color: "#149540", fontWeight: "700", display: "flex", alignItems: "center", gap: "2px", marginTop: "0.6rem" }}>
                                <BsCheck style={{ fontSize: "28px" }} />
                                Verified!
                            </p>

                            <div style={{ padding: "12px", textAlign: "center", background: "#FAE1CD", borderRadius: "4px", marginTop: "1.5rem" }}>
                                You will be asked to pay ₹1 to <br />complete the mandate registration
                            </div>
                            <button onClick={() => handleNext('second')} className="submit">Next</button>
                            {/* <BottomPopOverModal showPopOver={showPopOver} setShowPopOver={setShowPopOver} color="#FFF">
                                <>
                                    <div id="doneAnimation"></div>
                                    <p style={{ color: "#514C9F", fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>
                                        Payment request sent <br />to you on PhonePe
                                    </p>
                                </>
                            </BottomPopOverModal> */}
                        </>
                    }
                </>
            }
            {screenState === "QrCode" &&
                <>
                    <Header />
                    <div className="text-center" style={{ marginTop: '70px', marginBottom: '70px' }}><img src={PaymentImg} /><br /><b style={{ color: '#504c9a' }}>UPI link generated!</b></div>
                    <div style={{ padding: "16px 12px", borderRadius: "8px", background: "#ECEBFF", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
                        <p className="text-center"><b>Please use one of the following apps only,</b><br />
                            for making the ₹1 payment.</p>
                        <div style={{ padding: "10px", display: "flex", gap: "16px" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginLeft: 'auto', marginRight: 'auto' }}>
                                <img src={Paytm} alt="" style={{ width: "65px" }} />
                                <span style={{ fontSize: "12px" }}>Paytm</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginLeft: 'auto', marginRight: 'auto' }}>
                                <img src={Apl} alt="" style={{ width: "65px" }} />
                                <span style={{ fontSize: "12px" }}>Amazon Pay</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginLeft: 'auto', marginRight: 'auto' }}>
                                <img src={Bhim} alt="" style={{ width: "65px" }} />
                                <span style={{ fontSize: "12px" }}>BHMI UPI</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginLeft: 'auto', marginRight: 'auto' }}>
                                <img src={Gpay} alt="" style={{ width: "65px" }} />
                                <span style={{ fontSize: "12px" }}>Google Pay</span>
                            </div>
                        </div>
                    </div>
                    <a target="_blank" href={authData}>  <button className={'submit'} ><b>Open payment app</b></button></a>
                    <p className="text-center"><b>If you have already completed the payment,</b></p>
                    <button className={'submit'} style={{ background: '#ecebfd', color: '#504c9a' }} onClick={() => refreshStatus()}>Refresh status</button>

                </>
            }
            {screenState === "successQrCollect" &&
                <>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={Logo} alt="carepay logo" style={{ height: "30px", aspectRatio: "107/26", margin: "18px auto" }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '20%' }}>
                            <img src={Happyface} width={'80px'} />
                        </div>
                        <div style={{ width: '80%' }}>
                            <div style={{ color: '#514C9F', fontSize: '18px', fontWeight: '700', padding: '25px' }}>We will wait here!</div>
                        </div>
                    </div>
                    <p style={{ marginTop: '20px' }}>Follow these instructions to complete the<br /> mandate registration.</p>
                    <div className='stepsnew' style={{ marginTop: '1rem' }}>
                        <ul>
                            <li><div className='encircle' style={{ padding: '9px 9px' }}>1</div><span className='v-line'></span><div className="stepName">Open the payment app.</div></li>
                            <li><div className='encircle'>2</div><span className='v-line'></span><div div className="stepName" style={{ marginTop: 0 }}>Look for the latest ₹1 payment <br />
                                request notification.</div></li>
                            <li><div className='encircle'>3</div><span className='v-line'></span><div className="stepName">Complete the payment.</div></li>
                            <li><div className='encircle'>4</div><span className='v-line' style={{ borderRight: 'none' }}></span><div className="stepName"><span className="step">Come back here.</span></div></li>
                        </ul>

                    </div>
                    <div style={{ background: '#FAE1CD', borderRadius: '10px', padding: '14px', textAlign: 'center', fontSize: '14px' }}>
                        <p>If you have already completed the payment</p>
                        <button className={'refresh-btn-user'} style={{}} onClick={() => refreshStatus()}>Refresh status</button>

                    </div>
                    <div>
                        <p style={{marginTop:'10px',fontSize:'12px'}} className="text-center">If your app is not receiving any<br/>
                            payment request, try changing UPI ID.</p>
                    </div>
                    <button className={'refresh-btn-user'} style={{ background: '#ecebfd', color: '#504c9a' }} onClick={() => refreshStatus()}>Change UPI ID</button>

                </>
            }

        </main>
    )
}