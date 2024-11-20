import { useState, useEffect } from "react"
import { Header } from "../../comps/Header";
import lottie from "lottie-web";
import animationData from '../../assets/loader simple.json'
import completeAnimation from '../../../../assets/GIFs/Comp 1.json'
import Doc from '../../assets/Verifying document.gif';
import SorryEmoji from '../../assets/sorryEmoji.png'
import axios from "axios";
import { env } from "../../../../environment/environment";
import { useNavigate } from "react-router-dom";

export default function ArthAgreementStatus() {
let navigate=useNavigate()
const [screenState,setScreenState]=useState('landing')



    const proceedhandler = () => {
        setScreenState("verifying");
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loandata) => {
                if (loandata.data.message === 'success') {
                    axios.get(env.api_Url + 'finzy/eSign?loanId=' + loandata.data.data.loanId)
                        .then((res) => {
                            if (res.data.message === 'success') {
                                setTimeout(() => {
                                    setTimeout(() => gotoEsign(res.data.data), 5000);
                                }, 5000);
                            }
                        })

                } else {
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const gotoEsign = (url) => {
        window.open(url);
    };
  

    return (
        <main>
            {screenState === "landing" ?

            <>
                <Header progressBar="hidden" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
                    <img src={SorryEmoji} alt="" style={{ maxWidth: "30%" }} />
                    <p style={{ color: "#514C9F", fontSize: "20px", fontWeight: "700", margin: "2rem 0" }}>Sorry!</p>
                    <span style={{ textAlign: "center", fontSize: "16px" }}>Seems like there was a failure in e-signing your credit agreement.</span>
                </div>
                <p style={{ marginTop: "3rem", textAlign: "center" }}>Please try again to proceed</p>
                <button className="submit" onClick={() => proceedhandler()}>Try again</button>
            </>:""}
            {screenState === "verifying" &&
                <>
                    <Header progressBar="hidden" />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src={Doc} alt="Verifying Document" style={{ maxWidth: "60%" }} />
                    </div>
                    <p style={{ fontSize: "16px", textAlign: "center", lineHeight: "150%" }}>Making sure, your credit agreement <br />is foolproof...</p>
                </>
            }
            {/* {screenState === "redirecting" &&
                <>
                    <Header progressBar="hidden" />
                    <div style={{ marginTop: "15%", display: "flex", justifyContent: "center" }}>
                        <img src={Redirecting} alt="Redirecting" style={{ maxWidth: "60%" }} />
                    </div>
                    <p style={{ fontSize: "16px", textAlign: "center", lineHeight: "150%" }}>Redirecting to partner platform <br />for e-signing...</p>
                </>
            } */}
        </main>
    )
}