import React from "react";
import { Header } from "../../Fibe flow/Comps/Header";
import ImageBank from '../assets/statemnetimg.svg'
import { useNavigate } from "react-router-dom";
import routes from "../../../../layout/Routes";
const BankstatementShare = () => {
    let navigate = useNavigate()
    const onSubmit = () => {
        navigate(routes.DIGITAP_AGREEGATOR)
    }
    return (
        <>
            <main className="bankDetails personalDetails" style={{ position: "relative" }}>

                <Header progress={80} />
                <div style={{ padding: '5px' }}>
                    <h4><b>Share bank statement</b></h4>
                    <p style={{ marginTop: '20px' }}>To verify your income, we need to access your<br /> bank statement for the latest 3 months. This data<br /> sharing is completely secured and encrypted. </p>
                    <div style={{ marginTop: '24px', textAlign: 'center' }}> <img src={ImageBank} /></div>
                    <button onClick={() => onSubmit()} className="submit">Continue</button>
                </div>

            </main>
        </>
    )
}
export default BankstatementShare