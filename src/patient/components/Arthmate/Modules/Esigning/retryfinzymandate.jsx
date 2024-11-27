import { useState, useEffect } from "react"
import { Header } from "../../comps/Header";
import lottie from "lottie-web";
import animationData from '../../assets/loader simple.json'
import completeAnimation from '../../../../assets/GIFs/Comp 1.json'

import SorryEmoji from '../../assets/sorryEmoji.png'
import axios from "axios";
import { env } from "../../../../environment/environment";
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";

export default function ArthAgreementStatus() {
    let navigate = useNavigate()

    const [screenState, setScreenState] = useState("fetching");

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#searchAnimation"),
            animationData: animationData,
            renderer: "canvas"
        });
        lottie.loadAnimation({
            container: document.querySelector("#completeAnimation"),
            animationData: completeAnimation,
            renderer: "canvas"
        });
    }, []);
    const tryAgain = () => {
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loandata) => {
                navigate('/patient/fach/' + loandata.data.data.loanId)

            })
    }
    return (
        <main>


            <>
                <Header progressBar="hidden" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
                    <img src={SorryEmoji} alt="" style={{ maxWidth: "30%" }} />
                    <p style={{ color: "#514C9F", fontSize: "20px", fontWeight: "700", margin: "2rem 0" }}>Sorry!</p>
                    <span style={{ textAlign: "center", fontSize: "16px" }}>Seems like there was a failure in setting up
the auto debit of your EMIs.</span>
                </div>
                <p style={{ marginTop: "3rem", textAlign: "center" }}>Please try again to proceed</p>
                <button className="submit" onClick={() => tryAgain()}>Try again</button>
            </>

        </main>
    )
}