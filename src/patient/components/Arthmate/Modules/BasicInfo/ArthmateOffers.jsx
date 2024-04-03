import './styles/arthmateOffers.scss'
import { Header } from '../../comps/Header';
import { BiRupee } from "react-icons/bi";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { env, showWrapper, hideWrapper } from '../../../../environment/environment';

const ArthmateOffers = () =>{

    const navigate = useNavigate();

    const [loanAmt, setLoanAmount] = useState('0');
    const [loanPurpose, setLoanPurpose] = useState('');
    // const [doctorName, setDoctorName] = useState('');
    const [doctorId, setDoctorId] = useState('');

    const [selected, setSelected] = useState({
        "cardName" : "card-1",
        "productId": "",
        "tenure"   : ""
    });

    const [offers, setOffers] = useState([]);
    const [offerCards, setOfferCards] = useState([]);
    const [renderAllProducts, setRenderAllProducts] = useState(false);

    const [apiError, setApiError] = useState(false);
    let ref = useRef(0);   

    let userId = localStorage.getItem('userId');

    // let errorMsg = "An error has occured, please try again.";
    const [errorMsg, setErrorMsg] = useState("An error has occured, please try again.")

    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
        axios.get(env.api_Url + "userDetails/getLoanDetailsByUserId?userId=" + userId)
        .then(response =>{
            if(response.data.message === "success"){
                let data = response.data.data;
                if(!! data){
                    setLoanAmount(parseInt(data.loanAmount));
                    setLoanPurpose(data.loanReason);
                    // setDoctorName(data.doctorName);
                    setDoctorId(data.doctorId);
                }
            }
        }).catch(error =>{
            console.log(error);
        })
    }, [])

    useEffect(()=>{
        if(!! doctorId){
            // axios.get(env.api_Url + "getCreditFairOffers" + "?doctorId=" + doctorId)
            axios.get(env.api_Url + "getOffersAssigned" + "?doctorId=" + doctorId)
            .then(response =>{
                console.log(response)
                if(response.data.message === "success"){
                    if(response?.data?.data === "No Offers Found"){
                        setOffers([]);
                    }else{
                        let offers = response?.data?.data;
                        let sortedOffers = offers.sort(function(a, b) {
                                                return a.totalEmi - b.totalEmi;
                                            });
                        setOffers(sortedOffers)
                    }
                }
            }).catch(error =>{
                console.log(error);
            })
        }
    }, [doctorId])
 

    ////// To set default productId and tenure to first first offer, 
    ////// just in case user proceeds with the first selected offer

    useEffect(()=>{
        if(! offers[0]) return;
        setSelected({
            "cardName" : "card-1",
            "productId": offers[0].productId,
            "tenure"   : offers[0].totalEmi
        })
        // console.log(offers[0].productId)
    }, [offers])

    let minCount = Math.min(offers?.length, 3);

    useEffect(()=>{
        let tempOfferCards = [];

        if(renderAllProducts === false){
            for(let idx = 0; idx<minCount; idx++){
                tempOfferCards.push(
                    <OfferCard 
                        cardName={`card-${idx+1}`} 
                        offerDetails={offers[idx]} 
                        loanAmount={loanAmt} 
                        selected={selected} 
                        setSelected={setSelected} 
                        key={idx} 
                    />
                )
            }
        }else{
            tempOfferCards = offers.map((offer, idx) =>{
                return (
                        <OfferCard 
                            cardName={`card-${idx+1}`} 
                            offerDetails={offer} 
                            loanAmount={loanAmt} 
                            selected={selected} 
                            setSelected={setSelected} 
                            key={idx} 
                        />
                        )
            })
        }
        setOfferCards(tempOfferCards)
    }, [offers, selected, renderAllProducts])

    function checkLoanAmountAndNavigate(){
        if(loanAmt <= 300001){
            navigate('/patient/BankDetails', {state : {"reVisitToUploadStatement" : true}})
        }else{
            navigate('/patient/WaitingForApproval')
        }
    }

    async function submitLoanData(){
        let creditFairProductId;
        await axios
            .get(env.api_Url + "fetchOfferId" + '?productId=' + selected.productId)
            .then(async(res)=>{
                creditFairProductId = await res.data.data;
                if(creditFairProductId === "Product Not configured"){
                    creditFairProductId = 11111;
                }
                console.log(creditFairProductId)
            })

        let submitObj = {
            "userId": userId,
            "doctorId": doctorId,
            "loanAmount": loanAmt,
            "loanReason": loanPurpose,
            "loanEMI": selected.tenure,
            "productId": creditFairProductId, // 5 digit
            "internalProductId" : selected.productId // 32chars
        }

        if(!(submitObj.loanEMI && submitObj.productId)){
            setErrorMsg("Please select a offer.");
            apiErrorHandler();
            return;
        }

        showWrapper(ref.current);

        await axios
            .post(env.api_Url + "userDetails/saveLoanDetails", submitObj,)
            .then(async(response) => {
                console.log(response)
                if(response.data.message === "success"){
                    navigate("/patient/ArthIncomeVerification")
                }else{
                    apiErrorHandler();
                }
            }).catch(error => {
                apiErrorHandler();
                console.log(error);
            });

        // await axios.post(env.api_Url + "/userDetails/saveLoanDetails", submitObj)
        // .then(async (response) =>{
        //     if(response.data.message === "success"){
        //         //////////calling initiate flow////////////
        //         await axios
        //             .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=customer", {},)
        //             .then(response =>{
        //                 console.log(response)
        //                 if(response.data.message === "success"){
        //                     navigate('/patient/WaitingForApproval')
        //                 }else{
        //                     setTimeout(async ()=>{
        //                         await axios
        //                             .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=customer", {},)
        //                             .then(response =>{
        //                                 console.log(response)
        //                                 if(response.data.message === "success"){
        //                                     navigate('/patient/WaitingForApproval')
        //                                 }else{
        //                                     apiErrorHandler();
        //                                 }
        //                             }).catch( () =>{
        //                                 apiErrorHandler();
        //                             })
        //                     }, 500)
        //                 }
        //             }).catch(() =>{
        //                 apiErrorHandler();
        //             })
        //     }
        // }).catch(() =>{
        //     apiErrorHandler();
        // })

        hideWrapper(ref.current);
    }

    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 1500);
    }

    

    return(
        <>
            <main className="arthmateOffers">
                <Header progressbarDisplay='block' canGoBack={-1} />

                <h3>EMI Details</h3>

                <p style={{margin:"16px 0 10px 0", color:"rgba(0,0,0,0.6)"}}>Credit amount</p>
                <p style={{margin:"0"}}>Rs. {loanAmt.toLocaleString('en-IN',{maximumFractionDigits: 2})}</p>
                <p style={{color:"rgba(0,0,0,0.4)", marginTop:"10px"}}>Final credit amount will change according to the option you will select.</p>

                <p className="subheading">Select EMI options</p>
                <div className="msgBox">
                    <h4>Please note:</h4>
                    <p>You will have to make payment of the advance to the clinic/doctor/hospital according to the option selected.</p>
                    {/* <p>Select options accordingly.</p> */}
                </div>

                {offerCards}
                {/* <OfferCard />
                <OfferCard />
                <OfferCard /> */}

                {!renderAllProducts && <button className="submit lite" onClick={()=>setRenderAllProducts(true)}>Show more options</button>}

                <p className={apiError?"apiError": "apiError hide"}>{errorMsg}</p>

                <button className='submit' onClick={()=>submitLoanData()}>Proceed</button>
                <p style={{textAlign:"center", margin:"1rem 0"}}>For more details and enquiries, reach out to us</p>
                <a href="tel:+918069489655"><button className="submit" style={{color:"#514C9F", background:"#ECEBFF", marginTop:"0px"}}>Contact Support</button></a>
            </main>
        </>
    )
}

export default ArthmateOffers

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
            "tenure"   : months
        }
        console.log(obj)
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
                        {/* <span className='offerCardSpan'>Final credit amount</span> */}
                        <span className='offerCardSpan'>Processing fees</span>
                        <span className='offerCardSpan'>Interest rate</span>
                        <span className='offerCardSpan'>Advance EMI(s)</span>
                    </div>
                    <div className="offerContentRight">
                        {/* <span className='offerCardSpan'><BiRupee style={{margin:"0 -6px -3px -4px"}} /> {loanAmount?.toLocaleString('en-IN',{maximumFractionDigits: 2})}</span> */}
                        <span className='offerCardSpan'>{pf}</span>
                        <span className='offerCardSpan'>{interest} %</span>
                        <span className='offerCardSpan'>{advEmi.toLocaleString('en-IN',{maximumFractionDigits: 2})}</span>
                    </div>
                    {/* <BiRupee style={{margin:"0 -4px -2px -2px"}} />  */}
                </div>
            </div>
        </div>
    )
}