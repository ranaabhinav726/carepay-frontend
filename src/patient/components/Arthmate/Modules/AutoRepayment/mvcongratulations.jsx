import Header from '../../../Header/Header';
import '../../../../../patient/components/Income_Verification_Notification/Congratulation/congratulation.scss'
import CreditFairLogo from '../../../../assets/creditFair.png'
// import CongratsImg from '../../../assets/congrats.png'
import Confetti from '../../../../assets/GIFs/confetti.gif'
import { useNavigate } from 'react-router-dom';
import { env } from '../../../../environment/environment';
import { BiRupee } from 'react-icons/bi';
// import { MdOutlineElectricBolt } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IoIosStar } from "react-icons/io";
import { MdOutlineElectricBolt } from 'react-icons/md';
import routes from '../../../../../layout/Routes';
import NoteText from '../../../Fibe flow/Comps/NoteText';
import { Link } from 'react-router-dom';
import SearchingDoc from '../../../../assets/GIFs/Document in process.gif'
import Loadinggif from '../../../../../utils/loader/loadergif';
import MvLogo from '../../../../assets/Moneyview logo 1.svg'



const Congrats = () => {
    const navigate = useNavigate()
    let userId = localStorage.getItem('userId');
    let email = localStorage.getItem('email')
    let number = localStorage.getItem('phoneNumber');
    const [amount, setAmount] = useState("0");
    const [loaderState, setLoader] = useState(false);
    const [url, setUrl] = useState(false);


    let ref = useRef(0);
    useEffect(() => {
        ref.current = document.getElementById('animation-wrapper');
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loanData) => {
                setAmount(loanData.data.data.loanAmount)
                axios.get(env.api_Url + 'checkReferenceIdInDrawDownOffers?loanId=' + loanData.data.data.loanId)
                    .then((res) => {
                        if (res.data.message === 'success') {

                            axios.get(env.api_Url + 'journeyUrl?loanId=' + loanData.data.data.loanId + '&schemaId=' + res.data.data)
                                .then((jsourney) => {
                                    if (jsourney.data.message === 'success') {
                                        setUrl(jsourney.data.data)

                                    } else {
                                        alert(jsourney.data.data)
                                    }
                                })

                        }
                    })
            })

    }, [])
    const submit = () => {
        navigate(routes.MVREFRESH_FINAL)
        window.open(url, "_blank");

        // axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
        //     .then((loanData) => {
        //         axios.get(env.api_Url + 'checkReferenceIdInDrawDownOffers?loanId=' + loanData.data.data.loanId)
        //             .then((res) => {
        //                 if (res.data.message === 'success') {

        //                     axios.get(env.api_Url + 'journeyUrl?loanId=' + loanData.data.data.loanId + '&schemaId=' + res.data.data.schemaId)
        //                         .then((jsourney) => {
        //                             if (jsourney.data.message === 'success') {
        //                                 setUrl(jsourney.data.data)

        //                             } else {
        //                                 alert(jsourney.data.data)
        //                             }
        //                         })

        //                 }
        //             })
        //     })

    }



    const checkStatus = () => {

    }

    return (
        <>
            <main className='congrats'>
                <Header progressbarDisplay="none" />
                {loaderState ? <Loadinggif /> : ""}
                <>
                    <div style={{ display: "flex", position: "relative", flexDirection: "row", alignItems: "baseline", justifyContent: "space-around", marginTop: "1rem" }}>
                        <img src={Confetti} style={{ transform: "scaleX(-1)", maxWidth: "25%" }} alt="" />
                        <p style={{ position: "absolute", fontSize: "24px", lineHeight: "26px", color: "#149540", fontWeight: "700", marginTop: "1rem" }}>Congratulations</p>
                        <img src={Confetti} style={{ maxWidth: "25%" }} alt="" />
                    </div>
                    <p className='subtitle'>Your credit application is <span style={{ color: "#149540", fontWeight: "700" }}>approved</span> for</p>
                    <div style={{ width: "90%", color: "#149540", height: "max-content", padding: "10px 16px", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700", borderRadius: "4px", background: "#EBFEED" }}>
                        <BiRupee /> {amount}
                    </div>
                    <p className='text-center' style={{ marginTop: '20px', marginBottom: '20px', fontSize: '14px' }}>by your best matched lender,</p>
                    <img src={MvLogo} />
                    <div className='stepCard' style={{ background: "#FAE1CD", marginTop: '40px', color: '#000' }}>
                        <p style={{ fontWeight: "700", color: '#000' }}>You are now just 3 quick steps away from your treatment.</p>
                        <ul >
                            <li style={{ color: '#000' }}><div className='encircle'>1</div><span className='v-line' style={{ height: '33px', top: '37px' }}></span><div className="stepName" style={{ fontSize: '14px' }}>KYC <span><MdOutlineElectricBolt className='boltIcon' /> Takes 30 seconds</span></div></li>
                            <li style={{ color: '#000' }}><div className='encircle'>2</div><span className='v-line' style={{ height: '33px', top: '37px' }}></span><div className="stepName" style={{ fontSize: '14px', marginTop: '-10px' }}>Share bank details and<br />
                                setup auto-debit <span><MdOutlineElectricBolt className='boltIcon' /> Takes 40 seconds</span></div></li>
                            <li style={{ color: '#000' }}><div className='encircle'>3</div><div className="stepName" style={{ fontSize: '14px' }}>Agreement e-signing. <span><MdOutlineElectricBolt className='boltIcon' /> Takes 30 seconds</span></div></li>

                        </ul>
                        <p style={{ color: '#000' }}>No paperwork needed, this is a completely
                            digital process.</p>
                        <p style={{ color: '#000' }}><b>You will be redirected to the lending partner’s platform for the next steps.</b></p>
                    </div>
                    {url ?
                        <button className='submit' style={{ background: '#244736' }} onClick={() => submit()}>Continue To Moneyview</button>
                        : ""}
                </>

            </main>
        </>
    )
}

export default Congrats