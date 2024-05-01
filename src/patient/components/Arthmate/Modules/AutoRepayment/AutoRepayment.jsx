import { useState, useEffect } from "react"
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

export default function ArthAutoRepayment(){

    const[screenState, setScreenState] = useState("summary"); // landing, methodSelection, summary, upiId
    const[isUpiApp, setIsUpiApp] = useState(false);
    const[consent, setConsent] = useState(false);

    const[verified, setVerified] = useState(true);
    const[error, setError] = useState("Please check your UPI ID");

    const[showPopOver, setShowPopOver] = useState(true);

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#doneAnimation"),
          animationData: animationData,
          renderer: "canvas"
        });

        // return ()=>{
        //     clearTimeout(timerId)
        // }
        
    }, []);

    return(
        <main style={{position:"relative"}}>
        {screenState === "landing" && 
            <>
                <Header />
                <h3 style={{margin:"1.5rem 0"}}>Auto-repayment of EMIs</h3>
                <p style={{lineHeight:"150%"}}>E-Mandate registration will allow us to auto-debit the EMI amount from your bank account. This will ensure timely repayment of your EMIs and improve your credit score.</p>
                <div style={{display:"flex"}}>
                    <img src={EmandateImg} alt="" style={{maxWidth:"30%", margin:"2rem auto"}} />
                </div>
                <button className="submit">Proceed</button>
            </>
        }
        {screenState === "methodSelection" &&
            <>
                <Header />
                <h3 style={{margin:"1.5rem 0"}}>Auto-repayment of EMIs</h3>
                <div style={{padding:"16px 12px", borderRadius:"8px", background:"#ECEBFF", display:"flex", flexDirection:"column", gap:"1rem", marginBottom:"2rem"}}>
                    <p>Supported payment apps:</p>
                    <div style={{padding:"10px", display:"flex", gap:"16px"}}>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
                            <img src={Paytm} alt="" style={{width:"65px"}} />
                            <span style={{fontSize:"14px"}}>Paytm</span>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
                            <img src={Apl} alt="" style={{width:"65px"}} />
                            <span style={{fontSize:"14px"}}>Amazon Pay</span>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
                            <img src={Bhim} alt="" style={{width:"65px"}} />
                            <span style={{fontSize:"14px"}}>BHMI UPI</span>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
                            <img src={Gpay} alt="" style={{width:"65px"}} />
                            <span style={{fontSize:"14px"}}>Google Pay</span>
                        </div>
                    </div>
                </div>

                <p>Do you have these payment apps in your phone?</p>
                <div style={{padding:"14px 12px", display:"flex", flexDirection:"column", gap:"1rem", margin:"0.6rem 0"}}>
                    <div style={{display:"flex", gap:"14px", alignItems:"center"}}>
                        <input autoComplete="off" checked={isUpiApp} onChange={()=>setIsUpiApp(true)} style={{height:"24px", aspectRatio:"1/1", accentColor:"#514C9F"}} type="radio" name="upiApps" id="yesApp" />
                        <label htmlFor="yesApp">Yes! I have one of these apps in my phone</label>
                    </div>
                    <div style={{display:"flex", gap:"14px", alignItems:"center"}}>
                        <input autoComplete="off" checked={!isUpiApp} onChange={()=>setIsUpiApp(false)} style={{height:"24px", aspectRatio:"1/1", accentColor:"#514C9F"}} type="radio" name="upiApps" id="noApp" />
                        <label htmlFor="noApp">No. I don’t have any of these apps in my phone.</label>
                    </div>
                </div>

                <div style={{background:"#FAE1CD", padding:"12px", borderRadius:"8px", textAlign:"center", marginTop:"1.5rem"}}>
                    You will be asked to pay ₹1 to <br/>complete the mandate registration
                </div>

                <button className="submit">Next</button>
            </>
        }
        {screenState === "summary" &&
            <>
                <Header />
                <h3 style={{margin:"1.5rem 0"}}>Auto-repayment of EMIs</h3>
                <div style={{background:"#FAE1CD", padding:"10px 12px", textAlign:"center", borderRadius:"4px", marginBottom:"1.5rem"}}>
                    Please check these details before proceeding.
                </div>

                <p>Setup recurring payments to</p>
                <p style={{fontWeight:"700", marginTop:"4px"}}>Arthmatetech Private Limited</p>

                <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", margin:"12px 0"}}>
                    <p>
                        Mandate registration amount 
                        <BsInfoCircleFill style={{
                            opacity:"0.4",
                            margin:"0 0 -3px 12px",
                            fontSize:"18px",
                            transform:"rotate(10deg)"
                        }} />
                    </p>
                    <p style={{alignSelf:"end", whiteSpace:"pre"}}>-   ₹ 20,000</p>
                </div> 
                <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", margin:"12px 0"}}>
                    <p>
                        EMI amount (actually deductible)
                    </p>
                    <p style={{alignSelf:"end", whiteSpace:"pre"}}>-    ₹ 12,000</p>
                </div>

                <p style={{margin:"1.5rem 0"}}>Automatic EMI payments will happen on 5th of every month starting from Feb 2024 to Jun 2024</p>

                <p style={{opacity:"0.4", margin:"1.5rem 0"}}>Payments will be processed by CASHFREE PAYMENTS INDIA PVT LTD.</p>

                <div style={{display:"flex", gap:"12px", marginTop:"1.8rem", marginBottom:"1rem"}}>
                    <input autoComplete="off" 
                        value={consent} 
                        onChange={()=>setConsent(!consent)} 
                        type="checkbox" 
                        name="" 
                        id="bankConsent" 
                        style={{
                            accentColor:"#514C9F", 
                            alignSelf:"start", 
                            aspectRatio:"1/1", 
                            width:"36px", 
                            marginTop:"3px"
                        }} 
                    />
                    <label 
                        htmlFor='bankConsent'
                        style={{userSelect:"none"}}
                    >
                        I allow Arthmatetech Private Limited to debit the 
                        amount mentioned above from by bank account as 
                        per the payment instructions stated.
                    </label>
                </div>
                <button className={'submit' + (consent?"":" disabled")}>Proceed</button>
            </>
        }
        {screenState === "upiId" &&
            <>
                <Header />
                <h3 style={{margin:"1.5rem 0"}}>Auto-repayment of EMIs</h3>

                <p>Enter your UPI ID</p>
                <input autoComplete="off" 
                    type="text" 
                    name="" 
                    id=""
                    style={{
                        width:"100%",
                        padding:"10px",
                        borderRadius:"4px",
                        border:"none",
                        background:"#ECEBFF",
                        height:"58px",
                        marginTop:"12px"
                    }}
                    placeholder="What is your UPI ID?"
                />
                {verified === false ?
                    <>
                        {error && <p style={{color:"red", marginTop:"1rem"}}>{error}</p>}
                        <p style={{textAlign:"center", opacity:"0.6", marginTop:"1rem", fontSize:"14px", fontWeight:"500"}}>
                            UPI ID should be in this format only<br/>-  username@upihandle
                        </p>
                        <button className="submit lite">Verify my UPI ID</button>
                    </>
                    :
                    <>
                        <p style={{color:"#149540", fontWeight:"700", display:"flex", alignItems:"center", gap:"2px", marginTop:"0.6rem"}}>
                            <BsCheck style={{fontSize:"28px"}} />
                            Verified!
                        </p>

                        <div style={{padding:"12px", textAlign:"center", background:"#FAE1CD", borderRadius:"4px", marginTop:"1.5rem"}}>
                            You will be asked to pay ₹1 to <br/>complete the mandate registration
                        </div>
                        <button className="submit">Next</button>
                        <BottomPopOverModal showPopOver={showPopOver} setShowPopOver={setShowPopOver} color="#FFF">
                            <>
                                <div id="doneAnimation"></div>
                                <p style={{color:"#514C9F", fontWeight:"bold", fontSize:"18px", textAlign:"center"}}>
                                    Payment request sent <br/>to you on PhonePe
                                </p>
                            </>
                        </BottomPopOverModal>
                    </>
                }
            </>
        }
        </main>
    )
}