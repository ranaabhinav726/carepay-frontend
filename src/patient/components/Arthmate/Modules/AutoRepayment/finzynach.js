/* global $ */
import React, { useEffect, useState } from "react";
import SearchingDoc from '../../../../assets/Group 113375.svg';
import NoteText from "../../../Fibe flow/Comps/NoteText";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../../../environment/environment";
import Loadinggif from "../../../../../utils/loader/loadergif";
import { Header } from "../../comps/Header";
import Logo from '../../../../assets/Logo-carepay.svg'
import routes from "../../../../../layout/Routes";
let res

const NachFinzy = () => {
    let navigate = useNavigate();
    const [loaderState, setLoader] = useState(false);
    const [nachData, setNachData] = useState(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    let userId = localStorage.getItem('userId');

    const loadPaynimoScripts = () => {
        const script1 = document.createElement('script');
        script1.src = 'https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js';
        script1.async = true;

        script1.onload = () => {
            console.log("jQuery loaded successfully.");
            loadCheckoutScript();
        };

        script1.onerror = () => {
            console.error("Failed to load jQuery from Paynimo.");
        };

        document.body.appendChild(script1);
    };

    const loadCheckoutScript = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://www.paynimo.com/Paynimocheckout/server/lib/checkout.js';
        script2.async = true;

        script2.onload = () => {
            console.log("Paynimo checkout script loaded successfully.");
            setScriptLoaded(true);
        };

        script2.onerror = () => {
            console.error("Failed to load Paynimo checkout script.");
        };

        document.body.appendChild(script2);
    };

    const paymentHandler2 = (nachData) => {
        var configJson = {
            tarCall: false,
            features: {
                showPGResponseMsg: true,
                enableNewWindowFlow: false,
                enableExpressPay: true,
                siDetailsAtMerchantEnd: true,
                enableSI: true,
                payDetailsAtMerchantEnd: true,
                enableAbortResponse: true
            },
            consumerData: {
                deviceId: nachData.consumerData.deviceId,
                returnUrl: nachData.consumerData.returnUrl,
                token: nachData.consumerData.token,
                responseHandler: responseHandler,
                paymentMode: nachData.consumerData.paymentMode,
                merchantLogoUrl: nachData.consumerData.merchantLogoUrl,
                merchantId: nachData.consumerData.merchantId,
                currency: 'INR',
                consumerId: nachData.consumerData.consumerId,
                consumerMobileNo: nachData.consumerData.consumerMobileNo,
                consumerEmailId: nachData.consumerData.consumerEmailId,
                txnId: nachData.consumerData.txnId,
                items: [{ itemId: 'TEST', amount: '1', comAmt: '0' }],
                customStyle: {
                    PRIMARY_COLOR_CODE: '#b4b0ff',
                    SECONDARY_COLOR_CODE: '#FFFFFF',
                    BUTTON_COLOR_CODE_1: '#514c9f',
                    BUTTON_COLOR_CODE_2: '#FFFFFF'
                },
                accountNo: nachData.consumerData.accountNo,
                accountHolderName: nachData.consumerData.accountHolderName,
                ifscCode: nachData.consumerData.ifscCode,
                accountType: nachData.consumerData.accountType,
                debitStartDate: nachData.consumerData.debitStartDate,
                debitEndDate: nachData.consumerData.debitEndDate,
                maxAmount: nachData.consumerData.maxAmount,
                amountType: nachData.consumerData.amountType,
                frequency: nachData.consumerData.frequency
            }
        };

        if (typeof $.pnCheckout === 'function') {
            $.pnCheckout(configJson);

            if (configJson.features.enableNewWindowFlow) {
                // window.pnCheckoutShared.open(); 
            }
        } else {
            console.error("Paynimo script not loaded properly. Please check the script URL.");
        }
        console.log(configJson, 'configJson')
    };


    // const handleResponse = (res) => {
    //     console.log(res)
    //     // if (res.status === 'success') {
    //     //     console.log('Payment successful!', res);
    //     // } else if (res.status === 'failed') {
    //     //     console.log('Payment failed', res);
    //     // }
    // };

    const responseHandler = (response) => {
        // response will contain the status of the payment
        if (response.status === 'success') {
            console.log('Payment successful!', response);
            // Handle success (e.g., redirect to a success page or update UI)
            navigate('/success');
        } else if (response.status === 'failed') {
            console.log('Payment failed', response);
            // Handle failure (e.g., show error message or log)
            navigate('/failure');
        } else if (response.status === 'aborted') {
            console.log('Payment was aborted by user', response);
            // Handle aborted state (e.g., show a message or log)
        }
    };
    const proceed = () => {
        if (nachData) {
            paymentHandler2(nachData);
        } else {
            alert("Unable to fetch payment data.");
        }
    };

    useEffect(() => {
        loadPaynimoScripts();
        setLoader(true);
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
            .then((response) => {
                setLoader(false);
                if (response.data.message === 'success') {
                    axios.get(env.api_Url + 'finzy/eNach?loanId=' + response.data.data.loanId)
                        .then((nachDataResponse) => {
                            if (response.data.message === 'success') {

                                setNachData(JSON.parse(nachDataResponse.data.data));
                            }
                        });
                }
            })
            .catch((error) => {
                setLoader(false);
                console.error("Error fetching data:", error);
            });
    }, [userId]);
    useEffect(() => {

        let params = new URL(window.location.href).searchParams
        if (params.get('response') != undefined && params.get('response') != null) {
            res = params.get('response').replace(/"/g, '')
            console.log(res)
            if (res == 'success') {
                axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
                    .then((response) => {
                        setLoader(false);
                        if (response.data.message === 'success') {
                            axios.get(env.api_Url + 'finzy/getMandateData?loanId=' + response.data.data.loanId)
                                .then((mandateData) => {
                                    if (mandateData.data.message === 'success') {
                                        console.log(mandateData.data.data[0].msg)
                                        axios.post(
                                            env.api_Url + 'finzy/eNachComplete',
                                            {
                                                loanId: response.data.data.loanId,
                                                msg: mandateData.data.data[0].msg
                                            }
                                        )
                                            .then((eNachComplete) => {
                                                if (eNachComplete.data.message === 'success'&& eNachComplete.data.data!=='failed') {
                                                    navigate(routes.FINAL_SCREEN_ARTH)
                                                }else{
                                                    navigate(routes.FINZY_TRY_AGAIN) 
                                                }
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    }
                                });
                        }
                    })
                    .catch((error) => {
                        setLoader(false);
                        console.error("Error fetching data:", error);
                    });
            }
            if (res == 'failure') {
                navigate(routes.FINZY_TRY_AGAIN)


            }
        }
    }, [])


    return (
        <main>
            {console.log(nachData, 'nachData')}
            <Header />
            {loaderState === false ? (
                <>
                    <h4 style={{ marginTop: '10px' }}><b>EMI auto payment setup</b></h4>
                    <p style={{ marginTop: '20px', marginBottom: '20px' }}>
                        E-Mandate registration will allow our lending partner to auto-debit the EMI amount from your bank account on the due date. This will ensure -
                    </p>
                    <ul style={{ marginLeft: '20px' }}>
                        <li>Timely repayment of your EMIs</li>
                        <li>Improve your credit score.</li>
                    </ul>
                    <div style={{ display: "flex", placeContent: "center", marginTop: "3rem" }}>
                        <img src={SearchingDoc} alt="" style={{ width: "50%" }} />
                    </div>
                    <button className="submit" style={{ margin: "2rem 0 12px 0" }} onClick={proceed}>Proceed to setup</button>
                    <NoteText text="For more details and enquiries, reach out to us" styles={{ textAlign: "center", color: "#000000C", fontSize: "16px", lineHeight: "20px", marginTop: "1.7rem" }} />
                    <div style={{ textAlign: "center", margin: "1rem 0 2rem 0" }}>
                        <Link to={"tel:+918069489655"} style={{ color: "#514C9F", fontWeight: "700", textDecoration: "underline", textAlign: "center" }}>Contact Support</Link>
                    </div>
                </>
            ) : ""}
            {loaderState && <Loadinggif />}
        </main>
    );
};

export default NachFinzy;
