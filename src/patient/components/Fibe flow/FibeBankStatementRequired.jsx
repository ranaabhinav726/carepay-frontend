import { Header } from "./Comps/Header";
import Waiting from '../../assets/fibeWaiting.svg'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { env } from "../../environment/environment";

export default function FibeBankStatementRequired() {
    const [fibebitlyUrl, setbitlyUrl] = useState('')
    let userId = localStorage.getItem('userId')
    const navigate = useNavigate();
    const location = useLocation();
    let bitlyUrl = location?.state?.link;
    console.log(location.state);

    function handleNavigation() {
        // navigate("/patient/fibeRedirecting", { state: { "link": bitlyUrl } })

    }
    useEffect(() => {
        axios.get(env.api_Url + "getLoanApprovedDetailForUser?userId=" + userId + '&type=FIBE')
            .then(response => {
                console.log(response.data.data)
                if (response.data.message === "success") {
                    setbitlyUrl(response.data.data.fibeBitlyUrl)


                }


            })
    }, [])

    return (
        <main>
            <Header progressBar="hidden" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src={Waiting} alt="" style={{ maxWidth: "40%", marginTop: "3rem" }} />
            </div>
            <div style={{ background: "#DFEEEC", padding: "12px", marginTop: "1.5rem", borderRadius: "8px" }}>
                <p style={{ textAlign: "center", padding: "16px", fontSize: "16px", lineHeight: "22px" }}>Oho! Looks like the current information is not sufficient to approve your application. <br /><br />Sharing some more information about you and your <strong>bank statement</strong> may help increase your chances.</p>
               {fibebitlyUrl!==''?<a target="_blank" href={fibebitlyUrl}> <button className="submit" style={{ marginTop: "0", background: "#00A1A0" }} >Proceed to share</button></a>:""}
                <Link to={"tel:+918069489655"}> <button className="submit" style={{ color: "#00A1A0", background: "#fff", marginTop: "4px" }}>Contact support</button> </Link>
            </div>
        </main>
    )
}