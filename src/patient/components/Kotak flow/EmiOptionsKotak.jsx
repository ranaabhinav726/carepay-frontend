import { useEffect, useState } from "react";
import Header from "../Header/Header";
import InputBox from "./comps/InputBox";
import StepBar from "./comps/StepBar";
import { BiRupee } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import './creditFairOffers.scss'
import axios from "axios";
import { env } from "../../environment/environment";
import Sparkles from '../../assets/Sparkle.svg'


function EmiOptionsKotak(){

    let userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    let location = useLocation();
    // console.log(location.state);
    let offer = location?.state?.offer;
    let tenure = offer?.TENURE;
    let offerAmount = offer?.OFFER_AMOUNT;

    const [offers, setOffers] = useState([]);
    // let loanAmt = 10000;
    // const [lo]
    const [maxLoanLimit, ] = useState(Number(offerAmount));
    const [reqAmount, setReqAmount] = useState("");
    const [maxTenure, setMaxTenure] = useState(Number(tenure));
    const [loanData, setLoanData] = useState({});

    const [selected, setSelected] = useState({
        "cardName" : "card-1",
        "tenure"   : ""
    });

    useEffect(()=>{
        if(!! userId){
            axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.status === 200){
                    let data = response.data.data;
                    if(data) setLoanData(data);
                }
            }).catch(()=>{

            });
        }
    }, [])

    useEffect(()=>{
        setMaxTenure(Number(tenure))
        console.log(tenure)
    }, [])
    
    useEffect(()=>{
        let temp = [];
        let limit = maxTenure;
        if(maxTenure > 12) limit = 12;
        for(let i=3; i<=limit; i=i+3){
            let o = {
                "totalEmi" : i
            }
            temp.push(o);
        }
        // console.log(temp)
        setOffers(temp);
    }, [maxTenure])

    let offerCards = offers.map((offer, idx)=>{
        return <OfferCard
            cardName={`card-${idx+1}`} 
            offerDetails={offer} 
            loanAmount={Number(reqAmount)} 
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

    async function handleNavigate(){
        let chosenTenure = selected.tenure;
        let submitObj = {...loanData,
                            "loanEMI":chosenTenure,
                            "loanAmount":reqAmount,
                            "userId":userId
                        };

        await axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj)
            .then(response => {
                console.log(response)
                if(response.data.message === "success"){
                    navigate("/patient/PanVerificationIcici", 
                        {
                            state:{
                                "offer" : offer, 
                                "reqAmount" : reqAmount,
                                "loanTenure" : chosenTenure,
                            }
                        }
                    )
                }
            }).catch(error => {
                console.log(error);
            });
        
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
                Please keep the required credit amount <br/>under your <b>approved limit of ₹ {maxLoanLimit.toLocaleString('en-IN',{maximumFractionDigits: 2})}</b> only.
            </div>
            <p>Select EMI options</p>
            {offerCards}
            <p style={{fontWeight:"700", color:"#149540"}}>
                <img style={{filter:"brightness(110%)", marginBottom:"-2px"}} src={Sparkles} alt="" /> No interest or processing fees.
            </p>
            <button className="submit" onClick={()=>handleNavigate()}>Submit</button>
        </main>
    )
}

export default EmiOptionsKotak

const OfferCard = ({cardName, offerDetails, loanAmount, selected, setSelected}) =>{

    let months = offerDetails?.totalEmi ?? "0";
    const [emiAmount, setEmiAmount] = useState("");
    // const [pf, ] = useState(0);
    // const [interest, ] = useState(0);

    useEffect(()=>{
        let headerConfig = {
            params:{
                "amount" : loanAmount,
                "tenure" : months
            }
        }
        axios.get(env.api_Url + "icici/emiData", headerConfig)
        .then(res=>{
            console.log(res);
            let amt = res?.data?.data?.emiAmount;
            if(amt) setEmiAmount(Number(amt));
        }).catch(e=>{

        })
    }, [loanAmount])

    function cardSelector(){
        let obj = {
            "cardName" : cardName,
            "tenure"   : months
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
                <div className='offerContent'>
                    <div className="offerContentLeft">
                        <span className='offerCardSpan'>Tenure</span>
                        <span className='offerCardSpan largeText'>{months} month{months>1 && "s"}</span>
                    </div>
                    <div className="offerContentRight">
                        <span className='offerCardSpan'>EMI amount</span>
                        <span className='offerCardSpan largeText'><BiRupee style={{margin:"0 -6px -3px -4px"}} /> {emiAmount?.toLocaleString('en-IN',{maximumFractionDigits: 2})}</span>
                    </div>
                </div>
                {/* <div className="offerContent">
                    <div className="offerContentLeft">
                        <span className='offerCardSpan'>Processing fees</span>
                        <span className='offerCardSpan'>Interest rate</span>
                    </div>
                    <div className="offerContentRight">
                        <span className='offerCardSpan'>{`${pf}%`}</span>
                        <span className='offerCardSpan'>{interest} %</span>
                    </div>
                    <BiRupee style={{margin:"0 -4px -2px -2px"}} /> 
                </div> */}
            </div>
        </div>
    )
}