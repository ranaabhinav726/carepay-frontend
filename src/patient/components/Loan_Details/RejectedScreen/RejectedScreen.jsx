import Header from '../../Header/Header';
import ErrorOops from '../../../assets/oops.png'
import { Link } from "react-router-dom";


export default function RejectedScreen() {

    return (
        <main>
            <Header progressBar="hidden" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src={ErrorOops} alt="" style={{ maxWidth: "40%", marginTop: "3rem" }} />
            </div>
            <p style={{ textAlign: "center", padding: "16px", fontSize: "16px", lineHeight: "22px", margin: "1rem 0" }}>We are extremely sorry!<br />We tried really hard but our<br />lending partners are not able<br />to approve your credit application.</p>
            <div style={{ padding: "12px", background: "#FAE1CD", borderRadius: "4px" }}>
                <p><strong>Possible reasons of not approving </strong></p>
                <ol style={{ padding: "1rem 0 1rem 1.5rem" }}>
                    <li>Insufficient credit score.</li>
                    <li>Existing loan or credit card accounts.</li>
                </ol>
                <b>Please ask your immediate relative
                    to apply for credit on your behalf,
                    or try again after 90 days.</b>
            </div>
            {/* <p style={{textAlign:"center", margin:"1.5rem"}}>Please try again after 90 days.</p> */}
            <p style={{ textAlign: "center", margin: "1rem 0" }}>For more details and enquiries, reach out to us</p>
            <Link to={"tel:+918069489655"}> <button className="submit" style={{ color: "#514C9F", background: "#ECEBFF", marginTop: "0" }}>Contact support</button> </Link>
        </main>
    )
}