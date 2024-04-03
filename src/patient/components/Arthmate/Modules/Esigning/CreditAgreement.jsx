import { Header } from "../../comps/Header";
import LoanAgreement from '../../assets/Loan agreement.svg'
import Redirecting from '../../assets/Redirecting.gif'
import Doc from '../../assets/Verifying document.gif'
import { useState } from "react";


export default function ArthCreditAgreement(){

    const[screenState, setScreenState] = useState("redirecting"); // landing, verifying, redirecting

    return(
        <main>
            {screenState === "landing" &&
                <> 
                    <Header />
                    <h3 style={{margin:"1.5rem 0"}}>Credit Agreement</h3>
                    <p>Let’s quickly e-sign your agreement and seal the deal.</p>
                    <div style={{display:"flex", justifyContent:"center", margin:"2rem 0"}}>
                        <img src={LoanAgreement} alt="" />
                    </div>
                    <div style={{background:"#FAE1CD", padding:"10px", borderRadius:"4px"}}>
                        It is recommended that you take your time and read the agreement.
                    </div>
                    <button className="submit">Proceed</button>
                    <p style={{textAlign:"center", maxWidth:"60%", margin:"1rem auto"}}>For any details and enquiries, reach out to us</p>
                    <button className="submit lite" style={{marginTop:"0"}}>Contact Support</button>
                </>
            }
            {screenState === "verifying" &&
                <>
                    <Header progressBar="hidden" />
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <img src={Doc} alt="" style={{maxWidth:"60%"}} />
                    </div>
                    <p style={{fontSize:"16px", textAlign:"center", lineHeight:"150%"}}>Making sure, your credit agreement <br/>is foolproof...</p>
                </>
            }
            {screenState === "redirecting" &&
                <>
                    <Header progressBar="hidden" />
                    <div style={{marginTop:"15%", display:"flex", justifyContent:"center"}}>
                        <img src={Redirecting} alt="" style={{maxWidth:"60%"}} />
                    </div>
                    <p style={{fontSize:"16px", textAlign:"center", lineHeight:"150%"}}>Redirecting to partner platform <br/>for e-signing...</p>
                </>
            }
        </main>
    )
}