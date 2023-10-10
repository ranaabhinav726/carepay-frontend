import './creditFairOffers.scss'
import Header from "../../Header/Header"
import { BiRupee } from "react-icons/bi";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { env } from '../../../environment/environment';
import { useNavigate } from 'react-router-dom';

import { showWrapper, hideWrapper } from '../../../environment/environment';

const CreditFairOffers = () =>{

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
            axios.get(env.api_Url + "getCreditFairOffers" + "?doctorId=" + doctorId)
            .then(response =>{
                console.log(response)
                if(response.data.message === "success"){
                    if(response?.data?.data === "No Offers Found"){
                        setOffers([]);
                    }else{
                        setOffers(response?.data?.data)
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
            "tenure"   : offers[0].totalEmi,
            "internalProductId" : offers[0].internalProductId
        })
        // console.log(offers[0].productId)
    }, [offers])


    let offerCards = offers.map((offer, idx) =>{
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


    async function submitLoanData(){

        let submitObj = {
            "userId": userId,
            "doctorId": doctorId,
            "loanAmount": loanAmt,
            "loanReason": loanPurpose,
            "loanEMI": selected.tenure,
            "productId": selected.productId,
            "internalProductId" : selected.internalProductId
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
                    // await handleNavigation();
                    // if(loanAmt <= 75000){
                        await axios
                            .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=customer", {},)
                            .then(response =>{
                                console.log(response)
                                if(response.data.message === "success"){
                                    navigate('/patient/WaitingForApproval')
                                }else{
                                    setTimeout(async ()=>{
                                        await axios
                                            .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=customer", {},)
                                            .then(response =>{
                                                console.log(response)
                                                if(response.data.message === "success"){
                                                    navigate('/patient/WaitingForApproval')
                                                }else{
                                                    if(response.data.data === "It seems like it has been less than 3 months since you applied to Credit Fair . We'll be happy to serve you after 3 Month"){
                                                        setErrorMsg("Please apply after 3 months");
                                                    }else{
                                                        setErrorMsg("An error has occured, please try again.");
                                                    }
                                                    apiErrorHandler();
                                                }
                                            }).catch( () =>{
                                                apiErrorHandler();
                                            })
                                    }, 500)
                                }
                            }).catch(() =>{
                                apiErrorHandler();
                            })
                        
                    // }
                    // else{
                    //     navigate('/patient/BankDetails');
                    // }
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
            <main className="creditFairOffers">
                <Header />

                <h3>EMI Details</h3>

                <p style={{margin:"16px 0 10px 0", color:"rgba(0,0,0,0.6)"}}>Credit amount</p>
                <p style={{margin:"0"}}>Rs. {loanAmt.toLocaleString('en-IN',{maximumFractionDigits: 2})}</p>

                <p className="subheading">Select EMI options</p>
                <div className="msgBox">
                    <h4>Please note:</h4>
                    <p>An amount will be collected before disbursing your credit as advance EMI payment.</p>
                    <p>Select options accordingly.</p>
                </div>

                {offerCards}
                {/* <OfferCard />
                <OfferCard />
                <OfferCard /> */}


                <p className={apiError?"apiError": "apiError hide"}>{errorMsg}</p>

                <button className='submit' onClick={()=>submitLoanData()}>Submit</button>

            </main>
        </>
    )
}

export default CreditFairOffers

const OfferCard = ({cardName, offerDetails, loanAmount, selected, setSelected}) =>{

    let months = offerDetails.totalEmi ?? "0";
    let amount = parseInt(loanAmount/months);
    let pf = "0";
    if(!! offerDetails.processingFesIncludingGSTINR){
        pf = "Rs. " + offerDetails.processingFesIncludingGSTINR;
    }else if(!! offerDetails.processingFesIncludingGSTRate){
        pf = offerDetails.processingFesIncludingGSTRate + " %";
    }
    let interest = offerDetails.interest ?? "0";
    let advEmi = offerDetails.advanceEmi ?? "0";

    function cardSelector(){
        let obj = {
            "cardName" : cardName,
            "productId": offerDetails.productId,
            "tenure"   : months,
            "internalProductId" : offerDetails.internalProductId
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
            <div className="offerContent">
                <div className="offerContentLeft">
                    <span className='offerCardSpan'>Tenure</span>
                    <span className='offerCardSpan'>EMI amount</span>
                    <span className='offerCardSpan'>Processing fees</span>
                    <span className='offerCardSpan'>Interest rate</span>
                    <span className='offerCardSpan'>Advance EMI(s)</span>
                </div>
                <div className="offerContentRight">
                    <span className='offerCardSpan'>{months} month{months>1 && "s"}</span>
                    <span className='offerCardSpan'><BiRupee style={{margin:"0 -6px -3px -4px"}} /> {amount.toLocaleString('en-IN',{maximumFractionDigits: 2})}</span>
                    <span className='offerCardSpan'>{pf}</span>
                    <span className='offerCardSpan'>{interest} %</span>
                    <span className='offerCardSpan'>{advEmi.toLocaleString('en-IN',{maximumFractionDigits: 2})}</span>
                </div>
                {/* <BiRupee style={{margin:"0 -4px -2px -2px"}} />  */}
            </div>
        </div>
    )
}