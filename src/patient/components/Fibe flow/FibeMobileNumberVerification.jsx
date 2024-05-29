import { useState } from "react";
import { Header } from "./Comps/Header";
import InputBox from "./Comps/InputBox";
import InputBoxLabel from "./Comps/InputBoxLabel";
import ScreenTitle from "./Comps/ScreenTitle";
import InputCheckBox from "./Comps/InputCheckBox";
import HeroImg from '../../assets/homePageHero.svg'
import { useNavigate } from "react-router-dom";

// import ScreenContentWrapper from "./Comps/ScreenContentWrapper";

import { env, hideWaitingModal, showErrorOnUI, showWaitingModal } from "../../environment/environment";
import axios from "axios";
import InputCheckBox2 from "./checkbox2";

export default function FibeMobileNumberVerification() {

    const [number, setNumber] = useState(localStorage.getItem('phoneNumber'));
    const [accepted, setAccepted] = useState(true);
    const [accepted2, setAccepted2] = useState(true);

    const navigate = useNavigate();

    async function handleNavigation() {
        if (!accepted) {
            let elem = document.getElementById("inputCheckBox");
            showErrorOnUI(elem, false);
            return;
        }
        if (!accepted2) {
            let elem = document.getElementById("inputCheckBox1");
            showErrorOnUI(elem, false);
            return;
        }
        showWaitingModal();

        await axios
            .post(env.api_Url + "userDetails/sendOtpToMobile?mobile=" + number, {},)
            .then((response) => {
                console.log(response)
                if (response.data.message === "success") {
                    localStorage.setItem("phoneNumber", number);
                    navigate('/patient/fibeOtpAuthentication');
                } else {
                    // apiErrorHandler();
                }
                hideWaitingModal()
            }).catch(error => {
                // apiErrorHandler();
                console.log(error);
                hideWaitingModal()
            });
    }

    return (
        <main className="screenContainer" style={{ position: "relative" }}>
            {/* <ScreenContentWrapper> */}
            <Header progressBar={"hidden"} />
            <ScreenTitle title={"Verify your number to apply"} styles={{ marginBottom: "14px" }} />
            <InputBoxLabel label={"Enter number linked to your PAN or bank account"} />
            <InputBox
                type="number"
                value={number}
                setValue={setNumber}
                Prefix={"+91"}
                styles={{ margin: "10px 0", border: "0" }}
                placeholder="Enter your mobile number"
            />
            <InputCheckBox
                name="consent"
                id="consent"
                label="I confirm that this number is linked to my Aadhaar, PAN and my income account. I allow CareCoin Technologies Pvt Ltd and its partners to be my authorised representative and fetch my credit information from CIBIL/ Experian/ Equifax, etc."
                value={accepted}
                setValue={setAccepted}
            />
            <InputCheckBox2
                name="consent"
                id="consent"
                label="I hereby authorise CareCoin Technologies Pvt Ltd and its lending partners to contact me via call/SMS/WhatsApp overriding my registry on the NDNC/NCPR to provide assistance and support with the credit application process."
                value={accepted2}
                setValue={setAccepted2}
            />
            <button style={{ marginTop: "32px" }} onClick={() => handleNavigation()} className="submit">Send OTP</button>

            <div style={{ display: "flex", placeContent: "center", alignSelf: "flex-end", marginTop: "64px" }}>
                <img src={HeroImg} style={{ margin: "8px", borderBottom: "1px solid black" }} alt="" />
            </div>
            {/* <p style={{fontSize:"16px", lineHeight:"20px", color:"#00000066", fontWeight:"700", textAlign:"center", margin:"4px 0 0 0"}}>Now you are just 5 steps away from<br /> your treatment!</p> */}
            {/* </ScreenContentWrapper> */}
        </main>
    )
}