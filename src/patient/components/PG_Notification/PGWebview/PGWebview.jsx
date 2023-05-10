import './kycWebview.scss'
import Header from '../../Header/Header'
import { useEffect } from 'react'

// import { RxCheckCircled, RxCrossCircled } from 'react-icons/rx'
// import { useNavigate } from 'react-router-dom'

// import { env } from "../../../environment/environment"
// import axios from "axios"

const PGWebview = () =>{

    let url = localStorage.getItem('PG_url')

    useEffect(()=>{
        let elem = document.getElementByID('link');
        elem.click();
    },[])


    // const [paymentStatus, setPaymentStatus] = useState("Not verified");
    // const [timeLeft, setTimeLeft] = useState(null);

    // const navigate = useNavigate();
    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}`}
    // };

    // // let timerInvoked = 1;

    // useEffect(() => {
    //     // exit early when we reach 0
    //     // if (!timeLeft) return;

    //     if(timeLeft==0){
    //     // console.log("TIME LEFT IS 0");
    //         setTimeLeft(null)
    //         navigate('/PGVerifying')
    //     }

    //     const intervalId = setInterval(() => {

    //     setTimeLeft(timeLeft - 1);
    //     }, 1000);

    //     // clear interval on re-render to avoid memory leaks
    //     return () => clearInterval(intervalId);
    //     // add timeLeft as a dependency to re-rerun the effect
    //     // when we update it
    // }, [timeLeft]);

    // async function checkPayment(){
    //     let isPaymentDone;
    //     await axios
    //         .post(env.api_Url + "get_document_status", {
    //                 "type": "kyc_verification"
    //                 },
    //                 config
    //             )
    //         .then((response) => {
    //             let paymentStatus = response.data.kyc_verified;
    //             // console.log(kycStatus)
    //             if(paymentStatus == "VERIFIED"){
    //                 isPaymentDone = true
    //                 setPaymentStatus("Verified")
    //             }else{
    //                 isPaymentDone = false
    //             }
    //         }).catch(error => {
    //                 console.log(error);
    //         });
    //         // console.log(isKYCdone)
    //         return isPaymentDone;
    // }

    // useEffect(()=>{
    //     let elem = document.getElementsByClassName('tryAgain')[0];
    //     elem.click();
    //     // console.log("hhii")
    // },[])


    // async function handleRefresh(){
    //     // let status = false;
    //     let status = await checkPayment();
    //     if(status){
    //         let elem = document.getElementById('redirect');
    //         elem.style.visibility = "visible";
    //         let elem2 = document.getElementsByClassName('refreshKycStatus')[0];
    //         elem2.style.pointerEvents = "none";
    //         setTimeLeft(4);
    //     }
    // }

    return(
        <>
            <Header progressbarDisplay="none" progress="80" />
            <main className='pgWebview'>
                {/* <iframe src={url} frameborder="0"></iframe> */}
                {/* <div className="symbol">
                    {paymentStatus=="Not verified"?<RxCrossCircled className='icon red'/>:<RxCheckCircled className='icon green'/>}
                </div>
                <div className='kycStatus'>Your KYC status is: <span className={paymentStatus=="Not verified"?"kycStatusValue red":"kycStatusValue green"}>{paymentStatus}</span></div>
                <div id="redirect">Redirecting you to next step in {timeLeft} seconds...</div>
                <div onClick={handleRefresh} className="refreshKycStatus">
                    Refresh Status
                </div>
                <a className='tryAgain' href={url} target="_blank">Click here to complete your KYC process</a> */}

                <img src={underProcess} alt="" />

                <h3>Under Process</h3>

                <p className="text">Your KYC documents are being reviewed.</p>

                <div className="msg">You will be notified on your registered contact number <strong style={{whiteSpace: "nowrap"}}>{phoneNo}</strong> and email-id once KYC is done.</div>

                <button onClick={()=>navigate('/KycVerifying')} className="submit">Check Status</button>
                <a id='link' style={{display:"none"}} href={url} target="_blank"></a>
            </main>
        </>
    )
}

export default PGWebview