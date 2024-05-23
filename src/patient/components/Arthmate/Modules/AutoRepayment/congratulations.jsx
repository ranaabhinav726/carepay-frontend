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

// let refID = localStorage.getItem("new_reference_id") || "FGDTH12345RR";


const Congrats = () => {
    const navigate = useNavigate()
    // let amount = localStorage.getItem("new_limit") || "0";
    let userId = localStorage.getItem('userId');
    let email = localStorage.getItem('email')
    let number = localStorage.getItem('phoneNumber');
    const [amount, setAmount] = useState("0");
    const [loaderState, setLoader] = useState(false);

    // amount = parseInt(amount).toLocaleString('en-IN');

    let ref = useRef(0);
    useEffect(() => {
        ref.current = document.getElementById('animation-wrapper');
        setLoader(true)
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
            .then((response) => {
                setLoader(false)

                console.log(response.data.status)
                if (response.data.data.status === '105') {
                    console.log(response.data.data.status)
                    setAmount(response.data.data.loanAmount)
                }
            })

    }, [])
    const submit = () => {
        if (amount !== '0') {
            navigate(routes.ARTH_KYC)
        }
    }

    // async function checkStatus(){
    //     showWrapper(ref.current)
    //     await axios
    //     .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
    //         .then(async(response) => {
    //             console.log(response)
    //             if(response.data.message === "success"){
    //                 // console.log(response)
    //                 let data = response?.data?.data;
    //                 let amt = parseInt(data.amount).toLocaleString('en-IN');
    //                 setAmount(amt);
    //                 if(data.loan_status === "107"){
    //                     navigate('/patient/loanAppSuccessful')
    //                 }
    //             }
    //         }).catch(error =>{
    //             console.log(error)
    //         })
    //         hideWrapper(ref.current)
    // }
    const checkStatus = () => {
        setLoader(true)
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + userId)
            .then((response) => {
                setLoader(false)

                if (response.data.data.status === '101') {
                }
                if (response.data.data.status === '105') {
                    console.log(response.data.data.status)
                    setAmount(response.data.data.loanAmount)
                }
                if (response.data.data.status === '110') {
                    navigate(routes.REJECTED_SCREEN)
                }

            })
    }

    return (
        <>
            <main className='congrats'>
                <Header progressbarDisplay="none" />
                {loaderState ? <Loadinggif /> : ""}
                {loaderState === false && amount !== '0' ?
                    <>
                        <div style={{ display: "flex", position: "relative", flexDirection: "row", alignItems: "baseline", justifyContent: "space-around", marginTop: "1rem" }}>
                            <img src={Confetti} style={{ transform: "scaleX(-1)", maxWidth: "25%" }} alt="" />
                            <p style={{ position: "absolute", fontSize: "24px", lineHeight: "26px", color: "#149540", fontWeight: "700", marginTop: "1rem" }}>Congratulations</p>
                            <img src={Confetti} style={{ maxWidth: "25%" }} alt="" />
                        </div>
                        <p className='subtitle'>Your credit application is <span style={{ color: "#149540", fontWeight: "700" }}>approved</span> for</p>
                        <div style={{ width: "90%", color: "#149540", height: "max-content", padding: "10px 16px", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700", borderRadius: "4px", border: "1px solid #000", background: "#EBFEED", boxShadow: "-4px 6px 0px 0px #514C9F" }}>
                            <BiRupee /> {amount}
                        </div>

                        <div className='stepCard' style={{ background: "#FAE1CD", marginTop: '40px' }}>
                            <p style={{ fontWeight: "700" }}>You are now just 3 quick steps away from your treatment.</p>
                            <ul >
                                <li><div className='encircle'>1</div><span className='v-line'></span><div className="stepName" style={{ fontSize: '14px' }}>KYC <span><MdOutlineElectricBolt className='boltIcon' /> Takes 30 seconds</span></div></li>
                                <li><div className='encircle'>2</div><span className='v-line'></span><div className="stepName" style={{ fontSize: '14px' }}>Agreement e-signing <span><MdOutlineElectricBolt className='boltIcon' /> Takes 20 seconds</span></div></li>
                                <li><div className='encircle'>3</div><div className="stepName" style={{ fontSize: '14px' }}>e-NACH Mandate <span><MdOutlineElectricBolt className='boltIcon' /> Takes 40 seconds</span></div></li>

                            </ul>
                            <p>No paperwork needed, this is completely a digital process.</p>
                        </div>
                        <button className='submit' onClick={() => submit()}>Proceed</button>
                    </>
                    : ""}
                {loaderState===false&& amount === '0' ?
                    <>
                        <div style={{ display: "flex", placeContent: "center", marginTop: "3rem" }}>
                            <img src={SearchingDoc} alt="" style={{ width: "50%" }} />
                        </div>
                        <NoteText text="We are assessing your credit application." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />
                        <NoteText text="This might take 15-20 minutes." styles={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }} />
                        <div style={{ background: "#FAE1CD", textAlign: "center", padding: "16px 12px", fontSize: "16px", lineHeight: "22px", borderRadius: "4px", marginTop: "1rem" }}>
                            You will be notified on your registered contact number <strong style={{ whiteSpace: "nowrap" }}>+91 {number}</strong> once the application is reviewed.
                        </div>
                        <button onClick={() => checkStatus()} className="submit" style={{ margin: "2rem 0 12px 0" }}>Refresh status</button>
                        <NoteText text="For more details and enquiries, reach out to us" styles={{ textAlign: "center", color: "#000000C", fontSize: "16px", lineHeight: "20px", marginTop: "1.7rem" }} />
                        <div style={{ textAlign: "center", margin: "1rem 0 2rem 0" }}>
                            <Link to={"tel:+918069489655"} style={{ color: "#514C9F", fontWeight: "700", textDecoration: "underline", textAlign: "center" }}>Contact Support</Link>
                        </div>
                    </>
                    : ""}
            </main>
        </>
    )
}

export default Congrats