import { useState } from "react";
import Header from "../Header/Header";
import InputBox from "./comps/InputBox";
import StepBar from "./comps/StepBar";
import { BiRupee } from "react-icons/bi";

function EmiOptions(){

    let offers = [];
    let loanAmt = 10000;
    // const [lo]
    const [maxLoanLimit, setMaxLoanLimit] = useState(100000);
    const [reqAmount, setReqAmount] = useState("");

    const [selected, setSelected] = useState({
        "cardName" : "card-1",
        "productId": "",
        "tenure"   : ""
    });

    let offerCards = offers.map((offer, idx)=>{
        return <OfferCard
            cardName={`card-${idx+1}`} 
            offerDetails={offer} 
            loanAmount={loanAmt} 
            selected={selected} 
            setSelected={setSelected} 
            key={idx} 
        />
    })

    function amountHandler(val){
        // console.log(val)
        if(val === ""){
            setReqAmount("");
            return;
        }
        val = parseInt(val);
        if(val >= 0 && val <= maxLoanLimit){
            setReqAmount(val);
        }
    }

    return(
        <main style={{display: "flex", flexDirection:"column", gap:"1rem"}}>
            <Header progressbarDisplay='none' />
            <StepBar currStep={1} />

            <h3 style={{margin:"1rem 0"}}>EMI options</h3>

            <p>Confirm credit amount</p>
            <InputBox 
                Prefix={<BiRupee style={{fontSize:"20px"}} />}
                value={reqAmount}
                setValue={amountHandler}
            />
            <div style={{background:"#FAE1CD", textAlign:"center", borderRadius:"4px", padding:"10px", marginBottom:"1rem"}}>
                Please keep the required credit amount <br/>under your <b>approved limit of ₹ {maxLoanLimit.toLocaleString('en-IN',{maximumFractionDigits: 2})}</b> only
            </div>
            <p>Select EMI options</p>
            {offerCards}
            <button className="submit">Submit</button>
        </main>
    )
}

export default EmiOptions

const OfferCard = ({cardName, offerDetails, loanAmount, selected, setSelected}) =>{

    let months = offerDetails?.totalEmi ?? "0";
    let amount = parseInt(loanAmount/months);
    let pf = "0";
    if(!! offerDetails?.processingFesIncludingGSTINR){
        pf = "Rs. " + offerDetails?.processingFesIncludingGSTINR;
    }else if(!! offerDetails?.processingFesIncludingGSTRate){
        pf = offerDetails?.processingFesIncludingGSTRate + " %";
    }
    let interest = offerDetails?.interest ?? "0";
    let advEmi = offerDetails?.advanceEmi ?? "0";

    function cardSelector(){
        let obj = {
            "cardName" : cardName,
            "productId": offerDetails?.productId,
            "tenure"   : months,
            "internalProductId" : offerDetails?.internalProductId
        }
        setSelected(obj)
    }

    return(
        <div className={selected.cardName === cardName ? "offerCard selected":"offerCard"} onClick={cardSelector}>
            <div className="select">
                <div className="selectCircle">
                    <div className="innerCirle selected"></div>
                </div>
            </div>
            <div className='offerContentWrapper'>
                <div className='offerContent' style={{borderBottom:"1px solid #ccc"}}>
                    <div className="offerContentLeft">
                        <span className='offerCardSpan'>Tenure</span>
                        <span className='offerCardSpan largeText'>{months} month{months>1 && "s"}</span>
                    </div>
                    <div className="offerContentRight">
                        <span className='offerCardSpan'>EMI amount</span>
                        <span className='offerCardSpan largeText'><BiRupee style={{margin:"0 -6px -3px -4px"}} /> {amount?.toLocaleString('en-IN',{maximumFractionDigits: 2})}</span>
                    </div>
                </div>
                <div className="offerContent">
                    <div className="offerContentLeft">
                        <span className='offerCardSpan'>Processing fees</span>
                        <span className='offerCardSpan'>Interest rate</span>
                    </div>
                    <div className="offerContentRight">
                        <span className='offerCardSpan'>{pf}</span>
                        <span className='offerCardSpan'>{interest} %</span>
                    </div>
                    {/* <BiRupee style={{margin:"0 -4px -2px -2px"}} />  */}
                </div>
            </div>
        </div>
    )
}