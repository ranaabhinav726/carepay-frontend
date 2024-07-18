import React, { useState, useEffect } from "react"
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
import { createAuthRequest, getBankListByUserId, createCashfreeSubscription, getTxnApi, getPaymentStatusApi, verifyUpiAPi, getemiApi, getSubscriptionStatusApi } from "./autopaycreator";
import PaymentImg from '../../assets/payment.svg'
import Logo from '../../../../assets/Logo-carepay.svg'
import Happyface from '../../assets/happyface.svg'
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";
import FailureImage from '../../assets/failureemoji.svg'
import Greenthumb from '../../assets/greenthumb.svg'
import AutocompleteInput from "../../../utility/SuggestionInputBox/suggestionboxbank";
import '../../../../../patient/components/Arthmate/Modules/BasicInfo/styles/personalDetails.scss'
import { BiInfoCircle, BiRupee } from "react-icons/bi";
import BankLogo from '../../assets/banklogo.svg'
import completeAnimation from '../../../../assets/GIFs/Comp 1.json'
import { APIS } from "../../../../../utils/apifactory";
import axios from "axios";
import { env } from "../../../../environment/environment";
import CompletedGif from "../../../../../utils/loader/completegif";
import moment from "moment/moment";

export default function ArthAutoRepayment() {

    const [screenState, setScreenState] = useState("landing"); // landing, methodSelection, summary, upiId
    const [isUpiApp, setIsUpiApp] = useState(true);
    const [consent, setConsent] = useState(false);

    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const [showPopOver, setShowPopOver] = useState(false);
    const [proceedButton, setProceedButton] = useState(true);
    const [cashFreeData, setCashfreeData] = useState('');
    const [authData, setAuthData] = useState('');
    const [paymentType, setPaymentType] = useState('UPI_QR');
    const [vpa, setVpa] = useState('');
    const [nachData, setNachData] = useState('');
    const [bankName, setbankName] = useState('');
    const [bankList, setbankList] = useState([]);
    const [bankScreen, setBankScreen] = useState('one');
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [accountHolderName, setaccountHolderName] = useState('');
    const [AccountType, setAccountType] = useState('savings');
    const [bankingType, setnetBanking] = useState('debit');
    const [bankId, setBankId] = useState('');
    const [sentPopup, setsentPopup] = useState(true);
    const [emiAmount, setEmiAmount] = useState(15001);
    const [, updateState] = React.useState();

    const forceUpdate = React.useCallback(() => updateState({}), []);

    let navigate = useNavigate()
    useEffect(() => {

        lottie.loadAnimation({
            container: document.querySelector("#completeAnimation"),
            animationData: completeAnimation,
            renderer: "canvas"
        });
        if (localStorage.getItem('userId') !== null && localStorage.getItem('userId') !== '') {

            // createCashfreeSubscription(localStorage.getItem('userId'), callback => {
            //     console.log(callback)
            //     setCashfreeData(callback)
            //     if (callback.data.loanId !== undefined) {
            //         getNach(callback.data.loanId)
            //         checkMandate(callback.data.loanId)
            //         checkMandateisdone(callback.data.loanId)
            //         getloanCalc(callback.data.loanId)
            //     }
            //     if (callback.message === 'success') {
            //         setProceedButton(false)
            //     }
            // })
            getBankListByUserId(localStorage.getItem('userId'), callBack => {
                if (callBack.data) {
                    // let Data = JSON.parse(callBack.data.allBankDetails);
                    // let datatopush = [];
                    // Data.forEach((gv, k) => {
                    //     if (gv.bankDisplayName) {
                    //         datatopush.push(gv.bankDisplayName);
                    //     }
                    // });
                    // console.log(datatopush);
                    setbankList(JSON.parse(callBack.data.allBankDetails))
                }
            });

        } else {
            navigate(routes.DOCTOR_NOT_AVAILABLE)
        }

        // return ()=>{
        //     clearTimeout(timerId)
        // }

    }, []);
    const getloanCalc = (loanId) => {
        getemiApi(loanId, callback => {
            console.log(callback)
        })
    }
    const checkMandateisdone = (loanId) => {
        getPaymentStatusApi(loanId, 'UPI_QR', callback => {
            console.log(callback)
            if (callback.message === 'success') {
                axios.patch(env.api_Url + "loanNachApi?userId=" + localStorage.getItem('userId'))
                    .then((response) => {
                        console.log(response);
                        if (response.data.message === 'success') {
                            axios.put(env.api_Url + "loanStatusApi?userId=" + localStorage.getItem('userId') + '&status=' + 'credit_approved',)
                                .then((response) => {
                                    console.log(response)
                                    if (response.data.message === 'success') {
                                        setScreenState('successScreen')
                                        redirect()
                                    }
                                })
                        }
                    })
            } else {
                getPaymentStatusApi(loanId, 'UPI_COLLECT', callback => {
                    console.log(callback)
                    if (callback.message === 'success') {
                        axios.patch(env.api_Url + "loanNachApi?userId=" + localStorage.getItem('userId'))
                            .then((response) => {
                                console.log(response);
                                if (response.data.message === 'success') {
                                    axios.put(env.api_Url + "loanStatusApi?userId=" + localStorage.getItem('userId') + '&status=' + 'credit_approved',)
                                        .then((response) => {
                                            console.log(response)
                                            if (response.data.message === 'success') {
                                                setScreenState('successScreen')
                                                redirect()
                                            }
                                        })
                                }
                            })

                    } else {
                        getPaymentStatusApi(loanId, 'E_MANDATE', callback => {
                            console.log(callback)
                            if (callback.message === 'success') {
                                axios.patch(env.api_Url + "loanNachApi?userId=" + localStorage.getItem('userId'))
                                    .then((response) => {
                                        console.log(response);
                                        if (response.data.message === 'success') {
                                            axios.put(env.api_Url + "loanStatusApi?userId=" + localStorage.getItem('userId') + '&status=' + 'credit_approved',)
                                                .then((response) => {
                                                    console.log(response)
                                                    if (response.data.message === 'success') {
                                                        setScreenState('successScreen')
                                                        redirect()
                                                    }
                                                })
                                        }
                                    })

                            }
                        })
                    }
                })
            }
        })
    }
    const redirect = () => {
        setTimeout(() => {
            navigate(routes.FINAL_SCREEN_ARTH)
        }, 3000)
    }
    const checkMandate = () => {
        lottie.loadAnimation({
            container: document.querySelector("#doneAnimation"),
            animationData: animationData,
            renderer: "canvas"
        });
    }
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
        getTxnApi(localStorage.getItem('userId'), callback => {
            setNachData(callback.data)
        })
    }
    const handleNext = (type) => {
        console.log(type, cashFreeData)
        if (type === 'first') {
            console.log(cashFreeData.data.loanId)
            // if (emiAmount > 15000) {
            setPaymentType('E_MANDATE')

            createAuthRequest(localStorage.getItem('userId'), cashFreeData.data.loanId, 'E_MANDATE', vpa, callback => {
                console.log(callback, 'EMANDATEEMANDATEEMANDATE')
                setScreenState('EMANDATE')
                setAuthData(callback.data)
            })
            // } else if (emiAmount <= 15000) {
            //     createAuthRequest(localStorage.getItem('userId'), cashFreeData.data.loanId, paymentType, vpa, callback => {
            //         console.log(callback)
            //         setScreenState('methodSelection')
            //         setAuthData(callback.data)
            //     })
            // }


        }
        if (type === 'second') {
            console.log(cashFreeData.data.loanId)
            setShowPopOver(true)
            lottie.loadAnimation({
                container: document.querySelector("#doneAnimation"),
                animationData: animationData,
                renderer: "canvas"
            });
            createAuthRequest(localStorage.getItem('userId'), cashFreeData.data.loanId, paymentType, vpa, callback => {
                console.log(callback)

                setScreenState('successQrCollect')

                setAuthData(callback.data)
            })

        }
    }
    const refreshStatus = () => {
        lottie.loadAnimation({
            container: document.querySelector("#completeAnimation"),
            animationData: completeAnimation,
            renderer: "canvas"
        });
        getPaymentStatusApi(cashFreeData.data.loanId, paymentType, callback => {
            console.log(callback)
            if (callback.message === 'success') {
                axios.patch(env.api_Url + "loanNachApi?userId=" + localStorage.getItem('userId'))
                    .then((response) => {
                        console.log(response);
                        if (response.data.message === 'success') {
                            axios.put(env.api_Url + "loanStatusApi?userId=" + localStorage.getItem('userId') + '&status=' + 'credit_approved',)
                                .then((response) => {
                                    console.log(response)
                                    if (response.data.message === 'success') {
                                        setScreenState('successScreen')
                                        redirect()
                                    }
                                }).catch(error => {
                                    console.log(error);
                                });

                        } else {
                            alert(response.data.message)
                        }
                    })
            } else {
                { console.log(paymentType, 'jhgfdfgh') }
                if (paymentType === 'UPI_QR') {
                    setScreenState('falureScreen')
                }
                if (paymentType === 'UPI_COLLECT') {
                    setScreenState('manddatefailewithqrcollect')

                } if (paymentType === 'E_MANDATE') {
                    setScreenState('physicalmandate')
                }
            }
        })
    }
    const refreshStatusBank = () => {

        getPaymentStatusApi(cashFreeData.data.loanId, 'E_MANDATE', callback => {
            console.log(callback)
            if (callback.message === 'success') {
                axios.patch(env.api_Url + "loanNachApi?userId=" + localStorage.getItem('userId'))
                    .then((response) => {
                        console.log(response);
                        if (response.data.message === 'success') {
                            axios.put(env.api_Url + "loanStatusApi?userId=" + localStorage.getItem('userId') + '&status=' + 'credit_approved',)
                                .then((response) => {
                                    console.log(response)
                                    if (response.data.message === 'success') {

                                        setScreenState('successScreen')
                                        redirect()
                                    }
                                }).catch(error => {
                                    console.log(error);
                                });
                            lottie.loadAnimation({
                                container: document.querySelector("#completeAnimation"),
                                animationData: completeAnimation,
                                renderer: "canvas"
                            });

                        } else {
                            alert(response.data.message)
                        }
                    })
            } else {
                { console.log(paymentType, 'jhgfdfgh') }
                if (paymentType === 'UPI_QR') {
                    setScreenState('falureScreen')
                }
                if (paymentType === 'UPI_COLLECT') {
                    setScreenState('manddatefailewithqrcollect')
                } if (paymentType === 'E_MANDATE') {
                    setScreenState('physicalmandate')
                }
            }
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
    const gotoUpiScreen = () => {
        setPaymentType('UPI_COLLECT')
        setScreenState('upiId')

    }
    const gotoBankScreen = () => {

        setScreenState('EMANDATE')
        setBankScreen('one')
    }
    const handleBankName = (e) => {
        console.log(e)
        setbankName(e)

    }
    const bankIdHandleSubmit = () => {
        let authmode = bankingType === 'debit' ? 'DEBIT_CARD' : bankingType === 'netBanking' ? 'NET_BANKING' : ''
        if (authmode !== '') {
            setPaymentType('E_MANDATE')
            setScreenState('summary')
            // axios.post(APIS.CREATE_AUTH_REQUEST + localStorage.getItem('userId') + '&loanId=' + cashFreeData.data.loanId + '&type=' + 'E_MANDATE' + '&authMode=' + authmode + '&bankId=' + bankId)
            //     .then(response => {
            //         if (response.data.message === 'success') {
            //             window.open(response.data.data, '_blank');
            //             setScreenState('netbankingrefresh')
            //         }
            //     })

        }
    }
    const cashfreeRedirect = () => {
        let authmode = bankingType === 'debit' ? 'DEBIT_CARD' : bankingType === 'netBanking' ? 'NET_BANKING' : ''

        axios.post(APIS.CREATE_AUTH_REQUEST + localStorage.getItem('userId') + '&loanId=' + cashFreeData.data.loanId + '&type=' + 'E_MANDATE' + '&authMode=' + authmode + '&bankId=' + bankId)
            .then(response => {
                if (response.data.message === 'success') {
                    // window.open(response.data.data, '_blank');
                    // sendRequest(response.data.data.data, response.data.data.link)
                    handleButtonClick(response.data.data.data, response.data.data.link)
                    setScreenState('netbankingrefresh')
                } else {
                    setScreenState('physicalmandate')
                }
            })
    }
    const sendRequest = async (apidata, link) => {
        let data2 = JSON.parse(apidata)
        const requestData = {
            MandateReqDoc: data2.MandateReqDoc,
            AuthMode: data2.AuthMode,
            BankID: data2.BankID,
            CheckSumVal: data2.CheckSumVal,
            MerchantID: data2.MerchantID,
            SPID: data2.SPID

        };

        try {
            const response = await axios.post(link, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error making request', error);
        }
    };

    // const redirectUrl = "https://enach.npci.org.in/onmags/sendRequest";

    const handleButtonClick = (apidata, link) => {
        let data2 = JSON.parse(apidata)
        const requestData = {
            MandateReqDoc: data2.MandateReqDoc,
            AuthMode: data2.AuthMode,
            BankID: data2.BankID,
            CheckSumVal: data2.CheckSumVal,
            MerchantID: data2.MerchantID,
            SPID: data2.SPID

        };
        try {
            const data = JSON.parse(apidata);
            redirectToUrl(link, data);
        } catch (error) {
            console.error('Invalid JSON format:', error);
        }
    };

    const redirectToUrl = (url, data) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;

        Object.keys(data).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    const changeUpiId = () => {
        setScreenState('upiId')
        setsentPopup(false)
        setVerified(false)

    }
    const getnewFlowCheck = () => {
        const userId = localStorage.getItem('userId');
    
        getSubscriptionStatusApi(userId, callBack => {
            console.log(callBack.data);
    
            if (callBack.data === 'Subscription plan details not found !!!') {
                createCashfreeSubscription(userId, handleSubscriptionCallback);
            } else if (callBack.data.umrm !== undefined && callBack.data.umrm !== '') {
                setScreenState('netbankingrefresh');
            } else if (!callBack.data.umrm || callBack.data.umrm === '') {
                if ((callBack.data.authLink === '' || callBack.data.authLink === undefined) && (callBack.data.status === 'FAILED' || callBack.data.status === 'CANCELLED')) {
                    createCashfreeSubscription(userId, handleSubscriptionCallback);
                } else {
                    handleSuccessFlow(callBack);
                }
            }
        });
    };
    
    const handleSubscriptionCallback = callback => {
        console.log(callback);
        setCashfreeData(callback);
        forceUpdate();
    
        if (callback.data.loanId !== undefined) {
            const loanId = callback.data.loanId;
            getNach(loanId);
            checkMandate(loanId);
            checkMandateisdone(loanId);
            getloanCalc(loanId);
        }
    
        if (callback.message === 'success') {
            setPaymentType('E_MANDATE');
            createAuthRequest(localStorage.getItem('userId'), callback.data.loanId, 'E_MANDATE', vpa, authCallback => {
                console.log(authCallback, 'EMANDATEEMANDATEEMANDATE');
                setScreenState('EMANDATE');
                setAuthData(authCallback.data);
            });
        }
    };
    
    const handleSuccessFlow = callBack => {
        setShowPopOver(true);
        lottie.loadAnimation({
            container: document.querySelector("#doneAnimation"),
            animationData: animationData,
            renderer: "canvas"
        });
    
        createAuthRequest(localStorage.getItem('userId'), cashFreeData.data.loanId, paymentType, vpa, authCallback => {
            console.log(authCallback);
            setScreenState('successQrCollect');
            setAuthData(authCallback.data);
        });
    };
    
    return (
        <main className="personalDetails" style={{ position: "relative" }}>

            {screenState === "landing" ?
                <>
                    <Header />
                    <h3 style={{ margin: "1.5rem 0" }}>Auto-repayment of EMIs</h3>
                    <p style={{ lineHeight: "150%" }}>E-Mandate registration will allow us to auto-debit the EMI amount from your bank account. This will ensure timely repayment of your EMIs and improve your credit score.</p>
                    <div style={{ display: "flex" }}>
                        <img src={EmandateImg} alt="" style={{ maxWidth: "30%", margin: "2rem auto" }} />
                    </div>
                    <button onClick={() => getnewFlowCheck('first')} className={'submit'}>Proceed</button>
                    {/* {proceedButton ? <h5 className="text-center" style={{ color: 'red' }}>{cashFreeData !== '' && cashFreeData.data ? cashFreeData.data : ''}</h5> : ""} */}
                </>
                : ""}
            {screenState === "methodSelection" ?
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
                : ""}
            {screenState === "summary" ?
                <>
                    <Header />
                    <h3 style={{ margin: "1.5rem 0" }}>Auto-repayment of EMIs</h3>
                    <div style={{ background: "#FAE1CD", padding: "10px 12px", textAlign: "center", borderRadius: "4px", marginBottom: "1.5rem" }}>
                        Please check these details before proceeding.
                    </div>

                    <p>Setup recurring payments to</p>
                    <p style={{ fontWeight: "700", marginTop: "4px" }}>RNVP Technology Private Limited.</p>

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
                        <p style={{ alignSelf: "end", whiteSpace: "pre" }}>  ₹ {nachData !== '' ? nachData.mandate_amount : ""}</p>
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0" }}>
                        <p>
                            EMI amount (actually deductible)
                        </p>
                        <p style={{ alignSelf: "end", whiteSpace: "pre" }}>    ₹ {nachData !== '' ? nachData.emi_amount : ""}</p>
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0" }}>
                        <p>
                            First Intallment Date
                        </p>
                        <p style={{ alignSelf: "end", whiteSpace: "pre" }}>   {nachData !== '' ? moment(nachData.first_installment_date).format('DD-MM-YYYY') : ""}</p>
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0" }}>
                        <p>
                            Total EMIs
                        </p>
                        <p style={{ alignSelf: "end", whiteSpace: "pre" }}>    {nachData !== '' ? (nachData.tenure) : ""}</p>
                    </div>

                    {/* {/* <p style={{ margin: "1.5rem 0" }}>Automatic EMI payments will happen on 5th of every month starting from Feb 2024 to Jun 2024</p> */}

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
                            I allow RNVP Technology Private Limited to debit the amount mentioned above from by bank account as per the payment instructions stated.
                        </label>
                    </div>
                    {/* cashfreeRedirect */}
                    <button className={'submit' + (consent ? "" : " disabled")} onClick={() => cashfreeRedirect()}>Proceed</button>

                    {/* <button className={'submit' + (consent ? "" : " disabled")} onClick={() => setScreenState(isUpiApp ? 'QrCode' : 'upiId')}>Proceed</button> */}
                </>
                : ""}
            {screenState === "upiId" ?
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
                                You will be asked to pay ₹1 to <br />complete the mandate registration.
                            </div>
                            {sentPopup ?
                                <BottomPopOverModal showPopOver={showPopOver} setShowPopOver={setShowPopOver} color="#FFF">
                                    <>
                                        <div id="doneAnimation"></div>
                                        <p style={{ color: "#514C9F", fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>
                                            Payment request sent <br />to you on PhonePe
                                        </p>
                                    </>
                                </BottomPopOverModal>
                                : ""}

                            <button onClick={() => handleNext('second')} className="submit">Next</button>

                        </>
                    }
                </>
                : ""}
            {screenState === "QrCode" ?
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
                : ""}
            {console.log(screenState)}
            {screenState === "successQrCollect" ?
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
                        <p>If you have already completed the payment,</p>
                        <button className={'submit'} style={{}} onClick={() => refreshStatus()}>Refresh status</button>

                    </div>
                    <div>
                        <p style={{ marginTop: '10px', fontSize: '14px' }} className="text-center">If your app is not receiving any<br />
                            payment request, try changing UPI ID.</p>
                    </div>
                    <button className={'submit'} style={{ background: '#ecebfd', color: '#504c9a' }} onClick={() => changeUpiId()}>Change UPI ID</button>

                </>
                : ""}
            {screenState === "falureScreen" ?
                <>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={Logo} alt="carepay logo" style={{ height: "30px", aspectRatio: "107/26", margin: "18px auto" }} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <img src={FailureImage} width={'80px'} />
                    </div>
                    <div style={{ padding: '15px', textAlign: 'center', color: '#514C9F', fontWeight: '700' }}>Hmm!</div>
                    <p style={{ marginTop: '50px' }} className="text-center">Seems like there was a failure in<br />
                        setting up the mandate.</p>
                    {console.log(paymentType)}
                    <div style={{ background: '#EBFEED', padding: '22px 10px 21px 10px', textAlign: 'center', marginTop: '20px', borderRadius: '10px' }}>
                        <p>Please try registration with UPI ID</p>
                        <button className={'submit'} style={{}} onClick={() => gotoUpiScreen()}>Proceed</button>

                    </div>


                </>
                : ""}

            {screenState === 'manddatefailewithqrcollect' ?
                <>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={Logo} alt="carepay logo" style={{ height: "30px", aspectRatio: "107/26", margin: "18px auto" }} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <img src={FailureImage} width={'80px'} />
                    </div>
                    <div style={{ background: '#EBFEED', padding: '22px 10px 21px 10px', marginTop: '20px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '10%' }}>
                                <img src={Greenthumb} />
                            </div>
                            <div style={{ width: '90%' }}>
                                <p>But don’t worry! We have another method to register the mandate.</p>
                            </div>
                        </div>
                        <button className={'submit'} style={{}} onClick={() => gotoBankScreen()}>Proceed with bank account</button>

                    </div>
                </>

                : ""}
            {screenState === "successScreen" ?
                <>
                    <CompletedGif text={'Auto-repayment setup complete!'} />

                </>
                : ""}


            {screenState === 'EMANDATE' ?
                <>
                    <Header />
                    <p style={{ fontSize: '18px', marginTop: '20px' }}><b>Auto-repayment setup</b></p>
                    {console.log(bankList)}
                    {bankScreen === 'one' && bankList.length > 0 ?
                        <>
                            <div style={{ marginTop: '20px' }}>
                                <label>Select bank</label>
                                {/* <AutocompleteInput
                                    id="selectBank"
                                    value={bankName}
                                    setValue={(e) => handleBankName(e)}
                                    placeholder="Search for your bank"
                                    list={bankList}
                                    fieldError="Please Select Bank"
                                /> */}
                                <select style={{ background: '#ECEBFF', marginTop: '20px', padding: '10px', border: 'none', borderRadius: '5px', width: '100%' }} onChange={(e) => setBankId(e.target.value)}>
                                    <option value={''}>Select Bank</option>
                                    {bankList !== '' && bankList.length > 0 ? bankList.map((data, i) => {
                                        return (
                                            <option value={data.bankId}>{data.bankName}</option>
                                        )

                                    }) : ""}
                                </select>
                            </div>
                            <div className="gender" id="netBanking" style={{ marginTop: '20px' }}>
                                <p>Choose an option to proceed :</p>
                                <div className="radioOption">
                                    <input type="radio" name="debit" checked={bankingType?.toLowerCase() === "debit"} onChange={(e) => setnetBanking(e.target.value)} value={'debit'} />
                                    <label htmlFor="debit">Debit Card</label><br />
                                </div>
                                <div className="radioOption">
                                    <input type="radio" name="netBanking" checked={bankingType === 'netBanking' ? true : false} onChange={(e) => setnetBanking(e.target.value)} value={'netBanking'} />
                                    <label htmlFor="netBanking">Net Banking</label><br />
                                </div>
                            </div>

                            {bankId !== '' ?
                                <div>
                                    <button className={'submit'} onClick={() => bankIdHandleSubmit()}>Proceed</button>
                                </div>
                                : ""}
                        </>
                        : ""}
                    {bankScreen === 'two' ?
                        <div style={{ marginTop: '20px' }}>
                            {/* <div className="inputGroup" style={{ marginTop: "1.5rem" }}>
                                <p>Account number</p>
                                <input
                                    id="accountNumber"
                                    type="number"
                                    value={accountNumber}
                                    placeholder="What is your account number?"
                                    // onChange={(e)=>setFullName(e.target.value)}  
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    style={{ marginBottom: "10px", marginTop: '10px' }}
                                />
                                <span className="fieldError">Please enter Account Number</span>
                            </div>
                            <div className="inputGroup" style={{ marginTop: "1.5rem" }}>
                                <p>Confirm account number</p>
                                <input
                                    id="confirmAccountNumber"
                                    type="number"
                                    value={confirmAccountNumber}
                                    placeholder="Please re-enter your account number"
                                    // onChange={(e)=>setFullName(e.target.value)}  
                                    onChange={(e) => setConfirmAccountNumber(e.target.value)}
                                    style={{ marginBottom: "10px", marginTop: '10px' }}
                                />
                                <span className="fieldError">Please enter Account Number</span>
                            </div>
                            <div className="inputGroup" style={{ marginTop: "1.5rem" }}>
                                <p>Account holder’s name</p>
                                <input
                                    id="accountHolderName"
                                    type="text"
                                    value={accountHolderName}
                                    placeholder="Who is the owner of this account?"
                                    // onChange={(e)=>setFullName(e.target.value)}  
                                    onChange={(e) => setaccountHolderName(e.target.value)}
                                    style={{ marginBottom: "10px", marginTop: '10px' }}
                                />
                                <span className="fieldError">Please enter Account Holder Name</span>
                            </div>
                            <div className="gender" id="accountType">
                                <p>My account type is :</p>
                                <div className="radioOption">
                                    <input type="radio" name="accountType" checked={AccountType?.toLowerCase() === "savings"} onChange={(e) => setAccountType(e.target.value)} value={'savings'} />
                                    <label htmlFor="savings">Savings</label><br />
                                </div>
                                <div className="radioOption">
                                    <input type="radio" name="accountType" checked={AccountType?.toLowerCase() === "current"} onChange={(e) => setAccountType(e.target.value)} value={'current'} />
                                    <label htmlFor="current">Current</label><br />
                                </div>

                            </div> */}
                            <div className="gender" id="netBanking" style={{ marginTop: '40px' }}>
                                <p>Choose an option to proceed :</p>
                                <div className="radioOption">
                                    <input type="radio" name="debit" checked={bankingType?.toLowerCase() === "debit"} onChange={(e) => setnetBanking(e.target.value)} value={'debit'} />
                                    <label htmlFor="debit">Debit Card</label><br />
                                </div>
                                <div className="radioOption">
                                    <input type="radio" name="netBanking" checked={bankingType === 'netBanking' ? true : false} onChange={(e) => setnetBanking(e.target.value)} value={'netBanking'} />
                                    <label htmlFor="netBanking">Net Banking</label><br />
                                </div>
                                {console.log(bankingType)}
                                <div>
                                    <button className={'submit'} onClick={() => setBankScreen('three')}>Proceed</button>
                                </div>
                            </div>
                        </div>
                        : ""}
                    {bankScreen === 'three' ?
                        <>
                            <div style={{ marginTop: '10px', background: "#FAE1CD", padding: "10px 12px", textAlign: "center", borderRadius: "4px", marginBottom: "1.5rem" }}>
                                Please check these details before proceeding.
                            </div>

                            <p>Setup recurring payments to</p>
                            <p style={{ fontWeight: "700", marginTop: "4px" }}>RNVP Technology Private Limited</p>
                            <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                                <div style={{ width: '50%' }}>
                                    <div style={{ fontSize: '20px' }}>₹ 20,000</div>
                                    <p>Mandate registration&nbsp; <BsInfoCircleFill style={{ color: 'grey' }} /> <br />
                                        amount.</p>
                                </div>
                                <div style={{ width: '50%' }}>
                                    <div style={{ fontSize: '20px' }}>₹ 20,000</div>
                                    <p>Actual EMI to be <br />
                                        deducted monthly.</p>
                                </div>

                            </div>
                            <div style={{ padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
                                Automatic EMI payments will happen on <b>5th</b>of <br />every month starting from<b> Feb 2024</b><br /> to
                                <b> Jun 2024.</b>
                            </div>
                            <p style={{ marginTop: '5px' }}>Mandate will be registered via this account:</p>
                            <div style={{ background: '#ECEBFF', padding: '10px', marginTop: '5px', borderRadius: '5px' }}>
                                <div style={{ display: 'flex' }}>
                                    <img src={BankLogo} /> &nbsp;{bankName}
                                </div>
                                <div style={{ display: 'flex', marginLeft: '5px' }}>
                                    Account number:  <span style={{ marginLeft: '12px' }}>Savings</span>
                                </div>
                                <div style={{ display: 'flex', marginLeft: '5px' }}>
                                    Account holder:  <span style={{ marginLeft: '21px' }}>Savings</span>
                                </div>
                                <div style={{ display: 'flex', marginLeft: '5px' }}>
                                    Account type : <span style={{ marginLeft: '30px' }}>Savings</span>
                                </div>
                            </div>
                            <p style={{ fontSize: '12px', color: 'grey', marginTop: '10px' }}>Your auto-repayments will be processed by CASHFREE PAYMENTS INDIA PVT LTD.</p>
                            <div style={{ background: '#FAE1CD', borderRadius: '5px', marginTop: '10px' }}>
                                <br />
                                <p className="text-center" >Keep your debit card with you for registration.</p>
                                <div>
                                    <button style={{ marginBottom: '-10px' }} className={'submit'}>Proceed </button>
                                </div>
                            </div>


                        </>
                        : ""}
                </>

                : ""}
            {screenState === 'netbankingrefresh' ?
                <>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={Logo} alt="carepay logo" style={{ height: "30px", aspectRatio: "107/26", margin: "18px auto" }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '20%' }}>
                            <img src={Happyface} width={'80px'} />
                        </div>
                        <div style={{ width: '80%' }}>
                            <div style={{ color: '#514C9F', fontSize: '18px', padding: '25px' }}>Fetching mandate status...</div>
                        </div>
                    </div>

                    <button className={'submit'} style={{}} onClick={() => refreshStatusBank()}>Refresh status</button>

                </>
                : ""}
            {screenState === 'physicalmandate' ?
                <>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={Logo} alt="carepay logo" style={{ height: "30px", aspectRatio: "107/26", margin: "18px auto" }} />
                    </div>
                    <div className="text-center" style={{ marginTop: '50px' }}>Go with Physical Mandate</div>

                    <p className="text-center" style={{ marginTop: '20px', color: 'grey' }}>Our support executive will contact you on
                        your registered contact number
                        <a style={{ color: '#000' }} >+91 {localStorage.getItem('phoneNumber')}</a> to take this forward</p>
                    <a style={{ color: '#000' }} href={"tel:+91 806 948 9655"}>  <button className="submit">Contact Support</button></a>

                </>
                : ""}
        </main>
    )
}