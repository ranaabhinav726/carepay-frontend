import { Header } from "../../../comps/Header";
import LoanAgreement from '../../../assets/Loan agreement.svg';
import Redirecting from '../../../assets/Redirecting.gif';
import Doc from '../../../assets/Verifying document.gif';
import { useEffect, useState } from "react";
import axios from "axios";
import { env } from "../../../../../environment/environment";
import { useNavigate } from "react-router-dom";
import routes from "../../../../../../layout/Routes";

export default function ArthCreditAgreement() {
    const [esignurl, setEsignUrl] = useState('');
    const [screenState, setScreenState] = useState("landing");
    let userId = localStorage.getItem('userId');
    let navigate = useNavigate();

    const proceedhandler = () => {
        setScreenState("verifying");
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loandata) => {
                if (loandata.data.message === 'success') {
                    axios.get(env.api_Url + 'finzy/eSign?loanId=' + loandata.data.data.loanId)
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.message === 'success') {
                                console.log(res.data.data)
                                setEsignUrl(res.data.data);
                                setTimeout(() => {
                                    setScreenState("redirecting");
                                    setTimeout(() => gotoEsign(res.data.data), 5000);
                                }, 5000);
                            }
                        })

                } else {
                    setScreenState("landing");
                }
            })
            .catch((error) => {
                console.error(error);
                setScreenState("landing");
            });
    };

    const gotoEsign = (url) => {

        window.open('https://ext.digio.in/#/gateway/login/DID241121132336954I5TE1W67UCL2SE/1732175614789/7721823857?token_id=GWT2411211323379291YUQQVVQ1XWPHS&redirect_url=http://localhost:3000/patient/fmandate', "_blank");
        console.log(url)
        navigate(routes.FINZY_WAIT)
    };


    useEffect(() => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const digioDocId = params.get('digio_doc_id');
        const message = params.get('message');
        if (message === 'Document Signed Successfully!' && digioDocId !== null) {
            axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                .then((loandata) => {
                    if (loandata.data.message === 'success') {
                        axios.get(env.api_Url + 'finzy/eSignComplete?loanId=' + loandata.data.data.loanId + '&documentId=' + digioDocId + '&status=success')
                            .then((res) => {
                                console.log(res.data);
                                if (res.data.message === 'success') {
                                    if(res.data.data==='SUCCESS'){
                                        screenState('verifying')
                                        setTimeout(() => {
                                            setScreenState("redirecting");
                                            setTimeout(() => navigate(routes.FINZY_NACH_MANDATE), 5000);
                                        }, 5000);
                                    }

                                }
                            })

                    } else {
                        setScreenState("landing");
                    }
                })
            console.log("digio_doc_id:", digioDocId);
            console.log(message)
        } else {
            proceedhandler()
        }
    }, []);

    return (
        <main>
            {screenState === "landing" &&
                <>
                    <Header />
                    <h3 style={{ margin: "1.5rem 0" }}>Credit Agreement</h3>
                    <p>Let’s quickly e-sign your agreement and seal the deal.</p>
                    <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
                        <img src={LoanAgreement} alt="Loan Agreement" />
                    </div>
                    <div style={{ background: "#FAE1CD", padding: "10px", borderRadius: "4px" }}>
                        It is recommended that you take your time and read the agreement.
                    </div>

                    {esignurl === '' ? <button className="submit" onClick={proceedhandler}>Proceed</button> : ""}
                    {esignurl !== '' ? <button className="submit" onClick={gotoEsign}>Go To Esign Link</button> : ""}

                    <p style={{ textAlign: "center", maxWidth: "60%", margin: "1rem auto" }}>For any details and enquiries, reach out to us</p>
                    <button className="submit lite" style={{ marginTop: "0" }}>Contact Support</button>
                </>
            }
            {screenState === "verifying" &&
                <>
                    <Header progressBar="hidden" />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src={Doc} alt="Verifying Document" style={{ maxWidth: "60%" }} />
                    </div>
                    <p style={{ fontSize: "16px", textAlign: "center", lineHeight: "150%" }}>Making sure, your credit agreement <br />is foolproof...</p>
                </>
            }
            {screenState === "redirecting" &&
                <>
                    <Header progressBar="hidden" />
                    <div style={{ marginTop: "15%", display: "flex", justifyContent: "center" }}>
                        <img src={Redirecting} alt="Redirecting" style={{ maxWidth: "60%" }} />
                    </div>
                    <p style={{ fontSize: "16px", textAlign: "center", lineHeight: "150%" }}>Redirecting to partner platform <br />for e-signing...</p>
                </>
            }
           
        </main>
    );
}
